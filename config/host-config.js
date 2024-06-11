let backEndHostName; // 백엔드 서버 호스트 이름

// 모바일 앱에서 window 객체를 사용할 수 없으므로, 환경 변수를 사용하여 설정합니다.
// const isDevelopment = __DEV__; // __DEV__는 리액트 네이티브에서 제공하는 전역 변수로, 개발 모드 여부를 나타냅니다.

// if (isDevelopment) {
// 개발 중
backEndHostName = 'http://192.168.0.62:8181';
// } else {
// 배포해서 서비스 중
//   backEndHostName = 'https://api.spring.com';
// }

export const API_BASE_URL = backEndHostName;
export const TODO = '/api/todos';
export const USER = '/api/auth';
