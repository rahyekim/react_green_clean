import type { Metadata } from "next";
import StyledProvider from "./StyledProvider";

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
        <StyledProvider>
              {children}
        </StyledProvider>
      </body>
    </html>
  );
}
