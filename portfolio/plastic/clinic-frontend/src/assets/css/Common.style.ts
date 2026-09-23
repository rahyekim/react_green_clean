import {css} from 'styled-components'

export const FlexCenter =css`
display: flex;
justify-content: center;
align-items: center;
`;

export const FlexBetween =css`
display: flex;
justify-content: space-between;
align-items: center;
`;

export const FlexTopBetween =css`
display: flex;
justify-content: space-between;
align-items: flex-start;
`;

export const FlexEnd =css`
display: flex;
justify-content: flex-end;
align-items: center;
`;

export const FlexStart =css`
display: flex;
justify-content: flex-start;
align-items: center;
`;

export const FlexColumn =css`
display: flex;
flex-direction: column;
`;

export const FlexRow =css`
display: flex;
flex-direction: row;
`;

export const FlexWrap =css`
display: flex;
flex-wrap: wrap;
`;



export const LinearGradient = css`
background-image: linear-gradient(180deg, #4e73df 10%, #224abe 100%);
`;




export const TransitionAll = css`
transition: all 0.2s ease-in-out;
`;

export const ButtonBasic = css`
width: 100%;
padding: 0.75rem 1rem;
font-size: 0.8rem;
border-radius: 10rem;
font-weight: bold;
outline: none;
border: none;
cursor: pointer;
`;

export const TextCenter = css`
text-align: center;
`;

export const ErrorText = css`
  font-size: 0.75rem;
  color: #e74a3b;
  margin-top: 0.2rem;
  margin-left: 1rem;
  display: block;
`;

export const BlueButtonTheme =css`
background-color: #4e73df;
color: white;
border-radius: 10rem;

&:hover{
    background-color: #2e59d9;
    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
`;

export const CircleBtn = css`
width: 2.5rem;
height: 2.5rem;
border-radius: 50%;
border: none;
outline: none;
color: white;
cursor: pointer;
`;


export const Transparent = css`
background-color: transparent;
padding: 0.35rem 0.8rem;
border-radius: 0.35rem;
font-size: 0.85rem;
font-weight: 600;
`;

export const BoxShadow = css`
box-shadow: 0 0.15rem 1.75rem 0 rgba(58,59,69,0.15);
`;

//hover용(동적용)
export const BoxShadow2 = css`
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
 0 2px 4px -1px rgba(0, 0, 0, 0.06);

`;

//은은한 부유감(기본정적)
export const BoxShadowBasic= css`
box-shadow: 0 4px 8px -1px rgba(0, 0, 0, 0.05);
`;

//Active / Inset (클릭 시 꾹 눌림 또는 입력창 안쪽 음각)
export const BoxShadowPressed = css`
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.1);
`;

export const Noscrollbar = css`
&::-webkit-scrollbar{
    width: 5px;
}
&::-webkit-scrollbar-track {
    background: transparent; 
    border-radius: 50px;
  }
&::-webkit-scrollbar-thumb{
   background-color: #f1f2f7; 
    border-radius: 50px;
    transition: background-color 0.2s ease;
}
&::-webkit-scrollbar-thumb:hover {
    background-color: #dbddee; 
}

`;