'use client'

import * as S from '@/assets/css/Common.style'

export const Footer = ()=>{
    return(
        <S.FooterContainer>
            <p>&copy; {new Date().getFullYear()} MES System. All Rights Reserved.</p>
        </S.FooterContainer>
    )
}