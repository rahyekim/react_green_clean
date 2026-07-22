import styled from "styled-components";

export const Wrapper = styled.div`

display: flex;
width: 100%;
height: 100vh;
overflow: hidden;

`;

export const ContentWrapper = styled.div`
display: flex;
flex-direction: column;
width: 100%;
overflow-x: hidden;
background-color: #f8f9fc;

`;

export const MainContent = styled.div`
/* ✨늘어나고, 줄어들지 않고, 기본 크기는 원래 크기✨ */
flex: 1 0 auto;  
/*
내용물의 크기를 기본으로 잡되(auto) 
=> flex-basis: auto;(기본크기 유지)
화면이 좁아져도 원래 크기보다 줄어들지 말고(0)
=> flex-shrink: 0(줄어드는비율); 
만약 화면에 빈 공간이 남는다면 남는 여백은 니가 전부채워라(1)
=> flex-grow: (늘어나는비율);
*/
`;

export const ContainerFluid = styled.div`
width:100%;
padding-right:1.5rem;
padding-left:1.5rem;
margin-right:auto;
margin-left:auto;

`;