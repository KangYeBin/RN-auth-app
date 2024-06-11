import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TodoInput = ({ addTodo }) => {
  const [open, setOpen] = useState(false);
  const [todoText, setTodoText] = useState('');

  const onToggle = () => {
    setOpen(!open);
  };

  const todoChangeHandler = (text) => {
    setTodoText(text);
  };

  const submitHandler = () => {
    addTodo(todoText);
    setTodoText('');
  };

  return (
    <>
      {open && (
        <View style={styles.formWrapper}>
          <TextInput
            style={styles.input}
            placeholder='할 일을 입력 후, 엔터를 누르세요!'
            onChangeText={todoChangeHandler}
            value={todoText}
            onSubmitEditing={submitHandler}
            autoFocus={true}
          />
        </View>
      )}
      <TouchableOpacity
        style={[styles.insertBtn, open && styles.open]}
        onPress={onToggle}
      >
        <Icon name='add' size={24} color='#fff' />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    padding: 8,
  },
  insertBtn: {
    backgroundColor: '#38d9a9',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  open: {
    backgroundColor: '#fa5252',
  },
});

export default TodoInput;
