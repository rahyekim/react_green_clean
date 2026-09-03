'use client'
import StyledComponentsRegistry from "./lib/registry";
import { Globalstyle } from "@/assets/css/Globalstyle";
import { ThemeProvider } from "styled-components";
import { theme } from "@/assets/css/theme";
import React from "react";



export default function StyledProvider ({children}:{children:React.ReactNode}){
    return(
        <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
            <Globalstyle/>
            {children}
            </ThemeProvider>
        </StyledComponentsRegistry>
    )
}