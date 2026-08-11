import type { NextConfig } from "next";

const nextConfig = {
  
  // 1. 스타일드 컴포넌트 활성화 설정
  compiler:{
    styledComponents: true, 
  },
  // 2. API 프록시(Rewrites) 설정
  // 💡 [핵심] 3000번 포트로 오는 /api 요청을 8080번으로 몰래 토스(Proxy)해줍니다!
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;
