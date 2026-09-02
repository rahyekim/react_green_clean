import 'styled-components';

// 1. 내가 만든 theme의 구조를 타입스크립트에게 알려줍니다.
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string; // 오타 'backgroud'도 그대로 유지해주시면 에러 안 납니다!
      primary: string;
      text: string;
    };
  }
}