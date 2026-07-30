import type { Metadata } from "next";
import {Inter} from "next/font/google"

// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';


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
    <html lang="ko">
      <head>
        {/* 1. 폰트어썸 (아이콘) CDN */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
         {/* 2. 구글 Roboto 폰트 (머티리얼 디자인 최적화) CDN */}
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          rel="stylesheet"
        />
        {/* 3. MDBootstrap CSS CDN */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/7.1.0/mdb.min.css"
          rel="stylesheet"
        />      
      </head>
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