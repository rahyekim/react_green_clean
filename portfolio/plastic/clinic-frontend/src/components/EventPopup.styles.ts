import styled from "styled-components";

export const PopupContainer = styled.div<{$top:number; $left:number}>`
position: fixed;
top: ${(props)=>props.$top}px;
left: ${(props)=>props.$left}px;
width: 400px;
background-color: rgba(0,0,0,.8);
box-shadow: 0 10px 30px rgba(0,0,0,.5);
z-index: 999;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 20px 20px 0 0 ;

overflow: hidden;
border: none;

animation: popupIn 0.25s ease-out;

@keyframes popupIn { //투명 → 살짝 작음 → 원래 크기
  from {
    opacity: 0;
    transform: translateY(15px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
`;

export const  ImageWrapper= styled.div`
width: 100%;
position: relative;

img{
    width: 100%;
    height: auto;
    display: block; //🌟
}
`;

export const FormWrapper = styled.div`
width: 100%; //부모너비에 맞추기
background-color: #111;
padding: 15px 15px 20px 15px;
`;
export const  InputGroup= styled.div`
display: flex;
gap: 5px;
margin-bottom: 12px;
box-sizing: border-box;
`;
export const Input = styled.input`
flex: 1;       //🌟
min-width: 0; // 🌟이게 꼭 있어야 좁은 공간에서 
//고집을 꺾고 부모크기에 맞춰 인풋이 찌그러지며 들어갑니다!🌟
height: 36px;
padding: 0 8px;
font-size: 13px;
border: 1px solid #ccc;
border-radius: 10px;
outline: none;
background-color: #eee;
&::placeholder{
    color: #999;
}

&:focus{
    border-color: #000;
}
`;
export const SubmitBtn = styled.button`
flex-shrink: 0; //버튼이 다른 애들이 밀어도 절대 크기가 줄어들거나 찌그려 트리지 않게
width: 80px;
height: 36px;
background-color: #fff176;
color: #111;
font-weight: bold;
border: none;
border-radius: 5px;
font-size: 14px;
cursor: pointer;
transition: all 0.2s;

&:hover{
    background-color: #fce83a ;
}
`;
export const  PrivacyLabel= styled.label`
display: flex;
align-items: center;
gap: 6px;
cursor: pointer;
`;

export const  PrivacyCheckbox= styled.input`
appearance: none;
width: 14px;
height: 14px;
background-color: #eee;
border: 1px solid #ddd;
border-radius: 3px;
cursor: pointer;
position: relative;

&:checked{
    border-color: #6a6446;
}

&:checked::after{
    content: '✔';
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    color: #000;
    font-size: 10px;
}
`;
export const  PrivacyText= styled.span`
font-size: 11px;
color: #eee;
letter-spacing: -0.5px;

span{
    color: #aaa;
    text-decoration: underline;
    margin-left: 5px;
    text-underline-offset: 2px;
    cursor: pointer;
}
`;
export const  FooterWrapper= styled.div`
background-color: #eee;
padding: 10px 16px;
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
`;

export const  CloseLabel = styled.label`
display: flex;
align-items: center;
gap: 6px;
cursor: pointer;
font-size: 13px;
color: #000;
`;
export const  CloseCheckbox= styled.input`
appearance: none;
width: 14px;
height: 14px;
border: 1px solid #ccc;
border-radius: 3px;
background-color: #fff;
cursor: pointer;
position: relative;

&:checked{
    border-color: #6a6446;
}
&:checked::after{
    content: '✔';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
     color: #000;
    font-size: 10px;
}
`;
export const  CloseBtn= styled.button`
background:none;
border: none;
font-size: 18px;
font-weight: 300;
cursor: pointer;
color: #111;
display: flex;
align-items: center;
justify-content: center;
padding: 0;
`;
// export const  = styled.div``;
// export const  = styled.div``;
// export const  = styled.div``;
// export const  = styled.div``;
