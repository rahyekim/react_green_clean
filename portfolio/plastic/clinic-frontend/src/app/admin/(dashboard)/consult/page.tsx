'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import usePopup from '@/hooks/usePopup';
import Popup from '@/components/ui/Popup';
import * as S from'@/assets/css/admin/consult.style';
import {
    FiTrash2, FiSearch, FiCheck
} from 'react-icons/fi'
import { formatDate } from "@/lib/dateUtils";


interface ConsultData{
    ID: number;
    NAME: string;
    PHONE: string;
    DEPARTMENT: string;
    CREATED_AT: string;
    STATUS: '대기중' | '상담완료';
}
export default function Consult(){
    const {openPopup, popupConfig, closePopup}=usePopup();

    const [selectedIds, setSelectedIds]=useState<number[]>([]);
    
    const [consultList, setConsultList]=useState<ConsultData[]>([]);
    const [deleteId, setDeleteId]=useState<number|null>(null);

    const fetchConsult = async()=>{
        try{
            const res = await axios.get('http://localhost:4000/api/admin/consult')
            if(res.data.success){
                setConsultList(res.data.data);
            }
        }catch(err){
            console.error('상담내역 로드실패:', err);
            openPopup('실패', '불러오기 실패');
        }
    }
    useEffect(()=>{
        fetchConsult();
    },[])

    const toggleStatus = async(id:number)=>{
        try{
        const res = await axios.put(`http://localhost:4000/api/admin/consult/${id}/status`)
        if(res.data.success){
            fetchConsult(); // 상태 변경 후 목록 새로고침!
        }
        }catch(err){
            openPopup('알림', '상태 변경에 실패했습니다')
        }
    }

    const handleDelete = async(id:number)=>{
        try{
            setDeleteId(id);
            openPopup(
                '삭제 알림',
                '해당 상담을 삭제하시겠습니까?',
                async()=>{
                    if(!deleteId) return;
                    try{
                        const res = await axios.delete(`http://localhost:4000/api/admin/consult/${deleteId}`)
                        if (res.data.success) {
                        fetchConsult(); // 삭제 후 목록 새로고침!
                        }
                        closePopup();
                    }catch(err){
                        openPopup('알림', '상담삭제에 실패했습니다.')
                    }
                }
            );
        }catch(err){
            openPopup('알림', '삭제도중 오류 발생');
        }
    }

    // 💡 최신 Temporal API를 활용한 날짜 포맷 함수 => util
   
    //전체선택/해제 
    const handleSelectAll = (e:ChangeEvent<HTMLInputElement>)=>{
        if(e.target.checked){
            setSelectedIds(consultList.map(consult=> consult.ID ))
        }else{
            setSelectedIds([]);
        }
    }

    //개별 체크박스 선택/해제
    const handleSelectOne = (id:number)=>{
        if(selectedIds.includes(id)){
            setSelectedIds(selectedIds.filter(i=> i !== id ))
        }else{
            setSelectedIds(prev=> [...prev, id])
        }
        const ids = consultList.map(consult => (
            consult.ID === id 
        ))
    }

    //선택된 항목 일괄 삭제 핸들러
    const handleDeleteSeleted = ()=>{
        
    }
    
    
    return(
        <>
         <S.ConsultContainer>
                <S.ConsultPageHeader>
                    <S.ConsultPageTitle>상담신청 관리</S.ConsultPageTitle>
                </S.ConsultPageHeader>

                {/* 🎯 검색 및 필터 영역 */}
                <S.ConsultFilterCard>
                    <S.ConsultInputGroup>
                        <S.ConsultInput type="text" placeholder="이름 또는 연락처 검색" />
                        <S.ConsultSearchButton>
                            <FiSearch size={16} /> 검색
                        </S.ConsultSearchButton>
                    </S.ConsultInputGroup>
                </S.ConsultFilterCard>

                {/* 🎯 상담 내역 데이터 테이블 */}
                <S.ConsultTableCard>
                    <S.ConsultCardHeader>
                        <S.ConsultCardTitle>빠른 상담신청 접수 내역</S.ConsultCardTitle>
                    </S.ConsultCardHeader>
                    
                    <S.ConsultTableWrapper>
                        <S.ConsultTable>
                            <thead>
                                <tr>
                                    <th style={{width:'10%'}}>No.</th>
                                    <th style={{width:'10%'}}>이름</th>
                                    <th style={{width:'15%'}}>연락처</th>
                                    <th style={{width:'22%'}}>상담분야</th>
                                    <th style={{width:'13%'}}>신청일시</th>
                                    <th style={{width:'18%'}}>상태</th>
                                    <th style={{width:'12%'}}>관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consultList.map((item, index) => (
                                    <tr key={item.ID}>
                                        <td>{consultList.length - index}</td>
                                        <td><strong>{item.NAME}</strong></td>
                                        <td>{item.PHONE}</td>
                                        <td>{item.DEPARTMENT}</td>
                                        {/* 💡 Temporal이 적용된 포맷 함수로 렌더링 */}
                                        <td>{formatDate(item.CREATED_AT)}</td>
                                        <td>
                                            <S.ConsultStatusBadge 
                                                $status={item.STATUS} 
                                                onClick={() => toggleStatus(item.ID)}
                                            >
                                                {item.STATUS === "상담완료" && <FiCheck size={12} />}
                                                {item.STATUS}
                                            </S.ConsultStatusBadge>
                                        </td>
                                        <td>
                                            <S.ConsultDeleteActionBtn onClick={() => handleDelete(item.ID)}>
                                                <FiTrash2 size={16} />
                                            </S.ConsultDeleteActionBtn>
                                        </td>
                                    </tr>
                                ))}
                                {consultList.length === 0 && (
                                    <tr>
                                        <td colSpan={7} style={{ textAlign: 'center', padding: '3rem' }}>
                                            접수된 상담 내역이 없습니다.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </S.ConsultTable>
                    </S.ConsultTableWrapper>
                </S.ConsultTableCard>

            </S.ConsultContainer>

            <Popup
            isOpen={popupConfig.isOpen}
            title={popupConfig.title}
            onClose={closePopup}
            onConfirm={popupConfig.onConfirm}
            >{popupConfig.message}</Popup>

        </>
    )
}