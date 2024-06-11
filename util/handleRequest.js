import { Alert } from 'react-native';

const handleError = (error, onLogout, navigation) => {
  console.log('handleError 호출됨!');
  console.log(error.response.data.message);
  if (error.response && error.response.status === 401) {
    if (error.response.data.message === 'INVALID_AUTH') {
      Alert.alert('로그인 필요', '로그인이 필요한 서비스 입니다.', [
        { text: '확인', onPress: () => navigation.navigate('Login') },
      ]);
    } else if (error.response.data.message === 'EXPIRED_TOKEN') {
      console.log('onLogout: ', onLogout);
      Alert.alert(
        '세션 만료',
        '로그인 시간이 만료되었습니다. 다시 로그인 해 주세요.',
        [
          {
            text: '확인',
            onPress: () => {
              onLogout();
              navigation.navigate('Login');
            },
          },
        ],
      );
    }
  } else if (error.response && error.response.status === 400) {
    // 400 에러에 대한 내용...
  } else if (error.response && error.response.status === 403) {
    // 403 에러에 대한 내용...
  }
};

const handleRequest = async (requestFunc, onSuccess, onLogout, navigation) => {
  try {
    const res = await requestFunc();
    if (res.status === 200) {
      onSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    handleError(error, onLogout, navigation);
  }
};

export default handleRequest;
