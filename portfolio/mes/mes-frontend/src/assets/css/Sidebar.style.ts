import Link from "next/link";
import styled from "styled-components";

// sidebar 내부 컴포넌트
export const AsideContainer = styled.div`
width: 100%;
height: 100%;
padding: 24px 0;

display: flex;
flex-direction: column;
background-color:#fff;
overflow: hidden;
white-space: nowrap;
`;

export const MenuSection = styled.div`
margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
color: #94a3b8;
font-size: 0.75rem;  
font-weight: 700;
margin-bottom: 5px;
padding: 0px 24px;
letter-spacing: 0.05em;
`;

export const MenuList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const MenuItem = styled(Link)`
display: block;
padding: 10px 24px;
color: #475569;
font-size: 0.95rem;
font-weight: 500;
text-decoration: none;
transition: background-color 0.2s ease, color 0.2s ease;

  &:hover{
    color: #2563eb;
    background-color: #f1f5f9;
    border-right: 3px solid #2563eb;
  }
`;


