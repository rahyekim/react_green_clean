'use client'

import { createGlobalStyle } from "styled-components";

export const Globalstyle = createGlobalStyle`

*{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* 2. body 마진 제거 */
body{  
    margin: 0;
    padding: 0;
}

/* 3. 리스트 스타일 제거 */
  ul, ol, li {
    list-style: none;
  }

/* 4. 링크 스타일 초기화 */
a {
    text-decoration: none; /* 밑줄 제거 */
    color: inherit;        /* 색상 변동 방지 */
  }

`;