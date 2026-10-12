import styled,{css, keyframes} from "styled-components";

const fadeIn = keyframes`
from{opacity:0;}
to{opacity:1;}
`;
const fadeOut = keyframes`
from{opacity:1;}
to{opacity:0;}
`;

const slideUp = keyframes`
from{opacity:0; transform:translateY(1.25rem);}
to{opacity:1; transform:translateY(0);}
`;
const slideDown = keyframes`
from{opacity:1; transform:translateY(0);}
to{opacity:0; transform:translateY(1.25rem);}
`;

// 💡 Props 타입 정의 추가 (닫히고 있는지 여부를 받음)
interface ModalProps{
 $isClosing?:boolean;   
}

export const ModalOverlay = styled.div<ModalProps>`
position: fixed;
top:0; left:0;
background:rgba(0,0,0,.8);
width: 100%;
height: 100%;
z-index:99999;

display: flex;
justify-content: center;
align-items: center;

//배경애니메이션
animation:${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} .3s ease-out forwards;
`;
export const ModalContainer =styled.div`
background-color: #fff;
width:400px;
padding:24px;
border-radius:8px;
box-shadow:0 4px 12px rgba(0,0,0,0.15);
`;

//alert modal start
export const ModalBox = styled.div<ModalProps>`
background-color: ${p=> p.theme.colors.alertModal};
padding:2rem;
border-radius:0.75rem;
min-width:18.75rem;
max-width:90%; 
gap:1.5rem;

display: flex;
flex-direction: column;
align-items: center;

box-shadow: 0 2px 4px rgba(0,0,0,0.25);

animation:${({ $isClosing }) => ($isClosing ? slideDown : slideUp)} .3s ease-out forwards;
`;
export const ModalText = styled.p`
font-size:1.125rem;
color: ${p=> p.theme.colors.alertModaltxt};
text-align:center;
margin:0;
line-height:1.5;
`;


/* 배경+모달 애니메이션
나올 때 (fadeIn + slideUp)
배경이 부드럽게 어두워지면서
동시에 모달 창이 아래에서 위로 슥 살짝 올라오면서 나타남

사라질 때 (fadeOut + slideDown)
모달 창이 아래로 스르륵 내려가면서(slideDown),
동시에 배경 어두운 화면이 서서히 걷힘(fadeOut).
 */