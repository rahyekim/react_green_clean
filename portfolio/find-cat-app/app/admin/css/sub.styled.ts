import { CustomButton } from './../../../../../BBS/board-frontend/src/assets/css/Board.styles';

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

`;

export const  PageTitle=styled.h1`
font-size: 1.5rem;
color:#333;
margin-bottom: 20px;

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
align-items: center;
gap: 20px;
font-weight: normal;

label{
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    user-select: none; /* 글자 드래그 방지 */

    input[type="radio"] {
      cursor: pointer;
      width: 16px;
      height: 16px;
      appearance: auto; /* 🟢 브라우저 기본 라디오 버튼 디자인 강제 적용 */
      accent-color: #3f51b5; /* 체크되었을 때의 색상 */
    }
}
`;

export const MenuRow =styled.div`
display: flex;
align-items: center;
justify-content: center;
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

export const GridWrap = styled.div`

display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 20px;

`;

export const DivKey = styled.div`

border: 1px solid #ddd;
padding: 10px;
text-align: center;

border-radius: 15px; //내가넣은거..ㅎ
overflow: hidden;   //{2. 부모 영역을 넘어가는 자식 요소를 숨김(잘라냄)}
`;

export const Relative = styled.div`

position: relative;

height: 150px;       // 💡 NoneImage랑 똑같이 높이를 잡아줘야 합니다!
overflow: hidden;    // 💡 이미지도 밖으로 안 튀어나오게!

img {
        width: 100%;
        height: 100%;
        object-fit: cover; // 💡 이미지가 찌그러지지 않고 박스에 꽉 차게
        display: block;
    }
button{

}
`;

export const NoneImage = styled.div`

width: 100%;
height: 150px;
background-color: #f5f5f5;
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 10px;  //padding있어서 굳이없어도됨 
color: #999;
object-fit: contain; //내가넣은거
`;

export const FileUpload = styled.input`

width: 100%;
font-size: 12px;

border: none;

`;

export const ButtonPrimary = styled.button<{variant? : 'primary'|'success'|'danger'}>`
padding: 10px 30px;
font-size: 16px;
border-radius: 17px;
border: none;
color: white;
font-weight: bold;
white-space: norap;

background-color: ${({variant})=> variant === "danger" && "#e74a3b"};
 background-color: ${({variant})=> variant === "success" && "#1cc88a"};
 background-color: ${({variant})=> variant === "primary" && "#4373df"};

&:hover{
    opacity: 0.9;
}
`;



export const GridWrap3 = styled.div`

display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 30px;

`;

export const BlogKey = styled.div`

display: flex;
flex-direction: column;
gap: 10px;

`;

export const BlogImgWrap = styled.div`

border: 1px solid #ddd;
padding: 10px;
text-align: center;
position: relative;



`;

export const BlogImg = styled.img`

width: 100%;
height: 200px;
object-fit: cover;
/* display: flex;
align-items: center;
justify-content: center; */

`

export const Exit = styled.button<{variant? : 'primary'|'success'|'danger'}>`
top: 0; right: 0;
position: absolute;
padding: 5px 10px;
font-size: 12px;
border-radius: 50%;
border: none;
color: white;
font-weight: bold;
background-color: #242222;

background-color: ${({variant})=> variant === "success" && "#1cc88a"};
background-color: ${({variant})=> variant === "primary" && "#4373df"};

&:hover{
    opacity: 0.9;
    background-color: ${({variant})=> variant === "danger" && "#e74a3b"};
}
`;

export const BottomInfo = styled.div`
width: 100%;
height: 200px;
background-color: #f5f5f5;
display: flex;
align-items: center;
justify-content: center;
color: #999;
border-radius: 7px;
`;

export const MapPreview = styled.div`

width: 100%;
height: 200px;
object-fit: cover;
background-color: #eaeaea;
display: flex;
align-items: center;
justify-content: center;
border-radius: 7px;
overflow: hidden;

`;


export const CustomFileButton = styled.label`
display: flex;
justify-content: center; /* 가로 중앙 정렬 */
align-items: center;     /* 세로 중앙 정렬 */
width: 100%;
padding: 10px;
background-color: #f0f0f0;
border-radius: 6px;
cursor: pointer;
margin-top: 8px;
font-size: 13px;
/* white-space: nowrap; */
&:hover { background-color: #e0e0e0; }
`;

//테이블 -------
export const CTable = styled.table`
width: 100%;
border-collapse: collapse;
margin-top: 10px;

thead{
    tr{
        background-color: #f5f5f5;
        border-bottom: 2px solid #ddd;
        text-align: center;
    }

    th{
        padding:12px 8px;
    }
}

tbody{
    tr{
        border-bottom: 1px solid #eee;
        text-align: center;

        td{
            padding: 12px 8px;
            font-size: 14px;
            color: #888;
        }
    }
}

`;

export const TextArea=styled.textarea`

width: 100%;
height: 80px;
padding: 10px;
border: 1px solid #ccc;
border-radius: 7px;
resize: none; ////🌟🌟크기고정
`;

//layout 
export const SpaceBetween= styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 15px;
`;
//버튼
interface ColorBtnProps {
    bgColor?: 'red'| 'yellow' | 'pink' | 'green' |'purple' | 'blue'
}
//선택된 색상에 따라 배경색(hex 코드)을 반환하는함수

const getBgColor = (color?:string)=>{
    switch(color){
        case 'red' : return '#dc3545' ;
        case 'yellow' : return '#ffc107';
        case 'green' : return '#28a745';  //1cc88a 28a745
        case 'purple' : return '#6f42c1'
        case 'pink' : return '#e83e8c';
        case 'blue': return '#007bff';  //4373df 007bff
        default: return '#e74a3b'; 
    }
}

// 선택된 색상에 따라 글자색(hex 코드)을 반환하는함수
//(노란색 배경에는 검정 글씨가 잘 보임)
const getTextColor = (color?:string)=>{
   if(color==='yellow') return '#212529';
   return '#fff';
}

export const ColorButton= styled.button<ColorBtnProps>`
padding: 8px 15px;
border: none;
border-radius: 12px;
cursor: pointer;
font-weight: bold;
text-align: center;
min-width: 90px; /* 👈 버튼의 최소 너비를 통일하여 글자 수 차이 보완 */
background-color: ${({bgColor})=> getBgColor(bgColor)};
color: ${({bgColor})=> getTextColor(bgColor)};
transition: opacity 0.2s ease-in-out;

&:hover{
    opacity: 0.8;
}
`;

//Typo

interface StatusProps{
    statusColor?: 'blue' | 'red' | 'green' | 'gray';
}

export const getStatusColor = (color?:string)=>{
     switch(color){
       case 'blue': return '#007bff';   // 파란색 추가
        case 'red': return '#dc3545';
        case 'green': return '#28a745';
        case 'gray': return '#6c757d';   // 회색 추가
        default: return '#6c757d';       // 기본값 (회색)
    }
}

export const StatusText= styled.span<StatusProps>`
color: ${({statusColor})=> getStatusColor(statusColor)};
font-weight: bold;
`;
export const CheckInput= styled.input`

appearance: auto;
-webkit-appearance: auto;
width: 16px;
height: 16px;
cursor: pointer;

`;

export const ButtonWrapper = styled.div`
display: flex;
gap: 8px;
align-items: center;
justify-content: center ;
flex-wrap: wrap;
`;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;