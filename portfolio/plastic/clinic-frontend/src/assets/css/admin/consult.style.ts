import styled from "styled-components";
import { 
    BlueButtonTheme, 
    BoxShadow2,
    CircleBtn,
    TransitionAll,
 } from "../Common.style";

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
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
${BoxShadow2}
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
${BoxShadow2}
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
gap: 6px;
white-space:nowrap;
min-width: 0;

background-color: ${props=> props.$status === '상담완료' ? '#1cc88a' : '#eaec44'};
border-radius: 15px;
padding: 0.4rem;
color: #fff;
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