"use client"

import React, { useState } from "react"
import axios from 'axios';
import * as S from './QuickBar.styles'
import usePopup from "@/hooks/usePopup";
import Popup from "../ui/Popup";
import * as P from '@/assets/css/popup.styles';

export default function QuickConsultBar (){

    const {openPopup, popupConfig, closePopup}=usePopup();
    //입력값 상태관라
    const [name, setName]=useState('');
    const [phone, setPhone]=useState('');
    const [department, setDepartment]=useState('');
    const [isAgreed, setIsAgreed]=useState(false);

    // 비밀번호 팝업 제어용 상태
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [password, setPassword] = useState('');

    const handleSubmit = ()=>{
        //유효성검사 빈칸방지
        if (!name.trim()) {
        openPopup('입력 확인', '이름을 입력해주세요.');
        return;
    }
    if (!phone.trim()) {
       openPopup('입력 확인', '연락처를 입력해주세요.');
        return;
    }
    //💘 연락처길이가 짧은경우
    if(phone.length < 9) {
        openPopup('입력 환인', '연락처를 올바르게 입력해주세요');
        return;
    }
    //가짜번호 검사 정규식
    if(/(\d)\1{6}/.test(phone)){
        openPopup('입력 확인', '장난성 번호는 접수할수없습니다')
        return;
    }
    if (!department.trim()) {
       openPopup('입력 확인', '상담 분야를 선택해주세요.');
        return;
    }
    if (!isAgreed) {
       openPopup('동의 필요', '개인정보 수집 및 이용에 동의해주세요.');
        return;
    }
    // 모든 필수값 검사 통과 시 -> 비밀번호 입력 팝업 띄우기!
    setIsPasswordModalOpen(true);
       
    }

    const handleFinalSubmit = async()=>{
        if (!password.trim()) {
        openPopup('입력 확인', '글 확인용 비밀번호를 입력해주세요.');
        return;
        }
        try{
            const res = await axios.post('http://localhost:4000/api/consult/quick',{
                name, phone, department, password
            })
            if(res.data.success){
                // 1. 비밀번호 입력 팝업 닫기
                setIsPasswordModalOpen(false);
                
                //초기화
                setName('');
                setPhone('');
                setDepartment('');
                setIsAgreed(false);
                
                openPopup('신청 완료', '빠른 상담 신청이 완료되었습니다.');
            }
        }catch(err){
            console.error('상담 신청 실패:', err);
            openPopup('오류', '상담 신청 중 문제가 발생했습니다.');
        }
    }

    return(
        <>
        <S.BarWrapper>
            <S.BarInner>
                <S.Title>빠른 상담신청</S.Title>
                <S.Input
                type="text"
                value={name}
                placeholder="이름을 작성해주세요"
                onChange={e=>setName(e.target.value)}
                />
                <S.Input 
                type="tel"
                inputMode="numeric"// 📱 모바일에서 숫자 전용 키패드가 뜨도록 지정
                pattern="[0-9]*"             // 모바일 보조 속성
                placeholder="연락처 ( 숫자만입력 )"
                value={phone}
                onChange={e=>{
                    //숫자가아니라면 지워버림
                    const onlyNums = e.target.value.replace(/[^0-9]/g,'');
                    setPhone(onlyNums)
                }}
                maxLength={11}
                />

                <S.Select 
                value={department}
                onChange={e=>setDepartment(e.target.value)}
                >
                    <option value="" disabled hidden>상담분야를 선택해주세요</option>
                    <option value="눈 성형">눈 성형</option>
                    <option value="코 성형">코 성형</option>
                    <option value="동안 성형">동안 성형</option>
                    <option value="쁘띠 시술">쁘띠 시술</option>
                </S.Select>

                <S.CheckboxGroup>
                    <S.CheckboxLabel>
                        <S.Checkbox
                        type="checkbox"
                        checked={isAgreed}
                        onChange={e=>setIsAgreed(e.target.checked)}
                        />
                        <S.AgreeText>개인정보처리방침동의</S.AgreeText>
                        
                        <S.DetailLink>자세히 &gt;</S.DetailLink>
                    </S.CheckboxLabel>
                </S.CheckboxGroup>

                <S.SubmitBtn onClick={handleSubmit}>빠른 상담신청하기</S.SubmitBtn>
                
            </S.BarInner>
        </S.BarWrapper>

{/* 비밀번호 입력 팝업 (모달) */}
        {isPasswordModalOpen &&(
            <>
            <P.PopupOverlay>
                <P.PopContainer>
                    <P.PopHeader>
                        <P.PopTitle>비밀번호입력</P.PopTitle>
                        <P.CloseIcon onClick={()=>setIsPasswordModalOpen(false)}
                            >&times;</P.CloseIcon>
                    </P.PopHeader>
                    <P.PopBody>
                        <p>상담 확인 및 수정 시 필요한 비밀번호를 입력해주세요</p>
                        <S.Input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        />
                    </P.PopBody>
                    <P.PopFooter>
                        <P.CancelBtn onClick={()=>setIsPasswordModalOpen(false)}>취소</P.CancelBtn>
                        <P.ConfirmBtn onClick={handleFinalSubmit}>최종신청</P.ConfirmBtn>
                    </P.PopFooter>
                </P.PopContainer>
            </P.PopupOverlay>
            </>
        )}
        <Popup
        isOpen={popupConfig.isOpen}
        title={popupConfig.title}
        onClose={closePopup}
        onConfirm={popupConfig.onConfirm}
        >{popupConfig.message}</Popup>
        </>
    )
}


