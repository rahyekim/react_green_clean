import React, { InputHTMLAttributes } from 'react'

import { InputWrapper, Label, StyledInput, HelperText } from './Input.style';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
    ref?: React.Ref<HTMLInputElement>;
}

export default function Input ({
    label, 
    error, 
    helperText, 
    fullWidth =false, 
    ref, 
    ...props 
}: InputProps){

    const hasError = !!error;
    const displayedMessage = error || helperText;

    return(
        <InputWrapper $fullWidth={fullWidth}>
            {label && <Label>{label}</Label>}

            <StyledInput
            ref={ref}
            $hasError={hasError}
            {...props}
            />

            {displayedMessage && (
                <HelperText $hasError={hasError}>
                    {displayedMessage}
                </HelperText>
            )}
        </InputWrapper>
    )
}