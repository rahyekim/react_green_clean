'use client'

import styled from "styled-components"
import Link from 'next/link'; // ✅


//SB amdin 2테마는 className으로 스타일이 먹기때문에 기본뼈대 태그만 저장
export const SideBarContainer = styled.ul<{$isCollapsed:boolean}>`

background-color: #4e73df;
min-height: 100vh;
width: ${props=> props.$isCollapsed ? '90px' : '224px'} !important;
transition: width 0.3s ease-in-out;
overflow-x: hidden ; //⭐접혔을 때 텍스트 튀어나오지않도록 방어

/* width: 14rem !important; //224px
/* min-height: 100vh;  
height: 100%;  🔥 추천! 부모 높이(100vh)그대로 따라가라
background-color: #4e73df;
background-image: linear-gradient(180deg, #4e73df 10%, #224ade 100% );
 //180도(위->아래)로..상단->하단색 변하는 그라데이션..
background-size: cover;
margin: 0;
padding: 0;
list-style: none; /* ul 기본 점 제거 
display: flex;
flex-direction: column; 메뉴들을 위에서 아래로 정렬 */
`;
export const BrandText = styled.div<{$isCollapsed:boolean}>`
display: ${({$isCollapsed})=>$isCollapsed ? "none" : "block"};
`;
export const SideBarBrand =styled(Link)`

height: 4.375rem;  //70px;(로고사이즈)
text-decoration: none;
font-size: 1rem;
font-weight: 800;
padding: 1.5rem 1rem;
text-align: center;
text-transform: uppercase;
letter-spacing: 0.05rem; /* 자간 간격 */
z-index: 1; //배경이나 다른자식들한테 로고가 묻혀서 클릭막히는거 방지
color:#fff;

white-space: nowrap; //⭐
overflow: hidden; //⭐

display: flex;
align-items: center;
justify-content: center;

/* flex-direction:  ${({$isCollapsed})=>$isCollapsed ? "column" : "row"}; */

&:hover{
    color:#fff;
    text-decoration: none;
}
.sidebar-brand-icon{
    font-size: 2rem;   //로고만 왕크게
}

`;

export const NavItem = styled.li`
width: 100%;
position: relative; /* 드롭다운이나 뱃지 등 서브 요소의 기준점 */
`;

export const NavLink = styled(Link)<{$isCollapsed:boolean}>`
/* ⭐block: 메뉴 가로 전체 영역(width: 100%)이 전부 클릭할 수 있는 버튼 */
display: flex; 
align-items: center;
width:100%; 
/* padding:1rem; // 글자+padding : 클릭영역... */
/*메뉴링크: display:block+padding  */
text-align: left;
color: rgba(255, 255, 255, .85) ;//빛의조합 섞을수록 하얀색 투명도 80%
font-weight: 700;
text-decoration: none;
white-space: nowrap; //⭐

//사이드바가 접히면 아이콘 가운데만 정렬되도록 조정
justify-content: ${({$isCollapsed})=> $isCollapsed ? "center": "flex-start"};

padding: ${({$isCollapsed})=> $isCollapsed ? "1rem 0" : "1rem 1.5rem"};

span{
    display: ${({$isCollapsed})=> $isCollapsed ? "none" : "inline"};
    margin-left: 15px;
}

&:hover{
    color:#fff;
    text-decoration: none;

    i, svg{
        transform: scale(1.2);
    }
}
svg,i{

    transition: transform 0.2s ease; //⭐부드럽게 커짐
}
`;

export const ToggleBtnWrapper = styled.div`

display: flex;
justify-content: center;
align-items: center;
padding: 1rem 0;


`;

export const ToggleBtn = styled.button`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: rgba(255,255,255, .2);
border: none;
color: white;
cursor: pointer;

outline: none !important; //⭐포커스클릭할때 생기는 기본테두리

display: flex;
align-items: center;
justify-content: center;
transition: background-color .2s ease;

&:hover{
    background-color: rgba(255,255,255, .3); 
    
}
`;

export const Divider = styled.hr`

margin: 0 1rem 1rem ;  // 순서 위 양옆 아래 
//위쪽 기본 여백 제거✅ 좌우 살짝 안쪽 정렬✅ 아래쪽 여백으로 메뉴 구분
border-top: 1px solid rgba(255,255,255,0.25); /* 은은한 15% 투명도 흰 선 */

`;

// export const Wrapper = styled.div`
// display:flex; 
// width:100%;
// height:100vh; 
// overflow:hidden;
// `;

// export const ContentWrapper = styled.div`
// display:flex; 
// flex-direction:column;
// width:100%; 
// overflow-x:hidden;
// background-color:#f8f9fc;
// `;

// export const MainContent = styled.div`
// flex: 1 0 auto;
// /*내용물의 크기를 기본으로 잡되(auto), 
// 화면이 좁아져도 원래 크기보다 줄어들지는 말고(0), 
// 만약 화면에 빈 공간이 남는다면 남는 여백을 네가 전부 채워라(1)."
// 1 (flex-grow): 늘어나는 비율
// 부모 컨테이너에 남는 여백이 있을 때, 
// 이 요소가 남는 공간을 꽉 채우도록 늘어나라는 뜻입니다. (기본값은 0)
// 0 (flex-shrink): 줄어드는 비율
// 부모 컨테이너의 공간이 부족해질 때, 
// 이 요소의 크기를 절대 줄이지 말라는 뜻입니다. (기본값은 1)
// auto (flex-basis): 기본 크기
// 요소의 기본 시작 크기를 내부 콘텐츠의 크기나 
// 설정된 width/height 값에 맞추겠다는 뜻입니다.
// */
// `;

// export const ContainerFluid = styled.div`
// width:100%;
// padding-right:1.5rem; padding-left:1.5rem;
// margin-right:auto; margin-left:auto;
// `;

// // SB Admin 2 테마는 className으로 스타일이 먹기 때문에 기본 뼈대 태그만 지정해 줍니다.
// export const SidebarContainer = styled.ul`
//   /* 기본적으로 ul 태그를 사용합니다 */
// `;

// export const SidebarBrand = styled(Link)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-decoration: none;
// `;

// export const Divider = styled.hr`
// `;

// export const NavItem = styled.li`
// `;

// export const NavLink = styled(Link)`
//   display: block;
//   padding: 1rem;
//   color: rgba(255, 255, 255, 0.8);
//   text-decoration: none;

//   &:hover {
//     color: #fff;
//     text-decoration: none;
//   }
  
//   i {
//     margin-right: 0.5rem; /* 아이콘과 글자 사이 간격 */
//   }
// `;