'use client'

import { useRef } from "react";
import * as S from '@/assets/css/Selfi.styles';


//슬라이더에 들어갈 임시 데이터배열

const SELFIE_DATA=[
    {id:1, img:'/images/main/selfie/selfie1.jpg', likes:'892', views: '7,921'},
    {id:2, img:'/images/main/selfie/selfie2.png', likes:'92', views: '1,921'},
    {id:3, img:'/images/main/selfie/selfie3.jpg', likes:'192', views: '6,921'},
    {id:4, img:'/images/main/selfie/selfie4.jpg', likes:'8000', views: '18,921'},
    {id:5, img:'/images/main/selfie/selfie5.jpg', likes:'6', views: '921'},
    {id:6, img:'/images/main/selfie/selfie6.jpg', likes:'9999', views: '117,921'},
]

export default function Selfied (){
    //가로스크롤 영역 조작하기 위한 훅

    const sliderRef = useRef<HTMLDivElement>(null);
    //화살표 클릭시 좌우로 300px씩 스크롤하는 함수
    const scroll = (direction: 'left' | 'right')=>{
        if(sliderRef.current){
            const scrollAmount = direction === 'left' ? -300 :300;
            sliderRef.current.scrollBy({left:scrollAmount, behavior: "smooth"});
        }
    };

    return(
        <S.SlideSection>
            <S.SlideInner>
                <S.SlideHeader>
                    <S.SlideTitleGroup>
                        <S.SlideMainTitle>셀피</S.SlideMainTitle>
                        <S.SlideSubTitle>SELFIED</S.SlideSubTitle>
                    </S.SlideTitleGroup>

                    <S.SlideControls>
                        <S.SlideViewMoreBtn>view more</S.SlideViewMoreBtn>
                        <S.SlideArrowBtn
                        onClick={()=>scroll('left')}
                        >&lt;</S.SlideArrowBtn>
                        <S.SlideArrowBtn
                        onClick={()=>scroll('right')}
                        >&gt;</S.SlideArrowBtn>
                    </S.SlideControls>
                </S.SlideHeader>
            
            {/* 사진 슬라이더영역 */}
                <S.SelfieSlideWrapper ref={sliderRef}>
                    {SELFIE_DATA.map(item=>(
                        <S.SelfieCard key={item.id}>
                            <img src={item.img} alt={`selfie${item.id}`}/>
                            <S.SelfieCardOverlay>
                                <S.SelfieLikeBadge>
                                    <span>♥</span>{item.likes}
                                </S.SelfieLikeBadge>
                                <S.SelfieViewCount>
                                    <S.AccentText>{item.views}명</S.AccentText>
                                   이 보고있어요
                                    <S.Selfied>SELFIED</S.Selfied>
                                </S.SelfieViewCount>
                            </S.SelfieCardOverlay>
                        </S.SelfieCard>
                    ))}
                </S.SelfieSlideWrapper>
            
            </S.SlideInner>
        </S.SlideSection>
    )
}