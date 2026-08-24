'use client'

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import * as S from './MainCarousel.styles'

const MAIN_SLIDES =[
    {id:1, imageUrl:'/images/main-banner1.jpg', title: '예쁘면다야!'},
    {id:2, imageUrl:'/images/banner2.jpg', title: '레이어핏 울쎄라'},
    {id:3, imageUrl:'/images/main-banner3.jpg', title: '여름시즌 한정이벤트!'},
];
export default function MainCarousel (){

    //loop:무한반복
    const [emblaRef, emblaApi]=useEmblaCarousel({loop:true});
    //좌우 화살표 핸들러
    /*
    👍존재 여부를 확인하는 방어 코드=>좋은개발습관
    컴포넌트가 맨 처음 실행되는 순간(0.00초)에emblaApi 자리가 텅 빔(undefined)
    */
    const scrollPrev = useCallback(()=>{
        if(emblaApi) emblaApi.scrollPrev();
    },[emblaApi])

    const scrollNext = useCallback(()=>{
        if(emblaApi) emblaApi.scrollNext();
    },[emblaApi])

    //3초마다 자동 슬라이드 넘어가는 기능(옵션)
    useEffect(()=>{
        if(!emblaApi) return;
        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 3000);

        return ()=>clearInterval(interval);
    },[emblaApi]);
    
    return(
        <>
        <S.CarouselSection>
            <S.EmblaViewport ref={emblaRef}>
                <S.EmblaContainer>
                    {MAIN_SLIDES.map(slide=>(
                        <S.EmblaSlide key={slide.id}>
                            <S.SlideImg src={slide.imageUrl} alt={slide.title}/>
                        </S.EmblaSlide>
                    ))}
                </S.EmblaContainer>
            </S.EmblaViewport>

            <S.NavBtn $direction="left" onClick={scrollPrev}>&lt;</S.NavBtn>
            <S.NavBtn $direction="right" onClick={scrollNext}>&gt;</S.NavBtn>
        </S.CarouselSection>
        
        </>
    )
}