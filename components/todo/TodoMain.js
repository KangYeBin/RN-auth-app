import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TodoItem from './TodoItem';

const TodoMain = ({ todoList, remove, check }) => {
  return (
    <View style={styles.todoList}>
      <FlatList
        data={todoList}
        renderItem={({ item }) => (
          <TodoItem key={item.id} item={item} remove={remove} check={check} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  todoList: {
    flex: 1,
  },
});

export default TodoMain;
