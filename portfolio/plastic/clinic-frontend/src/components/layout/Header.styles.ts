'use client'
import { BoxShadow2, BoxShadowPressed } from "@/assets/css/common/Common.style";
import styled from "styled-components";

export const HeaderWrapper= styled.header`
width: 100%;
background-color: #fff;
border-bottom: 1px solid #f0f0f0;
position: fixed; 
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
min-width: 0;


`;
export const Logo = styled.h1`
 font-family: 'Times New Roman', serif;
 font-size: 34px;
 color: #3e2723;
 margin: 0;
 cursor: pointer;

 flex-shrink: 0;
 

`; 

export const LogoImg = styled.img`
height:40px; //고정안해주면 svg 0으로..안나오게됨
max-height:40px;
width: auto; //비율유지
object-fit: contain;
`;
//중앙네비게이션 그룹
export const NavGroup= styled.nav`
display: flex;
align-items: center;
justify-content: center; // 내부 요소(아이템)들을 중앙으로
gap: 40px;
flex: 2; // 👈 여기가 핵심! 공간을 1만큼 차지함
white-space: nowrap;

@media (max-width: 1200px) {
    gap: 24px;
}
@media (max-width: 1024px){
    display: none;
}
/* text-align: center; */

`;
export const NavItem = styled.span<{
    $active?:boolean, 
    $themeColor?: string; 
    $isDark?: boolean;}>`

font-size: 16px;
font-weight: bold;
cursor: pointer;
/* 활성화되었을 때 테마 컬러를 쓰거나, 
아니면 다크모드에 맞는 기본 텍스트 색상 사용 */
color: ${props => props.$active ? props.$themeColor : (props.$isDark ? '#f1f1f1' : '#111111')};

/* 활성화되었을 때 밑줄도 테마 컬러로 동적 적용 */
border-bottom: ${props => props.$active ? `2px solid ${props.$themeColor}` : '2px solid transparent'};
padding-bottom: 5px;
transition: all 0.2s ease-in-out;

&:hover {
    /* 호버했을 때도 고정된 파란색 대신 테마 컬러나 포인트 컬러로 반응하도록 설정 */
    color: ${props => props.$themeColor};
    opacity: 0.5;
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
    ${BoxShadow2}
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
justify-content: flex-end;
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