'use client'
import React, { useState, useEffect } from 'react'
import { Temporal } from '@js-temporal/polyfill'
import Modal from './Modal'
import * as S from '@/assets/css/Style.style'
import { Select } from '@/ui/Select/Select'
import { useAlertStore } from '@/store/useAlertStore'

// 1. 일정(Schedule) 인터페이스 정의
export interface Schedule{
    id: string;
    year: number;  // 💡 연도 추가
    month: number; // 💡 월 추가
    date: number;
    content: string;
    status: '대기' | '진행' |'완료' ;
    createdAt: string;
}

// 2. 모달 Props 인터페이스 정의
interface ScheduleModalProps{
    isOpen:boolean;
    onClose: ()=>void;
    year:number;
    month:number;
    selectedDate: number | null;
    schedules: Schedule[];
    setSchedules:React.Dispatch<React.SetStateAction<Schedule[]>>;
}
const SELECT_OPTIONS=[
    {label: '대기', value: '대기'},
    {label: '진행', value: '진행'},
    {label: '완료', value: '완료'},
]
    


export default function ScheduleModal({
    isOpen, onClose, year, month, selectedDate, schedules, setSchedules}: ScheduleModalProps){

        const {showAlert, hideAlert} = useAlertStore();
        // 3. 입력메모, 상태, 수정 중인 아이디를 관리할 state 선언하기
        const [formContent, setFormContent]=useState('');
        const [formStatus, setFormStatus]=useState<'대기' | '진행' |'완료'>('대기');
        const [editingId, setEditingId]=useState<string|null>(null);

        // 모달이 열리거나 날짜가 바뀔 때 입력창 초기화 (useEffect)
        useEffect(()=>{
           // isOpen이 true일 때 상태들 초기화하기
           if(isOpen){
               setFormContent('');
               setFormStatus('대기');
               setEditingId(null);
           }
        },[isOpen, selectedDate])

        // 모달이 닫혀있거나 선택된 날짜가 없으면 아무것도 안 그리기
        if(!isOpen || selectedDate === null) return null;

        // 5. 등록 및 수정 처리 함수 (handleSave)
        const handleSave = ()=>{
            // 빈 내용 체크, 시간 생성, 수정(editingId) vs 신규 등록(map vs spread) 분기 처리
            if(!formContent.trim()) return;
            const currentTime = Temporal.Now.plainTimeISO().toString().split('.')[0];

            if(editingId){ //🛠️ [수정 모드]
                setSchedules(prev=>(
                    prev.map(sch=>(
                        sch.id === editingId ? 
                       {...sch, content: formContent, status: formStatus} : sch
                    ))
                ))
            }else{ //✨신규등록
                setSchedules(prev=> [
                    ...prev,{
                    id: crypto.randomUUID(), //브라우저기본내장기능:안전하고 현대적인 고유 ID 생성 방법
                    year: year,     // 🔸 현재 연도 저장
                    month: month,   // 🔸 현재 월 저장
                    date: selectedDate,
                    content: formContent,
                    status: formStatus,
                    createdAt: currentTime,
                }])

            }
            //💡 저장 시 입력 폼과 관련된 모든 상태를 확실하게 초기화!
            setFormContent('');
            setEditingId(null);
            setFormStatus('대기');
        };

        // 6. 수정 모드=> 폼 채워넣기
        const handleEdit = (sch: Schedule)=>{
            // 선택한 일정의 내용과 상태를 form에 채우고 editingId 설정하기
            setFormContent(sch.content);
            setEditingId(sch.id); //editingId등록
            setFormStatus(sch.status);
        }

        // 삭제 처리 함수 (handleDelete)
        const handleDelete = (id:string)=>{

            showAlert(
                '삭제하시겠습니까?',
                ()=>{
                    setSchedules(prev => prev.filter(sch => sch.id !== id));   
                    if(editingId === id){
                        setFormContent('');
                        setEditingId(null); 
                        setFormStatus('대기');
                    }
                },
                hideAlert,
            )
        }

        return(
            <Modal
                isOpen={isOpen} 
                onClose={onClose}
                title={`${month}월 ${selectedDate}일 업무 일정`}
            > 
                {/* 입력 폼 영역 (Select, TextArea) */}
                <S.FormGroup>
                    <Select 
                    id='status'
                    options={SELECT_OPTIONS} value={formStatus}
                    onChange={newValue=> setFormStatus(newValue as '대기' | '진행' | '완료')}>
                        <Select.Toggle/>
                        <Select.Menu/>
                    </Select>
                    <S.TextArea
                    placeholder='일정 내용을 입력하세요'
                    value={formContent}
                    onChange={e=>setFormContent(e.target.value)}
                    />
                </S.FormGroup>
                
                {/* 버튼 그룹 영역 (등록/수정, 닫기) */}
                <S.ButtonGroup>
                    {/* <S.CustomButton onClick={onClose}>닫기</S.CustomButton> */}
                    <S.CustomButton $primary onClick={handleSave}>
                        {editingId ? '수정' : '등록'}</S.CustomButton>
                </S.ButtonGroup>

                {/* 10. 선택된 날짜의 일정 목록 렌더링 영역 (filter와 map 활용) */}
                <S.ScheduleList>
                    {schedules.filter(sch=> sch.year === year && sch.month === month && sch.date === selectedDate).map(sch=> (
                        <S.ScheduleItem key={sch.id}>
                            <S.ScheduleHeader>
                                <S.Badge $status={sch.status}>{sch.status}</S.Badge>
                                <span>{sch.createdAt} 작성</span>
                            </S.ScheduleHeader>
                            <div className="">{sch.content}</div>
                            <S.ButtonGroup>
                                <S.SmallButton onClick={()=>handleEdit(sch)}>수정</S.SmallButton>
                                <S.SmallButton onClick={()=>handleDelete(sch.id)}>삭제</S.SmallButton>
                            </S.ButtonGroup>
                        </S.ScheduleItem>
                    ))}

                </S.ScheduleList>
            </Modal>
        )
}