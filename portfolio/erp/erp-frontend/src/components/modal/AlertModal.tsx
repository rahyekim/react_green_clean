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
            setIsClosing(false);  //다음에 열 때 상태를 초기화해 주는 역할 (부드러운 UX)
        }
    },[isOpen])

    //애니메이션 재생 시간을 확보
    const handleConfirm = ()=>{   
        setIsClosing(true);  // =>애니메이션을 fadeOut으로 변경!
        //2. 0.3초(애니메이션 재생 시간) 기다렸다가 진짜로 모달 닫기
        setTimeout(()=>{
            onConfirm();
        }, 300)
    }

    if(!isOpen) return null;

    return(
        <S.ModalOverlay>
            <S.ModalBox $isClosing={isClosing}>
                <S.ModalText>{message}</S.ModalText>
                <Button
                variant='secondary'
                size='sm'
                onClick={handleConfirm}
                fullWidth
                >확인</Button>
            </S.ModalBox>
        </S.ModalOverlay>
    )
}

