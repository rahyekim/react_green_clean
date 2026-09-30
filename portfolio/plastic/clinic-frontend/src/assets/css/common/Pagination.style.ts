import styled from "styled-components";
import { FlexCenter } from "./Common.style";

// export const = styled.div``;

// {/*🌟페이지네이션 */}
export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid #e3e6f0;
  background-color: #fff;
`;

export const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid #d1d3e2;
  background-color: #fff;
  color: #6e707e;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #eaecf4;
    color: #3a3b45;
    border-color: #b7b9cc;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background-color: #f8f9fc;
  }
`;
export const PageNumberGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

export const PageNumberBtn = styled.button<{ $active?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 0.5rem;
  border: 1px solid ${props => props.$active ? '#4e73df' : '#d1d3e2'};
  background-color: ${props => props.$active ? '#4e73df' : '#fff'};
  color: ${props => props.$active ? '#fff' : '#6e707e'};
  font-weight: ${props => props.$active ? '600' : '400'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.$active ? '#224abe' : '#eaecf4'};
    border-color: ${props => props.$active ? '#224abe' : '#b7b9cc'};
    color: ${props => props.$active ? '#fff' : '#3a3b45'};
  }
`;

export const BaseButton = styled.button<ActiveProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 12px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #ffffff;
  color: #64748b; 
  transition: all 0.2s ease-in-out;

  /* 호버 시 검은색 대신 세련된 포인트 블루와 부드러운 배경색 적용 */
  &:hover:not(:disabled) {
    background-color: #eff6ff;
    border-color: #bfdbfe;
    color: #2563eb;
  }

  &:disabled {
    background-color: #f8fafc;
    border-color: #e2e8f0;
    color: #cbd5e1;
    cursor: not-allowed;
  }
`;

// 프롭스 타입 정의
interface ActiveProps {
  $active?: boolean;
}

// 1. 전체 페이지네이션 컨테이너
export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin: 32px 0;
`;

export const Prev = styled(BaseButton)<ActiveProps>`
  cursor: ${(props) => (props.$active ? 'not-allowed' : 'pointer')};
`;

export const Next = styled(BaseButton)<ActiveProps>`
  cursor: ${(props) => (props.$active ? 'not-allowed' : 'pointer')};
`;

export const PaginationBtn = styled(BaseButton)<ActiveProps>`
  background-color: ${(props) => (props.$active ? '#2563eb' : '#ffffff')};
  color: ${(props) => (props.$active ? '#ffffff' : '#64748b')};
  border-color: ${(props) => (props.$active ? '#2563eb' : '#e2e8f0')};
  font-weight: ${(props) => (props.$active ? '600' : '500')};

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.$active ? '#1d4ed8' : '#eff6ff')};
    color: ${(props) => (props.$active ? '#ffffff' : '#2563eb')};
  }
`;