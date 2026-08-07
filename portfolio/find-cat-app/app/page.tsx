'use client'

import { useState,useEffect } from "react"
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody,
   MDBCardImage, MDBIcon 
} from 'mdb-react-ui-kit';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import CampaignIcon from '@mui/icons-material/Campaign';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { error } from "console";

import * as S from '../css/style.styled'
import { PetsOutlined } from "@mui/icons-material";

//1.스프링부트(백엔드)에서 넘어올 동물 데이터의 타입(Interface)정의

interface Animal{
  id:number;
  region: string;
  noticeNo: string;
  birthYear: string;
  gender: string;
  weight: number;
  imageUrl: string;
}


export default function HomePage (){
 
  //동물 리스트 상태관리
  const [animals, setAnimals]=useState<Animal[]>([]);
  const [isLoading, setIsLoading]= useState(true);

  useEffect(()=>{

    fetch('http://localhost:8080/api/animals/recommended')
    .then(res=> {
      if(!res.ok) throw new Error("네트워크 응답이 정상이 아닙니다"); //성공(200)여부체크
      return res.json();  //파싱
    }).then(data=> {
      setAnimals(data);
      setIsLoading(false);
    }).catch(err=> {
      console.error('API 호출에러: ', err);
      setIsLoading(false);
    })
    
  },[])

  
  
  return(
    <>
    <S.AppWrapper>
    <S.Container>
      <S.Header>
        <S.Logo>어서 찾아주개냥</S.Logo>
        <NotificationsNoneIcon fontSize="large"/>
      </S.Header>
      <S.MT70></S.MT70>
      <S.Banner>
        <S.BannerTitle>
          유기동물 입양자라면 <br/> 
          <span style={{color:"#f28c28"}}>50%</span> 할인 혜택을 받으세요!
        </S.BannerTitle>
        <S.BannerSub>
          츄르 | 스크래쳐 | 물그릇 
        </S.BannerSub>
        <S.BannerImg>

        </S.BannerImg>
      </S.Banner>

      <S.QuickMenu>
        {['소개','입양 캠페인', '포인 기부', '지원/혜택', '스토어'].map((menu,idx)=>(
          <S.MenuIconWrapper key={idx}>
            <S.IconCircle>
              <PetsOutlinedIcon style={{color:"#f28c28"}}/>
            </S.IconCircle>
            <S.MenuText>{menu}</S.MenuText>
          </S.MenuIconWrapper>
        ))}
      </S.QuickMenu>

      {/* 이달의 추천 입양 동물 */}
      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>이달의 추천 입양 동물</S.SectionTitle>
            <S.MoreButton> 더보기 &gt;</S.MoreButton>
        </S.SectionHeader>

        <S.HorizontalScroll>
          {['강릉시','양양군','마포센터','삼척시','화성','노원' ,'도봉구', '안양시'].map((region,idx)=>(
            <S.RegionCircle key={idx}>
              <span>{region}</span>
            </S.RegionCircle>
          ))}
        </S.HorizontalScroll>

        <S.HorizontalScroll>
          {isLoading ? (
            <S.StatusText>
              데이터를 불러오는 중입니다
            </S.StatusText>
          ): animals.length === 0 ? (
            <S.StatusText>
              추천 동물 준비중입니다
            </S.StatusText>
          ):(
            animals.map((animal)=>(
              <S.AnimalCard key={animal.id}>
                <S.CardImg
                src={animal.imageUrl || "https://via.placeholder.com/160x160"}
                alt={`cat-${animal.id}`}/>
                <S.CardBody>
                  <S.CardTitle>{animal.region}{animal.noticeNo}</S.CardTitle>
                  <S.CardDescription>
                    {animal.birthYear}/{animal.gender}/{animal.weight}kg
                  </S.CardDescription>
                </S.CardBody>
              </S.AnimalCard>
            ))
          )}
        </S.HorizontalScroll>
      </S.Section>

      {/* 통계 */}
      <S.Section $bgLight>
        <S.SectionHeader>
          <S.SectionTitle>2026 유기동물 통계</S.SectionTitle>
          <S.MoreButton>더보기 &gt;</S.MoreButton>
        </S.SectionHeader>

        <S.StatBox>
          <S.StatItem>
            <S.StatLabel $color="#198754">구조</S.StatLabel>6마리
          </S.StatItem>

          <S.StatItem>
            <S.StatLabel $color="#0d6efd">입양률</S.StatLabel>25.6%
          </S.StatItem>

          <S.StatItem>
            <S.StatLabel $color="#dc3545">안락사율</S.StatLabel>11.5%
          </S.StatItem>
        </S.StatBox>
        
      </S.Section>

      <S.BottomNav>
        <S.NavItem $active>
          <HomeIcon/>
          <span>홈</span>
        </S.NavItem>

        <S.NavItem>
          <PetsIcon/>
          <span>보호소</span>
        </S.NavItem>

        <S.NavItem>
          <CampaignIcon/>
          <span>실종/제보</span>
        </S.NavItem>

        <S.NavItem>
          <MenuBookIcon/>
          <span>스토리</span>
        </S.NavItem>

        <S.NavItem>
          <PersonOutlineIcon/>
          <span>마이메뉴</span>
        </S.NavItem>
      </S.BottomNav>

    </S.Container>
    </S.AppWrapper>
    </>
  )
}