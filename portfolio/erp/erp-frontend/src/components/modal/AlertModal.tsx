'use client';

import {useState, useEffect} from 'react';

import * as S from './Alert.style';
import Button from '@/ui/Button';

interface AlertModalProps{
    isOpen: boolean;
    message: string;
    onConfirm: ()=> void;
}

export const AlertModal = ( { isOpen, message, onConfirm}:AlertModalProps)=>{
    
    const [isClosing , setIsClosing]= useState(false);

    useEffect(()=>{
        if(isOpen){
            setIsClosing(false);
        }
    },[isOpen])

    const handleConfirm = ()=>{
        setIsClosing(true); 
        // 1. 애니메이션을 fadeOut으로 변경!
        //2. 0.3초(애니메이션 재생 시간) 기다렸다가 진짜로 모달 닫기
        setTimeout(()=>{
            onConfirm();
        }, 300)
    }

    if(!isOpen) return null;

    return(
        <S.ModalOverlay>
            <S.ModalBox>
                <S.ModalText>{message}</S.ModalText>
                <Button
                variant='secondary'
                onClick={handleConfirm}
                fullWidth
                >확인</Button>
            </S.ModalBox>

        </S.ModalOverlay>
    )
}

