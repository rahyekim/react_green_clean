import styled from "styled-components";
import { Link } from "react-router-dom";

export const AppContainer = styled.div`
display: grid;
grid-template-rows: 60px 1fr 60px; // header main footer  header는 max100px씀...대부분 60~80px
grid-template-columns: 100%;
min-height: 100vh; //화면 전체 높이 

/**viewport height 브라우저창의 전체 높이를 100%로 보겠다는 단위 (화면높이기준)
정확히 100% 높이를 의미 사용하는이유: height:100%은 부모요소의 영향을 받음 (px:고정값)
그래서 전체화면을 차지 하는 경우가 많다....어떤상황에서도 화면전체를 꽉 채우는 레이아웃을 만들때 사용(풀스크린)
*/
max-width: 480px;
margin:0 auto;
background-color: #f8f9fa;
box-shadow: 0 4px 12px rgba(0,0,0,0.1);  ////


`;

export const Header = styled.header`
display: flex;  //정렬!!!!!!
align-items: center;  // 세로 가운데 정렬
justify-content: center;  //가로 가운데 정렬

background-color: #fff;
border-bottom: 1px solid #e0e0e0;
font-weight: bold;
font-size:1.1rem;


`;

export const MainContent = styled.main`
overflow-y: auto; // 정해진 길이보다 오바될때 스크롤바생성
padding: 16px;
`;

export const BottomNav = styled.nav`
display: flex;
justify-content: space-around; // 왼쪽 오른쪽 공간을 띄운후 정렬 
align-items: center;
background-color: #fff; //#ffffff = 6자리일치하면 3개로 줄일수있음
border-top:1px solid #e0e0e0;
`;


export const StyledLink = styled(Link)`  //참조...

padding: 10px 14px;
border-radius: 10px;
color: #111;
text-decoration: none;
font-weight: 500;

transition: all 0.2s ease;

&:hover {
    background-color: #f2f2f2;
}

&:active{  //눌렀을때 
    transform: scale(0.97);
}
`;