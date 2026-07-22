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
