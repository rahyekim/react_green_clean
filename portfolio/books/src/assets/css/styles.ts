
import styled, {createGlobalStyle, css} from 'styled-components'
import {Card, Nav, Form, Navbar , Button, Container, Row, Col } from 'react-bootstrap'

//무료 아이콘 라이브러리 npm install lucide-react

import {Search} from 'lucide-react';

//---1. Global styles--- 전역

export const GlobalStyle = createGlobalStyle`

:root{
    --primary-color: #646cff;
    --banner-bg: #81e6d9;
    --hover-card-bg: #f8f9fa;
    --text-main: #333;
    --text-muted: #6c757d;
}

body{
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 
    'Segoe UI',Roboto, Helvetica, Arial , sans-serif;

    color: var(--text-main);
    background-color: #fff;
    margin: 0;
    //폰트 더 부드럽고 보기 좋게 랜더링..
    -webkit-font-smoothing : antialiased;  /* 크롬, 사파리 */
    -moz-osx-font-smoothing: grayscale;    /* 파이어폭스(macOS) */

    a{
        text-decoration: none;
        color:inherit;
    }

    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }

    /* Bootstrap Carousel의 아래쪽 동그라미(인디케이터)를 꾸미는 CSS */
    .carousel-indicators [data-bs-target]{
        width:10px; 
        height: 10px; 
        border-radius: 50%; //원(●)
        background-color: rgba(0,0,0,.2);
    }
    .carousel-indicators .active {
        background-color: #fff;
    }

    .carousel-control-prev-icon, 
    .carousel-control-next-icon { filter: invert(1); } //invert 100: 반전색..대조효과줌..

    .carousel-control-prev {
    left: -30px; /* 바깥쪽으로 더 밀어내기 */
    opacity: 0.2;
    }
    
    .carousel-control-next {
    right: -30px; /* 바깥쪽으로 더 밀어내기 */
    opacity: 0.2;
    }
}

`;

//-----common

export const SectionTitle = styled.h2`

font-size: 3rem;
font-weight: 700;
margin-bottom: 30px;

@media (max-width: 768px) { font-size:1.5rem ; margin-bottom:20px;}
`;

export const BookCard = styled(Card)`

border: none;
border-radius: 12px;
overflow: hidden;
transition: transform 0.2s, box-shadow 0.2s;
background-color: var(--hover-card-bg);
height: 100%;
&:hover{
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,.5);
}

@media (max-width:768px){
    margin-bottom: 15px;
}
`;

export const BookImg = styled.div<{ $bg: string}>`

height: 250px;
background-image: url(${props=> props.$bg});  
background-size: contain;
background-position: center;
background-repeat: no-repeat;
margin: 20px;

@media (max-width: 768px){
    height: 200px;
}
`;


export const BookTitle = styled(Card.Title)`

font-size: 1rem;
font-weight: 600;
margin-top: 10px;
text-align: center;
`;

//모바일에서 옆으로 넘겨 볼 수 있는 탭 UI👍
export const TabNav = styled(Nav)`

margin-bottom: 20px;
flex-wrap: nowrap;   //탭들이 다음 줄로 내려가지 않음
overflow-x: auto;     // 가로스크롤
white-space: nowrap;  //텍스트 줄바꿈 금지
&::-webkit-scrollbar{display:none;}   //Chrome/Safari에서 스크롤바 숨김

.nav-link{
    color: var(--text-muted);
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid transparent;
    &.active{
        color: #fff;
        background-color: #333;
        border-color: #333;
    }
    &:hover:not(.active){background-color:#eee;}
    /* 마우스를 올렸고 (:hover)
    active가 아닌 것만 (:not(.active)) */
}

`;

//---header

export const StyledHeader = styled.header`
border-bottom: 1px solid #eee;
padding:10px 0;

`;

export const HeaderLogo = styled(Navbar.Brand)`
font-size: 1.5rem;
font-weight: 800;
color: #333;
&:hover{color: #555;}  
`;

export const SearchForm = styled(Form)`
position: relative;
width: 300px;

@media (max-width: 992px){
    width:100%;
    margin: 10px 0;
}

.form-control{   ////<FormControl/>
    border-radius: 20px;
    padding-right: 40px; 
}
`;

export const SearchIcon = styled(Search)`

position: absolute;
right: 12px;
top: 50%;
transform: translateY(-50%);
color: #aaa;
cursor: pointer;
`;

// ---- Main banner
export const BannerSilde = styled.div<{$bg: string}>`
background-color: ${props=>props.$bg};
height: 400px;
display: flex;
align-items: center;
position: relative;
overflow: hidden; /* 요소가 밖으로 삐져나가지 않도록 방지 */

@media (max-width:992px){
    height: 350px;
}

@media (max-width:768px){
    height: 300px;
}
`;

export const BannerContent = styled(Container)`
display: flex;
align-items: center;
justify-content: space-between;
height: 100%;
`;

export const BannerText =styled.div`
max-width: 50%;
color: #333;
z-index: 2; /* 이미지보다 위에 오도록 설정 */

.category-badge{
    background-color: #333 ;
    color: #fff;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
    display: inline-block;
    margin-bottom: 15px;
}

h1{
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 15px;
    line-height: 1.2;
}

p{
    font-size: 1.2rem;
    color: #555;
}
.view-more{
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
    display: inline-flex;
    align-items: center;
    gap:5px;

    &:hover{
    text-decoration: underline;
}
}



@media (max-width: 992px){
    max-width: 100%;
    h1{ font-size: 2rem;}
    p {font-size: 1rem;}
}

@media (max-width: 768px){
    h1{
        font-size: 1.6rem;
    }
}
`;

export const BannerBookImg = styled.div`
display: flex;
gap:15px;
height: 80%;
img { 
    height: 100% ;
    object-fit: contain;
}

@media (max-width: 992px){
    display: none;
}
`;

export const BannerPerson = styled.div`
position: absolute;
right: 10%;
bottom: 0;
height: 90%;
overflow: hidden;
img{
    height: 100%;
    object-fit: contain;
}
@media (max-width: 992px){
    opacity: 0.3;
    right: 0;
    height: 100%;
}
`;

//---Quick Menu

export const QuickMenuSection = styled.section`
padding: 40px 0;
text-align: center;

@media (max-width: 768px){
    padding: 20px 0;
}

`;

export const QuickMenuMenu = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
color: var(--text-main);
transition: color 0.2s;
cursor: pointer;
margin-bottom: 15px;
`;


// ----Green pick 

export const HashTagList = styled.div`
display: flex;
gap:10px;
flex-wrap: wrap;
margin-bottom: 30px;
.hashtag{
    background-color: #333;
    color: #fff;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    &:hover{background-color: #555;}

    @media (max-width: 768px){
        padding: 6px 12px;
        font-size:0.8rem;
    }
}
`;

// ---best seller 

export const BestSellerItem = styled(Row)`
align-items: center;
margin-bottom: 20px;

@media (max-width: 768px){
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;
}

`;
export const BestSellerRank = styled.div`
font-size: 2rem;
font-weight: 800;
color: var(--primary-color);
text-align: center;

@media (max-width: 768px){
    font-size: 1.5rem;
}
`;
export const BestSellerBookTitle = styled.div`

font-size: 1.5rem;
font-weight: 600;

@media (max-width: 768px){font-size:1rem;}
`;
export const BestSellerTag = styled.div`
display: flex;
gap:5px;
span{
    background-color: #eee;
    color: #666;
    padding: 2px 8px;
    border-radius: 5px;
    font-size: 0.8rem;
}
`;


// ---youtube

export const YoutubeCard = styled(Card)`
border: none;
border-radius: 12px;
overflow: hidden;
position: relative;
height: 250px;
transition: transform 0.2s;
&:hover{
    transform: scale(1.03);
}

`;
export const YoutubeThumbnail = styled.div<{ $bg : string}>`
height: 100%;
background-image: url(${props=> props.$bg});
background-position: center;
background-size: cover;
`;
export const YoutubeText = styled.div`
position: absolute;
bottom:0; left: 0; right: 0;
padding: 15px;
background: linear-gradient(to top, rgba(0,0,0,.8),
rgba(0,0,0,0));
color:#fff;
.yt-category{
    font-size: 0.8rem; opacity:0.8; 
    margin-bottom: 5px;
}
.yt-title{
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.3;
}
`;
export const YoutubeSectionNav = styled.div`
display: flex;
gap:5px;
color: #aaa;
svg{cursor: pointer;
    &:hover{
        color: #333;
    }
}
`;

// --event

export const EventSectionNav = styled.div`
color: #aaa;
cursor: pointer;
&:hover{
    color: var(--primary-color);
}


`;
export const EventItem = styled(Row)`
padding: 15px 0;
border-bottom: 1px solid #eee;
cursor: pointer;
transition: background-color 0.3s;
&:hover{
    background-color: #fbfbfb;
}
`;
export const EventBadge = styled.span<{$type: string}>`
display: inline-block;
padding: 3px 8px;
border-radius: 5px;
font-size: 0.75rem;
font-weight: 600;
${props=> props.$type === "채널" && css `
background-color:#e3f2fd; 
color: #1565c0;
`}
${props=> props.$type === "해외" && css `
background-color:#e8f5e9; color: #2e7d32;`}
${props=> props.$type === "라인업" && css `
background-color:#fff3e0; color: #ef6c00;`}
`;

export const EventTitle = styled.div`
font-size: 1rem;
font-weight: 500;
margin-top: 5px;
`;
export const EventDate = styled.div`
font-size:0.8rem; color:#999;
`;

// --community
export const CommunityButton = styled(Button)`
border-radius: 10px;
border: 1px solid #eee;
background-color: #fff;
color: #333;
padding: 15px 20px;
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
font-weight: 600;
transition: background-color 0.2s, border-color 0.2s;
&:hover{
    background-color: #fafafa;
    border-color: #ddd;
    color: #333;
}
.icon-text {
    display: flex;
    align-items: center;
    white-space: nowrap; //글씨 줄바꿈 x
    min-width: 0; /* flex 자식의 너비 줄어듦 한계 해제 */

    gap:10px;
    svg{
        width: 24px;
        height: 24px;
        flex-shrink: 0; 
        /* [추가] 아이콘이 찌그러지지 않도록 고정 */
    }
}


`;
//---footer
export const StyledFooter = styled.footer`
background-color: #f8f9fa;
padding: 50px 0;
color: #666;
border-top: 1px solid #eee; /* 푸터 상단 구분을 위한 연한 라인 */
`;
export const FooterLinkList = styled.ul`
display: flex;
gap: 20px;
margin-bottom: 30px;

@media (max-width: 768px){
        flex-wrap: wrap;
        gap: 10px;
    }

li{
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    &:hover{
        color: #333;
    }
   
}
`;
export const FooterCompanyInfo = styled.div`
font-size: 0.85rem;
line-height: 1.6;
.footer-log{
    font-size: 1.3rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
}
`;
export const  FooterSnsIcons = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 150px;

gap: 15px;
svg{
    width: 22px;
    height: 22px;
    color: #777; /* 기본 색상을 연한 회색으로 통일 */
    cursor: pointer;
    &:hover{
        color: #555;
        transform: translateY(-2px);
    }
}

`;

//--Floating Button (맨위로 올려주는버튼)

export const FloatingBtn = styled.button`
position: fixed;
bottom: 30px; right: 30px; //화면아래 고정

width: 70px;
height: 70px;
border-radius: 50%;  //원형만들기

background-color: #fff; 
color: var(--primary-color);
border: 2px solid var(--primary-color);

display: flex;           //↑  세로
flex-direction: column;  //top
align-items:center;
justify-content:center;
gap: 3px;

transition: transform 0.2s, background-color 0.2s;
&:hover{
    transform: scale(1.05);
    background-color: #f0f8ff;
}


font-size: 0.8rem;
font-weight: 600;
box-shadow: 0 5px 15px rgba(0,0,0,.1); // 버튼 살짝 떠잇는 느낌

svg{  //lucide아이콘 <ArrowUp /> 
    width: 28px;
    height: 28px;
    stroke-width: 1.5;  ////선굵기
}
`;











