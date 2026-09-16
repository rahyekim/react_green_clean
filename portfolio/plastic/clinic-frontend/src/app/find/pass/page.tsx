"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as S from '@/assets/css/changePw.style';

export default function MockPassPage() {

    const router = useRouter();
    const searchParams = useSearchParams();
    
    // 🎯 이전 페이지에서 URL에 달아 보낸 userId를 쏙 빼옵니다.
    const userId = searchParams.get('userId'); 

    // 이름과 휴대폰 번호 (DB에 있는 정보와 맞는지 확인용)
    const [authData, setAuthData] = useState({
        userName: '',
        phone: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAuthData(prev => ({ ...prev, [name]: value }));
    }

    const handleMockAuth = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!authData.userName || !authData.phone) {
            return alert('이름과 휴대폰 번호를 모두 입력해 주세요.');
        }

        try {
            // 🎯 백엔드의 '이메일 발송 API'로 데이터를 쏩니다! (포트는 4000번)
            const response = await fetch('http://127.0.0.1:4000/api/send-reset-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: userId, 
                    userName: authData.userName,
                    phone: authData.phone // 필요하다면 백엔드에서 폰 번호도 같이 검증하도록 추가 가능합니다
                })    
            });
            
            const result = await response.json();
            
            if(response.ok) {
                alert('본인인증 완료! 등록된 이메일로 비밀번호 재설정 링크가 발송되었습니다.');
                router.push('/admin'); //로그인창으로 
            } else {
                alert(result.message || '인증에 실패했습니다. 입력하신 정보를 다시 확인해 주세요.');
            }
        } catch (error) {
            console.error('인증 및 발송 에러:', error);
            alert('서버와 통신 중 오류가 발생했습니다.');
        }
    };

    return (
        <S.Wrapper>
            {/* 💡 카드를 살짝 좁게 만들어서 진짜 모바일 인증창 같은 느낌을 줍니다 */}
            <S.Card style={{ maxWidth: '400px' }}> 
                <S.Header>
                    <S.Title>휴대폰 본인인증</S.Title> 
                    <S.Desc>
                        안전한 비밀번호 변경을 위해<br />
                        가입 시 등록한 정보를 입력해 주세요.
                    </S.Desc>               
                </S.Header>

                <S.Form onSubmit={handleMockAuth}>
                    <S.Input
                        type="text"
                        name="userName"
                        placeholder='이름 (실명 입력)'
                        value={authData.userName}
                        onChange={handleChange}
                    />
                    <S.Input
                        type="text"
                        name="phone"
                        placeholder='휴대폰 번호 (숫자만 입력)'
                        value={authData.phone}
                        onChange={handleChange}
                    />

                    {/* 인증창 느낌을 내기 위해 버튼 색상을 살짝 다르게 줄 수도 있습니다 */}
                    <S.Button type="submit" style={{ backgroundColor: '#1cc88a', borderColor: '#1cc88a' }}>
                        PASS 인증하기
                    </S.Button>
                    
                    <S.Button 
                        type="button" 
                        onClick={() => router.back()} 
                        style={{ backgroundColor: '#858796', borderColor: '#858796', marginTop: '0' }}>
                        취소
                    </S.Button>
                </S.Form>   
            </S.Card>
        </S.Wrapper>
    );
}