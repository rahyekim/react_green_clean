
/**
 현재 URL (pathname)을 읽어와서 숨겨야 할 페이지 목록에
 포함되어 있는지 확인후
 헤더와 푸터 껐다 켰다 해주는 컴포넌트 만들기
 */

 'use client'
import { usePathname } from "next/navigation"
import { Header } from "./Header"
import { Footer } from "./Footer"
import * as S from '@/assets/css/LayoutWrapper.style'


export default function ConditionalLayout({children}:{children:React.ReactNode}){

    //현재 url경로를 가져옴('/login')
    const pathname =usePathname();
    
    //헤더 푸터 숨기고 싶은 url경로들을 배열에적어줌
    const hiddenPaths =['/', '/member', '/find-id','/forgot']

    const isHidden = hiddenPaths.includes(pathname)

    return(
        <S.PageWrapper> 
            {/* isHidden이 false일때만 헤더푸터를 보여줌*/}
            {!isHidden && <Header/>}
            <S.MainContent>
                {children}
            </S.MainContent>
            {!isHidden && <Footer/>}
        </S.PageWrapper>
    );

}

/*
딱 떨어지는 주소만 정확히 비교하고 싶다 
👉 includes 하나만 쓰기 (hiddenPaths.includes(pathname))
"큰 집(hiddenPaths) 안에 내 이름(pathname)이 들어있니?"
 (배열 안에 문자열이 있는가?)
주소에 특정 단어가 포함되기만 하면 다 잡아내고 싶다 
👉 some + includes 조합 쓰기 (hidePopupRoutes.some(route => pathname.includes(route)))
내 주소(pathname) 긴 글자 속에 이 작은 조각들(path) 중 
하나라도 포함되어 있니?" (문자열 안에 특정 단어가 들어있는가?)

 */