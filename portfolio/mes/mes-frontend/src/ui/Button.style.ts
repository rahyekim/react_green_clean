import styled, {css, keyframes} from "styled-components";

interface StyledButtonProps{
    $variant?: 'primary' | 'secondary' | 'danger' | 'kakao' | 'insta' |'ghost' |'white'| 'outline';
    $size?: 'sm' | 'md' | 'lg';
    $fullWidth?: boolean;
    $width?: string;
}

const spin = keyframes`
    from{ transform: rotate(0deg); }
    to{ transform: rotate(360deg); }
`;

const variantStyles ={
    primary: css`
        background-color: ${p=>p.theme.colors.btnPrimary}; 
        color: #ffffff;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);

        &:hover:not(:disabled) {
        background-color: #324c82;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15); // 안쪽으로 살짝 파이는 이펙트 
        }
        &:active:not(:disabled) {
        box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.3); // 클릭했을 때 더 깊게 눌리는 느낌 
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
    ghost: css`
       background-color: transparent;
        color: #475569;  
        box-shadow: none;
        font-weight: 500; 
        border: 1px solid transparent; 

        &:hover:not(:disabled) {
            background-color: #f1f5f9; 
            color: #1e293b;
            border-color: #e2e8f0; 
        }

        &:active:not(:disabled) {
            background-color: #e2e8f0;
        }
    `,
    //alert모달창용 
    white: css`
        background-color: rgba(255, 255, 255, 0.08);
        color: #eee; 
        border: 1px solid rgba(255, 255, 255, 0.15); 
        box-shadow: none;

        &:hover:not(:disabled) {
            background-color: rgba(255, 255, 255, 0.15); 
            color: #ffffff;
            border-color: rgba(255, 255, 255, 0.3);
        }

        &:active:not(:disabled) {
            background-color: rgba(255, 255, 255, 0.05);
        }
    `,
    outline: css`
       background-color: #ffffff; 
        color: #475569;
        border: 1px solid #cbd5e1; 
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);

        &:hover:not(:disabled) {
            background-color: #f8fafc; 
            color: #1e293b;
            border-color: #94a3b8;
        }

        &:active:not(:disabled) {
            background-color: #f1f5f9;
        }
    `,
    kakao: css`
        background-color: #fee500;
        color: #3c1e1e;
        &:hover:not(:disabled) { 
            background-color: #f6dc00; 
        }
    `,
    insta: css`
        background-color: #405de6; 
        color: #ffffff;
        font-weight: 500;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);

        &:hover:not(:disabled) {
        background-color: #334ac2;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        &:active:not(:disabled) {
        box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.3);
        }
    `,
}

export const StyledButton = styled.button<StyledButtonProps>`
box-sizing: border-box;
display: inline-flex;
align-items: center;
justify-content: center;
gap: 8px;
font-weight: 500;
border-radius: 6px;
cursor: pointer;

transition: all 0.2s;
border: none;
outline: none;

white-space: nowrap;
flex-shrink: 0;
min-width: max-content;

& > i{
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

//크기적용
${({$size})=> {
    switch($size){
        case 'sm': return css`
          padding: 6px 12px;
          font-size: 14px;
        `;
        case 'lg': return css`
          padding: 10px 20px;
          font-size: 16px;
        `;
        default: return css`
          height: 42px; //input 높이랑 맞춤
          padding: 0 16px;
          font-size: 15px;
        `;
    }
}}

//스타일적용
${({$variant})=> variantStyles[$variant || 'primary'] || variantStyles.primary}


//fullwidth적용
${({$fullWidth})=> 
    $fullWidth ? css` width: 100%;` : css` width: auto;`
}

//너비 
${({$width})=> $width && css `width: ${ $width };`}

//비활성화 or 로딩중일때
&:disabled{
    opacity: 0.6;
    cursor:not-allowed;
}
`;

//로딩 스피너 
export const Spinner = styled.div`
    width: 14px;
    height: 14px;
    border: 2px solid #fff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
`;