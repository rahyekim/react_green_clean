'use client';
import React, {FormEvent, useState} from 'react';
import { useRouter } from 'next/navigation';

import * as S from '@/assets/css/login.style'

export default function ChangePw(){

    const router = useRouter();

    const [userId, setUserId]=useState('');

    //값을 입력할때...
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  
        setUserId(e.target.value);
    }
    //전송
    const handleGoToPass = async(e:React.FormEvent)=>{
        e.preventDefault();

        if(!userId ) {
            alert('아이디를 먼저 입력해주세요');
            return;
        }

        //💘짝퉁 PASS페이지로 이동하면서 아이디를 몰래 달아보냄
        router.push(`/find/pass?userId=${userId}`)

    }
    return(
        <S.Wrapper>
            <S.Card>
                <S.Header>
                    <S.Title>🔹비밀번호 찾기🔹</S.Title>
                    <S.Desc>
                       비밀번호를 찾고자 하는 아이디를 입력한 후<br/>
                        본인인증을 진행해 주세요.
                    </S.Desc>
                </S.Header>
                <S.Form onSubmit={handleGoToPass}>
                    <S.Input 
                    type='text'
                    name='userId'
                    placeholder='아이디(userID)'
                    value={userId}
                    onChange={handleChange}
                    />
                    <S.Button type='submit'>본인 인증 진행하기</S.Button>
                </S.Form>

                <S.Divider/>

                <S.LinkGroup>
                    <S.StyledLink onClick={()=>router.push('/register/terms')}>아직 계정이 없으신가요? 회원가입</S.StyledLink>
                    <S.StyledLink onClick={()=>router.push('/admin')}>이미 계정이 있으신가요? 로그인</S.StyledLink>
                </S.LinkGroup>
            </S.Card>
        </S.Wrapper>
        
    )
}