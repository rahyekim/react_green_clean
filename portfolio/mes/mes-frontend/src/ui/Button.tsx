import React from "react";
import { ButtonHTMLAttributes, ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { StyledButton, Spinner } from './Button.style';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children:ReactNode;
    variant?: 'primary' | 'secondary' | 'sub' |'danger' | 'ghost' |'white' |'kakao' | 'insta' |'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?:boolean;
    fullWidth?:boolean;
    width?:string;
    as?: React.ElementType;
    href?: string; // as Link 사용시 반드시필요
    onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
}

export default function Button ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    fullWidth = false,
    width,
    disabled,
    as,
    href,
    onClick, // 💡 전달받기
    ...props
}:ButtonProps){

    return(
        <StyledButton
        as={as || "button"}
        {...(href && {href})}  
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        $width={width}
        disabled={disabled || isLoading}
        onClick={onClick} // 💡 전달받은 onClick 연결
        {...props}
        > 
            {isLoading && <Spinner />}
            {children}
        </StyledButton>
    )
}

//...(조건부 속성 삽입) 
// 조건이 참일때 속성으로 펼쳐서 넣어줌
// undefined , false 일때 아예 속성을 없애버림 