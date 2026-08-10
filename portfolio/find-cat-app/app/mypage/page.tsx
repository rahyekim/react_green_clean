'use client'

import React , {useState, useEffect} from 'react'
import Link from 'next/link'

import * as S from '../../css/style.styled'
import Header from '../components/Header'
import Footer from '../components/Footer'
// mui 아이콘
import {
  NotificationsNone as NotificationsNoneIcon,
  SettingsOutlined as SettingsIcon,
  WorkspacePremiumOutlined as PremiumIcon, // 멤버십
  EditNoteOutlined as EditNoteIcon, // 입양신청
  MailOutlined as MailIcon, // 쪽지함
  PersonOutlined as PersonIcon, // 로그인
  PetsOutlined as PetsIcon, // 관심 유기동물
  InfoOutlined as InfoIcon, // 공지사항
  HelpOutlined as HelpIcon, // 자주하는 질문
  ChatBubbleOutlined as ChatIcon, // 문의하기
  CameraAltOutlined as CameraIcon, // 인스타그램 느낌
  CreateOutlined as PenIcon, // 블로그 느낌
  PlayCircleOutlined as PlayIcon, // 유튜브 느낌
  ChevronRight as ChevronRightIcon, // 우측 화살표
} from '@mui/icons-material';

export default function Mypage(){

    //로그인한 유저정보를 담을 공간 (초기값은 비어있음)
    const [user,setUser]=useState<{nickname:string}|null>(null);

    //
    useEffect(()=>{
        const storedUser= localStorage.getItem('user');
        if(storedUser){
            //JSON.parse(문자열) : 문자열 ➡️ 다시 객체로 해체
            //저장된 정보가 있다면, 글자(JSON)를 객체로 바꿔서 상태에 넣음
            setUser(JSON.parse(storedUser) as {nickname:string})    
        }
    },[]);

    //로그아웃 기능 추가
    const handleLogout = ()=>{
        localStorage.removeItem('user');
        setUser(null);
        alert('로그아웃이 되었습니다')
        //⭐
        window.location.href="/login";

    }

    return(
        <>
        <S.AppWrapper>
            <Header title='마이메뉴'/>
            <S.Container>
                <S.MT70/>
                <S.LoginLayout>
                    <S.H2Size20>
                        {user ? (
                        <S.LayoutSpaceBetween>
                            <span> 환영 합니다 ✨<span>{user.nickname} 님</span></span>
                            <S.LogoutBtn
                            onClick={handleLogout}
                            >로그아웃
                            </S.LogoutBtn>
                        </S.LayoutSpaceBetween>
                        ):(
                            //➡️유저 정보가 없을때(비로그인시)
                            <Link href='/login'>
                                <S.MenuIconWrapper>
                                <PetsIcon style={{ fontSize: '32px', color:'pink' }}/>
                                로그인을 해주세요
                                </S.MenuIconWrapper>
                            </Link> 
                        )}
                    </S.H2Size20>

                    <S.LayoutSpaceBetween>
                        <TopMenuCard 
                        icon={<PremiumIcon sx={{color: '#ff8c00', fontSize:'32px'}}/>}
                        text="멤버십"
                        />
                        <TopMenuCard 
                        icon={<EditNoteIcon sx={{color: '#ff8c00', fontSize:'32px'}}/>}
                        text="입양신청"
                        />
                         <TopMenuCard 
                        icon={<MailIcon sx={{color: '#ff8c00', fontSize:'32px'}}/>}
                        text="쪽지함"
                        />
                    </S.LayoutSpaceBetween>
                </S.LoginLayout>

                    <S.Line/>

                    <S.LoginLayout>
                        <S.List>
                            <S.H3Size16> 마이 메뉴 </S.H3Size16>
                            <ListItem 
                            icon={<PersonIcon sx={{color:'pink'}}/>}
                            text='로그인'
                            link='/login'
                            />
                            <ListItem 
                            icon={<PetsIcon sx={{color:'pink'}}/>}
                            text='관심 유기 동물'
                            />
                        </S.List>
                    </S.LoginLayout>
                    
                    <S.Line/>

                    <S.LoginLayout>
                        <S.List>
                            <S.H3Size16> 정보 </S.H3Size16>
                            <ListItem 
                            icon={<InfoIcon sx={{color:'pink'}}/>}
                            text='공지사항'
                            />
                            <ListItem 
                            icon={<HelpIcon sx={{color:'pink'}}/>}
                            text='자주하는 질문'
                            />
                            <ListItem 
                            icon={<ChatIcon sx={{color:'pink'}}/>}
                            text='문의하기'
                            />
                        </S.List>
                    </S.LoginLayout>

                    <S.Line/>

                    <S.LoginLayout>
                        <S.List>
                            <S.H3Size16> SNS </S.H3Size16>
                            <ListItem 
                            icon={<CameraIcon sx={{color:'pink'}}/>}
                            text='어서찾아주개냥 인스타그램'
                            />
                            <ListItem 
                            icon={<PenIcon sx={{color:'pink'}}/>}
                            text='어서찾아주개냥 블로그'
                            />
                            <ListItem 
                            icon={<PlayIcon sx={{color:'pink'}}/>}
                            text='어서찾아주개냥 유튜브'
                            />
                        </S.List>
                    </S.LoginLayout>

            </S.Container>
            <Footer/>
        </S.AppWrapper>
        </>
    )
}


function TopMenuCard({icon,text}:{icon:React.ReactNode; text:string}){
    return(
        <S.MenuCardBox>
            {icon}
            <S.MenuCardText>{text}</S.MenuCardText>
        </S.MenuCardBox>
    )
}

function ListItem({icon,text,link}:
    {icon:React.ReactNode; text:string, link?:string}){
        const content=(
            <S.ListItemWrapper>
                <S.ListItemLeft>
                    {icon}
                    <S.ListItemText>{text}</S.ListItemText>
                </S.ListItemLeft>
                <ChevronRightIcon sx={{color:'#999'}}/>
            </S.ListItemWrapper>
        );

        //링크가 있을때만 <Link>로 감싸주기
        if(link){
            return(
                <Link href={link}>
                    {content}
                </Link>
            )
        }return content; // 👈

}