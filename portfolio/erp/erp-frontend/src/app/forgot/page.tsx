'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import * as S from '@/assets/css/Style.style'
import {PageTitle} from '@/assets/css/Common.style'
import Button from '@/ui/Button'
import Input from '@/ui/Input'
import { Metadata } from 'next'

// export const metadata: Metadata = {title: "비밀번호 찾기"}

export default function ForgotPassword(){

    const [email, setEmail] = useState("");
    const router = useRouter();

    const [oldPassword, setOldPassword]=useState('');
    const [newPassword, setNewPassword]=useState('');

    const handleChangePw = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const token = localStorage.getItem('token');

        if(!token){
            alert('로그인이 필요합니다')
            router.push('/');
        }

        try{
            const res = await axios.post('http://localhost:8080/api/members/change-password',{
                oldPassword, newPassword
            }, {
                headers: {'Authorization': `Bearer ${token}`}
            });
            alert('비밀번호가 성공적으로 변경되었습니다 .다시로그인해주세요');
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            delete axios.defaults.headers.common['Authorization'];
            router.push('/')

        }catch(error:any){
            alert(error.response?.data || '비밀번호변경에 실패했습니다')
        }

    
    }

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            await axios.post("http://localhost:8080/api/members/forgot-password", { email });
            alert("이메일로 임시 비밀번호가 발송되었습니다. 확인 후 로그인해주세요.");
            router.push("/"); // 메인 로그인 화면으로 이동
        } catch (error: any) {
            alert(error.response?.data || "메일 발송에 실패했습니다. 이메일을 확인해주세요.");
        }
    };

    return(
        <>
        <S.Container>
            <S.Card>
                <S.ImgColumn/>
                <S.FormColumn>
                    <PageTitle>비밀번호 찾기</PageTitle>
                    <S.Description>
                        비밀번호를 잊어버리셨나요? 이메일로 임시비빌번호를 드립니다
                    </S.Description>
                    <S.Form onSubmit={handleResetPassword}>
                        <Input 
                        type='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email' 
                        placeholder='이메일'
                        />
                        <Button type='submit'>
                            비밀번호 재설정
                        </Button>

                         <S.Divider/>

                    </S.Form>

                    <S.LinkWrapper>
                        <S.StyledLink href='/member'>회원가입</S.StyledLink>
                        <span>|</span>
                        <S.StyledLink href='/'>로그인</S.StyledLink>
                    </S.LinkWrapper>
                    
                </S.FormColumn>
            </S.Card>
        </S.Container>
        </>
    )
}