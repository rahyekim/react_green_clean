'use client'

import React from "react"
import { SideBarContainer,SideBarBrand,NavLink,NavItem,Divider } from "./Sidebar.styled"


export const Sidebar:React.FC = ()=>{


    return(
        <>
        <SideBarContainer className="sidebar sidebar-dark accordion">
            {/*메뉴 접기/펴기 동작 연결용 */}
            <SideBarBrand href="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    {/*left 아이콘자리, 아이콘 -15도 회전 */}
                    <i className="fas fa-bell"></i> {/*fontawesome아이콘*/}
                </div>
                    {/* right 브랜드text자리 */}
                <div className="sidebar-brand-text mx-3">
                    Admin<sup>2</sup>
                </div>
            </SideBarBrand>

            <Divider className="my-0"/>

            <NavItem className="active">
                <NavLink href="/admin">
                {/* <i className="fas fa-fw fa-tachometer-alt"></i> */}
                    <i className="fas fa-fw fa-home me-2"></i>
                    <span>DashBoard</span>
                </NavLink>
            </NavItem>

            <Divider className="my-0 mb-2"/>

            {/* 2.회원리스트링크추가 */}
             <NavItem className="active">
                <NavLink href="/userlist">
                    <i className="fas fa-fw fa-users me-2"></i>
                    <span>User List</span>
                </NavLink>
            </NavItem>

            {/* 3.헤더 세팅(로고 ,메뉴) 변경 페이지 */}
            <NavItem className="active">
                <NavLink href="/hdsetting">
                    <i className="fas fa-fw fa-bars me-2"></i>
                    <span>헤더nav설정</span>
                </NavLink>
            </NavItem>
             <NavItem className="active">
                <NavLink href="/bnsetting">
                    <i className="fas fa-fw fa-cog me-2"></i>
                    <span>배너 설정</span>
                </NavLink>
            </NavItem>

             <NavItem className="active">
                <NavLink href="/wesetting">
                    <i className="fas fa-fw fa-person me-2"></i>
                    <span>WeAre 설정</span>
                </NavLink>
            </NavItem>
           
             <NavItem className="active">
                <NavLink href="/wksetting">
                    <i className="fas fa-fw fa-briefcase me-2"></i>
                    <span>Work 설정</span>
                </NavLink>
            </NavItem>

             <NavItem className="active">
                <NavLink href="/blogsetting">
                    <i className="fas fa-fw fa-edit me-2"></i>
                    <span>Blog 설정</span>
                </NavLink>
            </NavItem>

             <NavItem className="active">
                <NavLink href="/contsetting">
                    <i className="fas fa-fw fa-phone me-2"></i>
                    <span>Contact 설정</span>
                </NavLink>
            </NavItem>

              <NavItem className="active">
                <NavLink href="/mapsetting">
                    <i className="fas fa-fw fa-map me-2"></i>
                    <span>Map 설정</span>
                </NavLink>
            </NavItem>

            <Divider className="mt-2"/>
        
        </SideBarContainer>
    
        </>
    )
}



/*
sidebarContainer : d-flex flex-direction:col height100%
├ sidebarbarnd> i, span z-index:1 height:70px
├ navitem(li)>navlink(a)>i 
└ divider hr

 */

// import React from 'react';
// // ✅ 올바른 Next.js Link 임포트
// import Link from 'next/link';

// import * as S from './Sidebar.styled';

// export const Sidebar:React.FC = () => {
//     return(
//         <>
// <S.SidebarContainer 
// className='sidebar sidebar-dark accordion'
// >
//     <S.SidebarBrand href="/">
//     <div className='sidebar-brand-icon rotate-n-15'>
//         <i className='fas fa-laugh-wink'></i>
//     </div>
//     <div className='sidebar-brand-text mx-3'>
//         Admin <sup>2</sup>
//     </div>
//     </S.SidebarBrand>
//     <S.Divider className='my-0'/>

//     {/* 1. 대시보드 (메인) 링크 */}
//                 <S.NavItem className='active'>
//                     <S.NavLink href="/admin">
//                         <i className='fas fa-fw fa-tachometer-alt'></i>
//                         {/* 메뉴 이름 추가 */}
//                         <span>Dashboard</span>
//                     </S.NavLink>
//                 </S.NavItem>

//                 <S.Divider/>

//                 {/* 2. 회원 리스트 링크 추가 */}
//                 <S.NavItem>
  
//                     <S.NavLink href="/userlist">
//                         <i className='fas fa-fw fa-users'></i>
//                         <span>User List</span>
//                     </S.NavLink>
//                 </S.NavItem>

//                 <S.NavItem>
  
//                     <S.NavLink href="/headersetting">
//                         <i className='fas fa-fw fa-users'></i>
//                         <span>헤더/nav 설정</span>
//                     </S.NavLink>

//                     <S.NavLink href="/headersetting">
//                         <i className='fas fa-fw fa-users'></i>
//                         <span>헤더/nav 설정</span>
//                     </S.NavLink>

//                 </S.NavItem>

// </S.SidebarContainer>
//         </>
//     )
// }