'use client'
import styled from "styled-components";
import EventPopup from "@/components/EventPopup";
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation"
import React from "react"

const MainWrapper = styled.div`

`;
export default function ConditionalLayout({children}:{children:React.ReactNode}){

    const pathname = usePathname();
    const isHide = pathname.startsWith('/admin') || pathname.startsWith('/find')
    
    return(
        <>
        {!isHide && <EventPopup/>}
        {!isHide && <Header/>}
        <MainWrapper>

        </MainWrapper>
        </>
    )
}