'use client'

import styled from 'styled-components' // next.comfig.ts 에 compiler 추가 

export const Wrapper= styled.div`
width: 100%;
max-width: 800px;
margin: 0 auto;
padding: 40px 20px;
display: flex;
flex-direction: column;

@media (max-width: 1024px) {
    padding: 30px;
    width: 85%;
}

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
text-underline-offset: 5px; //offset 글자와 밑줄간격
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
margin-top: 60px;
`;
export const Button= styled.button<{$variant:'outline'|'solid' , $height?:string}>`
width: 180px;
height: ${props=> props.$height || "54px"};
font-size: 16px;
font-weight: bold;
border-radius: 4px;
cursor: pointer;
transition: all .2s;
background-color: ${({$variant})=>$variant === 'outline' ? '#fff': '#000'};
border: 1px solid ${({$variant})=>$variant ==='outline'? '#000' : 'transparent'}; 
//자동으로 검은색#000 
color: ${({$variant})=>$variant === 'outline' ? '#000' : '#fff'};

&:hover{
    background-color: ${({$variant})=>$variant === 'outline' ? '#f9f9f9': '#333'};
}

@media (max-width:480px){
    width: 100%;
}
`;


//회원가입 폼(step 2)
export const PageTitle = styled.h2`
text-align: center;
font-size: 28px;
font-weight: 900;
margin-bottom: 40px;
`;

export const FormContainer= styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 24px;
margin-top: 20px;
`;

export const FormGroup= styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`;
export const Label = styled.label`
font-size: 15px;
font-weight: bold;
color: #222;
`;
export const Input= styled.input`
width: 100%; //🔸
height: 40px;
padding: 0 15px;
border: 1px solid #e5e5e5;
border-radius: 10px;
font-size: 15px;
outline: none;
&::placeholder{
    color: #aaa
}

&:focus{
    background-color: #eee;
}

`;
export const EmailWrapper= styled.div`
display: flex;
gap: 10px;
@media (max-width:480px){
    flex-direction: column;
}
`;
export const Select = styled.select`
width: 100%;
height: 40px;
padding: 0 15px;
border: 1px solid #e5e5e5;
border-radius: 10px;

font-size: 15px;
color: #555;
outline: none;
background-color: #fff;
`;
export const SubCheckboxLabel= styled.label`
display: flex;
align-items: center;
gap: 8px;
font-size: 14px;
color: #333333;
cursor: pointer;
/* margin-top: 5px; */
`;
export const RadioWrapper= styled.div`
display: flex;
align-items: center;
gap: 30px;
height: 50px;
`;
export const RadioLabel= styled.label`
display: flex;
align-items: center;
gap: 8px;
font-size: 15px;
font-weight: bold;
cursor: pointer;
`;
export const RadioInput= styled.input`
appearance: none;
width: 20px;
height: 20px;
border-radius: 50%;
border: 1px solid #ccc;
outline: none;
cursor: pointer;
position: relative;

&:checked{
    border-color: #111;
}

&:checked::after{
    content:'';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #333;
}
`;

//다음팝업

export const Dflex = styled.div`
display: flex;
gap:10px;
margin-bottom: 10px;
`;
export const ModalBg= styled.div`
position: fixed;
top:0;
left:0;
width: 100%;
height: 100%;
background-color: rgba(0,0,0,0.3);
z-index: 9999;
`;
export const ModalContent= styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
width: 420px;
max-width: 90%; //⭐⭐작은화면(360px)->324px 화면너비의90%까지만사용

height: 500px;
max-height: 90vh; //⭐⭐
z-index: 999999;

padding: 8px;
background-color: #fff;
border-radius: 10px;
border: 1px solid #ddd;
box-shadow: 0 4px 8px rgba(0,0,0,0.2);
`;
export const RightBtn= styled.div`
display: flex;
justify-content: flex-end;
padding: 10px;

button{
    /* background-color: transparent; */
    background: none;
    border: none;
}
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


