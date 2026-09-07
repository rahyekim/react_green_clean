'use client'

import styled from "styled-components"
import Link from "next/link"

// 헤더
export const HeaderContainer = styled.header`
display: flex;
justify-content: space-between;
align-items: center;

position: relative;
padding: 0 1.5rem;
height: 4rem;

background-color: #1e293b;
box-shadow: 0 4px 4px rgba(0,0,0,.1);
color: #eee;


`;

export const Logo = styled.div`
font-size: 1.5rem;
font-weight: 700;
letter-spacing: -0.5px;
cursor: pointer;
white-space: nowrap;
`;

export const DesktopNav = styled.nav`

  display: flex;
  gap:  2.285rem; //31px;
  white-space: nowrap;

  @media (max-width: 768px){
    display: none;
  }

  `;

export const NavLink = styled.a`
color: #cbd5e1;
text-decoration: none;
font-size: 1rem;
font-weight: 500;

  transition: color 0.2s ease-in-out;
  &:hover{
    color: #fff
  }

`;

export const UserSection = styled.div`

display: flex;
align-items: center;
gap: 10px;
white-space: nowrap;

   @media (max-width: 768px){
    display: none;
  }
`;

export const LogoutBtn = styled.button`
background-color: #ef4444;
color: #fff;
padding: 6px 12px;
border: none;
border-radius: 8px;
font-weight: bold;
font-size: 0.875rem;
cursor: pointer;

transition: background-color 0.2s ;
  &:hover{
    background-color: #dc2626;
  }


`;

export const MobileMenuToggle = styled.button`
display: none;
background-color: transparent;
border: none;
font-size: 1.75rem;
color: #fff;
cursor: pointer;


@media (max-width: 768px) {
    display: block;
}
`;

export const MobileNav = styled.nav<{ $isOpen: boolean }>`
display: flex;
flex-direction: column;
position: absolute;
top:100%;
left:0;
width: 100%;

background-color: #334155;
color: #111;

overflow: hidden; // 🌟 토글메뉴 닫힐때 글씨 튀어나오는거 막기

box-shadow: 0 4px 6px rgba(0,0,0,.1);
z-index: 9999;

transition: all 0.3s ease-in-out;
max-height: ${({$isOpen})=>$isOpen ? '300px' : '0'};
padding: ${({$isOpen})=>$isOpen ? '20px 24px' : '0 24px'};

//직계자식a
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

@media (min-width: 768px) {
    display: none;
}
`;

// 푸터
export const FooterContainer = styled.footer`
background-color: #eee;
border-top: 1px solid #ddd;
color: #64748b;
padding: 1.5rem 2.285rem;

display: flex;
justify-content: space-between;
align-items: center;

@media (max-width: 768px){
    flex-direction: column;
    gap: 1.14rem;

}

`;

export const FooterInfo = styled.div`
font-size: 0.875rem;
line-height: 1.5;
text-align: left;

@media (max-width: 768px){
    text-align: center;
}

`;

export const FooterLinks = styled.div`
display: flex;
gap: 12px;
font-size: 0.875rem;

  a{
    color: #475569;
    text-decoration: none;
    transition: color 0.2s ease-in-out;

      &:hover{
        color: #0f172a;
        text-decoration: underline;
      }
  }

`;