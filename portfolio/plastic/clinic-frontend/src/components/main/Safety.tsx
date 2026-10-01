'use client'

import React, { useRef,useState, useEffect} from 'react'
import axios from 'axios';
import * as S from '@/assets/css/safety.style'

// 💡 안전마취 임시 데이터
const SAFETY_DATA = [
  { 
    id: 1, 
    title: 'EtCO2 모니터링', 
    desc: '마취통증의학과 전문의가 수술 전부터 수술 후 의식을 회복할 때까지 환자의 호흡과 맥박 등 상태 체크', 
    img: '/images/main/safety/s01.png' 
  },
  { 
    id: 2, 
    title: '악성 고열증 대비\n특수치료제 단트롤렌 보유', 
    desc: '단트롤렌 보유로 마취통증의학과 전문의의 신속한 치료가 가능하게 합니다.', 
    img: '/images/main/safety/s02.png' 
  },
  { 
    id: 3, 
    title: '심장충격기 및\n응급키트 구비', 
    desc: '응급의료에 관한 법률에 의거하여 심장충격기와 응급키트를 구비해 응급 상황 발생 시 신속히 대처 가능', 
    img: '/images/main/safety/s03.png' 
  },
  { 
    id: 4, 
    title: '무정전 전원장치\nUPS 시스템', 
    desc: '갑작스러운 정전에도 수술 장비가 멈추지 않도록 무정전 전원 공급 장치 완비', 
    img: '/images/main/safety/s04.png' 
  },
];

// 📋 [타입 정의] 백엔드에서 받아올 안전마취 데이터의 구조 정의
interface SafetyData {
    id: number;
    title: string;
    desc: string;
    img: string;
}
export default function Safety(){

    const sliderRef = useRef<HTMLDivElement>(null);

    // 🗂️ [상태 관리] 백엔드에서 불러온 안전마취 데이터 목록 저장
    const [safetyList, setSafetyList] = useState<SafetyData[]>([]);

    useEffect(() => {
        const fetchSafetyData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/admin/safety");
                if (response.data.success) {
                    // DB 컬럼명을 프론트엔드에서 쓰기 편하게 매핑 및 이미지 경로 완성 🔄
                    const formatted = response.data.data.map((item: any) => ({
                        id: item.SAFETY_IDX,
                        title: item.TITLE,
                        desc: item.DESCRIPTION,
                        img: `http://localhost:4000/images/${item.FILE_NAME}` // 실제 서버 이미지 파일 경로
                    }));
                    setSafetyList(formatted);
                }
            } catch (error) {
                console.error("안전마취 데이터 로드 실패 ❌", error);
            }
        };

        fetchSafetyData();
    }, []);
    const scroll = (direction:'left'|'right')=>{
        const amount= direction === 'left' ? -320 : +320;
        sliderRef.current?.scrollBy({left:amount, behavior:'smooth'})
    }
    return(
        <S.SafetySection>
            <S.SafetyInner>
                <S.SafetyHeader>
                    <S.SafetyTitleGroup>
                        <S.SafetyMainTitle>Ahn's 안전마취</S.SafetyMainTitle>
                    </S.SafetyTitleGroup>

                    <S.SafetyControls>
                        <S.SafetyViewMoreBtn>view more +</S.SafetyViewMoreBtn>
                        <S.SafetyArrowBtn onClick={()=>scroll('left')}>&lt;</S.SafetyArrowBtn>
                        <S.SafetyArrowBtn onClick={()=>scroll('right')}>&gt;</S.SafetyArrowBtn>
                    </S.SafetyControls>
                </S.SafetyHeader>

                <S.SliderWrapper ref={sliderRef}>
                    {safetyList.map(item=>(
                        <S.SafetyCard key={item.id}>
                            {/* 카드 배경 이미지 */}
                            <S.SafetyImg 
                            src={item.img} 
                            alt={item.title.replace('\n','')}/>
                            <S.TextOverlay>
                                <S.CardTitle>
{/* 타이틀에 줄바꿈 문자(\n)가 포함되어 있을 경우 자동 개행(\n -> <br />) 처리 */}
                                    {item.title.split('\n').map((line,idx)=>(
                                    <React.Fragment key={idx}>
                                        {line}<br/>
                                    </React.Fragment>
                                ))}
                                </S.CardTitle>
                                <S.CardDesc>{item.desc}</S.CardDesc>
                            </S.TextOverlay>
                        </S.SafetyCard>
                    ))}
                </S.SliderWrapper>
            </S.SafetyInner>
        </S.SafetySection>
    )
}