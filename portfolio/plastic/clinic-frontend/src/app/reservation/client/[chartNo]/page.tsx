'use client';

import React, { useState } from 'react';
import { FaRegCalendarCheck } from 'react-icons/fa';
import styled from 'styled-components';

interface Reservation {
  id: number;              
  chartNo: string;           
  reservationDate: string; 
  reservationTime: string;   
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
    <QnAShell>
      {/* 상단 타이틀 영역 */}
      <QnAHeader>
        <QnAKicker>Patient Reservation</QnAKicker>
        <QnATitle>
          시술 <em>예약 시스템</em>
        </QnATitle>
      </QnAHeader>

      <BookingContentGrid>
        
        {/* ================= [왼쪽] 환자 정보 및 보유/예정 시술 리스트 ================= */}
        <LeftColumn>
          <ProfileCard>
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
          </ProfileCard>

          {/* 남은 시술 리스트 카드 */}
          <ProcedureCard>
            <SectionTitle>보유/예정 시술 내역</SectionTitle>
            <ProcedureList>
              {procedures.map((item) => (
                <ProcedureItem 
                  key={item.id}
                  onClick={() => setSelectedProcedure(item)}
                  $isOpen={selectedProcedure?.id === item.id}
                >
                  <ProcedureInfoTop>
                    <ProcedureName>{item.name}</ProcedureName>
                    <StatusBadge>{item.status}</StatusBadge>
                  </ProcedureInfoTop>
                  <ProcedureDate>예정일: {item.date}</ProcedureDate>
                </ProcedureItem>
              ))}
            </ProcedureList>
          </ProcedureCard>
        </LeftColumn>

        {/* ================= [오른쪽] 예약 캘린더 및 시간대 선택 ================= */}
        <RightColumn>
          <BookingFormCard>
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
                      $active={selectedTime === time}
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
          </BookingFormCard>
        </RightColumn>

      </BookingContentGrid>
    </QnAShell>
  );
};

export default PatientBookingPage;

/* ================= 새로 요청하신 스타일 시스템 적용 ================= */

export const QnAShell = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(40px, 6vw, 80px) clamp(20px, 4vw, 40px);
  color: #283c2d;
`;

export const QnAHeader = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

export const QnAKicker = styled.p`
  font-size: 11px;
  color: #6d896f;
  letter-spacing: 0.22em;
  font-weight: 600;
  margin: 0 0 12px;
  text-transform: uppercase;
`;

export const QnATitle = styled.h2`
  font: 400 clamp(28px, 3.5vw, 42px)/1.15 Georgia, "Times New Roman", serif;
  letter-spacing: -0.04em;
  color: #284b37;
  margin: 0;

  em {
    font-style: italic;
    font-weight: 400;
    color: #6d896f;
  }
`;

const BookingContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-width: 0;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
`;

const ProfileCard = styled.div`
  border: 1px solid #dfe7dd;
  border-radius: 12px;
  background: #fffefa;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(40, 75, 55, 0.04);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  width: 52px;
  height: 52px;
  background-color: #edf2eb;
  color: #284b37;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Georgia, serif;
  font-weight: 600;
  font-size: 1.2rem;
`;

const PatientName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #284b37;
  margin: 0 0 4px 0;
  letter-spacing: -0.02em;
`;

const PatientPhone = styled.p`
  font-size: 13.5px;
  color: #526555;
  margin: 0;
`;

const ProfileFooter = styled.div`
  padding-top: 16px;
  border-top: 1px solid rgba(223, 231, 221, 0.6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13.5px;
  color: #283c2d;
`;

const GradeBadge = styled.span`
  background: #edf2eb;
  color: #284b37;
  padding: 4px 10px;
  border-radius: 21px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  border: 1px solid #dfe7dd;
`;

const ProcedureCard = styled.div`
  border: 1px solid #dfe7dd;
  border-radius: 12px;
  background: #fffefa;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(40, 75, 55, 0.04);
`;

const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: 700;
  color: #284b37;
  margin: 0 0 16px 0;
  letter-spacing: -0.02em;
`;

const ProcedureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProcedureItem = styled.div<{ $isOpen: boolean }>`
  padding: 16px;
  border: 1px solid ${({ $isOpen }) => ($isOpen ? "#8daa91" : "#dfe7dd")};
  border-radius: 10px;
  background: ${({ $isOpen }) => ($isOpen ? "#fffefa" : "#fbfcf9")};
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${({ $isOpen }) => ($isOpen ? "0 4px 12px rgba(40, 75, 55, 0.04)" : "none")};

  &:hover {
    border-color: #8daa91;
    background: #fffefa;
  }
`;

const ProcedureInfoTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const ProcedureName = styled.span`
  font-weight: 600;
  color: #283c2d;
  font-size: 14px;
  letter-spacing: -0.01em;
`;

const StatusBadge = styled.span`
  font-size: 11.5px;
  padding: 3px 10px;
  background-color: #edf2eb;
  color: #566e5a;
  border-radius: 21px;
  border: 1px solid #dfe7dd;
  font-weight: 500;
`;

const ProcedureDate = styled.p`
  font-size: 12.5px;
  color: #526555;
  margin: 0;
`;

const BookingFormCard = styled.div`
  border: 1px solid #dfe7dd;
  border-radius: 12px;
  background: #fffefa;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(40, 75, 55, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const HeaderTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  color: #284b37;
  font-size: 1.1rem;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 13.5px;
  font-weight: 600;
  color: #283c2d;
  margin-bottom: 10px;
  letter-spacing: -0.01em;
`;

const DateInput = styled.input`
  width: 100%;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid #dfe7dd;
  border-radius: 10px;
  font-size: 13.5px;
  background-color: #fbfcf9;
  color: #283c2d;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:focus {
    border-color: #284b37;
    background-color: #fffefa;
    box-shadow: 0 0 0 2px rgba(109, 137, 111, 0.15);
  }
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TimeButton = styled.button<{ $active: boolean }>`
  min-height: 42px;
  padding: 0 12px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  border: 1px solid ${({ $active }) => ($active ? "#284b37" : "#dfe7dd")};
  background: ${({ $active }) => ($active ? "#284b37" : "#f9faf6")};
  color: ${({ $active }) => ($active ? "#f7f7ef" : "#566e5a")};

  &:hover {
    border-color: #284b37;
    background: ${({ $active }) => ($active ? "#284b37" : "#f0f4ee")};
  }

  &:focus-visible {
    outline: 2px solid #6d896f;
    outline-offset: 2px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  min-height: 48px;
  padding: 0 24px;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #284b37;
  background: #284b37;
  color: #f7f7ef;
  box-shadow: 0 4px 12px rgba(40, 75, 55, 0.15);
  margin-top: 12px;

  &:hover {
    background: #1f3729;
    border-color: #1f3729;
  }

  &:focus-visible {
    outline: 2px solid #6d896f;
    outline-offset: 2px;
  }
`;