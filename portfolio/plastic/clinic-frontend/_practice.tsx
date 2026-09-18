import React, { useState } from "react";
import * as S from '@/assets/css/popup.styles';

interface PopupProps {
    isopen: boolean;
    title: string;
    onclose: ()=>void;
    children:React.ReactNode;
    onConfirm?: ()=>void;
}

export default function Popup(props:PopupProps){

    const {isopen, title, onclose, onConfirm,children}=props;
    
    if(!isopen) return null;

    return(
        <>
        <S.PopupOverlay onClick={onclose}>
            <S.PopContainer onClick={e=>e.stopPropagation()}>
                <S.PopHeader>
                    <S.PopTitle>{title}</S.PopTitle>
                    <S.CloseIcon>&times;</S.CloseIcon>
                </S.PopHeader>
            </S.PopContainer>

        </S.PopupOverlay>
        </>
    )
}