'use client'

import * as S from '@/assets/css/Style.style'

const NAV_MENUS = [
  { href: '/production', label: '생산관리' },
  { href: '/material', label: '자재관리' },
  { href: '/quality', label: '품질관리' },
  { href: '/equipment', label: '설비관리' },
]

const SYSTEM_MENUS = [
    { href: '/master-data', label: '기준 정보 관리' },
    { href: '/users', label: '사용자 권한 관리' },
    { href: '/settings', label: '시스템 환경 설정' },
]

export const Sidebar = ()=>{

    return(
        <S.AsideContainer>
            <S.MenuSection>
                <S.SectionTitle>ERP 업무</S.SectionTitle>
                <S.MenuList>
                    {NAV_MENUS.map(menu=>(
                        <li key={menu.href}>
                            <S.MenuItem href={menu.href}>
                                {menu.label}
                            </S.MenuItem></li>
                    ))}
                </S.MenuList>
            </S.MenuSection>

            <S.MenuSection>
                <S.SectionTitle>시스템 관리</S.SectionTitle>
                <S.MenuList>
                    {SYSTEM_MENUS.map(menu=>(
                        <li key={menu.href}>
                            <S.MenuItem href={menu.href}>
                                {menu.label}
                            </S.MenuItem></li>
                    ))}
                </S.MenuList>
            </S.MenuSection>
            
        </S.AsideContainer>
    )
}