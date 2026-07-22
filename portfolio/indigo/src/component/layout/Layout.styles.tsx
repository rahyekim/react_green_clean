import styled from "styled-components";

// ❄️최상위 Wrapper: SideBar와 ContentWrapper를 가로(수평)로 배치
export const Wrapper = styled.div`
display: flex;
width: 100%;
height: 100vh; //현재 브라우저 창 높이 100%
overflow: hidden; 
//✅바깥 전체 스크롤 방지(고정)
//내용(content)부분만 스크롤해야하니까..

`;
//❄️우측 전체를 감싸는 Wrapper: TopBar와 ContainerFluid를 세로(수직)로 배치
export const ContentWrapper = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height:100vh;
overflow-x: hidden;
background-color: #f8f9fc;

`;

export const MainContent = styled.div`
/* ✨늘어나고, 줄어들지 않고, 기본 크기는 원래 크기✨ */
flex: 1 0 auto;  
overflow-y: auto; //✅내용만 스크롤
/*
내용물의 크기를 기본으로 잡되(auto) 
=> flex-basis: auto;(기본크기 유지)
화면이 좁아져도 원래 크기보다 줄어들지 말고(0)
=> flex-shrink: 0(줄어드는비율); 
만약 화면에 빈 공간이 남는다면 남는 여백은 니가 전부채워라(1)
=> flex-grow: (늘어나는비율);
*/
`;
//❄️실제 페이지 알맹이({children})가 들어갈 영역
export const ContainerFluid = styled.div`
width:100%;
padding-right:1.5rem;
padding-left:1.5rem;
margin-right:auto;
margin-left:auto;

`;