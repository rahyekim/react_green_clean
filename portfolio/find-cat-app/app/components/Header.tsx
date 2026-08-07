'use client'

import React from 'react'
import * as S from  '../../css/style.styled'

//밖에서 받아올 데이터(Props)정의

interface HeaderProps{
    title: string;
    onBackClick?: ()=>void;
}

export default function Header({title, onBackClick}:HeaderProps){

    const handleBack = ()=>{
        if(onBackClick){
            onBackClick();
        }else{
            window.history.back();
        }
    }
    return(
        <>
        <S.TopFlexBasic>
            {/* 뒤로가기 */}
            <S.Back
            onClick={handleBack}
            >&lt; 뒤로
            </S.Back>
            <S.H5Bold>{title}</S.H5Bold>
            <S.None/> 
            {/* None:회원가입 center로 미는 용도 */}
        </S.TopFlexBasic>
        </>
    )
}