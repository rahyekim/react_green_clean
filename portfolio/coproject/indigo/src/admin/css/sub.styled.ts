
import { Form } from "react-router-dom";
import styled from "styled-components";

// export const  =styled.div``;

//헤더
export const HeaderWrapper = styled.header`

`;

//로고
export const LogoArea =styled.div`

`;

//글씨 로고 스타일
export const  TextLogo = styled.span`

`;

//이미지 로고 스타일
export const ImgLogo =styled.img`

`;

//네비게이션 영역
export const NavMenu  =styled.nav`

`;

export const MenuList  =styled.ul`

`;

export const  MenuItem = styled.li`

`;
//서브메뉴 링크 스타일
export const  MenuLink =styled.a`

`;


//관리자

export const PageWrapper =styled.div`
padding: 20px; 
/* max-width: 90%; ///??? */
width:100%;

`;

export const  PageTitle=styled.h1`
font-size: 1.75rem;
font-weight: 400;
color:#5a5c69;
////?????

`;

export const Card =styled.div`
background-color: #fff;
border: 1px solid #e3e6f0;
border-radius: 8px;
padding: 20px;
margin-bottom:20px;
box-shadow: 0 4px 8px rgba(0,0,0,.05);
`;

export const  SectionTitle =styled.h3`
font-size: 1.2rem;
color: #4e73df;
margin-bottom: 15px;
border-bottom: 1px solid #eee;
padding-bottom: 10px;
`;

export const FormGroup = styled.div`
margin-bottom: 15px;
display: flex;
flex-direction: column;
label{
    font-weight: bold;
    margin-bottom: 8px;
    color: #555
}
`;

export const  Input =styled.input`
padding: 10px;
border: 1px solid #ccc;
border-radius: 12px;
font-size: 14px;
width: 100%;
max-width: 400px;

`;

export const RadioGroup  =styled.div`
display: flex;
gap: 15px;
align-items: center;
font-weight: normal;

label{
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
}
`;

export const MenuRow =styled.div`
display: flex;
gap:10px;
margin-bottom: 10px;
align-items: center;
`;

 export const Button = styled.button<{variant? : 'primary'|'success'|'danger'}>`
 border: none;
 padding: 10px 15px;
 border-radius: 15px;
 white-space: nowrap;
 color: white;
 cursor: pointer;
 font-weight: bold;

 background-color: ${({variant})=> variant === "danger" && "#e74a3b"};
 background-color: ${({variant})=> variant === "success" && "#1cc88a"};
 background-color: ${({variant})=> variant === "primary" && "#4373df"};

 &:hover{
    opacity:90%;
 }
 `;

export const SaveBtnWrap=styled.div`
text-align: right;
margin-bottom: 20px;
`;


















