'use client'

import React from "react"
import * as S from '@/assets/css/Style.style'

interface  ModalProps{
    isOpen: boolean;
    onClose: ()=> void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({isOpen, onClose, title, children}: ModalProps){

    if(!isOpen) return null;

    //event전파금지 e.stopPropagation
    return(
        <S.ModalOverlay onClick={onClose}>
            <S.ModalContainer onClick={(e)=>e.stopPropagation}>
                <S.ModalHeader>
                    <S.ModalTitle>{title}</S.ModalTitle>
                    <S.CloseButton onClick={onClose}>X</S.CloseButton>
                </S.ModalHeader>
                
                <S.ModalBody>{children}</S.ModalBody>
            </S.ModalContainer>
        </S.ModalOverlay>
    )
}