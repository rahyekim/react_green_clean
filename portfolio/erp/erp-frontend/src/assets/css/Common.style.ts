import styled,{css} from "styled-components";
// import { theme } from '@/assets/css/theme';

//큰제목
export const PageTitle= styled.h2`
text-align: center;
font-size: 1.5rem;
font-weight: 700;
color: ${props=> props.theme.colors.title};
margin-bottom: 1.5rem;
`;

export const Divider= styled.div`
width: 92%;
height: 1px;
margin: 13px auto;
background-color: #e2e8f0;
`;

export const DividerText = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: 10px 0;
  color: #94a3b8; 
  font-size: 0.88rem;

  /* 양옆으로 뻗어나가는 가로선 만들기 */
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }

  /* 텍스트가 들어갈 때 양옆 선과의 간격 벌려주기 */
  &:not(:empty)::before {
    margin-right: 12px;
  }
  &:not(:empty)::after {
    margin-left: 12px;
  }
`;

interface ButtonProps {
    $variant?: 'primary' | 'danger' | 'outline' | 'ghost';
    $size?: 'small' | 'medium' | 'large';
    $fullWidth?:boolean;
    $width?:string;
}

export const Button= styled.button<ButtonProps>`
display: inline-flex;
border-radius: 4px;
cursor: pointer;
transition: all 0.2s ease-in-out;
font-weight: 900;
padding: 0.5rem 1rem;

${({$size})=> {
    switch($size){
        case "small": return css `padding:0.25rem 0.5rem; font-size: 0.75rem`;
        case "large": return css `padding:0.625rem 1.25rem; font-size: 0.75rem`;
        default: return css `padding:0.375rem 0.75rem; font-size: 0.75rem`;
    }
}}

${({ $fullWidth }) => {
    if ($fullWidth) return css`width: 100%;`;
  }}
  ${({ $width }) => {
    if ($width) return css`width: ${$width};`;
  }}

${({$variant})=> {
    const variant = $variant || 'primary';
    switch(variant){
        case 'danger': return css`
        background-color: ${p=> p.theme.colors.alert};
        color: #fff;
        border: none;
        &:hover{
            background-color: #dc2626;
        }
        `;

        case 'outline': return css`
        background-color: transparent;
        color: #333;
        border: 1px solid #d1d3e2;
        &:hover{
            background-color: #f8f9fa;
        }
        `;

        case 'primary': return css`
        background-color: #2563eb;
        color: #fff;
        border: none;
        &:hover{
            background-color: #1d4ed8;
        }
        `;

        case 'ghost': return css`
        background-color: transparent;
        color: inherit;
        border: none;
        padding: 0;
        &:hover{
            opacity:0.7;
        }
        `;
    }
}}
`;
