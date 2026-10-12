import { ButtonHTMLAttributes, ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { StyledButton, Spinner } from './Button.style';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children:ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' |'white' |'kakao' | 'insta';
    size?: 'sm' | 'md' | 'lg';
    isLoading?:boolean;
    fullWidth?:boolean;
    width?:string;
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
    onClick, // 💡 전달받기
    ...props
}:ButtonProps){

    return(
        <StyledButton
        as="button"
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