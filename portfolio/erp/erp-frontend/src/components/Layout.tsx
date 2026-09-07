'use client'

import React from "react"
import { usePathname } from "next/navigation"

import { Top } from "./Top"
import { Sidebar } from "./Sidebar"
import Header from "./Header"
import Footer from "./Footer"
import * as S from '@/assets/css/Layout.styles'

interface LayoutProps{
    children: React.ReactNode;
}

export default function Layout({children}:LayoutProps){
    

    return(
        <S.PageWrapper>
            <S.TopArea>
                <Top/>
                <Header/>
            </S.TopArea>

            <S.MainContent>
                <S.LnbWrapper>
                    <Sidebar/>
                </S.LnbWrapper>

                <S.ContentArea>
                    {children}
                </S.ContentArea>
            </S.MainContent>

            <Footer />
        </S.PageWrapper>
    )
}

