import React, { forwardRef } from "react";
import styled, { css } from "styled-components";

// 1. 인풋 크기 타입
export type InputSize = "sm" | "md" | "lg";

// 2. HTML 기본 Input 속성 상속 + 커스텀 옵션 추가
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' >{
    size?: InputSize;  // 커스텀 사이즈 ("sm" | "md" | "lg")
    label?: string;             // 인풋 상단 라벨 텍스트
    error?: string;             // 에러 메시지 (있으면 에러 테두리 및 문구 노출)
    helperText?: string;        // 하단 도움말 텍스트
    fullWidth?: boolean;        // 가로 100% 채우기 여부
    leftIcon?: React.ReactNode; // 왼쪽에 들어갈 아이콘 (검색 돋보기 등)
    rightIcon?: React.ReactNode;// 오른쪽에 들어갈 아이콘 (비밀번호 보기 등)
}

// forwardRef를 사용하여 나중에 react-hook-form 등 폼 라이브러리과 완벽 연동 가능
const Input = forwardRef<HTMLInputElement, InputProps>(({
    size = "md",
    label,
    error,
    helperText,
    fullWidth = false,
    leftIcon,
    rightIcon,
    disabled,
    id,
    ...props
}, ref) => {
    // 고유 ID 생성 (라벨과 인풋을 연결하기 위함)
    const inputId = id || props.name;

    return (
        <InputContainer $fullWidth={fullWidth}>
            {label && <InputLabel htmlFor={inputId}>{label}</InputLabel>}
            
            <InputWrapper $hasError={!!error}$isDisabled={!!disabled}>
                {leftIcon && <IconWrapper $position="left">{leftIcon}</IconWrapper>}
                
                <StyledInput
                    ref={ref}
                    id={inputId}
                    $size={size}
                    $hasLeftIcon={!!leftIcon}$hasRightIcon={!!rightIcon}
                    disabled={disabled}
                    {...props}
                />
                
                {rightIcon && <IconWrapper $position="right">{rightIcon}</IconWrapper>}
            </InputWrapper>

            {/* 에러 메시지가 있으면 에러 텍스트, 없으면 도움말 텍스트 출력 */}
            {error ? (
                <ErrorText>{error}</ErrorText>
            ) : (
                helperText && <HelperText>{helperText}</HelperText>
            )}
        </InputContainer>
    );
});

Input.displayName = "Input";

export default Input;

// --- Styles ---

const sizeStyles = {
    sm: css`
        height: 32px;
        padding: 0 10px;
        font-size: 0.85rem;
        border-radius: 6px;
    `,
    md: css`
        height: 40px;
        padding: 0 14px;
        font-size: 0.95rem;
        border-radius: 8px;
    `,
    lg: css`
        height: 48px;
        padding: 0 16px;
        font-size: 1.05rem;
        border-radius: 10px;
    `,
};

const InputContainer = styled.div<{ $fullWidth: boolean }>`
    display: inline-flex;
    flex-direction: column;
    gap: 6px;
    text-align: left;
    
    ${({ $fullWidth }) =>
        $fullWidth &&
        css`
            width: 100%;
        `}
`;

const InputLabel = styled.label`
    font-size: 0.875rem;
    font-weight: 600;
    color: #4e73df; /* 관리자 대시보드 톤에 맞춘 포인트 컬러 */
`;

const InputWrapper = styled.div<{ $hasError: boolean; $isDisabled: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border: 1px solid #d1d3e2;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;

    /* 포커스되었을 때 예쁜 외곽선(Ring) 효과 */
    &:focus-within {
        border-color: #4e73df;
        box-shadow: 0 0 0 3px rgba(78, 115, 223, 0.15);
    }

    /* 에러가 있을 때 테두리 색상 변경 */
    ${({ $hasError }) =>
        $hasError &&
        css`
            border-color: #e74a3b !important;
            &:focus-within {
                box-shadow: 0 0 0 3px rgba(231, 74, 59, 0.15) !important;
            }
        `}

    /* 비활성화 상태 스타일 */
    ${({ $isDisabled }) =>
        $isDisabled &&
        css`
            background-color: #eaecf4;
            cursor: not-allowed;
            opacity: 0.7;
        `}
`;

const StyledInput = styled.input<{
    $size: InputSize;
    $hasLeftIcon: boolean;
    $hasRightIcon: boolean;
}>`
    width: 100%;
    border: none;
    background: transparent;
    outline: none;
    color: #6e707e;
    font-weight: 500;

    /* 크기별 스타일 적용 */
    ${({ $size }) => sizeStyles[$size]}

    /* 아이콘이 있을 경우 좌우 패딩을 조절해 글자가 아이콘과 겹치지 않게 함 */
    padding-left: ${({ $hasLeftIcon, $size }) =>
        $hasLeftIcon ? ($size === "sm" ? "30px" : "36px") : undefined};
    padding-right: ${({ $hasRightIcon, $size }) =>
        $hasRightIcon ? ($size === "sm" ? "30px" : "36px") : undefined};

    &::placeholder {
        color: #b7b9cc;
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

const IconWrapper = styled.span<{ $position: "left" | "right" }>`
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #858796;
    pointer-events: none; /* 클릭 방해 금지 */

    ${({ $position }) =>
        $position === "left"
            ? css`
                  left: 12px;
              `
            : css`
                  right: 12px;
              `}
`;

const HelperText = styled.span`
    font-size: 0.75rem;
    color: #858796;
    padding-left: 2px;
`;

const ErrorText = styled.span`
    font-size: 0.75rem;
    color: #e74a3b;
    font-weight: 500;
    padding-left: 2px;
`;

/*💡 사용 예시
import Input from "@/components/ui/Input";
import { FiSearch, FiLock } from "react-icons/fi";

// 1. 기본 라벨이 있는 인풋
<Input label="게시판 이름" placeholder="예: 공지사항" fullWidth />

// 2. 아이콘이 들어간 검색용 인풋
<Input leftIcon={<FiSearch />} placeholder="검색어를 입력하세요" />

// 3. 에러 상태가 발생한 인풋
<Input label="비밀번호" type="password" rightIcon={<FiLock />} error="비밀번호가 일치하지 않습니다." fullWidth />


✨이 인풋 컴포넌트의 트렌디한 포인트
Focus-within 외곽선 효과 (box-shadow): 
최신 UI 디자인 트렌드인 "포커스 시 은은하게 퍼지는 테두리 빛 효과"를 적용해 세련된 느낌을 줍니다.

에러 상태 처리 (error="..."): 
유효성 검사에서 실패했을 때 에러 메시지와 함께 테두리가 빨갛게 변하도록 처리했습니다.

아이콘 자동 패딩 조절: 
왼쪽에 돋보기 아이콘(leftIcon)이나 오른쪽에 검색/비밀번호 아이콘을 넣었을 때, 글자가 아이콘 밑으로 파묻히지 않도록 패딩 간격을 똑똑하게 자동 조절해 줍니다.

forwardRef 적용: 나중에 폼 관리 라이브러리(React Hook Form 등)와 연결할 때 에러 없이 완벽하게 호환되는 최신 실무형 구조입니다.


💡 핵심 포인트 (Omit):HTML 기본 Input 속성 중 충돌이 나는 'size'를 제외하고 커스텀 'size'를 덮어씌움
Omit<타입, "제외할속성명">은 TypeScript에서 기존에 있던 무서운 기본 타입 속성을 쏙 빼버리고 싶을 때 쓰는 아주 유용한 마법의 키워드입니다.



*/