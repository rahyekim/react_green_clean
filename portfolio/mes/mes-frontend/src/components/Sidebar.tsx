'use client'

import * as S from '@/assets/css/Style.style'
import { NAV_MENUS } from '@/constants/menu'
import { SYSTEM_MENUS } from '@/constants/menu'


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