'use client';

import {useState, useEffect} from 'react';

import * as S from './Alert.style';
import Button from '@/ui/Button';

interface AlertProps{
    isOpen: boolean;
    message: string;
    onConfirm: ()=>void;
}
export default function AlertModal({ isOpen, message, onConfirm}:AlertProps){

    const [isClosing, setIsClosing] = useState(false);

    useEffect(()=>{
        if(isOpen){
            setIsClosing(false); //다음에 열때 상태 초기화
        }
    }, [isOpen])

    //애니메이션 재생시간 확보
    const handleConfirm = ()=>{
        setIsClosing(true); //애니메이션 fadeout시작

        setTimeout(() => {
           onConfirm();
        }, 300);
    }

    if(!isOpen) return null;

    return(
        <S.ModalOverlay $isClosing={isClosing}>
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