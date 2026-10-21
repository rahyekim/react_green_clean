'use client'

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { FiAlertCircle, FiUser } from 'react-icons/fi';
import { FaSearch,  } from 'react-icons/fa';


interface TodayPatient{
    chartNo: string;
    name: string;
    phone: string;
    birthDate: string;
    gender: 'M' | 'F'
    reservationTime: string;
    status: 'CONSULTING'|'RESERVED' | 'WAITING' | 'TREATING' | 'COMPLETED' | 'CANCELLED';
    lastVisitDate: string;
    memo?: string;
}


export default function SearchModalComponent() {

  const router = useRouter();

  const [selectedClientNo, setSelectedClientNo] = useState<string|null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [patientList, setPatientList] = useState<Patient[]>(DEMO_PATIENTS);

  const filteredList = useMemo(()=>{
    const keyword = (searchTerm?? '').trim().toLowerCase();
    if(!keyword) return [];

    const matchedList= patientList.filter(
      patient=> 
        patient.name.toLowerCase().includes(keyword) || 
        patient.chartNo.toLowerCase().includes(keyword) ||
        patient.birthDate.toLowerCase().includes(keyword)  
    )

    const statusPriority : Record<Patient['status'], number> ={
      TREATING: 1,    // 1순위: 치료 중인 환자
      WAITING: 2,     // 2순위: 대기 중인 환자
      CONSULTING: 3,  // 3순위: 상담 중
      RESERVED: 4,    // 4순위: 예약 상태
      COMPLETED: 5,   // 5순위: 완료된 환자
      CANCELLED: 6,   // 6순위: 취소된 환자
    };

    return matchedList.sort((a,b)=>statusPriority[a.status] - statusPriority[b.status])

  },[searchTerm,patientList])

  const handleClick = (chartNo:string)=>{
      setSelectedClientNo(chartNo);
      router.push(`/reservation/client/${chartNo}`)
  }
  
  return (
    <Backdrop>
      <ModalContainer>
        <SearchHeader>
          <FaSearch fontSize={16}/>
          <SearchInput 
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          placeholder="환자 이름, 차트번호, 생년월일, 검색" autoFocus />
          <EscBadge>esc</EscBadge>
        </SearchHeader>

        <ResultList>
          <SectionTitle>검색 결과 {filteredList.length}건</SectionTitle>
             {filteredList.length === 0 && (
                <EmptyState>
                  <FiAlertCircle/>
                  등록된 환자가 없습니다
                  <Button>회원 예약</Button>
                </EmptyState>
              )}

            {filteredList.map(user=>(
              <ResultItem  key={user.chartNo} $active={user.name === searchTerm }
              onClick={()=>handleClick(user.chartNo)}>
                <ItemLeft>
                  <IconWrapper $gender={user.gender}>
                    <FiUser/>
                  </IconWrapper>
                  <div className="text-group">
                    <span className="title">{user.name} <small>{user.birthDate}</small></span>
                  </div>
                </ItemLeft>
                <ItemRight>
                  <StatusBadge $status={user.status}>
                    <span className="dot" />
                    {user.status}
                  </StatusBadge>
                </ItemRight>
                </ResultItem>
            ))}
        </ResultList>

        {/* 하단 푸터 */}
        <ModalFooter>
          Powered by ANH'S
        </ModalFooter>
      </ModalContainer>
    </Backdrop>
  );
}

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 250px;
  padding: 30px 16px;
  color: #94a3b8;
  text-align: center;
  > svg {
    font-size: 30px;
    color: #cbd5e1;
  }
  strong {
    color: #64748b;
    font-size: 13px;
    font-weight: 700;
  }
  span {
    font-size: 12px;
    line-height: 1.6;
  }
`;

export const Button = styled.button`
  margin-top: 6px;
  padding: 9px 14px;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  background: #eff6ff; 
  color: #2563eb;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: #dbeafe;
  }
`;

// 1. 전체 백드롭 (반투명 어두운 배경)
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  padding-top: 80px;
  z-index: 1000;
`;

// 2. 모달 컨테이너 (메인 하얀색 박스)
const ModalContainer = styled.div`
  width: 600px;
  max-height: 80vh;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction:column;
  overflow: hidden;
`;

// 3. 상단 검색 인풋 영역
const SearchHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eaeaea;

  svg {
    color: #3b82f6;
    margin-right: 12px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 18px;
  color: #333;
  background: transparent;

  &::placeholder {
    color: #9ca3af;
    font-size: 13px;
  }
`;

const EscBadge = styled.span`
  font-size: 12px;
  color: #6b7280;
  background-color: #f3f4f6;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
`;

const ResultList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 12px;
  overflow-y: auto;
  flex: 1;
`;

const IconWrapper = styled.div<{$gender: 'M'|'F'}>`
display: flex;
align-items: center;
justify-content: center;
width: 32px;
height: 32px;
border-radius: 10px;
background-color: ${({ $gender }) => ($gender === 'F' ? '#faedf4' : '#e5f1fa')};
color: ${({ $gender }) => ($gender === 'F' ? '#ec4899' : '#0284c7')};
svg {
    font-size: 16px;
  }
`;

const SectionTitle = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: #9ca3af;
  letter-spacing: -0.05px;
  padding: 8px 12px;
`;

// 5. 개별 아이템 카드
const ResultItem = styled.li<{$active:boolean}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 4px;
  cursor: pointer;
   border: 1px solid #f0f7ff;
  /* background-color: ${(props) => (props.$active ? '#f0f7ff' : '#ffffff')};  */
  background-color: #f8fafc;
  border-color: #e2e8f0;

  &:hover {
    border: 1px solid #3b82f6;
    background-color: #f0f7ff;
    /* border: 1px solid ${(props) => (props.$active ? '#3b82f6' : 'transparent')}; */
    /* background-color: ${(props) => (props.$active ? '#f0f7ff' : '#ffffff')}; */

  }
`;

const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .icon {
    color: #6b7280;
  }

  .text-group {
    display: flex;
    flex-direction: column;
    
    .title {
      font-size: 14px;
      font-weight: 500;
      color: #1f2937;
    }
    .subtitle {
      font-size: 12px;
      color: #6b7280;
    }
  }
`;

const ItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #9ca3af;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #374151;
    }
  }
`;

const StatusBadge = styled.span<{ $status: Patient['status'] }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.2px;

  background-color: ${({ $status }) => {
    switch ($status) {
      case 'COMPLETED': return '#ecfdf5'; // 연두/초록 배경
      case 'TREATING': return '#eff6ff';  // 파란 배경
      case 'WAITING': return '#fffbeb';   // 주황/노랑 배경
      case 'RESERVED': return '#f5f3ff';  // 회색 배경
      default: return '#f3f4f6';
    }
  }};

  color: ${({ $status }) => {
    switch ($status) {
      case 'COMPLETED': return '#047857';
      case 'TREATING': return '#1d4ed8';
      case 'WAITING': return '#b45309';
      case 'RESERVED': return '#6d28d9';
      default: return '#4b5563';
    }
  }};

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ $status }) => {
      switch ($status) {
        case 'COMPLETED': return '#10b981'; // 초록 불빛
        case 'TREATING': return '#3b82f6';  // 파란 불빛
        case 'WAITING': return '#f59e0b';   // 주황 불빛
        case 'RESERVED': return '#8b5cf6';  // 회색 불빛
        default: return '#9ca3af';
      }
    }};
    box-shadow: 0 0 6px ${({ $status }) => {
      switch ($status) {
        case 'COMPLETED': return 'rgba(16, 185, 129, 0.6)';
        case 'TREATING': return 'rgba(59, 130, 246, 0.6)';
        case 'WAITING': return 'rgba(245, 158, 11, 0.6)';
        case 'RESERVED': return 'rgba(139, 92, 246, 0.6)';
        default: return 'transparent';
      }
    }};
  }
`;
// 6. 하단 푸터 영역
const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid #eaeaea;
  font-size: 12px;
  color: #6b7280;
  background-color: #fafafa;
`;