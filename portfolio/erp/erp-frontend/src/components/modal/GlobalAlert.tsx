'use client';

import { AlertModal } from "@/components/modal/AlertModal";
import { useAlertStore } from "@/store/useAlertStore";

export default function GlobalAlert(){

  const {isOpen, message, onConfirm, hideAlert}= useAlertStore();

  return(
    
    <AlertModal
    isOpen={isOpen}
    message={message}
    onConfirm={()=>{

      if(onConfirm){
        onConfirm(); 
      }
      hideAlert() //모달 닫기
    }}
    />
  )
}