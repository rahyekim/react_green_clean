'use client'
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import * as S from '@/css/style.styled';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import {NotificationsNone as NotificationsNoneIcon} from "@mui/icons-material";
import { usePathname } from 'next/navigation';
import path from 'path';

//💘헤더 크기때문에 픽스햇을때 잘리는 크기만큼 패딩or마진
const MainWrapper = styled.main<{ $isHide?: boolean }>`
  padding-top: ${({ $isHide }) => ($isHide ? '0' : '68px')};
  min-height: 100vh;
`;

export default function ConditionalLayout({ children }: { children: ReactNode }) {
  // 예시: 특정 조건에 따라 헤더나 푸터를 숨기고 싶을 때 $isHide 등을 활용할 수 있습니다.
  const isHide = false; 

  const pathname = usePathname();

  const renderHeader = ()=>{
    //마이페이지
    if(pathname=== '/mypage'){
      return <Header title='마이메뉴'/>
    }

    //로그인
    if(pathname === '/login'){
      return <Header title='로그인'/>
    }

    return(
     <S.Header>
        <S.Logo>어서 찾아주개냥</S.Logo>
        <NotificationsNoneIcon fontSize="large"/>
     </S.Header>
    )
  }


  return (
        <>
        <S.AppWrapper>
          <S.Container>
            {renderHeader()}

            <MainWrapper>
              {children}
            </MainWrapper>

            <Footer/>
          </S.Container>
        </S.AppWrapper>
        </>

  );
}