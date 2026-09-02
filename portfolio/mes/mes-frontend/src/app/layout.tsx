import type { Metadata } from "next";
import StyledComponentsRegistry from "@/app/lib/registry";
import { Globalstyle } from "@/assets/css/Globalstyle";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import * as S from "@/assets/css/LayoutWrapper.style"

export const metadata: Metadata = {
  title: {
    template: "%s | MES",
    default: "MES 시스템"
  },
  description: "사내 MES 시스템입니다",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <Globalstyle/>
          <S.PageWrapper>
            <Header/>
            <S.MainContent> 
              {children}
            </S.MainContent>
            <Footer/>
          </S.PageWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
