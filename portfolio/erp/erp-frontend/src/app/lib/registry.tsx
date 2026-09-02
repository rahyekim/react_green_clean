"use client";

import React,{ useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({children}:{children: React.ReactNode}){

    //스타일시트를 한번만 생성하도록 lazy-initial state사용
    const [styledComponentsStyleSheet] = useState(()=>new ServerStyleSheet())

    //SSR (server-side Rendering 렌더링 ) 
    //웹페이지화면을 서버에서 미리그려 사용자(브라우저)에게 보내주는 방식
    //서버 사이드 렌더링 시점에 스타일을 추출하여 html에 주입
    useServerInsertedHTML(()=>{
        const styles = styledComponentsStyleSheet.getStyleElement() 
        styledComponentsStyleSheet.instance.clearTag()
        return <>{styles}</>
    })

    //클라이언트 사이드에서는 그대로 렌더링
    if (typeof window !== 'undefined') return <>{children}</>
    
    //서버사이드에서는 StyleSheetManager로 감싸서 스타일수집
    return (
        <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
        {children}
        </StyleSheetManager>
    )
}