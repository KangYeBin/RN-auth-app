import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import AuthForm from './AuthForm';
import FlatButton from '../ui/FlatButton';

const AuthContent = () => {
  const [isLogin, setIsLogin] = useState(false);

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    name: false,
    password: false,
    confirmPassword: false,
  });

  const submitHandler = (credentials) => {
    let { email, name, password, confirmPassword } = credentials;
    console.log('submitHandler email: ', email);

    email = email.trim();
    password = password.trim();
    const nameRegex = /^[가-힣]{2,4}$/;

    // 실제로 적용할 때는 유효성 검사 제대로하기
    const emailIsValid = email.includes('@');
    const nameIsValid = nameRegex.test(name);
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!nameIsValid || !passwordsAreEqual))
    ) {
      Alert.alert('유효하지 않은 입력값이 있습니다. 확인 후 다시 입력해주세요');
      setCredentialsInvalid({
        email: !emailIsValid,
        name: !nameIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
    }

    // 회원가입 or 로그인 처리
  };
  return (
    <View>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View>
        <FlatButton>
          {isLogin ? '회원 가입하기' : '로그인 화면으로 이동하기'}
        </FlatButton>
      </View>
    </View>
  );
};

export default AuthContent;
