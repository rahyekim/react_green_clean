'use client'
import styled from "styled-components";

export const HeaderWrapper= styled.header`
width: 100%;
background-color: #fff;
border-bottom: 1px solid #f0f0f0;
position: relative; //👈z-index활성화 용도
z-index: 999;
`;
export const HeaderInner= styled.div`
max-width: 1860px;
margin: 0 auto;
height: 90px;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 40px;

@media (max-width: 1024px){
    height: 60px;
    padding: 0 20px;
}
`;
//로고그룹
export const LogoGroup= styled.div`
display: flex;
align-items: center; 
justify-content: flex-start; // 왼쪽 정렬
flex:1; // 👈flex 1 1 0%


`;
export const Logo = styled.h1`
 font-family: 'Times New Roman', serif;
 font-size: 34px;
 color: #3e2723;
 margin: 0;
 cursor: pointer;

 flex-shrink: 0;
 

`; 
//중앙네비게이션 그룹
export const NavGroup= styled.nav`
display: flex;
align-items: center;
justify-content: center; // 내부 요소(아이템)들을 중앙으로
gap: 40px;
flex: 2; // 👈 여기가 핵심! 공간을 1만큼 차지함

white-space: nowrap;

@media (max-width: 1024px){
    display: none;
}
/* text-align: center; */

`;
export const NavItem = styled.span<{$active?:boolean}>`
font-size: 16px;
font-weight: bold;
cursor: pointer;
color: ${props=> props.$active ? '#0056b3': '#111111'};
border-bottom: ${props=> props.$active ? '2px solid #0056b3': '2px solid transparent'};
padding-bottom: 5px;
transition: all 0.2s ease-in-out;
&&:hover{
    color: #0056b3;
}
`;

export const UtilGroup= styled.div`
display: flex;
align-items: center;
justify-content: flex-end; // 오른쪽 정렬
gap: 12px;
flex: 1; // 👈

@media (max-width: 1024px){
    gap: 8px;
}
`;
export const PhoneButton= styled.a`
display: flex;
align-items: center;
height: 40px;
border: 1px solid #d1d5db;
box-shadow: 1px 1px 6px rgba(0,0,0, .1);
border-radius: 20px;

padding: 0 16px;
font-size: 14px;
font-weight: bold;
color: #111111;
text-decoration: none;

background-color: #fefefe;

transition: all .2s ease-in-out;

span{
    color: #0056b3;
    margin-left: 6px;
}

&:hover{
    box-shadow: 0 8px 12px rgba(0,0,0, .2);
}
`;
export const CtaButton= styled.button`
height: 40px;
background-color: #111;
color: #fefefe;
border: none;
border-radius: 20px;
white-space: nowrap;
padding: 0 20px;
font-size: 14px;
font-weight: bold;
cursor: pointer;
`;

export const IconButton= styled.button`
width: 40px;
height: 40px;
border-radius: 50%;
border: 1px solid #d1d5db;
background-color: #fff;

display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
color: #333;
transition: background-color .2s;

&:hover{
    background-color: #f9fafb;
}

svg{
    width: 20px;
    height: 20px;
}
`;

export const DesktopOnly= styled.div`
display: flex;
align-items: center;
gap: 12px;

@media (max-width: 1024px){
    display: none;
}
`;

//모바일 전용 둥근 라인버튼
export const MobilePillButton= styled.button`
display: none;

@media (max-width: 1024px){
    display: inline-block; // 자식들이여러개라? inline?
    height: 32px;
    border: 1px solid #111;
    border-radius: 16px;
    padding: 0 12px; 
    font-size: 13px;
    font-weight: bold;
    color: #111;
    background-color: #fff;
    cursor: pointer;
}
`;

//햄버거 버튼 
export const HamburgerButton= styled.button`
display: none;

@media (max-width:1024px){
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;

    width: 32px;
    height: 32px;
    border: none;
    background:none;
    padding: 0;
    margin-left: 8px;
    
    cursor: pointer;
    
    span{
        display: block;
        width: 22px;
        height: 2px;
        background-color: #111;
        border-radius: 1px;
    }
}
`;
// export const = styled.div``;
// export const = styled.div``;



/*
 /* 밑줄 제거 및 링크 기본 스타일 초기화 
text-decoration: none; 
  
  /* 마우스 올렸을 때도 밑줄 안 생기게 하려면 추가 
  &:hover {
    text-decoration: none;
  }

 */