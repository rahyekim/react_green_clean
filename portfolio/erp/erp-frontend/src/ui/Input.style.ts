import styled, { css } from 'styled-components';

interface InputWrapperProps {
  $fullWidth?: boolean;
}

interface StyledInputProps {
  $hasError?: boolean;
}

interface HelperTextProps {
  $hasError?: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: ${({ $fullWidth }) => ( $fullWidth ? '100%' : 'auto')};
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #475569; /* MES 시스템의 차분한 라벨 그레이 */
`;

export const StyledInput = styled.input<StyledInputProps>`
box-sizing: border-box;
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

  /* 호버 상태 */
  &:hover:not(:disabled) {
    border-color: #94a3b8;
  }

  &:focus:not(:disabled) {
    border-color: #3b5998;
    box-shadow: inset 0 1px 2px rgba(59, 89, 152, 0.08), 0 0 0 1px #3b5998;
  }

  /* 에러가 있을 때 테두리와 포커스 색상 변경 */
  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: #dc2626 !important;
      &:focus {
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12) !important;
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

export const HelperText = styled.span<HelperTextProps>`
  font-size: 12px;
  margin-top: 2px;
  color: ${({ $hasError }) => ( $hasError ? '#dc2626' : '#64748b')}
`;