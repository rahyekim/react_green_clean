import {create} from 'zustand'

interface AlertState {
    isOpen:boolean;
    message: string;
    onConfirm?: ()=>void;
    onClose?:()=>void;
    showAlert: (message:string, onConfirm?:()=>void, onClose?:()=>void)=>void;
    hideAlert: ()=>void;
}

export const useAlertStore = create<AlertState>(set=>({
    //초기값
    isOpen: false,
    message:'',
    onConfirm:undefined,
    onClose: undefined,
    
    //💡 상태를 바꿀 때 무조건 set
    showAlert: (message, onConfirm, onClose)=> set({ 
        isOpen:true,
        message,
        onConfirm,
        onClose,
    }),
    hideAlert: ()=>set({
        isOpen:false,
        message:'',
        onConfirm: undefined,
        onClose:undefined
    }),
}))