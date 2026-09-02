import { Navigate, replace, useNavigate } from "react-router-dom";
import { Temporal } from "@js-temporal/polyfill";
import { Children, use, useState } from "react";



export default function ProtectedRoute({children}:{}){


   const userName =localStorage.getItem('userName')
   const expiryStr = localStorage.getItem('loginExpiry')

   if(!userName || !expiryStr){
      alert('')
      return <Navigate to='/login' replace/>
   }

   try{
      const expiryTime = Temporal.Instant.from(expiryStr)
      const now = Temporal.Now.instant();
      if(Temporal.Instant.compare(now,expiryTime)>=0){
         alert("세션만료 안전을위해")
         localStorage.removeItem('userName')
         localStorage.removeItem('loginExpiry')
         return <Navigate to='/login' replace/>
      }
   }catch(err){
      localStorage.removeItem('username')
      localStorage.removeItem('loginExpiry')
      return <Navigate to='/login' replace/>
   }

   return <>{children}</>   
   
   
}