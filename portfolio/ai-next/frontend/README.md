This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## ⭐ Next.js 는 리액트 프레임 워크 -> Fast API (백엔드) 로 AI chat 만드는 중...⭐

## Next.js는 라우팅도 알아서 해줌 
app 또는 pages 폴더의 구조를 보고 자동으로 URL을 만들어 줌
app/
 ├── page.tsx    => /
 ├── about/      => /about
 │    └── page.tsx
 └── chat/       => /chat
      └── page.tsx

## Next.js는 상황에 따라

SSR (서버에서 HTML 생성)   => 미리 html만들어 보내서 브라우저에서 html받아 바로표시 첫화면 엄청 빠름
SSG (빌드 시 HTML 생성)
CSR (React처럼 브라우저에서 렌더링)

을 모두 사용

## ⭐"use client";  리액트훅 사용하려면 꼭 필요


## next js 설치
npm create-next-app@latest 프로젝트명
npm install mdb-react-ui-kit @fortawesome/fontawesome-free --legacy-peer-deps

## 매티리얼 디자인 설치

MDBootstrap (Material Design for Bootstrap) :리액트(React) 전용 MDB 라이브러리

npm install @fortawesome/fontawesome-free --legacy-peer-deps




First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
