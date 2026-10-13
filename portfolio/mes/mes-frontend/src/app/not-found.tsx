'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "react-bootstrap";
import styled from "styled-components";

export default function NotFound(){
    
    const router = useRouter();

    return(
        <Wrapper>
            <ErrorCode>404</ErrorCode>
            <Title>원하시는 페이지를 찾을 수 없습니다</Title>
            <Description>
                존재하지 않는 주소이거나, 페이지가 이동 또는 삭제되었을 수 있습니다.{' '}
                입력하신 주소가 정확한지 다시 한번 확인해 주세요.
            </Description>

            <ButtonGroup>
                <BackButton onClick={()=>router.back()}>
                    이전 페이지로
                </BackButton>
                <HomeLink href='/'>
                    메인화면으로 이동
                </HomeLink>
            </ButtonGroup>
        </Wrapper>
    )
}


//
// const Container = styled.div`
// display: flex;
// flex-direction: column;
// align-items: center;

// `;

// const ErrorCode = styled.span`
//   /* 여기에 원하는 스타일 입력 */
// `;

// const Title = styled.h1`
//   /* 여기에 원하는 스타일 입력 */
// `;

// const Description = styled.p`
//   /* 여기에 원하는 스타일 입력 */
// `;

// const ButtonGroup = styled.div`
//   /* 여기에 원하는 스타일 입력 */
// `;

// const ButtonBase = styled.button`
//   /* 여기에 원하는 스타일 입력 */
// `;

// const BackButton = styled(ButtonBase)`
//   /* 여기에 원하는 스타일 입력 */
// `;

// const HomeLink = styled(Link)`
//   /* 여기에 원하는 스타일 입력 */
// `;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 0 16px;
  text-align: center;
`;

const ErrorCode = styled.span`
  font-size: 4rem;
  font-weight: 800;
  color: #2563eb;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #6b7280;
  max-width: 28rem;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ButtonBase = styled.button`
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const BackButton = styled(ButtonBase)`
  color: #374151;
  background-color: #ffffff;
  border: 1px solid #d1d5db;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #2563eb;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }
`;