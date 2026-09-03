'use client'

import { createGlobalStyle } from "styled-components";

export const Globalstyle = createGlobalStyle`

//모든요소(가상요소까지) 테두리까지 포함해서 크기 계산 
*, *::before, *::after{

    box-sizing: border-box;
   
}

/* 2. body 마진 제거 */
html, body{  
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

/* 3. 리스트 스타일 제거 */
  ul, ol, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

/* 4. 링크 스타일 초기화 */
a {
    text-decoration: none; /* 밑줄 제거 */
    color: inherit;        /* 색상 변동 방지 */
  }


`;