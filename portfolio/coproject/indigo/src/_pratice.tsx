import { Navigate } from "react-router-dom";
import { Temporal } from "@js-temporal/polyfill";
import { use, useState } from "react";


export const ProtectedRoute = ({children}:{children:React.ReactNode})=>{

   const [email, setEmail]=useState(()=>{
    return localStorage.getItem('savedEmail') || ''
   })

   const [rememberme, setRememberme]=useState(()=>{
    return !!localStorage.getItem('savedEmail')
   })
    const userName = localStorage.getItem('userName');
    const expiryStr = localStorage.getItem('loginExpiry')

   if(!userName || !expiryStr){
        alert("관리자로그인")
        return <Navigate to='/login' replace/>
   }

   const expiryTime = Temporal.Now.instant().add({hours:1})
   
   localStorage.setItem('loginExpiry', expiryTime.toString())
}

