'use client'

import  React, { useRef } from 'react'
import * as S from '@/assets/css/vlogSlider.styles'

//브이로그 임시데이터
const VLOG_DATA = [
  { id: 1, desc: '답답했던 눈매·복코·얼굴살 완벽 개선', img: '/images/main/vlog/vlog1.jpg' },
  { id: 2, desc: '광대·사각턱·이중턱 싹 지우고 여신 등극', img: '/images/main/vlog/vlog2.jpg' },
  { id: 3, desc: '"성형 어디서 했냐고 DM 폭발" 그 비결은?', img: '/images/main/vlog/vlog3.jpg' },
  { id: 4, desc: '광대 싹 밀고 눈·가슴까지 다 갈아엎은 썰', img: '/images/main/vlog/vlog4.jpg' },
  { id: 5, desc: '턱밑 지방이랑 광대 싹 지우고 V라인 완성', img: '/images/main/vlog/vlog5.jpg' },
]
export default function VlogSlider (){

    //슬라이더 (가로스크롤영역)의 실제 html dom 요소에 직접 접근하기 
    const slideRef = useRef<HTMLDivElement>(null);
    //화살표 버튼을 누를때 실행될 스크롤 조작함수 ('left'또는 'right'를 인자로받음)
    const scroll = (direction: 'left' | 'right')=>{
        
    //sliderRef.current가 존재하는지(화면에 슬라이더 요소가 정상적으로 렌더링되어 잡혔는지를)안전하게 확인
    //if(slideRef.current){} =? ?. 옵셔널체이닝대체
    //💘260인 이유: 카드 1개의 너비(240px)+카드사이 여백(20px)을 합쳐서 딱 한칸 씩만 정확하게 넘어가도록 계산한 값
        const amount = direction === 'left' ? -260: +260;
        //자바스크립트 내장 DOM API인 scollBy()를 사용->설정한이동량(scrollAmount)만큼 스크롤바를 이동시킴
        slideRef.current?.scrollBy({left:amount, behavior:'smooth'})
    }
    
    return(
    <S.VlogSection>
        <S.VlogInner>
                {/* 헤더 영역 (타이틀 및 컨트롤 버튼)*/}
            <S.VlogHeader>
                <S.VlogTitleGroup>
                    <S.VlogMainTitle>Ahn's VLOG.</S.VlogMainTitle>
                </S.VlogTitleGroup>
                <S.VlogControls>
                    <S.VlogViewMoreBtn>view more+</S.VlogViewMoreBtn>
                    <S.VlogArrowBtn onClick={()=>scroll('left')}>&lt;</S.VlogArrowBtn>
                    <S.VlogArrowBtn onClick={()=>scroll('right')}>&gt;</S.VlogArrowBtn>
                </S.VlogControls>
            </S.VlogHeader>

            {/* 슬라이더 영역 */}
            <S.VlogSliderWrapper ref={slideRef}>
               {VLOG_DATA.map(item=>(
                <S.VlogCard key={item.id}>
                    <S.VlogImageWrapper>
                        <img src={item.img} alt={`브이로그-${item.id}`} />
                    </S.VlogImageWrapper>
                    <S.VlogInfo>
                        <S.VlogDesc>{item.desc}</S.VlogDesc>
                    </S.VlogInfo>
                </S.VlogCard>
               ))}
            </S.VlogSliderWrapper>
        </S.VlogInner>

    </S.VlogSection>
    )
}