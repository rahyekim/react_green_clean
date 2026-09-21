import styled from "styled-components";
import { BlueButtonTheme, BoxShadow, ButtonBasic, FlexBetween, FlexCenter, TransitionAll, Transparent } from "../Common.style";

export const ToneContainer= styled.div`
width: 100%;
min-height: 100vh;
`;
export const PageHeader= styled.div`
${FlexBetween}
margin-bottom:1.5rem;
`;
export const PageTitle= styled.h1`
margin: 0;
font-size: 1.5rem;
color: #5a5c69;
font-weight: 700;
`;
export const SaveButton= styled.button`
${FlexCenter}
gap: 8px;
border: none;
padding: 0.6rem 1rem;
font-size: 0.9rem;
font-weight: 600;
cursor: pointer;
${BoxShadow}
${TransitionAll}
${BlueButtonTheme}
border-radius: 10px;
`;
export const CardGrid= styled.div`
display: grid;
grid-template-columns: repeat(2,1fr);
gap: 1.5rem;

@media (max-width:768px) {
    grid-template-columns: 1fr;
} 
`;
export const SettingCard= styled.div`
background-color: #fff;
border-radius: 0.35rem;
${BoxShadow}
border: 1px solid #e3e6f0;
overflow: hidden;

/* 🌟 추가하기: 내부 요소를 세로로 배열하고 꽉 채우기 */
display: flex;
flex-direction: column;
`;
export const CardHeader= styled.div`
background-color: #f8f9fc;
padding: 1rem 1.25rem;
border-bottom: 1px solid #e3e6f0;
`;
export const CardTitle= styled.h6`
margin: 0;
font-weight: 700;
font-size: 1rem;
color: #4e73df;
`;
export const CardBody= styled.div`
padding: 1.5rem;
color: #858796;

/* 🌟 추가하기: 카드의 남은 공간을 이 본문이 꽉 채우게 하고, 하단 텍스트를 밀어내기 */
flex: 1;
display: flex;
flex-direction: column;
justify-content: space-between; //selectedText가 무조건 바닥에 찰싹 붙음
p{
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
}
`;
export const ColorOptWrapper= styled.div`
display: flex;
gap: 1.5rem;
margin-bottom: 1.5rem;
`;
export const ColorBox= styled.div<{$color:string; $isActive:boolean}>`
${FlexCenter}
height: 5rem;
width: 5rem;
background-color: ${props=>props.$color};
cursor: pointer;

//💘예쁜 이중 컬러 테두리 링
box-shadow: ${props=> props.$isActive 
? `0 0 0 3px #fff, 0 0 0 6px ${props.$color}` 
: '0 0.15rem 0.5rem rgba(0,0,0,.2)'};
`;
// export const ToggleWrapper= styled.div`
// display: flex;
// align-items: center;
// /* gap: 10px;  */
// background-color: #eaecf4;
// border-radius: 0.5rem;
// padding: 0.3rem;
// width: fit-content;
// margin-bottom: 1.5rem;
// `;
// export const ModeButton= styled.button<{$isActive:boolean; $isDark?:boolean}>`
// display: flex;
// align-items: center;
// gap: 0.5rem;
// padding: 0.6rem 1.5rem;
// border-radius: 0.35rem;
// border: none;
// font-weight: 600;
// cursor: pointer;
// ${TransitionAll}

// background-color: ${props=>props.$isActive ? 
//     (props.$isDark ?'#202020': 'white') : "transparent"};
// color: ${props=> props.$isActive ? 
// (props.$isDark ? 'white': '#4e73df') : '#858796' };
// `;

export const SelectedText= styled.div`
font-size: 0.9rem;
border-top:1px solid #eaecf4;
padding-top: 1rem;
strong{
    color: #5a5c69;
}
`;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f3f9; 
  border-radius: 0.75rem;     
  padding: 0.35rem;
  width: fit-content;
  /* width: 100%; */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.04); /* 안쪽으로 살짝 파인 듯한 입체감 */
  //inset:그림자의 방향을 밖이 아니라 "안쪽"으로 테두리에 그림자 
  //=> 마치 종이나 상자의 가운데가 꾹 파여서 안으로 들어간(오목한) 느낌
`;

export const ModeButton = styled.button<{ $isActive: boolean; $isDark?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.6rem 1.4rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  
 flex: 1;

  @media (max-width: 768px) {
  span { 
    display: none;
  }
}
  cursor: pointer;
  ${TransitionAll}

  /* 선택되었을 때와 아닐 때의 스타일 분기 */
  background-color: ${props => props.$isActive 
    ? (props.$isDark ? '#1e293b' : '#ffffff') 
    : 'transparent'};

  color: ${props => props.$isActive 
    ? (props.$isDark ? '#ffffff' : '#0f172a') 
    : '#64748b'};

  /* 🌟 핵심 포인트: 선택된 버튼에만 예쁜 입체 그림자와 미세한 강조 효과 주기 */
  box-shadow: ${props => props.$isActive 
    ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
    : 'none'};

  /* 마우스 올렸을 때 살짝 진해지는 효과 */
  &:hover {
    color: ${props => props.$isActive ? '' : '#0f172a'};
  }
`;


/* 🎨 그림자 2개 조합!
사물 바로 밑에 생기는 진하고 좁은 그림자 (밀착감)
사물이 바닥에서 떠 있어서 멀리 퍼지는 연하고 넓은 그림자 (공간감)

💘치트키!!
퍼지는 크기(Spread Radius): -1 마이너스퍼짐값!
안쪽으로 살짝 오그라들면서(수축하면서) 날렵해짐

1그림자) 0 4px 6px -1px rgba(0, 0, 0, 0.1)
사물이 바닥에서 살짝 떠 있다
2그림자) 0 2px 4px -1px rgba(0, 0, 0, 0.06)
바로 밑에 아주 진하고 좁은 그림자를 살짝 깔아서 
=> 버튼의 밀착감과 디테일
 */

// 🌟 1. 전체 스위치 판 (알약 모양 배경)
export const ToggleSwitch = styled.div<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 140px;
  height: 44px;
  background-color: ${props => props.$isActive ?  '#e2e8f0': '#1e293b'};
  border-radius: 9999px; /* 완벽한 알약(캡슐) 모양 */
  cursor: pointer;
  padding: 4px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
`;

// 🌟 2. 안에서 스르륵 움직이는 동그라미(핸들)
export const SwitchHandle = styled.div<{ $isActive: boolean }>`
  position: absolute;
  left: 4px;
  width: 36px;
  height: 36px;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  /* 핵심: isDarkMode 상태($isActive)에 따라 오른쪽으로 스르륵 이동! */
  transform: ${props => props.$isActive ? 'translateX(96px)' : 'translateX(0)'};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

// 🌟 3. 스위치 안쪽에 글자 배치
export const SwitchText = styled.span<{ $isActive: boolean }>`
  width: 100%;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 1; /* 동그라미 위로 글자가 오도록 */
  color: ${props => props.$isActive ? '#64748b' :'#ffffff' };
  transition: color 0.3s ease;
  
  /* 동그라미 위치에 따라 글자 위치 살짝 보정 */
  padding-left: ${props => props.$isActive ? '0px' : '24px'};
  padding-right: ${props => props.$isActive ? '24px' : '0px'};
`;