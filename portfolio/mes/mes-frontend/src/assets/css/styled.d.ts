import 'styled-components';
import { Theme } from '@/assets/css/theme'; 

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

// styled-components의 기본 테마(DefaultTheme)를 
// 우리가 만든 Theme 타입으로 덮어씌움