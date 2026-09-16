'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import * as S from '@/assets/css/login.style';


export const ErrorText = styled.span`
  font-size: 0.75rem;
  color: #e74a3b;
  margin-top: 0.2rem;
  margin-left: 1rem;
  display: block;
`;
export default function ChangePw() {
    const router = useRouter();

    // 1. 입력값 상태
    const [formData, setFormData] = useState({
        userId: '',
        currentPw: '',
        newPw: '',
        confirmNewPw: '',
    });

    // 2. 에러 메시지 상태
    const [errors, setErrors] = useState({
        userId: '',
        currentPw: '',
        newPw: '',
        confirmNewPw: '',
    });

    // 3. 타이핑할 때 실행되는 함수 (실시간 일치 검사 포함✨)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        // 먼저 입력값 업데이트
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        // 일단 해당 칸의 에러는 초기화
        let errorMsg = '';

        // ★ [실시간 체크 1] '새 비밀번호 확인'을 치고 있는데 '새 비밀번호'와 다를 때
        if (name === 'confirmNewPw' && value !== formData.newPw) {
            errorMsg = '비밀번호가 일치하지 않습니다.';
        }

        // ★ [실시간 체크 2] '새 비밀번호'를 고치고 있는데 이미 입력된 '확인' 값과 다를 때
        if (name === 'newPw' && formData.confirmNewPw && value !== formData.confirmNewPw) {
            setErrors(prev => ({
                ...prev,
                confirmNewPw: '비밀번호가 일치하지 않습니다.'
            }));
        } else if (name === 'newPw') {
            // 값이 일치해지면 확인란 에러 자동 삭제
            setErrors(prev => ({
                ...prev,
                confirmNewPw: ''
            }));
        }

        // 에러 상태 반영
        setErrors(prev => ({
            ...prev,
            [name]: errorMsg
        }));
    };

    // 4. 포커스가 벗어났을 때 (빈 칸 체크)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (!value.trim()) {
            setErrors(prev => ({
                ...prev,
                [name]: '필수 입력 항목입니다.'
            }));
        }
    };

    // 5. 최종 제출 버튼 눌렀을 때
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let newErrors = {
            userId: '',
            currentPw: '',
            newPw: '',
            confirmNewPw: '',
        };
        let isValid = true;

        if (!formData.userId.trim()) {
            newErrors.userId = '아이디를 입력해주세요.';
            isValid = false;
        }
        if (!formData.currentPw.trim()) {
            newErrors.currentPw = '현재 비밀번호를 입력해주세요.';
            isValid = false;
        }
        if (!formData.newPw.trim()) {
            newErrors.newPw = '새 비밀번호를 입력해주세요.';
            isValid = false;
        }
        if (!formData.confirmNewPw.trim()) {
            newErrors.confirmNewPw = '새 비밀번호 확인을 입력해주세요.';
            isValid = false;
        } else if (formData.newPw !== formData.confirmNewPw) {
            newErrors.confirmNewPw = '비밀번호가 일치하지 않습니다.';
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) {
            alert('모든 항목을 올바르게 입력해주세요.');
            return;
        }

        try {
            const res = await fetch('http://127.0.0.1:4000/api/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await res.json();

            if (res.ok) {
                alert('비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요');
                router.push('/admin');
            } else {
                alert(result.message || '비밀번호 변경에 실패했습니다');
            }
        } catch (err) {
            console.error('비밀번호 변경 에러', err);
            alert('서버와 통신 중 오류가 발생했습니다.');
        }
    };

    return (
        <S.Wrapper>
            <S.Card>
                <S.Header>
                    <S.Title>🔹비밀번호 변경🔹</S.Title>
                    <S.Desc>
                        계정 보호를 위해 기존 비밀번호와<br /> 새롭게 사용할 비밀번호를 입력해주세요.
                    </S.Desc>
                </S.Header>
                <S.Form onSubmit={handleSubmit}>
                    
                    {/* 아이디 */}
                    <div>
                        <S.Input 
                            type='text'
                            name='userId'
                            placeholder='아이디(userID)'
                            value={formData.userId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.userId && <ErrorText>{errors.userId}</ErrorText>}
                    </div>

                    {/* 현재 비밀번호 */}
                    <div>
                        <S.Input 
                            type='password'
                            name='currentPw'
                            placeholder='현재 비밀번호'
                            value={formData.currentPw}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.currentPw && <ErrorText>{errors.currentPw}</ErrorText>}
                    </div>

                    {/* 새 비밀번호 */}
                    <div>
                        <S.Input 
                            type='password'
                            name='newPw'
                            placeholder='새 비밀번호'
                            value={formData.newPw}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.newPw && <ErrorText>{errors.newPw}</ErrorText>}
                    </div>

                    {/* 새 비밀번호 확인 */}
                    <div>
                        <S.Input 
                            type='password'
                            name='confirmNewPw'
                            placeholder='새 비밀번호 확인'
                            value={formData.confirmNewPw}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.confirmNewPw && <ErrorText>{errors.confirmNewPw}</ErrorText>}
                    </div>

                    <S.Button type='submit'>비밀번호 변경하기</S.Button>
                </S.Form>

                <S.Divider />

                <S.LinkGroup>
                    <S.StyledLink onClick={() => router.push('/register/terms')}>아직 계정이 없으신가요? 회원가입</S.StyledLink>
                    <S.StyledLink onClick={() => router.push('/admin')}>이미 계정이 있으신가요? 로그인</S.StyledLink>
                </S.LinkGroup>
            </S.Card>
        </S.Wrapper>
    );
}