import 'styled-components';
import { Theme } from '@/assets/css/theme'; 

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

// // 다른 파일에서 import 하지 않고, 여기다 직접 테마 구조를 선언합니다!
// declare module 'styled-components' {
//   export interface DefaultTheme {
//     colors: {
//       background: string;
//       primary: string;
//       text: string;
//       header: string;
//       title: string;
//       mobilenav: string;
//       label: string;
//       alert: string;
//     };
//   }
// }