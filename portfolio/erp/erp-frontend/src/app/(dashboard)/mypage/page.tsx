'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { PageTitle, Form, MyPageWrapper } from './My.style'
import Button from '@/ui/Button'
import Input from '@/ui/Input'

export default function ForgotPassword(){

    const router = useRouter();

    const [oldPassword, setOldPassword]=useState('');
    const [newPassword, setNewPassword]=useState('');
    const [isLoading, setIsLoading]= useState(false);

    const handleChangePw = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const token = localStorage.getItem('token');

        if(!token){
            alert('로그인이 필요합니다')
            router.push('/');
            return;
        }
        try{
            setIsLoading(true)
            await axios.post('http://localhost:8080/api/members/change-password',{
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
    return (
        <MyPageWrapper>
            <PageTitle>비밀번호 변경</PageTitle>
            <Form onSubmit={handleChangePw}>
                <Input
                    type="password" 
                    label='기존(임시) 비밀번호'
                    placeholder="기존 비밀번호를 입력하세요"
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    required 
                    fullWidth
                />
                <Input 
                    type="password" 
                    label='새 비밀번호'
                     placeholder="새 비밀번호를 입력하세요"
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required 
                    fullWidth
                />
                <Button 
                style={{ marginTop: '5px' }} 
                type="submit"
                variant='primary'
                isLoading={isLoading}
                >비밀번호 변경하기</Button>
            </Form>
        </MyPageWrapper>
    );
}