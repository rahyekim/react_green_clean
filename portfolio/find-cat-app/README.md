This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## ✨ 설치 ✨

## npx create-next-app@latest find-cat-app --typescript
## npm install mdb-react-ui-kit @mui/icons-material @mui/material @emotion/react @emotion/styled --legacy-peer-deps
## npm install styled-components --legacy-peer-deps

## npm install axios react-bootstrap bootstrap @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons --legacy-peer-deps

## 우편번호 API react-daum-postcode --legacy-peer-deps


## nextConfig -> 스타일드컴포넌트 활성화
compiler:{
styledComponents: true, //스타일드컴포넌트 활성화
}

## lib 폴더 registry.tsx

'use client';

import React, {useState} from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

##

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
