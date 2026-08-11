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
                    <i className="fas fa-paw"></i> 
                </div>
                    {/* right 브랜드text자리 */}
                <div className="sidebar-brand-text mx-3">
                    Admin
                </div>
            </SideBarBrand>

            <Divider className="my-0"/>

            <NavItem className="active">
                <NavLink href="/admin">
                    <i className="fas fa-fw fa-home me-2"></i>
                    <span>DashBoard</span>
                </NavLink>
            </NavItem>

            <Divider className="my-0 mb-2"/>

            {/*  */}
             <NavItem className="active">
                <NavLink href="/admin/pick">
                    <i className="fas fa-fw fa-heart me-2"></i>
                    <span>추천동물 설정</span>
                </NavLink>
            </NavItem>
            {/*  */}
             <NavItem className="active">
                <NavLink href="/">
                    <i className="fas fa-fw fa-cat me-2"></i>
                    <span>냥</span>
                </NavLink>
            </NavItem>
           
             <NavItem className="active">
                <NavLink href="/">
                    <i className="fas fa-fw fa-dog me-2"></i>
                    <span>멍</span>
                </NavLink>
            </NavItem>

            <NavItem className="active">
                <NavLink href="/">
                    <i className="fas fa-fw fa-cog me-2"></i>
                    <span>설정</span>
                </NavLink>
            </NavItem>

             <NavItem className="active">
                <NavLink href="/">
                    <i className="fas fa-fw fa-dove me-2"></i>
                    <span>설정</span>
                </NavLink>
            </NavItem>

             <NavItem className="active">
                <NavLink href="/">
                    <i className="fas fa-fw fa-carrot me-2"></i>
                    <span>설정</span>
                </NavLink>
            </NavItem>

              <NavItem className="active">
                <NavLink href="/">
                    <i className="fas fa-fw fa-bone me-2"></i>
                    <span>설정</span>
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