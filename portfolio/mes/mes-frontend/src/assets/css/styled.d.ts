import 'styled-components';
import { Theme } from '@/assets/css/theme'; 

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}