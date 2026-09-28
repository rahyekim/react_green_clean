import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler:{
    styledComponents: true,
  },
  turbopack:{
    //터보팩 루트 경로를 현재 작업 중인 폴더로 강제 지정
    root: process.cwd(), //Current Working Directory
  }
};

export default nextConfig;
