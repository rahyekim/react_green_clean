import styled, {keyframes} from "styled-components";

//원형 텍스트 회전 애니메이션
const spin = keyframes` //정중앙에서 회전해!
0%{
    transform: translate(-50%, -50%) rotate(0deg);
} 

100%{
    transform: translate(-50%, -50%) rotate(360deg);
}
`;

export const EventSection= styled.section`
padding: 80px 20px;
background-color: #111;
overflow: hidden;
`;
export const EventInner = styled.div`
max-width: 1200px;
width: 100%;
margin: 0 auto; /// 왜안먹지

`;
export const EventHeader= styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 40px;
`;
export const EventTitleGroup= styled.div`
display: flex;
flex-direction: column;
`;
export const EventMainTitle= styled.h2`
font-size: 32px;
font-weight: 900;
color: #eee;
margin: 0;
`;
export const EventSubTitle= styled.p`
font-size: 18px;
color: #888;
margin: 5px 0 0 0;
`;
export const EventControls= styled.div`
display: flex;
align-items: center;
gap: 10px;
`;
export const EventViewMoreBtn= styled.button`
border: 1px solid #fff;
background-color: transparent;
color: #fff;
border-radius: 20px;
padding: 8px 16px;
font-size: 14px;
font-weight: 600;
cursor: pointer;

transition: all 0.3s ease-in-out;
&:hover{
    background: #eee;
    color:#111;
}
`;

export const EventArrowBtn= styled.button`
width: 36px;
height: 36px;
border-radius: 50%;
background-color: #222;
border: none;
outline: none;
font-size: 16px;
color: white;
cursor: pointer;

display: flex;
justify-content: center;
align-items: center;

transition: all 0.2s ;
&:hover{
    background: #444;
}
`;
export const EventSliderWrapper= styled.div`
display: flex;
gap: 24px;
overflow-x: auto;
scroll-behavior: smooth;
padding: 30px 10px 20px 20px; //1번짤리는거 방지20px

&::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;
`;
export const HoverSvg= styled.svg`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);  
width: 85%; 
height: 85%;
/* margin-top: -42.5%;
margin-left: -42.5%; */
opacity: 0;
pointer-events: none;   //🌟카드hover니까...무시해야함
transition: opacity 0.3s ease-in-out;
transform-origin: center center; ////🌟
//정확히 한가운데를 축으로 삼아서 돌아(회전x,y축 고정)
`;
// export const EventCard= styled.div`
// min-width: 280px;
// width: 280px;

// position: relative;
// display: flex;
// flex-direction: column;
// flex-shrink: 0;
// cursor: pointer;

// &:hover ${HoverSvg}{
//     opacity: 1;
//     animation: ${spin} 15s linear infinite;
//     //linear:일정한 속도 //infinite:무한반복
// }

// &:hover img{
//     transform: scale(1.05);
// }
// `;
// export const EventImgWrapper= styled.div`
// width: 100%;
// height: 320px;

// position: relative;
// overflow: hidden; 

// border-radius: 10px 10px 0 0 ;

// img{
//     display: block;
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition:transform 0.4s ease;
// }
// `;

// 🎯 평상시엔 직사각형이다가, 마우스를 올리면 위가 둥글게 변하는 애니메이션 추가
export const EventImgWrapper = styled.div`
  width: 100%;
  height: 340px;
  position: relative;
  overflow: hidden;
  
  /* 🎯 핵심 1: 평상시엔 모서리가 뾰족한 직사각형 */
  border-radius: 0px; 
  /* 🎯 핵심 2: 모양이 부드럽게 변하도록 트랜지션 추가 */
  transition: border-radius 0.3s ease-in-out;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
`;

export const EventCard = styled.div`
  min-width: 280px;
  width: 280px;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;

  /* 🎯 핵심 3: 마우스 오버 시 이미지 윗부분 양쪽 모서리를 둥글게 깎음 (가로 280px의 절반인 140px로 완벽한 반원 생성) */
  &:hover ${EventImgWrapper} {
    border-top-left-radius: 140px;
    border-top-right-radius: 140px;
  }

  &:hover ${HoverSvg} {
    opacity: 1;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;
export const RankBadge= styled.div<{$bgColor:string; $radius?:string}>`
position: absolute;
top: -15px;
left: -15px;
width: 54px;
height: 54px;

color: #111;
font-size: 25px;
font-weight: 900;

display: flex;
justify-content: center;
align-items: center;

z-index: 9;

box-shadow: 2px 2px 10px rgba(0,0,0,.4);
background-color: ${({$bgColor})=>$bgColor};
border-radius:  ${({$radius})=>$radius || '50%'};
`;
export const EventInfo= styled.div<{$bgColor:string}>`
padding: 10px 20px;
display: flex;
justify-content: space-between;
align-items: center;
background-color: ${({$bgColor})=>$bgColor};

border-radius: 0 0 10px 10px;

`;

export const SurgeryLabel = styled.div`
background: #181818;
color: #fff;
padding: 4px 12px;
font-size: 14px;
font-weight: 700;
`;
export const EventPrice = styled.div`
color: #111;
font-size: 32px;
font-weight: 500;
letter-spacing: -1px;
span{
    color: #666;
    font-size: 18px;
    font-weight: 500;
    margin-left: 2px;
}
`;
// export const = styled.div``;