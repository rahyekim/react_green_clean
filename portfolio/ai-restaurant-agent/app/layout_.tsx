import type { Metadata } from "next";
import {Inter} from "next/font/google"

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const inter = Inter({subsets:["latin"]});

export const metadata: Metadata = {
  title: "노원구 맛집 AI 에이전트",
  description: "당신의 완벽한 하루를 위한 AI 맛집 비서",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
    >
      <body className={inter.className}
      style={{backgroundColor:"#f4f6f9"}}
      >{children}</body>
    </html>
  );
}

/*
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

 */