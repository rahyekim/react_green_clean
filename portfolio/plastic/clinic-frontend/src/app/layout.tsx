import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }:{children:React.ReactNode}) {
  return (
    <html lang="ko">
      <body className="min-h-full flex flex-col">
        <Header />
          <main className="flex-1">
            {children}
          </main>
        <Footer />
      </body>
    </html>
  );
}

// 🌟flex-1은 "남은 공간을 내가 다 차지할 만큼 최대한 늘어나라! flex: 1 1 0%
// 🔹Footer를 화면 맨 바닥으로 밀어내 버려
// 🔹Sticky Footer(바닥에 딱 달라붙는 하단바)패턴 이라함