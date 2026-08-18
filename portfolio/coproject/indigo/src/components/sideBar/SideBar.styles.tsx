
import styled from "styled-components";

//🔹add 사이드바와 버튼을 통째로 묶어주는 영역
export const SidebarWrapper= styled.div<{$isOpen:boolean}>`
position: relative;
height: 100vh;
width: ${({$isOpen})=> $isOpen ? '224px': '0px'};
transition: width 0.3s ease-in-out;
z-index: 999;

`;

export const SideBarContainer = styled.ul<{$isOpen:boolean}>`

width: 224px; //224px
height: 100%; /* 🔥 추천! 부모 높이(100vh)그대로 따라가라*/
background-color: #4e73df;
background-image: linear-gradient(180deg, #4e73df 10%, #224ade 100% );
 //180도(위->아래)로..상단->하단색 변하는 그라데이션..
background-size: cover;
margin: 0;
padding: 0;
list-style: none; /* ul 기본 점 제거 */
display: flex;
flex-direction: column; /* 메뉴들을 위에서 아래로 정렬 */
overflow-x: hidden; //🌟안전장치
transform: translateX(${({$isOpen})=>$isOpen ? '0': '-100%'});
//🌟닫히면 화면 왼쪽 바깥(-100%)으로 밀어내서 숨킴
transition: transform 0.3s ease-in-out;
`;

//🏖️ 화살표 탭 버튼 
export const ToggleButton = styled.div`
position: absolute;
top: 50%;
transform: translateY(-50%);
right: -20px; //0이면 부모오른쪽맨끝-> 버튼크기만큼 이동
width: 20px;
height: 60px;
background-color: #fff;
border: 1px solid #ded3e2;
border-left: none;
border-radius:0 7px 7px 0 ;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
box-shadow: 2px 0 5px rgba(0,0,0,.3);

i{
    font-size: 12px; 
    color: #858796;
}

&:hover{
    background-color: #f8f9fc;
    i{
        color: #4e73df;
    }
}
`;

export const SideBarBrand =styled.a`

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

display: flex;
align-items: center;
justify-content: center;

&:hover{
    color:#fff3cd;
    text-decoration: none;
}
`;

export const NavItem = styled.li`

position: relative; /* 드롭다운이나 뱃지 등 서브 요소의 기준점 */
`;

export const NavLink = styled.a`
    /* ⭐block: 메뉴 가로 전체 영역(width: 100%)이 전부 클릭할 수 있는 버튼 */
    display: block; 
    width:100%; 
    padding:1rem; // 글자+padding : 클릭영역...
    /*메뉴링크: display:block+padding  */
    text-align: left;
    color: rgba(255, 255, 255, .85) ;//빛의조합 섞을수록 하얀색 투명도 80%
    font-weight: 700;
    text-decoration: none;
    &:hover{
        color:#fff;
    }
    svg,i{
        margin-right: 0.25rem; /* 4px 간격 */
        //4px 여백 아이콘 오른쪽 여백 🏠  Home
    }
`;

export const Divider = styled.hr`

margin: 0 1rem 1rem ;  // 순서 위 양옆 아래 
//위쪽 기본 여백 제거✅ 좌우 살짝 안쪽 정렬✅ 아래쪽 여백으로 메뉴 구분
border-top: 1px solid rgba(255,255,255,0.25); /* 은은한 15% 투명도 흰 선 */

`;



//export const = styled.div``;
//export const = styled.div``;
//export const = styled.div``;
//export const = styled.div``;
//export const = styled.div``;
//export const = styled.div``;