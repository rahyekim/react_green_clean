
import styled,{ createGlobalStyle, css } from "styled-components";
import { Card, Nav, Form, Button, Row, Col, Container } from "react-bootstrap";

import { Search } from "lucide-react";
import { TbBackground } from "react-icons/tb";

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
}`;

//3.subpage specific styles
export const SubPageContainer = styled(Container)`
padding: 60px 0;
//??안쪽 여백(Padding): 위/아래 30px, 좌/우 
`;

export const PageTitle = styled.h2`
text-align: center;
font-size: 2.2rem;
font-weight: 800;
margin-bottom: 30px;

@media (max-width: 768px){
    font-size: 1.8rem;
}
`;

export const LargeSearchForm = styled(Form)`
position: relative;
max-width: 600px;
margin: 0 auto 40px;

.form-control{
    border-radius: 30px;
    padding: 12px 20px;
    padding-right: 50px;
    //??(단, 우측 여백은 아이콘 자리를 위해 50px로 덮어쓰기)
    border: 1px solid var(--border-color);
    font-size: 1rem;
    box-shadow: 0 4px 12px rgba(0,0,0,.1);
}
`;

export const SearchIcon = styled(Search)`
position: absolute;
right: 12px;
top: 50%;
transform: translateY(-50%);
color: #aaa;
cursor: pointer;
`; //중복

export const  FilterBox = styled.div`
border: 1px solid var(--border-color);
border-radius: 12px;
padding: 25px 30px 15px;
margin-bottom: 20px;
background-color: #fff;

@media (max-width: 768px){
    padding: 15px;
}
`;

export const  FilterRow = styled.div`
display: flex;
margin-bottom: 15px;
align-items: flex-start;

@media (max-width: 768px){
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}
`;

export const  FilterRabel= styled.div`
width: 80px;
font-weight: 600;
color: #333;
margin-top: 8px;
flex-shrink: 0;

@media (max-width: 768px){
    width: 100%;
    margin-top: 0;
}
`;

export const  FilterOption = styled.div`
display: flex;
flex-wrap: wrap;
gap: 8px;
flex-grow: 1;
`;

export const  FilterButton = styled.button<{$active? : boolean}>`
border: none;
padding: 6px 16px;
border-radius: 4px;
font-size: 0.9rem;
font-weight: 500;

transition: all 0.2s;

background-color: #fff;
color: #555;
border: var(--border-color);

${ props=> props.$active && css `
background-color: var(--primary-color);
color:  #fff;
border:  var(--primary-color);`}

 
&:hover{
    //활성화 상태면 변경없음...
    ${ props=> props.$active === false && css `
    background-color: #c5cdd4;
    `}
}

`;

export const  FilterToggleBtn = styled.div`
text-align: center;
border-top: 1px solid #eee;
padding-top: 15px;
margin-top: 15px;
color: #666;
&:hover{
    color: #333;
}
font-size: 0.9rem;
font-weight: 500;
cursor: pointer;
`;

export const  FilterActionArea = styled.div`

display: flex;
justify-content: flex-end;
gap:10px;
margin-bottom: 50px;
`;

export const ResetButton = styled(Button)`
border: 1px solid #ddd;
border-radius: 18px;
padding: 8px 20px;
`;

export const FilterApplyButton = styled(Button)`
border: 1px solid #eee;
border-radius: 18px;
padding: 8px 20px;
`;



export const  ListHeader = styled.div`

display:flex;
justify-content: space-between;
align-items: flex-end;
border-bottom: 2px solid #222;
padding-bottom: 15px;
margin-bottom: 30px;

@media (max-width: 576px){
    flex-direction: column;
    align-items: flex-start; ///수직정렬???!!!
    gap: 15px;
}

.form-check{
    font-weight: 500;
    color: #555;
    font-size: 0.95rem;
}

`;

export const  TotalCount = styled.div`
color: #555;

span{
    color:  var(--primary-color);
    font-weight: 700;
}
`;

export const  SortOptions = styled.div`
display: flex;
gap:15px;

span{
    cursor: pointer;
    transition: transform 0.2s;
    &:hover{
        color: #333;
        transform: scale(1.05);
        
    }
}

.active{
        color: #222;
        font-weight: 700;
    }
`;

export const  BookCard = styled.div``;

export const  BookImgBox = styled.div`
background-color: var(--bg-light);
border-radius: 12px;
padding: 30px;

display: flex;
align-items: center;
justify-content: center;

transition: transform 0.3s, box-shadow 0.3s;

margin-bottom: 15px;
height: 280px;

img{
    max-width: 100%;
    max-height: 100%;

    object-fit: contain;

    box-shadow:  2px 4px 10px rgba(0,0,0,0.1);
}

@media (max-width: 768px){
    height: 220px;
    padding: 20px;
}
`;

//----pagination--------
export const  PagiContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;

gap: 8px;
margin-top: 40px;
`;

export const  PageNum = styled.button<{$active? : boolean}>`

width: 32px;
height: 32px;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
border: none;
font-size: 0.9rem;

font-weight: 500;
background-color: transparent;
color: #555;

${props=>props.$active && css`
background:  var(--primary-color);
color: #fff;
`};


&:hover:not(.active){
    background-color: #d4dce4;

}
`;













