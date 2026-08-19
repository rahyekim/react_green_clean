'use client'

import styled from 'styled-components' // next.comfig.ts 에 compiler 추가 

export const Wrapper= styled.div`
width: 100%;
max-width: 800px;
margin: 0 auto;
padding: 40px 20px;
display: flex;
flex-direction: column;
min-height: 100vh;

`;
export const StepContainer= styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 50px;

`;

export const Step = styled.div<{$active:boolean}>`
display: flex;
align-items: center;
gap: 8px;

`;

export const StepNumber= styled.div<{$active?:boolean}>`
width: 24px;
height: 24px;
border-radius: 50%;
background-color: ${({$active})=> $active ? '#111': '#f0f0f0'};
color: ${({$active})=>$active ? '#fff': '#999'};
font-size: 13px;
font-weight: bold;

display: flex;
align-items: center;
justify-content: center;
`;

export const StepText= styled.span<{$active:boolean}>`
font-size: 16px;
font-weight: ${({$active})=>$active ? 'bold' : 'normal'};
color: ${({$active})=> $active ? '#000':'#999'} ;
text-decoration: ${({$active})=> $active ? 'underline' : 'none'};
text-underline-offset: 4px; //offset 글자와 밑줄간격
`;

export const StepDivider= styled.div`
width: 40px;
height: 1px;  //0px?
border-bottom: 1px dashed #ccc;
margin: 0 15px;
`;

export const CheckAllWrapper= styled.div`
border-top: 1px solid #e5e5e5;
border-bottom: 1px solid #e5e5e5;
padding: 20px 0;
margin-bottom: 30px;
`;
export const CheckboxLabel = styled.label`
display: flex;
align-items: center;
gap: 10px;
cursor: pointer;
`;

// 🌟커스텀 사각 체크박스 디자인🌟
export const CheckboxInput= styled.input`
appearance: none; //기존꺼 숨김
flex-shrink: 0;

width: 20px;
height: 20px;
border: 1px solid #d1d5db;
border-radius: 3px;
background-color: #fff;
cursor: pointer;
position: relative;
&:checked{
    border-color: #111;
}
/* 체크시 나타나는 v마크 */
&:checked::after{
    content: '✔';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); // 🏖️ 가운데정렬공식
    color: #181818;
    font-size:14px;
}
`;
export const CheckAllText= styled.span`
font-size: 16px;
font-weight: bold;
color: #111;
`;
export const TermSection= styled.div`
margin-bottom: 30px;
`;
export const TermHeader= styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 15px;
`;
export const TermTitle= styled.span`
font-size: 15px;
color: #444;
`;
export const ToggleButton= styled.button`
background: none;
border: none;
color: #666;
font-size: 14px;
cursor: pointer;
display: flex;
align-items: center;
gap: 4px;
`;

export const TermContentBox = styled.div<{$isOpen:boolean}>`
display: ${({$isOpen})=>$isOpen ? 'block': 'none'};
width: 100%;
height: 140px;
overflow-y: auto;
border: 1px solid #e5e5e5;
border-radius: 6px;
padding: 20px;
font-size: 13px;
color: #666;
background-color: #f9f9f9;
line-height: 1.6; //160%
white-space: pre-wrap; 

/* 박스 내부 스크롤바만 커스텀 */
&::-webkit-scrollbar {
    width: 4px;
}

&::-webkit-scrollbar-thumb {
    background: #e5e5e5;
    border-radius: 20px;
}
`;

/*
페이지에서 글자의 띄어쓰기, 들여쓰기, 줄바꿈을 코드에 적은 그대로 유지하면서
글쓴 내용이 화면상자 크기를 넘어가면 자동으로 다음줄로 넘겨주는 css속성
 */

export const ButtonGroup= styled.div`
display: flex;
justify-content: center;
gap: 10px;
/* margin-top: 60px; */
margin-top: auto; //margin-top: auto 가 남은공간 흡수
/* 상단 여백을 자동으로 채워 버튼을 맨 아래로 밀어냄 */
`;
export const Button= styled.button<{$variant:'outline'|'solid'}>`
width: 180px;
height: 54px;
font-size: l6px;
font-weight: bold;
border-radius: 4px;
cursor: pointer;
transition: all .2s;
background-color: ${({$variant})=>$variant === 'outline' ? '#fff': '#000'};
border: 1px solid; //자동으로 검은색#000 
color: ${({$variant})=>$variant === 'outline' ? '#000' : '#fff'};

&:hover{
    background-color: ${({$variant})=>$variant === 'outline' ? '#f9f9f9': '#333'};
}

@media (max-width:480px){
    width: 100%;
}
`;
//export const = styled.div``;
//export const = styled.div``;
export const Container= styled.div`

`;
export const Title = styled.h2`

`;
export const Section= styled.div<{$marginBottom?:string}>`

`;
export const SectionTitle= styled.h3`

`;
export const TermsBox= styled.div<{$bg?:string}>`

`;

export const Checkbox= styled.input<{$isLarge?:boolean}>`

`;
export const TotlAgreeText= styled.span`

`;
export const AgreeText= styled.span`

`;

//export const = styled.div``;
//export const = styled.div``;
//export const = styled.div``;
//export const = styled.div``;





/*
1. 완벽한 중앙 정렬 (절대 지존)
요소를 가로·세로 한가운데 정확히 꽂아 넣을 때 쓰는 국룰 조합이야. 부모 요소에 딱 이 세트만 적어주면 끝!

코드: flex items-center justify-center

뜻: Flex박스를 켜고(flex), 세로 중앙 정렬(items-center)하고, 가로 중앙 정렬(justify-center)해라.

2. 모바일/데스크톱 화면 전환 (반응형 숨기기)
"모바일에서는 숨기고, PC 화면에서만 보여줘라" 혹은 그 반대일 때 무조건 쓰는 마법의 단어들이야.

PC만 보이기: hidden md:block (평소엔 숨김 hidden, 중간 크기 이상인 md 브레이크포인트부터 블록으로 보여줌)

모바일만 보이기: block md:hidden (평소엔 보이고, PC 화면부터 숨김)

3. 깔끔한 말줄임표 (...) 처리
제목이나 내용이 너무 길어서 박스를 뚫고 나갈 때, 뒤를 생략 부호로 싹둑 잘라주는 기능이야.

코드: truncate

뜻: 글자가 넘치면 알아서 잘라내고 뒤에 ...을 붙여줌 (내부적으로 overflow: hidden, text-overflow: ellipsis, white-space: nowrap이 합쳐진 형태야).

4. 반응형 그리드 카드 레이아웃 (쇼핑몰 상품 목록 등)
모바일에서는 1개씩 세로로 나오다가, 화면이 커지면 3개, 4개씩 쫘르륵 나열되게 만드는 치트키야.

코드: grid grid-cols-1 md:grid-cols-3 gap-4

뜻: 기본(모바일)은 1열(grid-cols-1), 중간 크기 이상(md)부터는 3열(grid-cols-3), 칸과 칸 사이의 간격(Gap)은 4(1rem)로 해라!

5. 화면 꽉 채우기 (Min-Height)
웹사이트 전체 배경색을 깔거나 레이아웃의 기본 뼈대를 잡을 때 브라우저 높이를 100% 꽉 채우는 용도야.

코드: min-h-screen

뜻: 최소 높이를 현재 보여지는 화면 높이(screen)만큼 꽉 채워라. (아까 배운 flex flex-col이랑 같이 쓰면 무적이야!)
 */