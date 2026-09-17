import styled, { keyframes } from "styled-components";

import { FlexCenter,BoxShadow,TransitionAll, ButtonBasic, FlexBetween, FlexColumn, FlexEnd, BlueButtonTheme } from "./Common.style";

//나타나는 애니메이션
const fadeIn = keyframes`
from{
    opacity: 0;
}
to{
    opacity: 1;
}
`;

// 팝업 박스가 살짝 커지면서 나타나는 효과
const scaleUp = keyframes`
from{
    opacity: 0;
    transform: scale(0.95);
}
to{
    opacity: 1;
    transform: scale(1);
}
`;


export const PopupOverlay= styled.div`
position: fixed;
inset: 0;
width: 100%;
height: 100vh;
background-color: rgba(0,0,0,.7);
z-index: 9999;
${FlexCenter};

animation: ${fadeIn} 0.2s ease-in-out forwards;
`;
export const PopContainer= styled.div<{$top?:string; $left?:string}>`
background-color: #eee;
border-radius: 10px;
${BoxShadow};

max-width: 450px;
width: 90%;
overflow: hidden; 

animation: ${scaleUp} 0.2s ease-in-out forwards;

`;
export const PopHeader= styled.header`
${FlexBetween};
padding: 1rem 1.5rem;
border-bottom: 1px solid #e3e6f0;
background-color: #f8f9fc;
`;
export const PopTitle= styled.h2`
margin: 0;
font-size: 1.1rem;
font-weight: bold;
color: #4e73df;
`;
export const CloseIcon= styled.button`
${FlexCenter}
width: 30px;
height: 30px;
border-radius: 50%;
background-color: transparent;
border: none;
font-size: 1.5rem;
color: #858796;
cursor: pointer;
line-height: 1;

${TransitionAll}
&:hover{
    color: #3a3b45;
    background-color: #dedede;
}
`;
export const PopBody= styled.div`
padding: 1.5rem;
font-size: 0.95rem;
color: #5a5c69;
line-height: 1.5;
white-space: pre-wrap; //💙\n줄바꿈가능
`;
export const PopFooter= styled.div`
${FlexEnd};
gap: 0.5rem;
padding: 1rem 1.5rem;
/* border-top: 1px solid #e3e6f0; */
`;
export const CancelBtn= styled.button`
padding: 0.5rem 1rem;
border-radius: 0.35rem;

background-color: #858796;
border: 1px solid #858796;
color: white;
cursor: pointer;
${TransitionAll}
&:hover{
    background-color: #717384;
}
`;
export const ConfirmBtn= styled.button`
padding: 0.5rem 1rem;
border-radius: 0.35rem;

background-color: #4e73df;
border: 1px solid #4e73df;
color: white;
cursor: pointer;
${TransitionAll}
&:hover{
    background-color: #2e59d9;
}
`;
//export const = styled.div``;
//export const = styled.div``;
//export const = styled.div``;