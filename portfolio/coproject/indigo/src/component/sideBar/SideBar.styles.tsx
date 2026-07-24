
import styled from "styled-components";


export const SideBarContainer = styled.ul`

width: 14rem !important; //224px
/* min-height: 100vh;  */
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
    color: rgba(255, 255, 255, .8) ;//빛의조합 섞을수록 하얀색 투명도 80%
    font-weight: 700;
    text-decoration: none;
    &:hover{
        color:#fff3cd;
    }
    svg,i{
        margin-right: 0.25rem; /* 4px 간격 */
        //4px 여백 아이콘 오른쪽 여백 🏠  Home
    }
`;

export const Divider = styled.hr`

margin: 0 1rem 1rem ;  // 순서 위 양옆 아래 
//위쪽 기본 여백 제거✅ 좌우 살짝 안쪽 정렬✅ 아래쪽 여백으로 메뉴 구분
border-top: 1px solid rgba(255,255,255,0.15); /* 은은한 15% 투명도 흰 선 */

`;