import type { Metadata } from "next";
import StyledComponentsRegistry from "@/app/lib/registry";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import * as S from "@/assets/css/LayoutWrapper.style"

export const metadata: Metadata = {
  title: { 
    template: "%s | ERP", //%s자리에 각 페이지의 타이틀이 들어감 
    default: "ERP 시스템", //default각 페이지에 타이틀 설정이 없을 때 나오는 기본값 
  },  
  description: "사내 ERP 시스템입니다", 
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <ThemeProviderWrapper>
            <S.PageWrapper>  
            <Header/>
            <S.MainContent> {/*flex:1*/}
              {children}
            </S.MainContent>
            <Footer/>
            </S.PageWrapper>
          </ThemeProviderWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
