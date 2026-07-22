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
//❄️나 ContentWrapper 안에서 남는 공간 내가 먹을게
export const MainContent = styled.div`
/* 
✨남는공간차지하고, 공간부족해도줄어들지 않고, 기본 크기는 원래 내용기준
✨ 레이아웃크기조절담당
*/ 
flex: 1 0 auto;  
overflow-y: auto; //✅내용만 스크롤
/*
내용물의 크기를 기본으로 (auto) 
=> flex-basis: auto;(기본크기 유지)
부모공간이 부족해도 원래 크기보다 줄어들지 말고(0) -> 내부스크롤하면됨
=> flex-shrink: 0(줄어드는비율); 
만약 화면에 빈 공간이 남는다면 남는 여백은 니가 전부채워라(1)
=> flex-grow: (늘어나는비율);

basis:auto 내원래크기인정하고 시작  => 내 크기 반영하고  나머지나눔
basis:0%  원래크기무시하고 공간부터 나눔=>flex아이템끼리 다 똑같이 0으로 시작하고 나눔

⭐flex: 1⭐=> 1 1 0%
*/
`;
//❄️실제 페이지 알맹이({children})가 들어갈 영역
export const ContainerFluid = styled.div`
width:100%;
padding-right:1.5rem; //24px
padding-left:1.5rem;
margin-right:auto;
margin-left:auto;

`;



/*
flex:1 은 자식에게 주는속성임..
자식이 "부모의 남은 공간을 얼마나 차지할지" 정하는 속성


ContentWrapper의 flex:1

➡️ Sidebar 제외한 오른쪽 영역 차지

MainContent의 flex:1

➡️ TopBar 제외한 아래 영역 차지
 */


/*

Wrapper
 ├ SideBar
 └ ContentWrapper
       ├ TopBar
       └ MainContent
 */