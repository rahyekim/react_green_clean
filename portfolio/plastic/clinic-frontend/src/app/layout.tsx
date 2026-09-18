import type { Metadata } from "next";
import { Globalstyle } from "@/assets/css/Global.styles";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import StyledComponentsRegistry from "@/lib/registry";

export default function RootLayout({ children }:{children:React.ReactNode}) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">
        <StyledComponentsRegistry>
          <Globalstyle/> {/* 모든 페이지에 적용됩니다! */}
          <ConditionalLayout >
            {children}
          </ConditionalLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

// 🌟flex-1은 "남은 공간을 내가 다 차지할 만큼 최대한 늘어나라! flex: 1 1 0%
