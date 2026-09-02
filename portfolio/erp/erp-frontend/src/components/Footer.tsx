'use client'
import * as S from '@/assets/css/HeaderFooter.style';

export default function Footer(){

    return(
        <S.FooterContainer>
            <p> &copy; {new Date().getFullYear()} ERP SYSTEM. All Rights Reserved.</p>
        </S.FooterContainer>
    )
}