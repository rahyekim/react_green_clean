import React from "react";
import styled, { css } from "styled-components";

// 1. 버튼의 크기(Size) 타입
export type ButtonSize = "sm" | "md" | "lg";

// 2. 버튼의 스타일 variant 타입
export type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "ghost";

// 3. HTML 기본 버튼 속성까지 완벽하게 상속 (onClick, disabled, type 등)
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export default function Button({
    children,   // 버튼 안에 들어갈 글자 (예: "저장하기")
    variant = "primary", //기본으로 파란색(primary) 적용
    size = "md",   //기본 중간 크기(md) 적용
    fullWidth = false,  //기본은 안 채움
    isLoading = false,  //로딩 중인지 여부 (기본은 아님)
    leftIcon,
    rightIcon,
    disabled,  // 버튼 비활성화 여부
    ...props  // 그 외에 남은 모든 HTML 속성들 (onClick 등)
}: ButtonProps) {
    return (
        <StyledButton
            $variant={variant}
            $size={size}$fullWidth={fullWidth}
            disabled={disabled || isLoading} //중복 클릭 방지
            {...props}
        >
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
                    <span>{children}</span>
                    {rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
                </>
            )}
        </StyledButton>
    );
}

// --- Styles ---

const sizeStyles = {
    sm: css`
        height: 32px;
        padding: 0 12px;
        font-size: 0.85rem;
        border-radius: 6px;
    `,
    md: css`
        height: 40px;
        padding: 0 16px;
        font-size: 0.95rem;
        border-radius: 8px;
    `,
    lg: css`
        height: 48px;
        padding: 0 20px;
        font-size: 1.05rem;
        border-radius: 10px;
    `,
};

const variantStyles = {
    primary: css`
        background-color: #4e73df;
        color: #ffffff;
        border: 1px solid transparent;
        &:hover:not(:disabled) {
            background-color: #2e59d9;
        }
    `,
    secondary: css`
        background-color: #858796;
        color: #ffffff;
        border: 1px solid transparent;
        &:hover:not(:disabled) {
            background-color: #6e707e;
        }
    `,
    danger: css`
        background-color: #e74a3b;
        color: #ffffff;
        border: 1px solid transparent;
        &:hover:not(:disabled) {
            background-color: #be2617;
        }
    `,
    outline: css`
        background-color: transparent;
        color: #4e73df;
        border: 1px solid #4e73df;
        &:hover:not(:disabled) {
            background-color: #f8f9fc;
        }
    `,
    ghost: css`
        background-color: transparent;
        color: #6e707e;
        border: 1px solid transparent;
        &:hover:not(:disabled) {
            background-color: #eaecf4;
        }
    `,
};

const StyledButton = styled.button<{
    $variant: ButtonVariant;
    $size: ButtonSize;
    $fullWidth: boolean;
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    white-space: nowrap;
    outline: none;

    /* 크기 및 Variant 적용 */
    ${({ $size }) => sizeStyles[$size]}
    ${({ $variant }) => variantStyles[$variant]}

    /* fullWidth 옵션 */
    ${({ $fullWidth }) =>
        $fullWidth &&
        css`
            width: 100%;
        `}

    /* Disabled 상태 스타일 */
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    /* 누르는 느낌(Active 효과) */
    &:active:not(:disabled) {
        transform: scale(0.98);
    }
`;

const IconWrapper = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const Spinner = styled.div`
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #ffffff;
    animation: spin 0.8s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

/*
import Button from "@/components/ui/Button";
import { FiPlus, FiSave } from "react-icons/fi";

// 1. 기본 버튼
<Button variant="primary">저장하기</Button>

// 2. 아이콘과 로딩이 들어간 버튼
<Button variant="danger" leftIcon={<FiPlus />} isLoading={isSubmitting}>
    추가하기
</Button>

// 3. 화면을 꽉 채우는 큰 버튼
<Button variant="outline" size="lg" fullWidth>
    목록으로 가기
</Button>
*/