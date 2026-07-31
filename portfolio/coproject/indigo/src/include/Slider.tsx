import slideImg from '../assets/images/p-images/slide01.jpg'

import { useState, useEffect } from 'react'
import axios from 'axios'

import * as S from '../'

interface CarouselItem {
    id:number,
    url:string
}
export default function  Slider () {
    
    //➡️상태관리: 백엔드에서 불러올 데이터들을 저장할 공간 
    const [bannerType, setBannerType] =useState<'single'|'carousel'>('single')
    const [singleBanner, setSingleBanner]=useState('/src/assets/images/p-images/slide01.jpg')
    const [carouselBanner, setCarouselBanner]= useState<CarouselItem[]>([])

    //현재 몇번째 슬라이드 이미지를 보여줄지 기억하는 상태(0부터시작)
    const [currentIndex, setCurrentIndex]=useState(0);
    
    useEffect(()=>{
        const fetchBannerSetting = async()=>{

            try{
               const res= await axios.get('http://localhost:5000/api/settings/banner')

               setBannerType(res.data.bannerType);
               setSingleBanner(res.data.singleBanner);
               setCarouselBanner(res.data.carouselBanner);

            }catch(err){
                console.error("배너 설정 불러오는중 에러발생: ",err)
            }
        }
        fetchBannerSetting();
    }, [])
    
    // [다음>] 화살표를 눌렀을 때 실행되는 함수
    const nextSlide = ()=>{
        setCurrentIndex(prev=>(
            prev === carouselBanner.length -1 ? 0 : prev+1
        ));
    }

    const prevSlide = ()=>{
        setCurrentIndex(prev=>(
            prev === 0 ? carouselBanner.length -1 : prev-1
        ))
    }
    
    
    return(
        
    <article className="slider">
        {bannerType === 'single' && (
            <img src={slideImg} alt="슬라이드img" />
        )}

        {/* 캐러셀 슬라이드선택했을 때 */}
        {bannerType === 'carousel' &&(
            //등록된 이미지가 1장이라도 있다면 
        <>
        {carouselBanner && carouselBanner.length>0 && (
        <>
        <img src={carouselBanner[currentIndex].url} alt="슬라이드img" />
        {/* 이전버튼 왼쪽화살표 */}
        <button onClick={prevSlide}
        style={arrowStyleLeft}
        >&#10094;</button>

        {/*다음버튼 왼쪽화살표 */}
        <button onClick={nextSlide}
        style={arrowStyleRight}
        >&#10095;</button>
        
        {/* 하단에 인디케이더 동그라미들... */}
        <div style={indicatorContainerStyle}>
            {carouselBanner.map( (_,idx)=>(
                <span key={idx}
                onClick={()=>setCurrentIndex(idx)}
                style={idx===currentIndex ? activeDotStyle : dotStyle}
                />
            ))
            }
        </div>
        </>
        )}
        {/* 캐러샐 방식을 선택햇는데 등록된 이미지가없을경우 */}
        <div className="">등록된이미지가없습니다 관리자페이지에서 이미지추가해주세요</div>
        </>
        )}
        
    </article>
    )
}
    
const arrowStyleLeft : React.CSSProperties ={

}

const arrowStyleRight : React.CSSProperties ={
    
}