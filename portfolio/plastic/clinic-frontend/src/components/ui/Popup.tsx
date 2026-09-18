'use client';

import React from 'react';
import * as S from '@/assets/css/popup.styles';

//공용으로 사용하므로 
interface PopupProps{
    isOpen:boolean; //열림 닫힘
    title:string;  //상단 제목 
    onClose:()=>void; //닫기함수
    onConfirm?:()=>void; //확인함수(옵션)
    children:React.ReactNode; //팝업 안에 들어갈 내용(message)
}
export default function Popup({
    isOpen,title,onClose,onConfirm,children}:PopupProps){

    if(!isOpen) return null; //열림상태가 아니면 랜더링 하지않음

    return(
        <>
        <S.PopupOverlay onClick={onClose}>
            <S.PopContainer
            onClick={(e)=>e.stopPropagation()}>
                <S.PopHeader>
                    <S.PopTitle>{title}</S.PopTitle>
                    <S.CloseIcon onClick={onClose}>&times;</S.CloseIcon>
                </S.PopHeader>

                <S.PopBody>
                    {children}
                </S.PopBody>

                <S.PopFooter>
                    {onConfirm ? ( //컨펌팝업(확인/취소 모두필요)
                    <> 
                    <S.CancelBtn onClick={onClose}>취소</S.CancelBtn>
                    <S.ConfirmBtn onClick={onConfirm}>확인</S.ConfirmBtn>
                    </>
                    ) : //알림 팝업(확인 버튼 하나만 필요)
                    <S.ConfirmBtn onClick={onClose}>확인</S.ConfirmBtn>
                    }
                </S.PopFooter>

            </S.PopContainer>
        </S.PopupOverlay>
        </>
    )
}