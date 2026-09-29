import styled from "styled-components";
import { COLORS } from "../common/theme";
import { 
    BlueButtonTheme, 
    BoxShadow2,
    BoxShadowBasic,
    CircleBtn,
    TransitionAll,
 } from "../common/Common.style";

export const ConsultContainer = styled.div`
width: 100%;
min-height: 100vh;
`;

export const ConsultPageHeader = styled.header`
margin-bottom: 1.5rem;

`;

export const ConsultPageTitle = styled.h1`
margin: 0;
font-size: 1.5rem;
color: #5a5c69;
font-weight: 700;
`;
export const ConsultFilterCard = styled.div`
display: flex;
justify-content: flex-end;
background-color: #fff;
box-shadow: 0 4px 8px -1px rgba(0, 0, 0, 0.05);
padding: 15px;
border-radius: 12px;
border: 1px solid #e3e6f0;
margin-bottom: 20px;
`;
export const ConsultInputGroup = styled.div`
display: flex;
align-items: center;
gap: 10px;
`;
export const ConsultInput = styled.input`
border: 1px solid #e3e6f0;
padding: 10px;
border-radius: 10px;
outline: none;
&:focus{
    border-color: #4273df;

}
`;
export const ConsultSearchButton = styled.button`
${BlueButtonTheme}
border: none;
outline: none;
padding: 0.5rem 1.1rem;
border-radius: 10px;
display: flex;
align-items: flex-end;
gap: 5px;

`;
export const ConsultTableCard = styled.div`
background-color: #fff;
border-radius: 12px;
${BoxShadowBasic}
border: 1px solid #e3e6f0;
overflow: hidden;
`;
export const ConsultCardHeader = styled.header`
border-bottom: 1px solid #e3e6f0;
background-color: #f8f9fc;
padding: 1rem 1.25rem;

`;
export const ConsultCardTitle = styled.h6`
margin: 0;
font-weight: 700;
color: #4e73df;
font-size: 0.9rem;
`;
export const ConsultTableWrapper = styled.div`
width: 100%;
min-height: 100%;
`;
export const ConsultTable = styled.table`
table-layout: fixed;
border-collapse: collapse;
width:100%;
margin: 0 auto;
text-align: center;
font-size: 0.9rem;
color: #333333;

td,th{
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
padding: 1em 0.8rem;
}

th{
    background-color: #ebf3f9;
    font-weight: 600;
    border-bottom: 1px solid #e3e6f0;
    padding: 1.1rem 0.8rem;
}

td{
    /* border-bottom: 1px solid #f1f3f9; */
    color: #555555;
}

tr {
${TransitionAll}
}

tr:nth-child(even){
  background-color: #f8f9fc;
}

tr:hover {
background-color: #f1f5fd ;
}
`;

export const ConsultStatusBadge = styled.span<{ $status:string}>`
display: inline-flex;
align-items: center;  
justify-content: center;
gap: 6px;
white-space:nowrap;
min-width: 0;
width: 80px;

background-color: ${props=> props.$status === '상담완료' ? '#10b981' : '#f59e0b'};
border-radius: 20px;
padding: 4px 10px;

color: #fff;
font-size: 0.8rem;
font-weight: 600;
line-height: 1;
user-select: none;

cursor: pointer;

${TransitionAll}
&:hover{
    opacity: 0.8;
}
//💘inlineFlex 추가
`;
export const ConsultDeleteActionBtn = styled.button`
${CircleBtn}
background-color: transparent;
color:  rgba(197, 49, 98, 0.87);
padding: 0.5rem;
${TransitionAll}

&:hover{
    background-color: #fdeaea;
}
`;

// 커스텀 체크박스 레이블/컨테이너
export const CheckboxLabel = styled.label`
    display: inline-block;
    position: relative;
    cursor: pointer;
    user-select: none;
    width: 18px;
    height: 18px;

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* 커스텀 박스 디자인 */
    .custom-checkbox {
        position: absolute;
        top: 0;
        left: 0;
        height: 18px;
        width: 18px;
        background-color: #fff;
        border: 2px solid #ccc;
        border-radius: 4px;
        transition: all 0.2s;
    }

    /* 체크되었을 때 배경색과 테두리 */
    input:checked ~ .custom-checkbox {
        background-color: ${COLORS.MAIN}; /* 포인트 색상 */
        border-color: #fdeaea;
    }

    /* 체크 안에 들어갈 하얀색 체크(V) 아이콘 */
    .custom-checkbox:after {
        content: "";
        position: absolute;
        display: none;
    }

    input:checked ~ .custom-checkbox:after {
        display: block;
    }

    /* 체크 모양(V) 크기와 위치 조정 */
    .custom-checkbox:after {
        left: 5px;
        top: 1px;
        width: 5px;
        height: 10px;
        border: solid #e06d6d;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }
`;

