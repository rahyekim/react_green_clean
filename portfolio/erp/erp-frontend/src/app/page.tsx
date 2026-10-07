'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import * as S from '@/assets/css/Style.style'
import { Metadata } from 'next';

// export const metadata : Metadata = { title: '로그인'} //'use client'랑쓸수없음

export default function Home() {

  const router =useRouter();
    // 입력값 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault(); 
    try{
      // 백엔드 로그인 API 호출
      const res = await await axios.post("http://localhost:8080/api/members/login", {
        email,
        password,
      });
      if (res.status === 200) {
        // 백엔드에서 발급한 JWT 토큰을 localStorage에 저장
        const { token, firstName, email } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("name", firstName);

        //모든 axios 요청 헤더에 JWT 토큰을 자동 포함하도록 설정
        axios.defaults.headers.common["Authorization"]= `Bearer ${token}`;
        alert(`${firstName}님 환영합니다!`)
        router.push('/dashboard');
      }
    }catch(err){
        console.error("로그인 에러:", err);
        alert("이메일 또는 비밀번호를 확인해주세요.");
      }
  }

  return (
    <S.Container>
      <S.Card>
        <S.ImgColumn/>
        <S.FormColumn>
          <S.Title>Welcome Back</S.Title>
          <S.Form onSubmit={handleLogin}>
              <S.Input 
              type="email" 
              id="exampleInputEmail" 
              placeholder="Enter Email Address..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
              <S.Input 
              type="password" 
              id="exampleInputPassword" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <S.CheckboxWrapper>
              <input type="checkbox"  />
              <S.CheckboxLabel htmlFor='customCheck'>
               아이디 저장
              </S.CheckboxLabel>
            </S.CheckboxWrapper>

            <S.Button type="submit">
              로그인
            </S.Button>

            <S.Divider $margin="0.5rem"/>

            <S.SocialButton type="button" $provider="kakao">
              <i className="fab fa-google fa-fw"/>
              카카오로 로그인
            </S.SocialButton>
             <S.SocialButton type="button" $provider="insta">
              <i className="fab fa-facebook fa-fw"/>
              인스타그램으로 로그인
            </S.SocialButton>

          </S.Form>

          <S.Divider/>
          
          <S.LinkWrapper>
            <S.StyledLink href='/forgot'>
              비밀번호 찾기
            </S.StyledLink>
            <span>|</span>
            <S.StyledLink href='/member'>
              회원가입
            </S.StyledLink>
          </S.LinkWrapper>

        </S.FormColumn>
      </S.Card>
    </S.Container>
  );


}
