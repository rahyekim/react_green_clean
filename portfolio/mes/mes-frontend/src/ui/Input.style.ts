import styled, { css } from 'styled-components';

export const InputWrapper = styled.div<{$fullWidth?: boolean}>`
display: flex;
flex-direction: column;
gap: 6px;
width: ${({$fullWidth})=> $fullWidth ? '100%': 'auto'};
`;

export const Label = styled.div`
font-size: 13px;
font-weight: 500;
color: ${p=> p.theme.colors.label};
`;


export const StyledInput = styled.input<{$hasError:boolean}>`
box-sizing: border-box;
font-family: inherit; //상속받아야함
  width: 100%;
  height: 42px;
  padding: 0 14px;
  font-size: 14px;
  color: #1e293b;
  background-color: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.02);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  /* 플레이스홀더 스타일 */
  &::placeholder {
    color: #94a3b8;
  }

  /* 호버 상태
  &:hover:not(:disabled) {
    border-color: #94a3b8;
  } */

  &:focus:not(:disabled) {
    border-color: #3b5998;
  }

  /* 에러가 있을 때 테두리와 포커스 색상 변경 */
  ${({ $hasError }) =>
    $hasError &&
    css`
      border: 1.5px solid #ef4444 !important;
      &:focus {
      box-shadow: none !important; 
      border-color: #dc2626 !important;
      }
    `}

  /* 비활성화 상태 */
  &:disabled {
    background-color: #f1f5f9;
    color: #94a3b8;
    cursor: not-allowed;
  }

  /* 🌟 readOnly 속성이 들어와 있을 때의 스타일을 직접 타겟팅! */
  &:read-only, &[readonly] {
    background-color: #f8fafc;
    
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
  
`;

export const HelperText = styled.span<{$hasError: boolean}>`
  font-size: 12px;
  margin-top: 2px;
  color: ${({ $hasError }) => ( $hasError ? '#dc2626' : '#64748b')}
`;