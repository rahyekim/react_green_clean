'use client';

import Button from "@/ui/Button";
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
                <Button 
                variant="outline"
                onClick={()=>router.back()}
                >이전 페이지로</Button>
                <Button variant="sub" 
                as={Link} href='/'
                >메인화면으로 이동</Button>
            </ButtonGroup>
        </Wrapper>
    )
}


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9fafb;
  padding: 0 16px;
  text-align: center;
`;

const ErrorCode = styled.span`
  font-size: 4rem;
  font-weight: 800;
  color: ${p=>p.theme.colors.header};
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



