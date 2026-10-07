'use client'
import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { MissingModal } from '@/app/components/ui/MissingModal';
import * as S from '@/css/style.styled';
import * as C from '@/css/style.styled'
import { 
  ChevronDown, 
  Info, 
  MapPin, 
  Calendar, 
  Plus,
} from 'lucide-react';

import { 
    NotificationsNone as NotificationsNoneIcon,
    NotificationAddOutlined as NotificationIcon,
    TuneOutlined as FilterIcon,
 } from "@mui/icons-material";

interface MissingAnimal {
  id: number;
  status: string;
  breed: string;
  gender: string;
  age: string;
  weight: string;
  color: string;
  rescueLocation: string;
  createdAt: string;
  mediaUrls: string[];
  content: string;
}


export default function Missing(){

    const [animalList , setAnimalList]=useState<MissingAnimal[]>([]);
    const [loading, setLoading]=useState<boolean>(false);
    const [isAlertOn, setIsAlertOn]=useState<boolean>(false);
    const [isModalOpen, setIsModalOpen]=useState<boolean>(false);
   
    useEffect(()=>{
        fetchMissing();
    }, [])

    const fetchMissing = async()=>{
           try{
               setLoading(true);
               const res= await axios.get('http://localhost:8080/api/missing-posts', {
                    withCredentials:true
               })
               setAnimalList(res.data);
           }catch(err){
               console.error('실종/제보 데이터를 불러오는데 실패했습니다.', err);
           }finally{
               setLoading(false);
           }
       }
  
    return(
        <>
        {/* 필터 바 영역 */}
        <S.FilterContainer>
            <S.FilterIconBtn>
                <FilterIcon sx={{fontSize:'20px', color:'#666'}}/>
            </S.FilterIconBtn>

            <S.FilterSelect defaultValue="1year">
                <option value="3months">최근 3개월</option>
                <option value="1year">최근 1년</option>
                <option value="all">전체 기간</option>
            </S.FilterSelect>

            <S.FilterSelect defaultValue="latest">
                <option value="latest">등록일 기준</option>
                <option value="oldest">오래된 순</option>
            </S.FilterSelect>

            <S.FilterSelect defaultValue="allArea">
                <option value="allArea">모든 지역</option>
                <option value="seoul">서울</option>
                <option value="busan">부산</option>
                <option value="daejun">대전</option>
                {/* 필요한 지역 추가 */}
            </S.FilterSelect>

            <S.FilterSelect defaultValue="allAnimal">
                <option value="allAnimal">모든 동물</option>
                <option value="dog">강아지</option>
                <option value="cat">고양이</option>
                <option value="other">기타 동물</option>
            </S.FilterSelect>
        </S.FilterContainer>

        {/* 실시간 알림 설정 배너 */}
        <S.AlertBanner>
            <S.AlertInfo>
                <div className="icon-circle">
                    <NotificationIcon sx={{fontSize:'20px'}}/>
                </div>
                <div className="text-group">
                    <strong>신고/제보 실시간 알림</strong>
                    <span>설정한 지역·품종의 새 글을 알려드려요</span>
                </div>
            </S.AlertInfo>
            <S.ToggleBtn $isOn={isAlertOn}
            onClick={()=>setIsAlertOn(prev=>!prev)}
            > 
                <div className="handle"/>
            </S.ToggleBtn>
        </S.AlertBanner>

        {/* 게시판 이용 안내 */}
        <S.GuideBox>
            <Info size={16} color="#666" />
            <S.GuideText>신고/제보 게시판 이용 안내</S.GuideText>
            <ChevronDown size={16} color="#666" />
        </S.GuideBox>

        {/* 카드 그리드 리스트 */}
        <C.CardGrid>
            {loading ? (
            <S.LoadingText>데이터를 불러오는 중입니다...</S.LoadingText>
            ) : (
            animalList.map((item) => (
                <C.Card key={item.id}>
                    <S.ImageContainer>
                        <C.CardImg 
                        src={
                            item.mediaUrls && item.mediaUrls.length > 0 
                            ? `http://localhost:8080${item.mediaUrls[0]}`
                            : 'https://placehold.co/300x300'} 
                        alt={item.breed} />
                    </S.ImageContainer>
                    <C.CardBody>
                        <S.InfoRow>
                            <S.StatusBadge $status={item.status}>{item.status}</S.StatusBadge>
                            <S.BreedName>{item.breed}</S.BreedName>
                        </S.InfoRow>

                        <S.MetaInfo>
                         {item.gender} {item.age ? `| ${item.age}` : ''} {item.weight?`| ${item.weight}`:''} {item.color? `| ${item.color}`:''}
                        </S.MetaInfo>
                        <S.LocationRow>
                        <MapPin size={14} color="#666" />
                        <S.LocationText>{item.rescueLocation}</S.LocationText>
                        </S.LocationRow>
                        <S.DateRow>
                        <Calendar size={14} color="#666" />
                        <S.DateText>{item.createdAt ? item.createdAt.substring(0, 10) : ''}</S.DateText>
                        </S.DateRow>
                    </C.CardBody>
                </C.Card>
            ))
            )}
        </C.CardGrid>

        {/* 글쓰기 플로팅 버튼 */}
        <S.FloatingWriteBtn
        onClick={()=>setIsModalOpen(true)}
        >
            <Plus size={20} color="#fff" />
            <span>글쓰기</span>
        </S.FloatingWriteBtn>
        
        {isModalOpen && (
            <MissingModal
            isOpen={isModalOpen}
            onClose={()=>setIsModalOpen(false)}
            onSuccess={fetchMissing}
            titleText='실종/제보 글쓰기'
            submitText='등록하기'
            />
        )}
      
        </>
    )
}


// 테스트용 더미 데이터
const DUMMY = [
        {
        id: 1,
        status: '실종',
        breed: '코숏',
        gender: '암컷',
        age: '나이 모름',
        weight: '몸무게 모름',
        color: '흰색',
        rescueLocation: '충남 태안군 근흥면 정죽리 지령산...',
        regDate: '2026-10-02',
        imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop',
        content: '겁이 많고 낯을 가립니다.'
        },
        {
        id: 2,
        status: '실종',
        breed: '포메라니안',
        gender: '수컷',
        age: '3살',
        weight: '6kg',
        color: '흰색',
        rescueLocation: '정왕역 인근 S-oil주유소 마지막 목격',
        regDate: '2026-09-23',
        imageUrl: 'https://picsum.photos/id/237/300/300',
        content: '결정적 제보 시 사례하겠습니다.'
        }
    ];