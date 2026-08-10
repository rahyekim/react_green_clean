'use client'

import React from 'react';
// ✅ 올바른 Next.js Link 임포트
import Link from 'next/link';

import * as S from './Sidebar.styled';

export const Sidebar:React.FC = () => {
    return(
        <>
<S.SidebarContainer 
className='sidebar sidebar-dark accordion'
>
    <S.SidebarBrand href="/">
    <div className='sidebar-brand-icon rotate-n-15'>
        <i className='fas fa-laugh-wink'></i>
    </div>
    <div className='sidebar-brand-text mx-3'>
        Admin <sup>2</sup>
    </div>
    </S.SidebarBrand>
    <S.Divider className='my-0'/>

    {/* 1. 대시보드 (메인) 링크 */}
                <S.NavItem className='active'>
                    <S.NavLink href="/admin">
                        <i className='fas fa-fw fa-tachometer-alt'></i>
                        {/* 메뉴 이름 추가 */}
                        <span>Dashboard</span>
                    </S.NavLink>
                </S.NavItem>

                <S.Divider/>

                {/* 2. 회원 리스트 링크 추가 */}
                <S.NavItem>
  
                    <S.NavLink href="/userlist">
                        <i className='fas fa-fw fa-users'></i>
                        <span>User List</span>
                    </S.NavLink>
                </S.NavItem>

                <S.NavItem>
  
                    <S.NavLink href="/headersetting">
                        <i className='fas fa-fw fa-users'></i>
                        <span>헤더/nav 설정</span>
                    </S.NavLink>

                    <S.NavLink href="/headersetting">
                        <i className='fas fa-fw fa-users'></i>
                        <span>헤더/nav 설정</span>
                    </S.NavLink>

                </S.NavItem>

</S.SidebarContainer>
        </>
    )
}