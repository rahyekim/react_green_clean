
import styled from "styled-components";


export const SideBarContainer = styled.ul`

width: 14rem !important;
/* min-height: 100vh;  */
height: 100%; /* 🔥 추천! */
background-color: #4e73df;
background-image: linear-gradient(180deg, #4e73df 10%, #224ade 100% );
 //180도의 선형..그라데이션..
background-size: cover;
margin: 0;
padding: 0;
list-style: none;
display: flex;
flex-direction: column;
`;

export const SideBarBrand =styled.a`

height: 4.375rem;  //70px;(로고사이즈)
text-decoration: none;
font-size: 1rem;
font-weight: 800;
padding: 1.5rem 1rem;
text-align: center;
text-transform: uppercase;
letter-spacing: 0.05rem;
z-index: 1;
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

position: relative;
`;

export const NavLink = styled.a`
    display: block;
    width:100%;
    text-align: left;
    padding:1rem;
    width: 14rem;
    color: rgba(255, 255, 255, .8) ;//빛의조합 섞을수록 하얀색
    font-weight: 700;
    text-decoration: none;
    &:hover{
        color:#fff3cd;
    }
    svg,i{
        margin-right: 0.25rem; 
        //4px 여백 아이콘 오른쪽 여백 🏠  Home
    }
`;

export const Divider = styled.hr`

margin: 0 1rem 1rem ; 
//위쪽 기본 여백 제거✅ 아래쪽 여백으로 메뉴 구분✅ 좌우 살짝 안쪽 정렬
border-top: 1px solid rgba(255,255,255,0.15);

`;