import styled from "styled-components";

export const PageWrapper = styled.div`
  // 화면 전체를 세로로 채우는 레이아웃 껍데기
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

export const TopArea = styled.div`
  // 상단 고정 영역 껍데기
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const MainContent = styled.div`
  // Lnb와 ContentArea를 가로로 나란히 배치하는 껍데기
  display: flex;
  flex:1;
`;

// Local Navigation Bar (Lnb)
export const LnbWrapper = styled.aside`
  // 사이드바 영역 껍데기
  width: 250px;
  background-color: #fff;
  flex-shrink: 0;
  border-right: 1px solid #e2e8f0;

  @media (max-width: 768px){
        display: none;
  }
`;

export const ContentArea = styled.div`
  // 본문 내용 영역 껍데기
flex: 1;
overflow-y: auto;
min-width: 0; 

padding: 32px;
background-color: #f8fafc;

`;