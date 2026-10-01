'use client'

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import * as S from '@/assets/css/Selfi.styles';

interface SelfieData {
    id: number;
    img: string;
    likes: number;
    views: number;
}
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

    //백엔드에서 불러온 셀피 목록을 담는 바구니
    const [selfies, setSelfies] = useState<SelfieData[]>([]);

    useEffect(() => {
        const fetchSelfies = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/admin/selfies");
                if (response.data.success) {
                    // 🚀관리자가 '노출중(Y)'으로 설정한 데이터만 쏙 골라내기 (숨김 처리된 것 제외!)
                    const activeSelfies = response.data.data.filter((s: any) => s.IS_ACTIVE === 'Y');
                    
                    const formatted = activeSelfies.map((s: any) => ({
                        id: s.SELFIE_IDX,
                        img: `http://localhost:4000/images/${s.FILE_NAME}`, // 이미지 주소 조합
                        likes: s.LIKES,
                        views: s.VIEWS
                    }));
                    setSelfies(formatted);
                }
            } catch (error) {
                console.error("셀피 데이터 로드 실패 ❌:", error);
            }
        };

        fetchSelfies();
    }, []);
    
    
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
                        <S.SlideSubTitle>SELFIES</S.SlideSubTitle>
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
                    {selfies.map(item=>(
                        <S.SelfieCard key={item.id}>
                            <img src={item.img} alt={`selfie${item.id}`}/>

                            {/* 이미지 위에 겹쳐지는 오버레이 (좋아요 & 조회수 정보) */}
                            <S.SelfieCardOverlay>
                                <S.SelfieLikeBadge>
                                    <span>♥</span>{item.likes.toString()}
                                </S.SelfieLikeBadge>
                                <S.SelfieViewCount>
                                    <S.AccentText>👀 {item.views.toString()}명</S.AccentText>
                                   이 보고있어요
                                    <S.Selfied>SELFIES</S.Selfied>
                                </S.SelfieViewCount>
                            </S.SelfieCardOverlay>
                        </S.SelfieCard>
                    ))}
                    {selfies.length === 0 &&(
                        <div style={{ padding: '2rem', color: '#999' }}>등록된 셀피가 없습니다. ⚠️</div>
                    )}
                </S.SelfieSlideWrapper>
            
            </S.SlideInner>
        </S.SlideSection>
    )
}