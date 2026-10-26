import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    token: string | null,
    isAuthenticated: boolean;
    userInfo: {
        email: string;
        firstName: string;
        lastName: string;
        companyName?: string;
    } | null;
}

const initialState : AuthState = {
    token: typeof window !== "undefined" ? localStorage.getItem('token') :null,
    isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem('token') :false,
    userInfo: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setLogin:(state, action:PayloadAction<{token:string, userInfo?:any}>)=>{
            state.token = action.payload.token;
            state.isAuthenticated =true;
            if(action.payload.userInfo){
                state.userInfo = action.payload.userInfo;
            }
            localStorage.setItem('token', state.token)
        },
        setLogout:(state)=>{
            state.token=null;
            state.isAuthenticated=false;
            state.userInfo =null;
            localStorage.removeItem('token');
        },
    }
})


export const { setLogin, setLogout} = authSlice.actions;

export default authSlice.reducer;