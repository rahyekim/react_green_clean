'use client'

import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import * as S from './MainCarousel.styles'

interface SlideItem {
    id:number;
    fileName:string;
    title:string;
    link:string;
}

export default function MainCarousel (){

    const [slides, setSlides]=useState<SlideItem[]>([]);

    useEffect(()=>{
        const fetchSlides = async()=>{
            try{
                const res = await axios.get('http://localhost:4000/api/admin/carousel')
                if(res.data.success){
                    const dbData = res.data.data;
                    if(dbData.SLIDES && dbData.SLIDES !== '[]'){
                        setSlides(JSON.parse(dbData.SLIDES));
                    }
                }else{
                    // DB가 비어있을 때 깨지지 않도록 보여줄 기본 슬라이드 1장 세팅
                    setSlides([
                        { id: 1, fileName: "default-banner.jpg", title: "기본 배너", link: "/" }
                    ]);
                }
            }catch(err){
                console.error('메인슬라이더 조회중에러: ', err)
            }
        }
        fetchSlides();
    }, [])
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
        }, 4000);

        return ()=>clearInterval(interval);
    },[emblaApi]);
    
    return(
        <>
        <S.CarouselSection>
            <S.EmblaViewport ref={emblaRef}>
                <S.EmblaContainer>
                    {slides.map(slide=>(
                        <S.EmblaSlide key={slide.id}>
                            <Link href={slide.link || '#'}>
                                <S.SlideImg 
                                src={`http://localhost:4000/images/${slide.fileName}`} 
                                alt={slide.title}/>
                                {slide.title && (
                                    <S.SlideCopy>
                                        {slide.title}
                                    </S.SlideCopy>
                                )}
                            </Link>
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