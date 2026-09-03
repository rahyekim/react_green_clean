'use client'
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import React from "react";
import * as S from '@/assets/css/LayoutWrapper.style'


export default function ConditionalLayout ({children}:{children:React.ReactNode}){

    const pathname = usePathname();

    const hiddenPaths = ['/','/member','/find-id','/forgot'];
    const isHidden = hiddenPaths.includes(pathname);

    return(
            <S.PageWrapper>
                {!isHidden && <Header/>}
                <S.MainContent>  {/*flex:1*/}
                    {children}
                </S.MainContent>
                {!isHidden && <Footer/>}
            </S.PageWrapper>
    )
}
