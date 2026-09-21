'use client';
//브라우저의 현재주소(URL)를 읽어야 하므로 이 파일은 클라이언트 컴포넌트로 선언
import styled from "styled-components";
import { usePathname } from "next/navigation";
//nextjs에서 현재 접속중인 주소를 가져오는 전용 도구(훅) 불러옴
import React from "react";

//조건부로 사라져야 하는 컴포넌트를 불러옴 
import Header from "./Header";
import Footer from "./Footer";
import EventPopup from "../EventPopup";
import QuickConsultBar from "./QuickConsultBar";

//💘헤더 크기때문에 픽스햇을때 잘리는 크기만큼 패딩or마진
const MainWrapper = styled.main<{$isHide:boolean}>`
padding-top: ${({$isHide})=> $isHide ? '0': '91px'};
min-height: 100vh;
@media (max-width: 1024px) {
  padding-top: ${({$isHide})=> $isHide ? '0': '60px'};;
}
`;

/*
메인내용(children)을 받아서 화면에 그려주는 껍데기 layout함수 만듦
 */
export default function ConditionalLayout ({children}:{children:React.ReactNode}){
    const pathname = usePathname();

    //현재주소가 /admin이라는 글자로 시작하는지 검사해서 true/false
    const isHide = pathname.startsWith('/admin') || pathname.startsWith('/find');

    return(
        <>
        {/* isHidePage가 false일때만 팝업을 화면에 보여줌 */}
        {!isHide && <EventPopup/>}

        {/* 관리자페이지가 아닐때만 헤더(상단메뉴)를 보여줌 */}
        {!isHide && <Header/>}

        {/* 사용자가 보려고하는 진짜 페이지의 내용(회원가입,로그인창 등) 무조건 가운데에 보여줍니다 */}
        <MainWrapper $isHide={isHide} className="flex-1">
            {children}
        </MainWrapper>

        {/* 관리자페이지가 아닐때만 푸터,퀵바 보여줌 */}
        {!isHide && <Footer/>}
        {!isHide && <QuickConsultBar/>}

        </>
    )
}