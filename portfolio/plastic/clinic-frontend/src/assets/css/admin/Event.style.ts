import styled from "styled-components";
import { BlueButtonTheme, BoxShadow, BoxShadow2, BoxShadowBasic, FlexBetween, FlexCenter, FlexColumn, TransitionAll } from "../Common.style";


export const Container= styled.div`
width: 100%;
min-height: 100vh;
`;
export const PageHeader= styled.div`
${FlexBetween}
margin-bottom: 1.5rem;
`;
export const PageTitle = styled.h1`
margin: 0;
font-size: 1.5rem;
color: #5a5c69;
font-weight: 700;
`;

export const SaveButton = styled.button`
${BlueButtonTheme}
border: none;
padding: 0.5rem 1.2rem;
border-radius: 10px;
font-size: 0.9rem;
font-weight: 600;

${FlexCenter}
gap: 0.5rem;

cursor: pointer;
${TransitionAll}
${BoxShadowBasic}

`;
export const Grid= styled.div`
display: grid;
grid-template-columns: 1fr 1.5fr;
gap: 1.5rem;

@media (max-width:1200px){
    grid-template-columns: 1fr;
}
`;
export const LeftColumn= styled.div`
${FlexColumn}
width: 100%;
`;
export const RightColumn= styled.div`
${FlexColumn}
width: 100%;
`;

export const Card = styled.div`
background-color: #fff;
border-radius: 0.35rem;
${BoxShadowBasic}
border: 1px solid #e3e5f0;
overflow: hidden;
${FlexColumn}

flex: 1;
min-height: 0;
`;

export const CardHeader = styled.div`
background-color: #f8f9fc;
border-bottom: 1px solid #e3e6f0;
padding: 1rem 1.5rem;
`;

export const CardTitle = styled.h2`
margin: 0;
font-weight: 700;
color: #4e73df;
font-size: 1.2rem;
`;

export const CardBody = styled.div`
padding: 1.5rem;
color: #858796;
`;
export const FormGroup = styled.div`
margin-bottom: 1.2rem;
${FlexColumn}
gap: 15px;
`;
export const Label = styled.label`
display: block;
font-size: 0.85rem;
font-weight: 700;
color: #5a5c69;
margin-bottom: 0.5rem;

`;
export const Input = styled.input`
width: 100%;
border-radius: 10px;
padding: 0.6rem 1rem;
border: 1px solid #b1bce2;
color: #5a5c69;
background-color: #fff;
outline: none;
box-sizing: border-box;

&:focus{
    border-color: #4e73df;
}
`;

export const FileInputWrapper = styled.div`
    ${FlexCenter}
    gap: 1rem;

    .file-name{
       font-size: 0.85rem;
       color: #858796;
       word-break: break-all; //💘모자라면 줄바꿈 내려라...
    }
`;

export const FileInput = styled.input`
display: none;
`;

export const FileLabel = styled.label`
    ${FlexCenter}
    gap: 8px;
    background-color: #fff;
    border: 1px solid #d1d3e2;
    border-radius: 10px;

    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #5a5c69;

    white-space: nowrap;

    cursor: pointer;
    ${TransitionAll}
    &:hover{
        background-color: rgba(78, 115, 223, 0.04);
        border-color: #b7b9cc;
        color: #212529;
        ${BoxShadow2}
    }
`;

export const PreviewRect = styled.div`
    ${FlexCenter}
    width: 120px;
    height: 140px;

    margin: 10px auto 0;

    flex-shrink: 0;
    overflow: hidden;
    border-radius: 10px;

    border: 2px solid #e3e6f0;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.05);

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const AddButton = styled.button`
    width: 100%;
    outline: none;
    border: 0;
    background-color: #fff;
    border: 1px dashed #b7b9cc;
    border-radius: 8px;
    color: #5a5c69;
    font-weight: 600;

    ${FlexCenter}
    gap: 7px;
    padding: 1rem;
    margin-top: 1.5rem;


    cursor: pointer;
    ${BoxShadowBasic}
    ${TransitionAll}

    &:hover{
        background-color: #eaecf4;
        color: #4e73df;
        ${BoxShadow2}
    }
`;

export const TableWrapper = styled.div`
width: 100%;
overflow: hidden;
padding: 1rem;
`;

export const Table = styled.table`
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    text-align: center;

    color: #858796;
    font-size: 0.9rem;

    th, td{
        /* 셀 공통 스타일 */
    }

    th{
        color: #5a5c69;
        font-weight: 700;
        padding: 0.8rem;
        border-bottom: 1px solid #e3e6f0;
        white-space: nowrap;
    }

    td{
       padding: 1rem 0.5rem; 
       border-bottom: 1px solid #eceff4;
       vertical-align: middle;
    }

    tr:nth-child(even){
        /* 짝수 행 스타일 */
    }
`;

export const Thumbnail = styled.div`
width: 80px;
height: 80px;
border-radius: 8px;
background-color: #eaecf4;
margin: 0 auto; //가운데 정렬 
overflow: hidden;
${FlexCenter}
font-size: 0.7rem;
color: #b7b9cc;

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const RankBadge = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #4e73df;
    color: #fff;
    ${FlexCenter}
    border: none;
    font-size: 0.9rem;
    font-weight: 600;
    ${BoxShadowBasic}

`;
export const ActionBtn = styled.button`
    background-color: #eaecf4;
    border: none;
    color: #5a5c69;
    cursor: pointer;
    padding: 0.3rem;
    ${FlexCenter}

    &:hover:not(:disabled){
        /* 활성화 상태 호버 */
        background-color: #d1dcee;
        ${BoxShadow2}
    }
  
    &:disabled {
       opacity: 0.3;
       cursor: not-allowed;
      }
`;

export const DeleteBtn = styled.button`
    ${FlexCenter}
    margin: 0 auto;
    background: transparent;
    border: none;
    color: #e73a3b;
    padding: 0.5rem;
    border-radius: 6px;
    cursor: pointer;
    ${TransitionAll}
    &:hover{
        background-color: #fdeaea;
    }
`;
// export const = styled.div``;
// export const = styled.div``;
// export const = styled.div``;
