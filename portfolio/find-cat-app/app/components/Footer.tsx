'use client'

import React from 'react'
import Link from 'next/link' //🌟
import { usePathname } from 'next/navigation';

import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import CampaignIcon from '@mui/icons-material/Campaign';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import * as S from '../../css/style.styled'

export default function Footer (){

    const pathname = usePathname(); // 현재 URL 주소를 가져와 (예: '/mypage')
    return(
        <>
        <S.BottomNav>
            <Link href='/'>
                <S.NavItem $active={pathname==='/'}>
                <HomeIcon/>
                <span>홈</span>
                </S.NavItem>
             </Link>
        
            <Link href='/shelter'>
                <S.NavItem>
                <PetsIcon/>
                <span>보호소</span>
                </S.NavItem>
            </Link>
            <Link href="/missing">
                <S.NavItem>
                <CampaignIcon/>
                <span>실종/제보</span>
                </S.NavItem>
            </Link>

            <Link href="/story">
                <S.NavItem>
                <MenuBookIcon/>
                <span>스토리</span>
                </S.NavItem>
            </Link>

            <Link href='/mypage'>
                <S.NavItem  $active={pathname==='/mypage'}>
                <PersonOutlineIcon/>
                <span>마이메뉴</span>
                </S.NavItem>
            </Link>
        </S.BottomNav>
        
        </>
    )
}