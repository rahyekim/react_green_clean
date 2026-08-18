'use client'

import styled from 'styled-components' // next.comfig.ts 에 compiler 추가 

export const Wrapper= styled.div`
width: 100%;
`;
export const StepNav= styled.div`
display: flex;
`;
export const StepItem= styled.div<{$active?:boolean; $hasBorder?:boolean}>`

`;
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
export const CheckBoxLabel= styled.label`

`;
export const Checkbox= styled.input<{$isLarge?:boolean}>`

`;
export const TotlAgreeText= styled.span`

`;
export const AgreeText= styled.span`

`;
export const ButtonGroup= styled.div`

`;
export const Button= styled.button<{$variant:'primary'|'secondary'}>`


`;
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