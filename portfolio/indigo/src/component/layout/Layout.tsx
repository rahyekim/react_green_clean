import React from "react"
import {SideBar} from "../sideBar/SideBar"
import { TopBar } from "../topBar/TopBar"
import { Wrapper, ContentWrapper, MainContent,ContainerFluid } from "./Layout.styles"

interface LayoutProps {
    children : React.ReactNode; //렌더링할 수 있는 모든것을 아우르는 가장 넓은 타입
}
/*
사용이유: layout 컴포넌트는 태그와 태그 사이에 내용물(children)을 받을 것이고
화면에 렌더링 할 수 있는거라면 무엇이든 다 받을 수 있다
라고 타입스크립트에게 알려주는 약속
children: 아주 특별한 props(속성) 열림태그 닫힘태그 사이에 들어가는 모든 내용
React.ReactNode : 렌더링할 수 있는 모든것을 아우르는 가장 넓은 타입

header,sidebar,footer 고정해두고 ..
가운데 알맹이 즉 페이지내용만 바꿔 끼기 위해 만들어따...❄️
*/


export const Layout:React.FC<LayoutProps> =({children})=>{

    return(
        <>
        <Wrapper id="wrapper">
            <SideBar />

            <ContentWrapper id="content-wrapper">
                <TopBar />

                <MainContent id="content">
                    <ContainerFluid>{children}</ContainerFluid>
                </MainContent>
                
            </ContentWrapper>
        </Wrapper>
        </>
    )
}

/*

Wrapper d-flex overflow:hidden height:100vh
 ├ SideBar h:100% logo:z-index:1 flex-direction:col
 └ ContentWrapper flex:1 d-flex flex-direction-col overflow:hidden
       ├ TopBar 
       └ MainContent flex:1 overflow-y:auto

 */