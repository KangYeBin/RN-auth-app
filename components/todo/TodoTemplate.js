import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../store/auth-context';
import { API_BASE_URL as BASE, TODO, USER } from '../../config/host-config';
import handleRequest from '../../util/handleRequest';
import axiosInstance from '../../config/axios-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';
import TodoInput from './TodoInput';

const TodoTemplate = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  const API_BASE_URL = BASE + TODO;
  const API_USER_URL = BASE + USER;

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  const addTodo = async (todoText) => {
    const newTodo = { title: todoText };
    handleRequest(
      () => axiosInstance.post(API_BASE_URL, newTodo),
      (data) => setTodos(data.todos),
      logout,
      navigation,
    );
  };

  const removeTodo = async (id) => {
    handleRequest(
      () => axiosInstance.delete(`${API_BASE_URL}/${id}`),
      (data) => setTodos(data.todos),
      logout,
      navigation,
    );
  };

  const checkTodo = (id, done) => {
    handleRequest(
      () => axiosInstance.patch(API_BASE_URL, { id, done: !done }),
      (data) => setTodos(data.todos),
      logout,
      navigation,
    );
  };

  const countRestTodo = () => todos.filter((todo) => !todo.done).length;

  const fetchPromote = async () => {
    handleRequest(
      () => axiosInstance.put(`${API_USER_URL}/promote`),
      (data) => {
        AsyncStorage.setItem('ACCESS_TOKEN', data.token);
        AsyncStorage.setItem('USER_ROLE', data.role);
        setToken(data.token);
      },
      logout,
      navigation,
    );
  };

  useEffect(() => {
    handleRequest(
      () => axiosInstance.get(API_BASE_URL),
      (data) => {
        setTodos(data.todos);
        setLoading(false);
      },
      logout,
      navigation,
    );
  }, []);

  const loadEndedPage = (
    <View style={styles.container}>
      <TodoHeader count={countRestTodo} promote={fetchPromote} />
      <TodoMain todoList={todos} remove={removeTodo} check={checkTodo} />
      <TodoInput addTodo={addTodo} />
    </View>
  );

  const loadingPage = (
    <View style={styles.loading}>
      <ActivityIndicator size='large' color='#dc3545' />
    </View>
  );

  return <>{loading ? loadingPage : loadEndedPage}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TodoTemplate;
