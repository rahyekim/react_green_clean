'use client';

import React, { useState } from 'react';
import { FaRegCalendarCheck } from 'react-icons/fa';
import styled from 'styled-components';

interface Reservation {
  id: number;              
  chartNo: string;           
  reservationDate: string; //'2026-10-21'
  reservationTime: string;   //14:30
  status: 'RESERVED' | 'WAITING' | 'TREATING' | 'COMPLETED' | 'CANCELLED' | 'CONSULTING';
  memo?: string;         
}

const PatientBookingPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedProcedure, setSelectedProcedure] = useState<any>(null);

  const patient = {
    name: '황현진',
    phone: '010-1234-5678',
    grade: 'VIP',
  };

  const procedures = [
    { id: 1, name: '사각턱 보톡스', status: '예약 완료', date: '2026-10-25' },
    { id: 2, name: '슈링크 리프팅', status: '시술 대기', date: '2026-11-02' },
  ];

  const timeSlots = ['10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  return (
    <PageContainer>
      <ContentWrapper>
        
        {/* ================= [왼쪽] 환자 정보 및 보유/예정 시술 리스트 ================= */}
        <LeftSection>
          <Card>
            <ProfileHeader>
              <Avatar>{patient.name[0]}</Avatar>
              <div>
                <PatientName>{patient.name} 환자님</PatientName>
                <PatientPhone>{patient.phone}</PatientPhone>
              </div>
            </ProfileHeader>
            <ProfileFooter>
              <span>회원 등급</span>
              <GradeBadge>{patient.grade}</GradeBadge>
            </ProfileFooter>
          </Card>

          {/* 남은 시술 리스트 카드 */}
          <Card>
            <SectionTitle>보유/예정 시술 내역</SectionTitle>
            <ProcedureList>
              {procedures.map((item) => (
                <ProcedureItem 
                  key={item.id}
                  onClick={() => setSelectedProcedure(item)}
                  $isSelected={selectedProcedure?.id === item.id}
                >
                  <ProcedureInfoTop>
                    <ProcedureName>{item.name}</ProcedureName>
                    <StatusBadge>{item.status}</StatusBadge>
                  </ProcedureInfoTop>
                  <ProcedureDate>예정일: {item.date}</ProcedureDate>
                </ProcedureItem>
              ))}
            </ProcedureList>
          </Card>
        </LeftSection>

        {/* ================= [오른쪽] 예약 캘린더 및 시간대 선택 ================= */}
        <RightSection>
          <div>
            <HeaderTitleWrapper>
              <FaRegCalendarCheck /> 
              <SectionTitle style={{ margin: 0 }}>시술 예약일시 선택</SectionTitle>
            </HeaderTitleWrapper>

            {/* 캘린더 영역 */}
            <InputGroup>
              <Label>날짜 선택</Label>
              <DateInput 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </InputGroup>

            {/* 시간대별 버튼 영역 */}
            <InputGroup>
              <Label>예약 가능 시간</Label>
              <TimeGrid>
                {timeSlots.map((time) => (
                  <TimeButton
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    $isSelected={selectedTime === time}
                  >
                    {time}
                  </TimeButton>
                ))}
              </TimeGrid>
            </InputGroup>
          </div>

          {/* 하단 예약 확정 버튼 */}
          <SubmitButton 
            onClick={() => alert(`예약 완료: ${selectedDate} ${selectedTime}`)}
          >
            예약 확정하기
          </SubmitButton>
        </RightSection>

      </ContentWrapper>
    </PageContainer>
  );
};

export default PatientBookingPage;

/* ================= Styled-components 스타일 정의 (QnA 테마 적용) ================= */

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #fbfcf9;
  color: #283c2d;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  gap: 20px;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  background-color: #fffefa;
  border-radius: 12px;
  border: 1px solid #e1e8de;
  box-shadow: 0 10px 30px rgba(40, 75, 55, 0.04);
  padding: 1.5rem;
  justify-content: space-between;
`;

const Card = styled.div`
  border-radius: 12px;
  background-color: #fffefa;
  border: 1px solid #e1e8de;
  box-shadow: 0 10px 30px rgba(40, 75, 55, 0.04);
  padding: 1.5rem;
  width: 100%;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  background-color: #edf2eb;
  color: #284b37;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
`;

const PatientName = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: #284b37;
  margin: 0 0 4px 0;
`;

const PatientPhone = styled.p`
  font-size: 0.85rem;
  color: #858796;
  margin: 0;
`;

const ProfileFooter = styled.div`
  padding-top: 16px;
  border-top: 1px solid #e1e8de;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #283c2d;
`;

const GradeBadge = styled.span`
  background: #edf2eb;
  color: #284b37;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
`;

const HeaderTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1.5rem;
  color: #284b37;
  font-size: 1.1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #284b37;
  margin: 0 0 16px 0;
`;

const ProcedureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProcedureItem = styled.div<{ $isSelected?: boolean }>`
  padding: 14px;
  border-radius: 10px;
  border: 1px solid ${props => props.$isSelected ? '#284b37' : '#e1e8de'};
  background-color: ${props => props.$isSelected ? '#edf2eb' : '#fffefa'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #6d896f;
    background-color: #edf2eb;
  }
`;

const ProcedureInfoTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const ProcedureName = styled.span`
  font-weight: 600;
  color: #283c2d;
  font-size: 0.95rem;
`;

const StatusBadge = styled.span`
  font-size: 11px;
  padding: 3px 8px;
  background-color: #fffefa;
  border: 1px solid #e1e8de;
  color: #284b37;
  border-radius: 50px;
  font-weight: 600;
`;

const ProcedureDate = styled.p`
  font-size: 0.8rem;
  color: #858796;
  margin: 0;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  color: #283c2d;
  font-weight: 600;
  font-size: 0.95rem;
`;

const DateInput = styled.input`
  border-radius: 10px;
  outline: none;
  border: 1px solid #e1e8de;
  padding: 14px;
  width: 100%;
  background-color: #fffefa;
  color: #283c2d;
  font-size: 0.95rem;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    border-color: #6d896f;
  }
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TimeButton = styled.button<{ $isSelected?: boolean }>`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${props => props.$isSelected ? '#284b37' : '#e1e8de'};
  background-color: ${props => props.$isSelected ? '#284b37' : '#fffefa'};
  color: ${props => props.$isSelected ? '#fffefa' : '#283c2d'};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.$isSelected ? '0 4px 12px rgba(40, 75, 55, 0.15)' : 'none'};

  &:hover {
    background-color: ${props => props.$isSelected ? '#1f3729' : '#edf2eb'};
    border-color: ${props => props.$isSelected ? '#1f3729' : '#6d896f'};
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #284b37;
  color: #fffefa;
  border-radius: 10px;
  outline: none;
  border: none;
  padding: 0.9rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(40, 75, 55, 0.15);
  transition: all 0.2s ease;
  margin-top: auto;

  &:hover {
    background-color: #1f3729;
  }
`;