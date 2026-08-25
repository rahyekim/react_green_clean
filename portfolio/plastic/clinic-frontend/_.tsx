'use client'

import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect } from "react";
import styled from "styled-components";

const MAIN_SIDES = []

export default function MainCarousel(){

    const [emblaRef, emblaApi] =useEmblaCarousel({loop:true});

    const scrollPrev = useCallback(()=>{
        if(emblaApi){
            emblaApi.scrollPrev();
        }
    },[emblaApi])

    const scrollNext = useCallback(()=>{
        if(emblaApi){
            emblaApi.scrollNext();
        }
    },[emblaApi])

    useEffect(()=>{
        if(!emblaApi) return;
        const interval = setInterval(() => {
            emblaApi.scrollNext()
        }, 3000);

        return ()=>clearInterval(interval)
    }, [emblaApi]);

    return(
        <>
        <Section>
            <Viewport ref={emblaRef}>
                <Container>
                    {MAIN_SIDES.map(slide=>(
                        <Slide key={slide.id}>
                            <Img src={slide.imgUrl} alt={slide.title} />
                        </Slide>
                    ))}
                </Container>
            </Viewport>

            <Button $direction='left'
            onClick={scrollPrev}
            >&lt;</Button>

            <Button
            $direction='right'
            onClick={scrollNext}
            >&gt;</Button>
    
        </Section>
        </>
    )
    
    
}

const Section = styled.section`
position: relative;
width: 100%;
max-width: 2440px;
margin: 0 auto;
overflow: hidden;
`;

const Viewport = styled.div`
    overflow: hidden;
    width: 100%;
`;

const Container = styled.div`
display: flex;
flex-direction: row;
width: 100%;
`

const Slide = styled.div`
    flex: 0 0 100%;
    min-width: 0;
    position: relative;
`

const Img = styled.img`
    display: block;
    width: 100%;
    object-fit: cover;
    height: 600px;

    @media (max-width: 768px) {
     height:400 px;
    }
`

const Button = styled.button<{$direction:'left'|'right'}>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${({$direction})=>$direction==='left' ? 'left: 20px;' :'right:20px;'}

    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba();
    border: none;
    font-size: 24px;

    cursor: pointer;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;

    transition: all 0.2s;

    &:hover{
        background-color:rgba() ;
        color:#333
    }

    @media (max-width: 768px) {
        width: 40;
        height: 40;
        font-size: 18px;
        ${props=>props.$direction === 'left' ? 'left:10px;' : 'right:10px;'}
    }
`