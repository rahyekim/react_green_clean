'use client'
import styled from "styled-components";

export const PageWrapper= styled.div`

display: flex;
flex-direction: column;
min-height: 100vh; //🌟내용물이 없어도 화면꽉차게 기본값
`;


export const MainContent= styled.main`
flex: 1;
`;