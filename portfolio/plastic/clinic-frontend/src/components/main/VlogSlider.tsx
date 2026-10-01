'use client'
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import * as S from '@/assets/css/VlogSlider.styles'

interface VlogData {
    id: number;
    desc: string;     // 영상 제목 (DB의 TITLE 매핑)
    img: string;      // 썸네일 이미지 경로 (서버 URL + 파일명)
    videoUrl: string; // 클릭 시 이동할 유튜브 영상 링크
}
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

    const [vlogs, setVlogs] = useState<VlogData[]>([]);

    useEffect(() => {
        const fetchVlogs = async () => {
            try {
                // 🌐 백엔드 API 호출 (SORT_ORDER 순으로 정렬된 데이터를 가져옴)
                const res = await axios.get("http://localhost:4000/api/admin/vlogs");
                if (res.data.success) {
                    // 📦 백엔드 필드명을 프론트엔드 인터페이스 구조에 맞게 변환 (데이터 매핑)
                    const formatted = res.data.data.map((item: any) => ({
                        id: item.VLOG_IDX,
                        desc: item.TITLE, // DB의 TITLE -> desc로 변환
                        img: `http://localhost:4000/images/${item.FILE_NAME}`, // 이미지 풀 경로 조합 📸
                        videoUrl: item.VIDEO_URL
                    }));
                    setVlogs(formatted); // 변환된 데이터를 상태에 저장 ✨
                }
            } catch (error) {
                console.error("VLOG 데이터 로드 실패 ❌:", error);
            }
        };

        fetchVlogs();
    }, []);

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
               {vlogs.map(item=>(
                <S.VlogCard key={item.id}>
                    {/* 🔗 카드를 클릭하면 새 탭으로 유튜브 영상 링크가 열리도록 <a> 태그 적용 */}
                    <a
                    href={item.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                    >  {/* 썸네일 이미지 영역 */}
                        <S.VlogImageWrapper>
                            <img src={item.img} alt={`브이로그-${item.id}`} />
                        </S.VlogImageWrapper>
                        {/* 영상 제목/설명 영역 */}
                        <S.VlogInfo>
                            <S.VlogDesc>{item.desc}</S.VlogDesc>
                        </S.VlogInfo>
                    </a>
                </S.VlogCard>
               ))}
               {/* ⚠️ 등록된 데이터가 아예 없을 때 보여줄 안내 문구 */}
                {vlogs.length === 0 && (
                    <div style={{ padding: '3rem', color: '#999' }}>등록된 영상이 없습니다. ⚠️</div>
                )}
            </S.VlogSliderWrapper>
        </S.VlogInner>

    </S.VlogSection>
    )
}