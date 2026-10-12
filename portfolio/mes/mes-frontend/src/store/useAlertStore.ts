import {create} from 'zustand'

interface AlertState {
    isOpen:boolean;
    message: string;
    onConfirm?: ()=>void;
    showAlert: (message:string, onConfirm?:()=>void)=>void;
    hideAlert: ()=>void;
}

export const useAlertStore = create<AlertState>(set=>({
    //초기값
    isOpen: false,
    message:'',
    onConfirm:undefined,

    showAlert: (message, onConfirm)=> set({ //💡 상태를 바꿀 때 무조건 set
        isOpen:true,
        message,
        onConfirm
    }),
    hideAlert: ()=>set({
        isOpen:false,
        message:'',
        onConfirm: undefined
    }),
}))