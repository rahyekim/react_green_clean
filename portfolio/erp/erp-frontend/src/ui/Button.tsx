import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { StyledButton, Spinner } from './Button.style';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'kakao' | 'insta' |'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  width?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  width,
  disabled,
  ...props
}: ButtonProps) {
  return (

    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $width={width}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner />}
      {children}
    </StyledButton>

  );
}