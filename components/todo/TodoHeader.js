import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

const TodoHeader = ({ count, promote }) => {
  const [role, setRole] = useState(null);

  const today = new Date();

  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const dayName = today.toLocaleDateString('ko-KR', {
    weekday: 'long',
  });

  const upgrade = () => {
    Alert.alert('업그레이드', '프리미엄으로 업그레이드 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '확인', onPress: promote },
    ]);
  };

  // 회원 등급에 따른 조건별 렌더링
  const gradeView = () => {
    if (role === 'COMMON') {
      return (
        <Text style={[styles.promote, styles.common]} onPress={upgrade}>
          일반회원
        </Text>
      );
    } else if (role === 'PREMIUM') {
      return <Text style={[styles.promote, styles.premium]}>프리미엄</Text>;
    } else if (role === 'ADMIN') {
      return <Text style={[styles.promote, styles.admin]}>관리자</Text>;
    }
  };

  useEffect(() => {
    const fetchRole = async () => {
      const storedRole = await AsyncStorage.getItem('USER_ROLE');
      setRole(storedRole);
    };
    fetchRole();
  }, []);

  return (
    <View style={styles.header}>
      <Text style={styles.date}>{dateString}</Text>
      <Text style={styles.day}>{dayName}</Text>
      <Text style={styles.tasksLeft}>할 일 {count()}개 남음</Text>
      {gradeView()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  date: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  day: {
    fontSize: 18,
    color: '#495057',
  },
  tasksLeft: {
    marginTop: 8,
    fontSize: 16,
    color: '#868e96',
  },
  promote: {
    marginTop: 8,
    padding: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  common: {
    backgroundColor: '#ffc107',
    color: '#ffffff',
  },
  premium: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
  },
  admin: {
    backgroundColor: '#17a2b8',
    color: '#ffffff',
  },
});

export default TodoHeader;
