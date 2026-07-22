import React from "react";
import { TopBar } from "./component/topBar/TopBar";
import { SideBar } from "./component/sideBar/SideBar";
import { Wrapper,ContainerFluid,ContentWrapper,MainContent } from "./component/layout/Layout.styles";

interface LayoutProps{
    children: React.ReactNode
}

export const Layout =({children}:LayoutProps)=>{

    return(
        <>
        <Wrapper>
            <SideBar/>
            
            <ContentWrapper>
                <TopBar/>

                <MainContent>
                    <ContainerFluid>{children}</ContainerFluid>
                </MainContent>
            </ContentWrapper>

        </Wrapper>
        
        </>
    )
    
}


/*
wrapper : flex:display height:100vh width:100% overflow:hidden
    ㄴ sidebar 
    ㄴ contentWrapper d-flex flex-direction:column overflow:hidden flex:1
            ㄴ topbar
            ㄴ maincontent flex:1 overflow-y=auto

 */