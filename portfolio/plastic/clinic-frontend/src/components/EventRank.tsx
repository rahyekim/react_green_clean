'use client'
import React, {useRef} from 'react';
import * as S from '@/assets/css/EventRank.style';

const EVENT_DATA= [
    {id:1, rank:'1', name:'다다코성형', price:'149', img: '/images/main/circular/1.jpg',
        color:"#ffcced" , radius:'50%'
    },
     {id:2, rank:'2', name:'쁘띠성형', price:'49', img: '/images/main/circular/2.jpg',
        color:"#ffffcc" , radius:'50%'
    },
     {id:3, rank:'3', name:'레이져성형', price:'349', img: '/images/main/circular/3.jpg',
        color:"#ffcced" , radius:'50%'
    },
    {id:4, rank:'4', name:'전신성형', price:'1049', img: '/images/main/circular/4.jpg',
        color:"#ffffcc" , radius:'50%'
    }
]

// 🎯 사진의 변한 테두리 모양을 완벽하게 따라가는 텍스트 컴포넌트
const ArchTextOverlay = () => (
  <S.HoverSvg viewBox="0 0 280 340">
    {/* 
      🎯 핵심 4: 사진의 둥글어진 돔 형태를 정확히 추적하는 선
      M 15,330 (왼쪽 아래) -> L 15,140 (왼쪽 직선) -> A 125,125 (위쪽 반원) -> L 265,330 (오른쪽 직선)
    */}
    <path 
      id="archPath" 
      d="M 15,330 L 15,140 A 125,125 0 0,1 265,140 L 265,330" 
      fill="none" 
    />
    <text>
      <textPath 
        href="#archPath" 
        startOffset="50%" 
        textAnchor="middle" 
        fill="rgba(255, 255, 255, 0.9)" 
        fontSize="14" 
        fontWeight="bold"
        letterSpacing="2.5"
      >
        DA PLASTIC SURGERY DA PLASTIC SURGERY DA PLASTIC SURGERY DA PLASTIC
      </textPath>
    </text>
  </S.HoverSvg>
);
//마우스 호버시 나타날 원형 텍스트 컴포넌트
const CircularOverlay = () => (
  <S.HoverSvg viewBox="0 0 100 100">
    <path 
      id="textCircle" 
      d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" 
      fill="none" 
    />
    <text>
      <textPath 
        href="#textCircle" 
        startOffset="0" 
        fill="rgba(255, 255, 255, 0.85)" 
        fontSize="6.5" 
        fontWeight="bold"
        letterSpacing="2.5"
      >
        DA PLASTIC SURGERY DA PLASTIC SURGERY DA PLASTIC SURGERY
      </textPath>
    </text>
  </S.HoverSvg>
);

export default function EventRanking(){

    const sliderRef = useRef<HTMLDivElement>(null);

    const scroll = (direction:'left'|'right')=>{
        if(sliderRef.current){
            const scrollAmount = direction === 'left' ? -310 : 310;
            sliderRef.current.scrollBy({left:scrollAmount, behavior:'smooth'})
        } //left(가로)와 top(세로)
    }
    return(
        <S.EventSection>
            <S.EventInner>
                <S.EventHeader>
                    <S.EventTitleGroup>
                        <S.EventMainTitle>Event Ranking</S.EventMainTitle>
                        <S.EventSubTitle>원진 이벤트 랭킹</S.EventSubTitle>
                    </S.EventTitleGroup>
                    <S.EventControls>
                        <S.EventViewMoreBtn>view more</S.EventViewMoreBtn>
                        <S.EventArrowBtn onClick={()=>scroll('left')}>&lt;</S.EventArrowBtn>
                        <S.EventArrowBtn onClick={()=>scroll('right')}>&gt;</S.EventArrowBtn>
                    </S.EventControls>
                </S.EventHeader>

                <S.EventSliderWrapper ref={sliderRef}>
                    {EVENT_DATA.map(item=>(
                        <S.EventCard key={item.id}>
                            {/* 왼쪽 위로 튀어나온 랭크 뱃지 */}
                            <S.RankBadge $bgColor={item.color} $radius={item.radius}>
                                {item.rank}
                            </S.RankBadge>
                            <S.EventImgWrapper>
                                <img src={item.img} alt={item.name} />
                                <ArchTextOverlay/>
                            </S.EventImgWrapper>
                            {/* 하단 가격 정보 영역 */}
                            <S.EventInfo $bgColor={item.color}>
                                <S.SurgeryLabel>{item.name}</S.SurgeryLabel>
                                <S.EventPrice>{item.price}<span>만원</span></S.EventPrice>
                            </S.EventInfo>
                        </S.EventCard>
                    ))};
                </S.EventSliderWrapper>

            </S.EventInner>
        </S.EventSection>
    )
}