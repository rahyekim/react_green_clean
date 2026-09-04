'use client'

import styled from "styled-components"
import Link from "next/link"

// 헤더
export const HeaderContainer= styled.header`
display: flex;
justify-content: space-between; //로고-------햄버거
align-items: center;
padding: 0 1.5rem; //0 24px;
height: 4rem; //60px;

background-color: #1e293b;
color: #eee;
box-shadow: 0 4px 4px rgba(0,0,0,.1);
position: relative;

`;
export const Logo= styled.div`
font-size: 1.5rem;
font-weight: 700;
letter-spacing: -0.5px;
cursor: pointer;
white-space: nowrap;
`;


export const DesktopNav= styled.nav`
display: flex;
gap:  2.285rem; //31px;
white-space: nowrap;

@media (max-width: 768px){
  display: none;
}
`;

export const NavLink= styled.a`
color: #cbd5e1;
text-decoration: none;
font-size: 1rem;
font-weight: 500;
transition: color 0.2s ease-in-out ;

&:hover{
    color: #fff; 
}
`;

export const UserSection= styled.div`
display: flex;
align-items: center;
gap: 16px; 
white-space: nowrap;
@media (max-width: 768px){
    display: none;
}

`;
export const LogoutBtn= styled.button`
background-color: #ef4444;
color: white;
border: none;
padding: 6px 12px;
border-radius: 4px;
font-weight: bold;
font-size: 0.875rem;
cursor: pointer;

transition: background-color 0.3s;
&:hover{
    background-color: #dc2626;
}
`;

export const MobileMenuToggle= styled.button`
display: none;
background: transparent;
border: none;
color: white;
font-size: 1.75rem;
cursor: pointer;

@media (max-width: 768px){
    display: block;
}

`;

export const MobileNav= styled.nav<{$isOpen:boolean}>`
display: flex;
flex-direction: column;
position: absolute;
top: 55px; //64px
left: 0;
width: 100%;

/* top: 100%;
right:0;
max-width: 100px;
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px; */

background-color: #334155;
//양옆 패딩은 유지해야 사라질때 이상없음
padding: ${({$isOpen})=>$isOpen ? '16px 24px' : '0 24px'};
max-height: ${({$isOpen})=>$isOpen ? '300px': '0'};
overflow: hidden;
min-width:0;
box-shadow: 0 4px 6px rgba(0,0,0,.1);

transition: all 0.3s ease-in-out;
z-index: 9999;
//나자신(&) 아래 직계자식 a
& > a{
    padding: 11px 0; 
    border-bottom: 1px solid #475569;
    color: #eee;
    text-decoration: none;
    font-weight: 500;
}

& > a:last-child{
    border-bottom: none;
}

//x(엑박)를 안눌러도 화면이 커지면 사라지게...
@media (min-width: 768px){
    display: none;
}
`;

//푸터
export const FooterContainer= styled.footer`
background: #f8fafc;  
border-top: 1px solid #e2e8f0; 
color: #64748b;
padding: 1.5rem 2.285rem;

display: flex;
flex-direction: column;
align-items: center;
gap: 1.14rem;

@media (min-width: 768px){
    flex-direction: row;
    justify-content: space-between;
}

`;

export const FooterInfo= styled.div`
font-size: 0.875rem;
text-align: center;
line-height: 1.5;

@media (min-width: 768px){
    text-align: left;
}

`;
export const FooterLinks= styled.div`
display: flex;
gap: 16px;
font-size: 0.875rem;

a{
    color: #475569;
    text-decoration: none;
    transition: color 0.2s;

    &:hover{
        color: #0f172a;
        text-decoration: underline;
        text-underline-offset: 2px;
    }
}




`;
// export const = styled.div``;
// export const = styled.div``;