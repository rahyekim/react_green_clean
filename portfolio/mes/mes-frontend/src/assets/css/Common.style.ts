import styled from "styled-components";

//큰제목
export const PageTitle= styled.h2`
text-align: center;
font-size: 1.5rem;
font-weight: 700;
color: ${props=> props.theme.colors.title};
margin-bottom: 1.5rem;
`;

export const Divider= styled.div`
width: 92%;
height: 1px;
margin: 13px auto;
background-color: #e2e8f0;
`;

export const DividerText = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: 10px 0;
  color: #94a3b8; 
  font-size: 0.88rem;

  /* 양옆으로 뻗어나가는 가로선 만들기 */
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }

  /* 텍스트가 들어갈 때 양옆 선과의 간격 벌려주기 */
  &:not(:empty)::before {
    margin-right: 12px;
  }
  &:not(:empty)::after {
    margin-left: 12px;
  }
`;

// 🌟커스텀 사각 체크박스 디자인🌟
export const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  padding: 4px 2px;
  
  /* 라벨 전체에 마우스 올렸을 때 텍스트 색상 부드럽게 변경 */
  &:hover span {
    color: #111;
  }
`;
export const CheckboxInput = styled.input`
  appearance: none;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: 1.5px solid #e2e8f0;
  border-radius: 6px;
  background-color: #f8fafc;
  cursor: pointer;
  position: relative;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    border-color: #cbd5e1;
    background-color: #f1f5f9;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }

  &:checked {
    background-color: #2563eb;
    border-color: #2563eb;
    transform: scale(1.05);
  }

  /* 세련된 V자 체크 아이콘 */
  &:checked::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 6px;
    width: 4px;
    height: 9px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;