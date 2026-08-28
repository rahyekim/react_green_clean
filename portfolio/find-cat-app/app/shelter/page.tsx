'use client'
import { useState } from "react"
import Link from 'next/link';
import * as S from './shleter.sytles';
import * as A from '@/css/style.styled';
import Footer from "../components/Footer";
import Header from "../components/Header";

//Mui
import { 
    NotificationsNone as NotificationsNoneIcon,
    NotificationAddOutlined as NotificationIcon,
    TuneOutlined as FilterIcon,
    FmdGood as LocationIcon,
    PlayCircleFilled as PlayIcon,
    ChevronRight  as ChevronRightIcon,
 } from "@mui/icons-material";

export default function Shelter(){

    const [activeTap, setActiveTap]=useState('보호동물');
    const [isAlertOn, setIsAlertOn]=useState(false);

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
                    > 버튼
                        <div className="handle"/>
                    </S.ToggleBtn>
                </S.AlertBanner>

                <S.Divider/>
                <S.RecommendSection>
                    <S.SectionHeader>
                        <A.H2Size20>이달의 추천동물</A.H2Size20>
                        <Link href="#more" className="more-link">
                        더보기<ChevronRightIcon sx={{fontSize:'18px'}}/>
                        </Link>
                    </S.SectionHeader>

                    <S.RecommendScroll>
                        <S.RecommendCard>
                            <S.RecommendImgBox>
                                <img src="" alt="" />
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
                    <S.AnimalCard>
                        <S.AnimalImgBox>
                            <img src="" alt="" />
                        </S.AnimalImgBox>
                        <S.AnimalInfo>
                            <S.BadgeGroup>
                                <S.Badge $type="status">완료</S.Badge>
                                <S.Badge $type="femail">여아</S.Badge>
                                <S.Badge $type="male">남아</S.Badge>
                                <S.Badge $type="unkown">완료</S.Badge>
                            </S.BadgeGroup>

                            <S.InfoGrid>
                                <span className="label">품종</span>
                                <span className="value">[고양이] 삼색고양이</span>
                                <span className="label">공고번호</span>
                                <span className="value">충북-청주-2026...</span>
                                <span className="label">등록날짜</span>
                                <span className="value">2026-08-06</span>
                                <span className="label">구조장소</span>
                                <span className="value">용암삼일무지개아파트</span>           
                            </S.InfoGrid>
                        </S.AnimalInfo>
                    </S.AnimalCard>
                </S.ListSection>
            </A.Container>
            <Footer/>
        </A.AppWrapper>
        </>
    )
}