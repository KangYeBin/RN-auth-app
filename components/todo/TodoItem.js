import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TodoItem = ({ item, remove, check }) => {
  const { id, title, done } = item;

  return (
    <View style={styles.todoListItem}>
      <TouchableOpacity
        style={[styles.checkCircle, done && styles.active]}
        onPress={() => check(id, done)}
      >
        <Icon name='done' size={20} color={done ? '#38d9a9' : '#e0e0e0'} />
      </TouchableOpacity>
      <Text style={[styles.text, done && styles.finish]}>{title}</Text>
      <TouchableOpacity style={styles.remove} onPress={() => remove(id)}>
        <Icon name='delete' size={20} color='#e64980' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todoListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  active: {
    borderColor: '#38d9a9',
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  finish: {
    textDecorationLine: 'line-through',
    color: '#adb5bd',
  },
  remove: {
    marginLeft: 16,
  },
});

export default TodoItem;
