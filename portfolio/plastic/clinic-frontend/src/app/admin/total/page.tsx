
'use client'
import React, {useState} from 'react'
import { useRouter } from 'next/navigation'

import * as S from '@/assets/css/Admin.style'

export default function LoginPage(){
    
    const router = useRouter();

    const [formData, setFormData] = useState({
        userId:'',
        userPW:'',
        
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFormData(prev=>({
            ...prev,
            [name]: value
        }));
    }

    const handleLogin = async(e:React.FormEvent)=>{
        e.preventDefault(); //폼 새로고침 방지
        //입력창 비움 방지
        if(!formData.userId || !formData.userPW){
            alert('아이디 또는 비밀번호를 모두 입력해주세요')
            return;
        }
        try{
            const res = await fetch('http://127.0.0.1:4000/api/login',{
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(formData)
            });
            const result = await res.json();

            //분기
            if(res.ok) {
                alert('로그인성공');
                //관리자라면
                if(result.isAdmin === 1){
                    router.push('/admin/total');
                }else{
                    router.push('/')
                }
            }else{
                alert(result.message || '로그인실패');
            }

        }catch(err){
            console.error('로그인에러:',err);
            alert('서버통신중 오류발생');
        }
    }

    return(
        <>
        <S.LoginWrapper>
            <S.LoginCard>
                <S.LoginHeader>
                    <S.LoginTitle>💙환영합니다💙</S.LoginTitle>
                </S.LoginHeader>

                <S.LoginForm onSubmit={handleLogin}>
                    <S.LoginInput 
                        type="text" 
                        name="userId"
                        placeholder="아이디" 
                        value={formData.userId}
                        onChange={handleChange}
                    />
                    <S.LoginInput 
                        type="password" 
                        name="userPW"
                        placeholder="비밀번호" 
                        value={formData.userPW}
                        onChange={handleChange}
                    />
                    
                    <S.CheckboxGroup>
                        <S.CheckboxInput type="checkbox" id="customCheck" />
                        <S.CheckboxLabel htmlFor="customCheck">
                            Remember Me
                        </S.CheckboxLabel>
                    </S.CheckboxGroup>

                    <S.LoginButton type="submit">
                        로그인
                    </S.LoginButton>
                </S.LoginForm>

                <S.Divider />

                <S.LinkGroup>
                    <S.StyledLink>비밀번호 찾기</S.StyledLink>
                    <S.StyledLink onClick={() => router.push('/register/terms')}>
                        회원가입
                    </S.StyledLink>
                </S.LinkGroup>
            </S.LoginCard>
        </S.LoginWrapper>
        </>
    )

}

