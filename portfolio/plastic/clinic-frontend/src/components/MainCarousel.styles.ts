import { TextShadow } from "@/assets/css/common/Common.style";
import styled from "styled-components";

export const CarouselSection= styled.div`
/* margin-top:99px; */
position: relative;
width: 100%;
max-width: 2440px;
margin: 0 auto ;
`;
export const EmblaViewport= styled.div`
overflow: hidden; // (🌟필수) 밖으로 삐져나온 거 숨기기
width: 100%;
`;
export const EmblaContainer= styled.div`
display: flex;  //🌟
flex-direction: row; //🌟
width: 100%;
`;
export const EmblaSlide= styled.div`
flex: 0 0 100%; //🌟 flex-grow, flex-shrink 0 => 부모너비의100%
min-width: 0;  
//이미지가 뷰포트 크기에 딱 맞게(찌그러지거나 들어맞도록)강제하는 안전장치
//🌟minwidth없으면 삐져나감
position: relative;
`;
export const SlideImg= styled.img`
display: block; //🌟인라인 성질을 없애고 블록으로 만들어 여백 제거🌟
width: 100%;
object-fit: cover;
height: 100%;
position: relative;
min-height: 615px;

@media (max-width: 768px) {
    min-height: 400px;
}
`;

export const NavBtn= styled.button<{$direction:'left'|'right'}>`
position: absolute;
top: 50%;
transform: translateY(-50%); 
${({$direction})=>$direction === "left" ? "left:20px;": "right:20px;"}

width: 50px;
height: 50px;
border-radius: 50%;
background-color: rgba(255,255,255,0.3);
color: #fff;
border: none;
font-size: 24px;

cursor: pointer;
z-index: 10;

display: flex;
align-items: center;
justify-content: center;

transition: all 0.2s;

&:hover{
    background-color:  rgba(255,255,255,0.6) ;
    color: #333;
}

@media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 18px;
    ${props=>props.$direction === 'left' ? 'left:10px;': 'right:10px;'}
}

`;

export const SlideCopy = styled.div`
  position: absolute;
  top: 88%;                    
  left: 2%;                   
  color: #fff;
  font-size: 2rem;             
  font-weight: 800;            
  line-height: 1.2;             
  letter-spacing: -0.02em;  /* 자간 살짝 좁혀서 세련되게 */
  z-index: 10;
  text-align: left;           
  ${TextShadow}                

  /* 부드럽게 스르륵 나타나는 애니메이션 */
  animation: fadeInSlide 0.8s ease-out forwards;

  @keyframes fadeInSlide {
    from {
      opacity: 0;
      transform: translateY(10px); /* 살짝 아래에서 위로 스르륵 */
    }
    to {
      opacity: 1;
      transform: translateY(0);    /* 제자리로 안착 */
    }
  }

  /* 모바일 화면 대응 (글자 크기 및 위치 조절) */
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

// export const SlideCopy= styled.div`
// position: absolute;
// top: 90%;
// left: 5%;
// transform: translate(-50%,-50% );
// color: #fff;
// font-weight: bold;
// font-size: 1.5rem;
// z-index:10;
// text-align: center;
// ${TextShadow}
// `;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;