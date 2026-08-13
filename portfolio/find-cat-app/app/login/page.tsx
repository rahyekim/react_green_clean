'use client'

import { useState } from 'react'

import * as S from '../../css/style.styled'

import Header from '../components/Header';

export default function Login(){

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const handleLogin = async()=>{

        if(!email || !password){
            alert("이메일과 비밀번호를 입력해주세요")
            return;
        }

        try{
            const res = await fetch('http://localhost:8080/api/members/login',{
                method: "POST", //데이터를 숨켜서 안전하게 보내는 POST방식 사용
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email, password
                })
            });
            if(!res.ok) {
                alert("이메일 또는 비밀번호가 일치하지 않습니다")
                return;
            }
            //로그인성공 
            const data = await res.json();

            //✅localStorage는 오직 문자열(String) 데이터만 저장
            localStorage.setItem('user', JSON.stringify(data))
/*
🔹예: data = { token: "eyJhbGciOiJIUzI1...", nickname: "김코딩" }
🌟 받은 토큰을 브라우저의 저장소(LocalStorage)에 저장
localStorage.setItem('accessToken', data.token);
🌟 헤더에 토큰을 실어 보냄! (이게 바로 신분증 제시)
const token = localStorage.getItem('accessToken');
headers: {"Authorization": `Bearer ${token}`}

세션/쿠키는 빽단에서 알아서 브라우저에 저장해줌..
*/
            //백엔드에서 받아온 회원의 닉네임(data.nickname)으로 인사함
            alert(`환영합니다 ${data.nickname}님`)
            //로그인성공-> 웹사이트 홈페이지로 이동
            window.location.href='/';
            
        }catch(err){
            console.error("로그인에러",err)
            alert('서버와 연결할수 없습니다. 백엔드 서버가 켜져 있는지 확인해주세요');
        }

        //🌟카카오 로그인🌟 연동 
        
        const handleKaKaoLogin = async()=>{
            window.location.href= 'http://localhost:8080/oauth2/authorization/kakao'

            
            
        }
        
    }
    return(
        <>
        <S.AppWrapper>
            <S.ContainerColumn>
                <Header 
                title="로그인"
                onBackClick={()=> window.history.back()}
                />
                <S.MT70></S.MT70>
                <S.Column>
                    <S.FormControl
                    type='email'
                    placeholder='이메일'
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    />
                    <S.FormControl
                    type='password'
                    placeholder='패스워드'
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    />
                    <S.BtnBottomWrap>
                        <S.BaseBtn
                        $variant='primary'
                        $mainColor='pink'
                        onClick={handleLogin}
                        >로그인</S.BaseBtn>
                        <br/>
                        <S.BaseBtn
                        $variant='kakao'
                        >카카오로 간편하게 시작하기</S.BaseBtn>
                        <br/>
                        <S.BaseBtn
                        $variant='local'
                        >Apple로 로그인</S.BaseBtn>
                    </S.BtnBottomWrap>
                </S.Column>
            </S.ContainerColumn>
        </S.AppWrapper>
        </>
    )

}
