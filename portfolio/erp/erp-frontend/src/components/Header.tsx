'use client'

import * as S from '@/assets/css/HeaderFooter.style';

export default function Header(){

    return(
        <>
        <S.HeaderContainer>
            <S.Nav>
                <S.StyledLink href='/'>Home</S.StyledLink>
            
            </S.Nav>
        </S.HeaderContainer>
        </>
    )
}