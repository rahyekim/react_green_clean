'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import * as S from '@/assets/css/Style.style'
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import { useAlertStore } from '@/store/useAlertStore';

import { Metadata } from 'next';
import { loginMember } from '@/api/http';

// export const metadata : Metadata = { title: '로그인'} //'use client'랑쓸수없음

export default function Home() {

  const {showAlert} =useAlertStore();
  const router =useRouter();

  // 입력값 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] =useState(false);

  useEffect(()=>{
    const savedEmail = localStorage.getItem('email');
    if(savedEmail){
      setEmail(savedEmail);
      setRememberMe(true);
    }else{
      setEmail('');
      setRememberMe(false);
    }
  },[]);


  const handleLogin = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault(); 

    if(!email || !password){
      showAlert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    try{
      // 백엔드 로그인 API 호출
      const data = await loginMember({email,password});
      if (data.success) {
        // 백엔드에서 발급한 JWT 토큰을 localStorage에 저장
        const { token, user } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("name", user.lastName + user.firstName);

        if(rememberMe){
          localStorage.setItem('email', user.email);
        }else{
          localStorage.removeItem('email');
        }
        //모든 axios 요청 헤더에 JWT 토큰을 자동 포함하도록 설정
        axios.defaults.headers.common["Authorization"]= `Bearer ${token}`;

        showAlert(`${user.firstName}님 환영합니다!`, ()=>{
          router.push('/dashboard');
        });
      }
    }catch(error:any){
      const errorMsg = error.response?.data?.message || '로그인 중 오류가 발생했습니다';
        console.error("로그인 에러:", error);
        showAlert(errorMsg);
      }
  }

  const handleKakaoLogin = () => {

  }

  const handleInstaLogin = () => {
  
  }

  return (
    <S.Container>
      <S.Card>
        <S.ImgColumn/>
        <S.FormColumn>
          <S.Title>로그인</S.Title>
          <S.Form onSubmit={handleLogin} >
              <Input
              type="email" 
              id="exampleInputEmail" 
              placeholder="이메일" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
              <Input 
              type="password" 
              id="exampleInputPassword" 
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <S.CheckboxLabel htmlFor='customCheck'>
              <S.CheckboxInput
              type="checkbox" 
              id='customCheck'
              checked={rememberMe}
              onChange={e=>setRememberMe(e.target.checked)}
              />
              <S.CheckboxText>아이디 저장</S.CheckboxText>
            </S.CheckboxLabel>

            <Button type="submit" >
              로그인
            </Button>

            <S.Divider $margin="0.5rem"/>

            <Button 
            type="button" 
            variant='kakao'
            onClick={handleKakaoLogin}
            >
              카카오로 로그인
            </Button>
             <Button 
             variant='sub'
             type="button"
             onClick={handleInstaLogin}
             >
              인스타그램으로 로그인
            </Button>

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
