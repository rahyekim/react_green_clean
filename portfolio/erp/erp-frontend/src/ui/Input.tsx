import React, { InputHTMLAttributes } from 'react';
import { InputWrapper, Label, StyledInput, HelperText } from './Input.style';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  ref?: React.Ref<HTMLInputElement>; 
}
// 🌟 props로 ref를 직접 받음 forwardRef(Ref전달해주는)안써도됨

export default function Input({
  label,
  error,
  helperText,
  fullWidth = false,
  ref, // 🌟 props에서 바로 추출
  ...props
}: InputProps) {
  
  const hasError = !!error;
  const displayedMessage = error || helperText;

  return (
    <InputWrapper $fullWidth={fullWidth}>

      {label && <Label>{label}</Label>}

      <StyledInput
        ref={ref} // 🌟 그대로 전달
        $hasError={hasError}
        {...props}
      />

      {displayedMessage && (
        <HelperText $hasError={hasError}>
          {displayedMessage}
        </HelperText>
      )}

    </InputWrapper>
  );
}