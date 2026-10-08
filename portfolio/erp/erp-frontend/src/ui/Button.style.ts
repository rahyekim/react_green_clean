import styled, { css, keyframes } from 'styled-components';

//스타일 컴포넌트에 전달되는 props 타입 정의
interface StyledButtonProps {
  $variant?: 'primary' | 'secondary' | 'danger' | 'kakao' | 'insta' |'ghost';
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
  $width?:string;
}

// 로딩 시 돌아가는 스피너 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 버튼 타입별 색상 테마 설정
const variantStyles = {
  primary: css`
    background-color: #3b5998; /* 너무 튀지 않고 진중한 엔터프라이즈 블루 */
    color: #ffffff;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
    &:hover:not(:disabled) {
      background-color: #324c82;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15); /* 안쪽으로 살짝 파이는 이펙트 */
    }
    &:active:not(:disabled) {
      box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.3); /* 클릭했을 때 더 깊게 눌리는 느낌 */
    }
  `,
secondary: css`
    background-color: #e2e8f0;
    color: #334155;
    border: 1px solid #cbd5e1;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.02);

    &:hover:not(:disabled) {
      background-color: #cbd5e1;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
    }

    &:active:not(:disabled) {
      box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.12);
    }
  `,
  danger: css`
    background-color: ${p=>p.theme.colors.alert};
    color: #ffffff;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);

    &:hover:not(:disabled) {
      background-color: ${p=>p.theme.colors.alertHover};
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    &:active:not(:disabled) {
      box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.35);
    }
  `,

  kakao: css`
  background-color: #fee500;
  color: #3c1e1e;
  &:hover:not(:disabled) { 
    background-color: #f6dc00; 
  }
  `,
  ghost: css`
    background-color: transparent;
    color: #475569; /* 테마의 label 컬러나 기본 텍스트 톤 */
    box-shadow: none;
    font-weight: 600;
    &:hover:not(:disabled) {
      background-color: rgba(0, 0, 0, 0.05); /* 마우스 올렸을 때 아주 연한 회색 배경 */
      color: #1e293b;
    }
    &:active:not(:disabled) {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `,
  insta: css`
    background-color: #405de6; /* 인스타 로고의 베이스가 되는 차분하고 세련된 네이비/블루 퍼플 톤 */
    color: #ffffff;
    font-weight: 500;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);

    &:hover:not(:disabled) {
      background-color: #334ac2; /* 마우스 올렸을 때 살짝 어두워지는 톤 */
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    &:active:not(:disabled) {
      box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.3);
    }
  `,

};

export const StyledButton = styled.button<StyledButtonProps>`
box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s,box-shadow 0.2s, opacity 0.2s;
  border: none;
  outline: none;

  & > i {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* 크기(size)별 패딩 및 폰트 사이즈 */
  ${({ $size }) => {
    switch ($size) {
      case 'sm': return css`
          padding: 4px 12px;
          font-size: 13px;
        `;
      case 'lg': return css`
          padding: 10px 20px;
          font-size: 16px;
        `;
      default: return css`
          height: 42px; //input 높이랑 맞춤
          padding: 0 16px;
          font-size: 14px;
        `;
    }
  }}

  /* 스타일(variant) 적용 */
  ${({ $variant }) => variantStyles[$variant || 'primary'] || variantStyles.primary}

  /* fullWidth가 true면 가로 꽉 채우기 */
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
  ${({ $width }) => $width && css`width: ${ $width };`}

  /* 비활성화(disabled) 또는 로딩 중일 때 */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// 로딩 스피너 아이콘 스타일
export const Spinner = styled.div`
  width: 14px;
  height: 14px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;