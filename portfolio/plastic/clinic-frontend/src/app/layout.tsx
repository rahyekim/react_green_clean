import type { Metadata } from "next";
// import "./globals.css";
import styled from "styled-components";
import { Globalstyle } from "@/style/Global.styles";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickConsultBar from "@/components/QuickConsultBar";
import EventPopup from '@/components/EventPopup'

//헤더 크기때문에 픽스햇을때 잘리는 크기만큼 패딩or마진
const MainWrapper = styled.main`
padding-top: 90px;
@media (max-width: 1024px) {
  padding-top: 60px;
}

/* min-height: 100vh; */
`;
export default function RootLayout({ children }:{children:React.ReactNode}) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">
        <Globalstyle/> {/* 모든 페이지에 적용됩니다! */}
        <Header />
          <MainWrapper className="flex-1">
            {children}
          </MainWrapper>
        <Footer />
        <QuickConsultBar/>
        <EventPopup/>
      </body>
    </html>
  );
}

// 🌟flex-1은 "남은 공간을 내가 다 차지할 만큼 최대한 늘어나라! flex: 1 1 0%
// 🔹Footer를 화면 맨 바닥으로 밀어내 버려
// 🔹Sticky Footer(바닥에 딱 달라붙는 하단바)패턴 이라함