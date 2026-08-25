'use client'

import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`

*,*::before, *::after {

    box-sizing: border-box;
}

html, body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

a{
    text-decoration: none;
    color: inherit;
}

ul, ol , li {
    list-style: none;
    margin: 0;
    padding: 0;
}

`;