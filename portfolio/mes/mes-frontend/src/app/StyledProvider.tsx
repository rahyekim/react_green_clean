'use client'
import StyledComponentsRegistry from "./lib/registry";
import { Globalstyle } from "@/assets/css/Globalstyle";
import { ThemeProvider } from "styled-components";
import { theme } from "@/assets/css/theme";
import React from "react";

import { useAlertStore } from "@/store/useAlertStore";
import AlertModal from "@/ui/AlertModal";

export default function StyledProvider ({children}:{children:React.ReactNode}){
    return(
        <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
                <Globalstyle/>
                {children}
                <GlobalAlert/>
            </ThemeProvider>
        </StyledComponentsRegistry>
    )
}


const GlobalAlert = ()=>{
    const {isOpen, onConfirm, message, hideAlert,onClose} = useAlertStore()
    return(
        <AlertModal
        isOpen={isOpen}
        message={message}
        onConfirm={()=>{
            if(onConfirm){
                onConfirm();
            }
            hideAlert();
        }}
        onClose={onClose}
        />
    )
}