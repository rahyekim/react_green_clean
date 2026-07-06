import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`

*{
    box-sizing: border-box;
}
`;

const sm = '576px';
const md = '768px';

//1)전체 레이아웃을 감싸는 그리드 컨테이너
export const Container = styled.div`

    display: grid;
    grid-template-columns:  1fr;
    grid-template-areas: 
    "hd"
    "nv"
    "ct"
    "sb"
    "ad"
    "ft"
    ;
    gap:20px;
    min-height: 100vh; //🔵화면 전체 높이 확보// 없으면 내용만큼만 높이 생김

    & > * {
        border: 1px solid beige;
        background-color: beige;
        padding: 10px;
        /* grid-column: 1 / span 12; */
    }
    @media (min-width: ${sm}){
    grid-template-columns: 1fr 3fr;
       grid-template-areas: 
       "hd hd"
       "nv nv"
       "sb ct"
       "sb ct"
       "ad ft"
       ;
    }
    @media (min-width: ${md}){
        grid-template-columns: 1fr 4fr 1fr;
        grid-template-areas: 
       "hd hd hd"
       "nv ct sb"
       "nv ct sb"
       "nv ct ad"
       "nv ct ad"
       "ft ft ft";
    }
`;

export const Head = styled.header`  //상속 
    grid-area: hd;
    color:#fff; font-size:1.5rem;
    background-color:#333;
    margin: 0;
    display: flex;   //정렬!!!!
    align-items: center;  //세로가운데정렬 
    padding-left: 20px; //왼쪽여백
    /* gap: 10px;           로고와 글자 사이 간격 */

`;

export const Nav = styled.nav`
    grid-area: nv;
    ul{
        list-style: none;
        margin:0; padding:0;

        @media (min-width: ${sm}){
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        @media (min-width: ${md}){
            flex-direction: column;
        }
    }
    @media (min-width: ${md}){
        /* grid-column: 1 / 2;
        grid-row : 2/3; */
    }
`;
// nav ul li a 대신에 리액트 라우터 link 스타일링

export const StyledLink = styled(Link)`
    color:blue;
    text-decoration: underline;
    display: inline-block;
    padding: 2px 0;
`;
//가운데 라우터가 교체될 본문 영역 !
export const Content = styled.div`
    grid-area: ct;
    @media ( min-width : ${sm} ){
        /* grid-column:  4 / span 9; */

    }
    @media ( min-width : ${md} ){
        /* grid-column:  3 / span 8;
        grid-row : 2 / 4; */
    }
`;


export const SideBar = styled.div`
    grid-area: sb;

     @media ( min-width : ${sm} ){
        /* grid-column:   1 / span 3;
        grid-row: 3; */

    }
    @media ( min-width : ${md} ){
        /* grid-column: 11/ span 2;
        grid-row : auto; */
    }
`;

export const Ads = styled.div`
    grid-area:ad;

     @media ( min-width : ${sm} ){
        /* grid-column: 1 / span 3;
        grid-row: 4; */

    }
    @media ( min-width : ${md} ){
        /* grid-column:  11 / span 2;
        grid-row: 2 / 3 */
        
    }
`;

export const Footer = styled.div`
    grid-area: ft;
      @media ( min-width : ${sm} ){
        /* grid-column: 4 / span 9;
        grid-row: 4; */

    }
    @media ( min-width : ${md} ){
        /* grid-column:  1 / span 12; */

    }
`;


/*
//1.전체 내비게이션 바 컨테이너
export const NavBar = styled.nav`
background-color:#333;
padding:1rem 2rem;
display:flex;
justify-content:space-between;
align-items:center;

    ul{
    list-style:none; margin:0; padding:0;

    @media (min-width: ${sm}) {
        display:flex; justify-content:space-between;
    }

    @media (min-width: ${md}) {
        flex-direction: column;
    }
}     

    //태블릿 PC환경에서 네비게이션 바 배치 위치
    @media (min-width: ${md}) {
    grid-column : col-start / span 2;
    grid-row: 2 / 4
    }
    `;

//2.로고 스타일
export const Logo = styled.h1`
color:#fff; margin:0; font-size:1.5rem;
`;

//3.메뉴 링크들을 담는 박스
export const NavLinks = styled.div`
display:flex; gap:20px;
`;

export const StyledLink = styled(Link)`
color:#aaa; 
text-decoration:none;
font-size:1.1rem; 
font-weight:bold;
transition: color 0.2s ease-in-out;

 &:hover{ color: #fff; }
`;

export const Content = styled.main`
    @media (min-width: ${sm}) {
        grid-column: col-start 4 / span 9;
    }
    @media (min-width: ${md}) {
        grid-column: col-start 3 / span 8;
        grid-row: 2 / 4;
    }
`;

export const Sidebar = styled.aside`
@media (min-width: ${sm}) {
 grid-column: col-start / span 3;
 grid-row: 3;
}
@media (min-width: ${md}) {
    grid-column: col-start 11 / span 2;
    grid-row: auto;
}
`;

export const Ads = styled.div`
@media (min-width: ${sm}) {
    grid-column: col-start / span 3;
}
@media (min-width: ${md}) {
   grid-column : col-start 11 / span 2;
}
`;

export const Footer = styled.footer`
@media (min-width: ${sm}) {
    grid-column: col-start 4 / span 9;
}
@media (min-width: ${md}) {
    grid-column: col-start / span 12;
}
`;


//5
export const PageContainer = styled.div`
padding:2rem; text-align:center; 
font-family:sans-serif;
`;

*/