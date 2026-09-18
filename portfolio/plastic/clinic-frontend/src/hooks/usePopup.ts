import { useState } from "react";

interface PopupConfig {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
}

export default function usePopup(){

     //💙add 커스텀 팝업관리를 위한 상태(openPopup대체용)
    const [popupConfig, setPopupConfig]=useState<PopupConfig>({
        isOpen:false,
        title:'',
        message:'',
        onConfirm:undefined as(()=>void) | undefined,
    });

    //💙 팝업 열기 함수
    const openPopup = (title:string, message:string, onConfirm?:()=>void)=>{
        setPopupConfig({
            isOpen:true,
            title,
            message,
            onConfirm
        });
    }

    //💙팝업 닫기 함수
    const closePopup =()=>{
        setPopupConfig(prev=>({...prev, isOpen:false}));
    }

    return {popupConfig, openPopup, closePopup};
    
}