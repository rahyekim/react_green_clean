import {create} from 'zustand';


interface AlertState {
    isOpen:boolean;
    message:string;
    onConfirm?:()=>void;
    showAlert: (message: string, onConfirm?: ()=> void) => void;
    hideAlert: ()=>void;
}

export const useAlertStore = create <AlertState>(set => ({
    //초기값
    isOpen: false,
    message: '',
    onConfirm: undefined,

    //모달 열때 쓰는 함수 // 💡 상태를 바꿀 때 무조건 set을 씁니다!
    showAlert: (message, onConfirm) => set({
        isOpen:true, 
        message, 
        onConfirm}),

    //모달을 닫을때 쓰는 함수
    hideAlert: ()=> set({
        isOpen:false,
        message:'', 
        onConfirm:undefined}),
}));