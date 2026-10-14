import styled from "styled-components";

// 🌟💙🌟커스텀 셀렉트 박스 컨테이너🌟💙🌟
export const CustomSelectContainer = styled.div<{$isOpen:boolean}>`
  position: relative;
  width: 100%;
  z-index: ${props=> props.$isOpen ? 9999999 : 1};
`;

export const SelectTrigger = styled.div`
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #d1d3e2;
  font-size: 0.8rem;
  color: #333;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  &:hover{
      border-color: #bac8f3;

  }
`;

// 💙드롭다운 리스트 영역💙
export const SelectList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;

  padding: 0; //💙
  margin: -1px 0 0 0;

  border-radius: 16px;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  list-style: none;
  box-shadow: 0 4px 6px rgba(0,0,0,.1);
  z-index: 99999;
  overflow: hidden;
  cursor: pointer;
`;

interface SelectItemProps {
    $isSelected?: boolean;
}

// 드롭다운 개별 항목
export const SelectItem = styled.li<SelectItemProps>`
  /* 💡 기본 패딩, 폰트 사이즈, cursor 채우기 */
  padding: 10px 20px;
  font-size: 0.85rem;
  color: #475569;
  
  ${({$isSelected})=> $isSelected && `
    color: #3b5998;
    background-color: #f8f9fc;
    font-weight: bold;
  ` } 

  &:hover{
    background-color: #f1f5f9;
  }
`;