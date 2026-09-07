'use client'
import { useState, useEffect } from 'react'
import { Temporal } from '@js-temporal/polyfill'
import ModalLayout from './ModalLayout'
import * as S from '@/assets/css/Style.style'

// 1. 일정(Schedule) 인터페이스 정의
export interface Schedule{
    // id, date, content, status, createdAt 타입 정의하기
}

// 2. 모달 Props 인터페이스 정의
interface ScheduleModalProps{
    // isOpen, onClose, month, selectedDate, schedules, setSchedules 타입 정의하기
}

export default function ScheduleModal({
    isOpen, onClose, month, selectedDate, schedules, setSchedules}: ScheduleModalProps){

        // 3. 입력폼 콘텐츠, 상태, 수정 중인 아이디를 관리할 state 선언하기
        const [formContent, setFormContent]=useState('');
        const [formStatus, setFormStatus]=useState<'대기' | '진행' |'완료'>('대기');
        const [editingId, setEditingId]=useState<string|null>(null);

        // 4. 모달이 열리거나 날짜가 바뀔 때 입력창 초기화 (useEffect)
        useEffect(()=>{
           // isOpen이 true일 때 상태들 초기화하기
        },[isOpen, selectedDate])

        // 모달이 닫혀있거나 선택된 날짜가 없으면 아무것도 안 그리기
        if(!isOpen || selectedDate === null) return null;

        // 5. 등록 및 수정 처리 함수 (handleSave)
        const handleSave = ()=>{
            // 빈 내용 체크, 시간 생성, 수정(editingId) vs 신규 등록(map vs spread) 분기 처리
        };

        // 6. 수정 모드로 전환하는 함수 (handleEdit)
        const handleEdit = (sch: Schedule)=>{
            // 선택한 일정의 내용과 상태를 form에 채우고 editingId 설정하기
        }

        // 7. 삭제 처리 함수 (handleDelete)
        const handleDelete = (id:string)=>{
            // confirm 창 띄우고 schedules에서 필터링 후 삭제하기
        }

        return(
            <ModalLayout 
                isOpen={isOpen} 
                onClose={onClose}
                title={`${month}월 ${selectedDate}일 업무 일정`}
            > 
                {/* 8. 입력 폼 영역 (Select, TextArea) */}
                
                {/* 9. 버튼 그룹 영역 (등록/수정, 닫기) */}

                {/* 10. 선택된 날짜의 일정 목록 렌더링 영역 (filter와 map 활용) */}
            </ModalLayout>
        )
}