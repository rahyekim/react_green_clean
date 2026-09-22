'use client';

import { ChangeEvent, useState } from 'react';
import usePopup from '@/hooks/usePopup';
import Popup from '@/components/ui/Popup';
import * as S from'@/assets/css/admin/consult.style';
import {
    FiTrash2, FiSearch, FiCheck
} from 'react-icons/fi'

interface ConsultData{
    id:number;
    name:string;
    phone:string;
    category:string;
    regDate:string;
    status:'대기중'|'상담완료';

}
export default function Consult(){

    const [selectedIds, setSelectedIds]=useState<number[]>([]);
    
    const [consultList, setConsultList]=useState<ConsultData[]>([
        { id: 1, name: "홍길동", phone: "010-1234-5678", category: "눈성형", regDate: "2026-09-21 14:30", status: "대기중" },
        { id: 2, name: "김철수", phone: "010-9876-5432", category: "코성형", regDate: "2026-09-21 10:15", status: "상담완료" },
        { id: 3, name: "이영희", phone: "010-5555-4444", category: "안티에이징", regDate: "2026-09-20 16:45", status: "대기중" },
    ]);

    const {openPopup, popupConfig, closePopup}=usePopup();

    const toggleStatus = (id:number)=>{
        setConsultList(prev=>(
            prev.map(consult=>(
                consult.id ===  id ? {
                    ...consult,
                    status: consult.status === '대기중' ? "상담완료" : "대기중"
                } : consult
            ))
        )
        )
    }

    const handleDelete = (id:number)=>{
        openPopup(
            '알림', 
            '정말 이내용을 삭제하시겠습니까?',
            ()=>{
                setConsultList(prev=> prev.filter(consult=>consult.id !== id));
                closePopup();
            }
          )
    }

    //전체선택/해제 
    const handleSelectAll = (e:ChangeEvent<HTMLInputElement>)=>{
        if(e.target.checked){
            setSelectedIds(consultList.map(consult=> consult.id ))
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
            consult.id === id 
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
                                    <tr key={item.id}>
                                        <td>{consultList.length - index}</td>
                                        <td><strong>{item.name}</strong></td>
                                        <td>{item.phone}</td>
                                        <td>{item.category}</td>
                                        <td>{item.regDate}</td>
                                        <td>
                                            <S.ConsultStatusBadge 
                                                $status={item.status} 
                                                onClick={() => toggleStatus(item.id)}
                                            >
                                                {item.status === "상담완료" && <FiCheck size={12} />}
                                                {item.status}
                                            </S.ConsultStatusBadge>
                                        </td>
                                        <td>
                                            <S.ConsultDeleteActionBtn onClick={() => handleDelete(item.id)}>
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