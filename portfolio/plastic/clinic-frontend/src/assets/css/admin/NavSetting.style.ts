import styled from "styled-components";
import { BlueButtonTheme, BoxShadow, BoxShadowBasic, FlexBetween, FlexCenter, FlexColumn, FlexRow, FlexStart, TransitionAll } from "../Common.style";

export const NavContainer= styled.div`
width: 100%;
min-height: 100vh;
`;
export const PageHeader= styled.header`
${FlexBetween}
margin-bottom: 1.5rem;
`;
export const PageTitle= styled.h1`
margin: 0;
font-size: 1.5rem;
color: #5a5c69;
font-weight: 700;
`;
export const SaveButton= styled.button`
${FlexCenter}
gap: 8px;
border: none;
${BlueButtonTheme}
font-size: 0.9rem;
font-weight: 600;
border-radius: 10px;
padding: 0.6rem 1.2rem;
${BoxShadow}
${TransitionAll}
cursor: pointer;
min-width: 0;
white-space: nowrap;

@media (max-width:768px){
  span{
    display: none;
  }
}
`;
export const ContentGrid= styled.div`
${FlexColumn} 
gap:1.5rem;
`;
export const Card= styled.div`
background-color: #fff;
border-radius: 10px;
${BoxShadow}
border: 1px solid #e3e6f0;
overflow: hidden;
`;
export const CardHeader= styled.header`
background-color: #f8f9fc;
border-bottom: 1px solid #e3e6f0;
padding: 1rem 1.25rem;
`;
export const CardTitle= styled.h6`
margin: 0;
font-weight: 700;
color: #4e73df;
font-size: 1rem;
`;
export const CardBody= styled.div`
padding: 1.5rem;
color: #858796;
p{
    margin-top: 0;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
}
flex: 1;
display: flex;
flex-direction: column;
justify-content: space-between;

`;
export const RadioGroup= styled.div`
display: flex;
gap: 10px;
margin-bottom: 1.5rem;
`;
export const RadioLabel = styled.label<{$isActive:boolean}>`
/* min-width: 0;
white-space: nowrap; */
cursor: pointer;
${FlexCenter};
gap: 0.5rem;
padding: 0.8rem 1.5rem;
border-radius: 10px;
background-color: #fff;
border: 1px solid #d1d3e2;
color: #858796;
font-weight: 600;
${TransitionAll};
${({$isActive})=> $isActive && `
background-color: #eaecf4;
border: 1px solid #4e73df; 
color: #4e73df;
`}

@media (max-width:768px) {
      & > span{
        display: none;
      }
}

&:hover{
    background-color:#f8f9fc;
}
`;

export const NavInputWrapper= styled.div`
${FlexColumn}
gap: 0.5rem;
background-color: #f8f9fc ;
padding: 1.5rem;
border-radius: 10px;
border: 1px solid #e3e4f0;
`;

export const NavLabel= styled.label`
font-size: 0.85rem;
font-weight: 700;
color: #5a57a9;
margin-bottom: 10px;


`;
export const NavInput = styled.input`
width: 100%;
padding: 0.7rem 1.2rem;
font-size: 0.9rem;
background-color: #fff;
border: 1px solid #d1d3ee;
border-radius: 10px;
outline: none;
${TransitionAll}
&:focus{
    border-color: #4273df;
}
`;

export const FileInputWrapper= styled.div`
${FlexCenter}
gap: 1.2rem;

.filename{
    flex-shrink: 1;
    min-width: 0;

    font-size: 0.9rem;
    color: #858796;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

 `;

export const FileInput= styled.input`
display: none;
`;
export const FileLabel= styled.label`
${FlexCenter}
gap: 10px;
background: #fff;
border: 1px solid #d1d3ee;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

padding: 0.5rem 1rem;
border-radius: 0.35rem;
font-size: 0.85rem;
font-weight: 600;
color: #5a5c69;
cursor: pointer;

flex-shrink: 0;
white-space: nowrap;
min-width: 0;

&:hover{
    background-color: #eaecf4;
}

`;
export const MenuList= styled.div`
display: grid;
  /* 핵심: 화면 너비가 허락하는 한 알아서 대략 2개씩 카드를 꽉 채워 배치 
  (최소 400px 유지) */
grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
gap: 1rem;
overflow: hidden;

background-color: #f8f9fc;
border-radius: 10px;
border: 1px solid #e3e6f0;
${BoxShadowBasic}

padding: 1rem;

@media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

.menu-number{
    font-weight: 900;
    width: 20px;
}
`;
export const MenuItem= styled.div`
min-width: 0;
box-sizing: border-box;
${FlexCenter};
gap: 15px;
background-color: #f8f9fc;
border-radius: 8px;
border: 1px dashed #e3e6f0;

padding: 18px;

&:hover {
    border-color: #cfd5e6;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.04);
  }
`;
export const DeleteButton= styled.button`
background: transparent;
border-radius: 50%;
border: none;
outline: none;
color: rgba(197, 49, 98, 0.87);
cursor: pointer;
${FlexCenter}
padding: 0.5rem;
${TransitionAll}
&:hover{
    background-color: #fdeaea;
}
`;
export const AddButton= styled.button`
${FlexCenter}
width: 100%;
margin-top: 8px;
border: 1px solid #d8dbe7;
border-color: #e3e6f0;
color: #5a5c69;
padding: 0.9rem;
border-radius: 10px;
font-weight: 600;
gap: 0.5rem;
background-color: #f8f9fc;
cursor: pointer;
${TransitionAll}
&:hover{
    background-color: #f1f3fa;
    color: #4e73df;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.04);
}



`;


// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;





