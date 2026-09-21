'use client'

import React, { useState } from 'react'
import * as S from '@/assets/css/admin/Admin.common'
import { FiUserPlus,FiPhoneCall,FiSearch, FiAlertOctagon } from 'react-icons/fi'

export default function Root(){

    return(
        <>
        <S.DashContainer>
            <S.DashPageTitle>대시보드 종합통계</S.DashPageTitle>

            <S.DashCardGrid>

                 {/* 1. 회원가입 현황 */}
                <S.DashSummaryCard $borderColor='#4e73df'>
                    <S.DashCardInfo>
                        <S.DashCardLabel $textColor='#4e73df'>회원가입 현황(일일)</S.DashCardLabel>
                        <S.DashCardMainValue>125명</S.DashCardMainValue>

                        <S.DashCardSubGrid>
                            <S.DashCardSubItem>
                                <span>주간:</span><strong>840명</strong>
                            </S.DashCardSubItem>

                            <S.DashCardSubItem>
                                <span>월간:</span><strong>3,210명</strong>
                            </S.DashCardSubItem>
                        </S.DashCardSubGrid>
                    </S.DashCardInfo>
                    <S.DashIconWrapper>
                        <FiUserPlus size={36} color='#dddfeb'/>
                    </S.DashIconWrapper>
                </S.DashSummaryCard>

                {/* 2. 퀵 상담 및 매출 전환 카드 */}
                <S.DashSummaryCard $borderColor="#1cc88a">
                    <S.DashCardInfo>
                        <S.DashCardLabel $textColor="#1cc88a">일일 퀵상담률</S.DashCardLabel>
                        <S.DashCardMainValue>45.2 %</S.DashCardMainValue>
                        <S.DashCardSubGrid>
                            <S.DashCardSubItem style={{ width: '100%' }}>
                                <span>상담 후 매출 전환율:</span> <strong>18.5 %</strong>
                            </S.DashCardSubItem>
                        </S.DashCardSubGrid>
                    </S.DashCardInfo>
                    <S.DashIconWrapper>
                        <FiPhoneCall size={36} color="#dddfeb" />
                    </S.DashIconWrapper>
                </S.DashSummaryCard>

                {/* 3. 유입 채널 통계 카드 */}
                <S.DashSummaryCard $borderColor="#36b9cc">
                    <S.DashCardInfo>
                        <S.DashCardLabel $textColor="#36b9cc">총 유입량 (일일)</S.DashCardLabel>
                        <S.DashCardMainValue>8,420 건</S.DashCardMainValue>
                        <S.DashCardSubGrid>
                            <S.DashCardSubItem>
                                <span>네이버:</span> <strong>5,100 건</strong>
                            </S.DashCardSubItem>
                            <S.DashCardSubItem>
                                <span>기타(구글 등):</span> <strong>3,320 건</strong>
                            </S.DashCardSubItem>
                        </S.DashCardSubGrid>
                    </S.DashCardInfo>
                    <S.DashIconWrapper>
                        <FiSearch size={36} color="#dddfeb" />
                    </S.DashIconWrapper>
                </S.DashSummaryCard>

                {/* 4. 클레임률 통계 카드 (일/주/월) */}
                <S.DashSummaryCard $borderColor="#e74a3b">
                    <S.DashCardInfo>
                        <S.DashCardLabel $textColor="#e74a3b">클레임률 (일간)</S.DashCardLabel>
                        <S.DashCardMainValue>1.2 %</S.DashCardMainValue>
                        <S.DashCardSubGrid>
                            <S.DashCardSubItem>
                                <span>주간:</span> <strong>1.5 %</strong>
                            </S.DashCardSubItem>
                            <S.DashCardSubItem>
                                <span>월간:</span> <strong>1.1 %</strong>
                            </S.DashCardSubItem>
                        </S.DashCardSubGrid>
                    </S.DashCardInfo>
                    <S.DashIconWrapper>
                        <FiAlertOctagon size={36} color="#dddfeb" />
                    </S.DashIconWrapper>
                </S.DashSummaryCard>
            </S.DashCardGrid>

            <S.DashBottom>
            <div style={{ padding: '2rem', color: '#858796' }}>
                추후 이곳에 상세 그래프(Chart.js 등)나 최근 접수된 상담 목록 테이블이 배치될 수 있습니다.
            </div>
            </S.DashBottom>
        </S.DashContainer>
        </>
    )
}