'use client';
import React, { useState } from 'react';
import { FaCalendar, FaCalendarAlt, FaCalendarCheck, FaRegCalendarCheck } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
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
  const [selectedProcedure, setSelectedProcedure] = useState(null);

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
            <div>
            <FaRegCalendarCheck/> 
            <SectionTitle>시술 예약일시 선택</SectionTitle>
            </div>
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

/* ================= Styled-components 스타일 정의 ================= */

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 24px;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

const LeftSection = styled.div`
  @media (min-width: 768px) {
    grid-column: span 4;
  }
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RightSection = styled.div`
  @media (min-width: 768px) {
    grid-column: span 8;
  }
  background-color: #ffffff;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #f3f4f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Card = styled.div`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #f3f4f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const Avatar = styled.div`
  width: 56px;
  height: 56px;
  background-color: #fce7f3;
  color: #db2777;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
`;

const PatientName = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 4px 0;
`;

const PatientPhone = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

const ProfileFooter = styled.div`
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
`;

const GradeBadge = styled.span`
  font-weight: 600;
  color: #db2777;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;
`;

const ProcedureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProcedureItem = styled.div`
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${props => props.$isSelected ? '#db2777' : '#f3f4f6'};
  background-color: ${props => props.$isSelected ? '#fdf2f8' : '#ffffff'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #f472b6;
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
  color: #1f2937;
`;

const StatusBadge = styled.span`
  font-size: 12px;
  padding: 4px 8px;
  background-color: #f3f4f6;
  color: #4b5563;
  border-radius: 9999px;
`;

const ProcedureDate = styled.p`
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: #f472b6;
    box-shadow: 0 0 0 2px rgba(244, 114, 182, 0.2);
  }
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const TimeButton = styled.button`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${props => props.$isSelected ? '#db2777' : '#e5e7eb'};
  background-color: ${props => props.$isSelected ? '#db2777' : '#ffffff'};
  color: ${props => props.$isSelected ? '#ffffff' : '#374151'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.$isSelected ? '0 4px 6px -1px rgba(219, 39, 119, 0.2)' : 'none'};

  &:hover {
    background-color: ${props => props.$isSelected ? '#db2777' : '#f9fafb'};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #db2777;
  color: #ffffff;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(219, 39, 119, 0.2);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #be185d;
  }
`;
