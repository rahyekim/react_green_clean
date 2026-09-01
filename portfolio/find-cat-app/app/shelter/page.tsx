'use client'
import { useState, useEffect } from "react"
import Link from 'next/link';
import axios from "axios";

import * as S from './shleter.sytles';
import * as A from '@/css/style.styled';
import Footer from "../components/Footer";

//Mui
import { 
    NotificationsNone as NotificationsNoneIcon,
    NotificationAddOutlined as NotificationIcon,
    TuneOutlined as FilterIcon,
    FmdGood as LocationIcon,
    PlayCircleFilled as PlayIcon,
    ChevronRight  as ChevronRightIcon,
 } from "@mui/icons-material";

 //백엔드에서 받아올 데이터 타입정의
 interface Animal{
    id: number;
    status: 'ACTIVE' | 'COMPLETED';
    gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
    breed: string;
    noticeNo: string;
    regDate: string;
    rescueLocation: string;
    content:string;
    imageUrl:string;

 }
export default function Shelter(){

    const [activeTap, setActiveTap]=useState('보호동물');
    const [isAlertOn, setIsAlertOn]=useState(false);

    //백엔드에서 가져온 동물 리스트 담을 상태
    const [animals, setAnimals]=useState<Animal[]>([]);

    useEffect(()=>{

        const fetchAnimals =async()=>{
            
            try{
                const res = await axios.get('http://localhost:8080/api/shelter-animals');
                if(res){
                    setAnimals(res.data)
                }
            }catch(err){
                console.error('동물데이터를 불러오는데 실패했습니다', err)
            }
        }
        fetchAnimals();
    }, []);

    //이미지 주소 변환함수
    const getFullImgUrl = (url:string)=>{
        if(!url) return 'http://via.placeholder.com/110'
        if(url.startsWith('/uploads/')){
            return `http://localhost:8080${url}`;
        }
        return url;
    }
    
    return(
        <>
        <A.AppWrapper>
            <A.Container>
            <A.Header>
                <A.Logo>어서 찾아주개냥</A.Logo>
                <NotificationsNoneIcon fontSize="large"/>
            </A.Header>
            
            <A.MT70></A.MT70>
                <S.TabContainer>
                {/* 탭영역 */}
                {['보호동물', '보호소찾기', '추천입양동물'].map(tab=>(
                    <S.TabBtn key={tab} 
                    $active={activeTap===tab}
                    onClick={()=>setActiveTap(tab)}
                    >{tab}</S.TabBtn>
                ))}
                </S.TabContainer>

                {/*필터영역 */}
                <S.FilterContainer>
                    <S.FilterIconBtn>
                        <FilterIcon sx={{fontSize:'20px', color:'#666'}}/>
                    </S.FilterIconBtn>

                    <S.FilterSelect defaultValue="3months">
                        <option value="3months">최근 3개월</option>
                    </S.FilterSelect>

                    <S.FilterSelect defaultValue="allArea">
                        <option value="allArea">모든 지역</option>
                    </S.FilterSelect>

                    <S.FilterSelect defaultValue="allAnimal">
                        <option value="allAnimal">모든 동물</option>
                    </S.FilterSelect>
                </S.FilterContainer>

                {/* 실시간 알림 토글 배너 */}
                <S.AlertBanner>
                    <S.AlertInfo>
                        <div className="icon-circle">
                            <NotificationIcon sx={{fontSize:'20px'}}/>
                        </div>
                        <div className="text-group">
                            <strong>이지역 실시간 알림</strong>
                            <span>새 공고가 올라오면 알려드려요</span>
                        </div>
                    </S.AlertInfo>
                    <S.ToggleBtn $isOn={isAlertOn}
                    onClick={()=>setIsAlertOn(prev=>!prev)}
                    > 
                        <div className="handle"/>
                    </S.ToggleBtn>
                </S.AlertBanner>

                <S.Divider/>

                <S.RecommendSection>
                    <S.SectionHeader>
                        <A.H2Size20>이달의 추천동물</A.H2Size20>
                        <Link href="#more" className="more-link">
                            더보기
                            <ChevronRightIcon sx={{fontSize:'18px'}}/>
                        </Link>
                    </S.SectionHeader>

                    <S.RecommendScroll>
                        <S.RecommendCard>
                            <S.RecommendImgBox>
                                <img src="https://via.placeholder.com/140" alt="추천동물" />
                                <PlayIcon className="play-icon" sx={{fontSize:'18px'}}/>
                            </S.RecommendImgBox>

                            <S.LocationText>
                                <LocationIcon sx={{fontSize:'16px'}}/>
                                강원특별자치도
                            </S.LocationText>

                        </S.RecommendCard>
                    </S.RecommendScroll>
                </S.RecommendSection>

                <S.Divider/>

                <S.ListSection>
                    {animals.length === 0 ? (
                        <div className="">
                            등록된 보호 동물이 없습니다
                        </div>
                    ) : ( 
                        animals.map(animal=> (
                    <S.AnimalCard key={animal.id}>
                        <S.AnimalImgBox>
                            <img src={getFullImgUrl(animal.imageUrl)}
                             alt={animal.breed}/>
                        </S.AnimalImgBox>
                        <S.AnimalInfo>
                            <S.BadgeGroup>
                                <S.Badge $type="status">
                                    {animal.status === 'COMPLETED' ? '완료' : '공고중'}
                                </S.Badge>
                                <S.Badge $type={animal.gender === 'FEMALE' ? 'female' : animal.gender === 'MALE' ? 'male' : 'unknown' }>
                                    {animal.gender === 'FEMALE' ? '공주' : animal.gender === 'MALE' ? '왕자' : '미상' }
                                </S.Badge>
                            </S.BadgeGroup>

                            <S.InfoGrid>
                                <span className="label">품종</span>
                                <span className="value">{animal.breed}</span>
                                <span className="label">공고번호</span>
                                <span className="value">{animal.noticeNo}</span>
                                <span className="label">등록날짜</span>
                                <span className="value">{animal.regDate}</span>
                                <span className="label">구조장소</span>
                                <span className="value">{animal.rescueLocation}</span>           
                            </S.InfoGrid>
                        </S.AnimalInfo>
                    </S.AnimalCard>
                        ))
                    )};
                </S.ListSection>
            </A.Container>

            <Footer/>

        </A.AppWrapper>
        </>
    )
}