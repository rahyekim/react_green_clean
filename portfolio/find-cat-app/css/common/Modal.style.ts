import styled from "styled-components";
import { BoxShadowHover, FlexBetween, FlexCenter, FlexColumn, NoScroll, TransitionAll } from "./Common.styles";


export const  ModalOverlay= styled.div`
position: fixed;
inset: 0;
width: 100%;
height: 100%;
background-color: rgba(0,0,0,.6);
${FlexCenter}
z-index: 99999;
`;
export const  ModalContent= styled.div`
box-sizing: border-box;    /* 패딩 때문에 크기가 100%를 넘어가는 것 방지 */
background-color: #ffffff; 
padding: 24px;            
border-radius: 1rem;

width: 90%;              /* 화면 너비의 90%를 차지하게 설정 */
max-width: 400px;        /* 450px 모바일 화면 안에서 여백을 두고 예쁘게 들어가도록 제한 */
max-height: 85vh;
overflow-y: auto;
${BoxShadowHover}

${NoScroll}
`;
export const Header = styled.div`
${FlexBetween}
margin-bottom: 1.25rem;
h2{
    margin: 0;
    font-weight: 700;
    font-size: 1.125rem;
    color: #333;

}
`;
export const  CloseBtn= styled.button`
background: none;
border: none;
cursor: pointer;
color: #666;
padding: 0.25rem;
${FlexCenter}
`;
export const  Form= styled.form`
width: 100%;
${FlexColumn}
gap: 0.8rem;
`;
export const  Select= styled.select`
padding: 0.8rem ;
border: 1px solid #e1e1e1;
border-radius: 10px;
font-size: 0.8rem;
background: white;
outline: none;
cursor: pointer;
`;
export const  TextArea= styled.textarea`
padding: 0.8rem;
width: 100%;
border: 1px solid #e1e1e1;
border-radius: 10px;
outline: none;
resize: none;
font-family: inherit;
${TransitionAll}
&:focus{
    border-color: #ff6b6b;
}
`;
export const  SubmitBtn= styled.button`
margin-left: auto; //위치 오른쪽으로
background: #ff6b6b;
color: #fff;
padding: 0.8rem;
border: none;
border-radius: 10px;
font-size: 1rem;
font-weight: bold;
cursor: pointer;
margin-top: 10px;
${TransitionAll}

&:hover{
    background: #fa5252;
}
`;
export const Input = styled.input`
width: 100%;
padding: 0.75rem;
border: 1px solid #e1e1e1;
border-radius: 10px;
font-size: .8rem;
outline: none;
${TransitionAll}
&:focus{
    border-color: #ff6b6b;
}

`;

export const RowGroup = styled.div`
display: flex;
gap: 10px; /* 입력창 사이의 간격 */
width: 100%;


//첫 번째 자식은 4, 두 번째 자식은 6 비율(4:6)
  > *:first-child{
    flex: 6
  }

  > *:nth-child(2){
    flex:4
  }

//자식 요소들이 가로 공간을 균등하게 나눠 가지도록 설정
  /* 
  > * {
    flex: 1;
  } 
   */
`;
export const  FileInputWrapper= styled.div`
${FlexColumn}
gap: 8px;
width: 100%;

label{
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 100%;

    padding: 0.6rem;
    font-size: 0.7rem;
    font-weight: 600;
    color: #555;
    cursor: pointer;
    border: 1px solid #e1e1e1;
    font-size: .8rem;
    background-color: #fafafa;
    box-sizing: border-box;
    border-radius:10px;

    &:hover {
      background-color: #f1f1f1;
      border-color: #ff6b6b;
      color: #ff6b6b;
    }
    input[type="file"]{
        display: none;
    }
    .file-name{
        font-size: 0.75rem;
        color: #ff6b6b;
        word-break: break-all; /* 파일 이름이 길어도 줄바꿈되게 처리 */
    }

}


`;
// export const  = styled.div``;
