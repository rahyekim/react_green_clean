import styled from "styled-components";
import { 
    FlexBetween,TransitionAll,
    FlexCenter,BlueButtonTheme,BoxShadow,
    FlexColumn,
    BoxShadow2,
    FlexRow,
    CircleBtn
} from "../Common.style";


// export const = styled.div``;
// export const = styled.div``;

export const PopContainer = styled.div`
width: 100%;
min-height: 100vh;
`;

export const PopPageHeader = styled.div`
${FlexBetween}
margin-bottom: 1.5rem;

`;
export const PopPageTitle = styled.h1`
margin: 0;
font-size: 1.5rem;
color: #5a5c69;
font-weight: 700;
`;
export const PopSaveButton = styled.button`
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

export const PopGrid = styled.div`
display: grid;
grid-template-columns: 2fr 3fr; //repeat(2, 1fr)
gap: 10px;

@media (max-width:1200px){
    grid-template-columns: 1fr;
}
`;
export const PopLeftColumn = styled.div`
${FlexColumn}
gap: 10px;
width: 100%;
min-width: 0;
`;
export const PopRightColumn = styled.div`
${FlexColumn}
gap: 10px;
width: 100%;
min-width: 0;

`;

export const PopCard = styled.div`
background-color: #fff;
border-radius: 10px;
${BoxShadow2}
border: 1px solid #e3e6f0;
overflow: hidden;
width: 100%;
${FlexColumn}
`;
export const PopCardHeader = styled.div`
background-color: #f8f9fc;
border-bottom: 1px solid #e3e6f0;
padding: 1rem 1.25rem;
`;
export const PopCardTitle = styled.h2`
margin: 0;
font-weight: 700;
color: #4e73df;
font-size: 1rem;
`;
export const PopCardBody = styled.div`
padding: 1.5rem;
color: #858796;
flex: 1;
${FlexColumn}
gap: 5px;
`;

export const PopFormGroup = styled.div`
${FlexColumn}
gap: 10px;
margin-bottom: 20px;
`;
export const PopLabel = styled.label`
font-weight: 600;
color: #858796;
font-size: 0.9rem;
${FlexRow}
align-items: center;
gap:5px;
`;
export const PopInput = styled.input`
border-radius: 10px;
outline: none;
border: none;
border: 1px solid #ddd;
padding: 0.6rem 1.0rem;

min-width: 0;
width: 100%;
&:focus{
    border-color: #4273df;
}
`;

export const PopFileInputWrapper = styled.div`
${FlexRow}
align-items: center;
gap: 15px;

.file-name{
    font-size: 0.9rem;
    color: #858796;

    flex: 1;
    min-width: 0;
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
`;
export const PopFileInput = styled.input`
display: none;
`;
export const PopFileLabel = styled.label`
${FlexCenter}
gap: 8px;
background: #fff;
border-radius: 10px;
border: 1px solid #d1d3ee;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
padding: 0.5rem 1rem;
font-size: 0.9rem;
color: #5a5c69;
cursor: pointer;
white-space: nowrap;
flex-shrink: 0;
${TransitionAll}
&:hover{
    background-color: rgba(78, 115, 223, 0.04); 
    border-color: #b7b9cc;
    color: #212529;   
}
`;

export const PopCheckboxLabel = styled.label`
display: flex;
align-items: center;
gap: 5px;
font-size: 0.85rem;
font-weight: 600;
cursor: pointer;
user-select: none; //텍스트 트래그 방지
`;

export const PopAddButton = styled.button`
margin-top: 15px;
${FlexCenter}
gap: 8px;
padding: 0.7rem;
width: 100%;
border: 1px dashed #d8dbe7; // #e3e6f0
color: #5a5c69;
border-radius: 10px;
font-weight: 600;
background-color: #f8f9fc;
${TransitionAll}
&:hover{
    background-color: #f1f3fa;
    color: #4e73df;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.04);
}
white-space: nowrap;
flex-shrink: 0;
overflow: hidden;
cursor: pointer;
`;

export const PopTableWrapper = styled.div`
width: 100%;
min-height: 100%;
`;
export const PopTable = styled.table`
table-layout: fixed;
border-collapse: collapse;
width: 100%;
margin: 0 auto;
text-align: center;
font-size: 0.9rem;
color: #333333;

td, th{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 1rem 0.8rem;
}

th{
    background-color: #ebf3f9;
    font-weight: 600;
    border-bottom: 1px solid #e3e6f0;
    padding: 1.1rem 0.8rem;
 
}

td{
    color: #555555;
    border-bottom: 1px solid #f1f3f9;
}

tr:nth-child(even){
  background-color: #f8f9fc;
}

tr{
    ${TransitionAll}
}
tr:hover{
background-color: #f1f5fd ;
}
td:first-child{
    padding-left: 30px;
}
`;

export const PopBadge = styled.span<{$color:string}>`
display: inline-flex;
align-items: center;
border: 0;

gap: 6px;
background-color: ${props=>props.$color};
border-radius: 20px;
padding: 4px 10px;

color: #fff;

white-space:nowrap;
flex-shrink: 0;

font-size: 0.8rem;
font-weight: 600;

`;

export const PopDeleteBtn = styled.button`
${CircleBtn}
background-color: transparent;
color:  rgba(197, 49, 98, 0.87);
padding: 0.5rem;
${TransitionAll}
&:hover{
    background-color: #fdeaea;
}
`;
