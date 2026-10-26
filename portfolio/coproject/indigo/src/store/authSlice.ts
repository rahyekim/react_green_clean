import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    token: string | null,
    isAuthenticated: boolean;
    userName?: string | null;
  
}

const initialState : AuthState = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    // 새로고침해도 userName이 유지되도록 로컬스토리지에서 가져오기
    userName: localStorage.getItem('userName'),
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setLogin:(state, action:PayloadAction<{token:string, userName?:string}>)=>{
            state.token = action.payload.token;
            state.isAuthenticated =true;
            if(action.payload.userName){
                state.userName = action.payload.userName;
                localStorage.setItem('userName', action.payload.userName);
            }
            localStorage.setItem('token', state.token)
        },
        setLogout:(state)=>{
            state.token=null;
            state.isAuthenticated=false;
            state.userName =null;
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
        },
    }
})


export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;