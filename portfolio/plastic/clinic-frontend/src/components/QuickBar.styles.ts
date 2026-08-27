
import styled from "styled-components";

export const BarWrapper = styled.div`
position: fixed;
bottom: 0;
left: 0;
width: 100%;

background-color: rgba(17,17,17,0.95);
border-top: 1px solid #333;
backdrop-filter: blur(5px);
//그 반투명한 바 뒤 글,이미지 배경 요소 5px만큼 흐릿하게(blur) 
z-index: 999;

@media (max-width: 1024px) {
    display: none;
}

`;

export const  BarInner= styled.div`
max-width: 1860px;
margin: 0 auto;
height: 80px;
padding: 0 20px;

display: flex;
justify-content: center;
align-items: center;
gap: 12px;
`;
export const  Title= styled.div`
font-size: 16px;
font-weight: 600;
color: #fff;
margin-right: 10px;
white-space: nowrap;
`;
export const Input= styled.input`
width: 180px;
height: 44px;
background-color: #333;
border-radius: 10px;
border: 1px solid #444;
color: #fff;
padding: 0 15px;
font-size: 14px;
outline: none;
transition: border-color 0.2s;
min-width: 0;

&::placeholder{
    color: #888;
}

&:focus{
    border-color: #6a6446;
}
`;
export const  Select= styled.select`
width: 200px;
height: 44px;
background-color: #333;
border-radius: 10px;
border: 1px solid #444;
color: #888;
padding: 0 15px;
font-size: 14px;
outline: none;
appearance: none; //브라우저 기본 화살표 숨김

/* 커스텀 화살표 아이콘 삽입 */
background-image: 
url('data:image/svg+xml;utf8,<svg fill="%23888888" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
background-repeat: no-repeat;
background-position-x: 95%; // 오른쪽끝
background-position-y: 50%;  //중앙

&:hover{
    border-color: #6a6446;
}
`;
export const  CheckboxGroup= styled.div`
display: flex;
align-items: center;
margin: 0 10px;
`;
export const  CheckboxLabel= styled.label`
display: flex;
align-items: center;
gap: 6px;
cursor: pointer;
white-space: nowrap;
`;
export const  Checkbox= styled.input`
appearance: none;
width: 16px;
height: 16px;
background-color: #333;
border: 1px solid #555;
border-radius: 3px;
position: relative;
cursor: pointer;

&:checked{
    background-color: #6a6446;
    border-color: #6a6446;
}
/* 체크마크생성 */
&:checked::after{
    content: '✔';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); //가운데정렬공식
    color: #111;
    font-size: 12px;
}
`;
export const AgreeText = styled.span`
font-size: 13px;
color: #aaa;
`;
export const DetailLink = styled.span`
font-size: 12px;
color: #888;
text-decoration: underline;
margin-left: 6px;
cursor: pointer;

&:hover{
    color: #fff;
}
`;
export const  SubmitBtn= styled.button`
height: 44px;
background-color: #6a6446;
border: none;
color: #1d1d1d;
padding: 0 20px;
font-size: 15px;
border-radius: 10px;
white-space: nowrap;
font-weight: 700;
cursor: pointer;
transition: background-color 0.2s;

&:hover{
    background-color: #85805e;
}
`;
// export const  = styled.div``;
// export const  = styled.div``;
// export const  = styled.div``;
// export const  = styled.div``;
// export const  = styled.div``;


