
import styled from "styled-components";

export const NavConatiner= styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
gap: 30px;
padding-bottom: 15px;
margin-top: 40px;

border-bottom: 3px solid #ffd1df;

@media (max-width: 768px) {
    justify-content: flex-start;
    overflow-x: auto; 
    padding-left: 20px;
    padding-right: 20px;

    &::-webkit-scrollbar{
        display: none;
    }
}
`;
export const CategoryItem= styled.div<{$active:boolean}>`
display: flex;
flex-direction: column;
align-items: center;
cursor: pointer;
position: relative;
min-width: 70px;

//선택된 상태일때 하단에서 올라오는 핑크색 삼각형 생성
${({$active})=>$active && `

&::after{
 content:'';
 position:absolute;
 bottom: -19px; //⭐위치 아래로 조굼 내려와야
 left: 50%;
 transform: translateX(-50%); //가로가운데정렬
 border-width: 0 13px 13px 13px ; //⭐핵심 삼각형크기
 border-style: solid;
 border-color: transparent transparent #ffd1df transparent;
}
`}
`;
export const ImgBox= styled.div<{$active:boolean}>`
position: relative;
overflow: hidden;

width: 76px;
height: 76px;
border-radius: 50%;
margin-bottom: 10px;

border: ${({$active})=>$active ? '4px solid #ffd1df' : '4px solid transparent'};
box-sizing: border-box;
transition: all .2s ease-in-out;

img{
    width: 100%;
    object-fit: cover;
}
`;
export const ActiveOverlay= styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(255,209,223,0.3);
border-radius: 50%;

display: flex;
justify-content: center;
align-items: center;

`;
export const CategoryText= styled.span<{$active:boolean}>`
font-size: 15px;
color: ${({$active})=>$active ? '#111' : '#666'};
font-weight: ${({$active})=>$active ? '700' : '400'};

transition: all 0.2s ease-in-out;
`;
//export const = styled.div``;
//export const = styled.div``;
//export const = styled.div``;



/*
&::after (가상 요소):content: ''를 빈 값으로 주면 화면에 존재

💡 삼각형을 만드는 마법 (border 성질 이용)
CSS에서 삼각형을 만드는 가장 유명한 국룰 기법

가상 요소의 너비(width)와 높이(height)를 0
사방의 테두리(border) 두께를 두껍게 주면, 
테두리끼리 서로 맞물리면서 모래시계 모양이나 삼각형 모양

border-color: transparent transparent #ffd1df transparent;
(위, 오른쪽, 아래, 왼쪽 순서)를 주면 아래쪽 테두리에만 연한 핑크색(#ffd1df)이 들어가고 
나머지 세 방향은 투명(transparent)해지면서,
위가 뾰족하고 아래가 넓은 역삼각형(말풍선 꼬리)

위치 잡기 (position: absolute)
bottom: -17px;과 left: 50%, 그리고 transform: translateX(-50%)을 조합해서 부모 박스의 정중앙 바로 아래쪽에 예쁘게 위치하도록 고정

 */