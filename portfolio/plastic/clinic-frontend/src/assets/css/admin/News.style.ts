import styled from "styled-components";
import { 
    BlueButtonTheme, CircleBtn, 
    BoxShadow2, FlexBetween, 
    FlexCenter, FlexColumn, 
    BoxShadowBasic, TransitionAll,
    Transparent,
    BoxShadowPressed, 
} from "../Common.style";

export const NewsContainer = styled.div`
width: 100%;
min-height: 100vh;
`;

export const NewsPageHeader = styled.div`
${FlexBetween}
margin-bottom: 1.2rem;
`;
export const NewsPageTitle = styled.h1`
margin: 0;
font-size: 1.5rem;
color: #5a5c69;
font-weight: 700;
`;
export const NewsSaveButton = styled.button`
${FlexCenter}
${BlueButtonTheme}
gap: 8px;
border-radius: 10px;
outline: none;
border: none;
padding: 0.6rem 1rem;
font-size: 0.9rem;
font-weight: 600;
cursor: pointer;
white-space: nowrap;
${BoxShadowBasic}
${TransitionAll}
@media (max-width:768px){
    span{
        display: none;
    }
}

`;

export const NewsGrid = styled.div`
display: grid;
grid-template-columns: 2fr 3fr;
gap: 16px;
`;

export const NewsLeftColumn = styled.div`
${FlexColumn}
width: 100%;
min-width: 0;
`;
export const NewsRightColumn = styled.div`
${FlexColumn}
width: 100%;
min-width: 0;
`;

export const NewsCard = styled.div`
border-radius: 10px;
background-color: #fff;
border: 1px solid #e3e6f0;
${BoxShadowBasic}

overflow:hidden;

width: 100%;
height: 100%; //카드 1:1일때 grid크기맞춰줌

display: flex;
flex-direction: column;
`;

export const NewsCardHeader = styled.div`
background-color: #f8f9fc;
padding: 1rem 1.25rem;
border-bottom: 1px solid #e3e6f0;
`;
export const NewsCardTitle = styled.h2`
margin: 0;
font-weight: 700;
font-size: 1rem;
color: #4e73df;
`;
export const NewsCardBody = styled.div`
flex: 1;

color: #858796;
padding: 1.5rem;

display: flex;
flex-direction: column;
gap: 30px;
`;

export const NewsFormGroup = styled.div`
${FlexColumn}
gap: 15px;
`;
export const NewsLabel = styled.label`
color: #666;
font-weight: 600;
font-size: 1rem;
`;
export const NewsInput = styled.input`
border-radius: 10px;
border: none;
outline: none;
border: 1px solid #ddd;
padding: 15px;
width: 100%;

&:focus{
    border-color: #4273df;
}
`;

export const NewsFileInputWrapper = styled.div`
display: flex;
align-items: center;
gap: 10px;
width: 100%;

flex-wrap: wrap;
.file-name{
    flex: 1;
    min-width: 0;

    font-size: 0.9rem;
    color: #858796;
    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
`;
export const NewsFileInput = styled.input`
display: none;
`;
export const NewsFileLabel = styled.label`
${FlexCenter}
gap: 10px;

border: 1px solid #e3e6f0;
padding: 12px 18px;
border-radius: 10px;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

font-size: 0.9rem;
white-space: nowrap;

cursor: pointer;

${TransitionAll}
&:hover{
    background-color: rgba(78, 115, 223, 0.04); 
    border-color: #b7b9cc;
    color: #212529;   
    ${BoxShadow2}
    /* box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.04); */

}
`;

export const NewsPreviewCircle = styled.div`
${FlexCenter}
width: 120px;
height: 120px;

margin: 8px auto 0;

flex-shrink: 0;
overflow: hidden;

border-radius: 50%;
border: 2px solid #e3e6f0;
box-shadow: 0 4px 8px -1px rgba(0, 0, 0, 0.05);

img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}

`;

export const NewsAddButton = styled.button`
${FlexCenter}
gap: 8px;
padding: 0.9rem;
width: 100%;
margin-top: auto; //💘

border: 1px solid #e3e6f0;
background-color: #f8f9fc;
border-radius: 8px;

color: #5a5c69;
font-weight: 600;

white-space: nowrap;
flex-shrink: 0;
cursor: pointer;
&:hover{
    background-color: #f1f3fa;
    color: #4e73df;   
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.07);
}
`;

export const NewsTableWrapper = styled.div`
width: 100%;
max-height: 600px;
overflow-y: auto;

&::-webkit-scrollbar{
    width: 5px;
}
&::-webkit-scrollbar-track {
    background: transparent; 
    border-radius: 50px;
  }
&::-webkit-scrollbar-thumb{
   background-color: #f1f2f7; 
    border-radius: 50px;
    transition: background-color 0.2s ease;
}
&::-webkit-scrollbar-thumb:hover {
    background-color: #dbddee; 
}


`;
export const NewsTable = styled.table`
table-layout: fixed;
border-collapse: collapse;
width: 95%;
margin: 0 auto;
text-align: center;
font-size: 0.9rem;
color: #333333;

th,td{
    padding: 1rem 0.8rem;
    vertical-align: middle; //💡 세로 기준 중앙 정렬 필수! 
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
}

th{
    position: sticky;
    top: 0;
    z-index: 1;

    background-color: #ebf3f9;
    border-bottom: 1px solid #e3e6f0;
    padding: 1.1rem 0.8rem;
}

td{
    color: #555555;
    padding: 1rem;
    border-bottom: 1px solid #f1f3f9;
}

tr:nth-child(even){
  background-color: #f8f9fc;
}

`;

export const NewsActionBtn = styled.button`
${Transparent}
border: 1px solid #ddd;
cursor: pointer;

${TransitionAll}
&:not(:disabled):hover{
    background-color: rgba(78, 115, 223, 0.04); 
    border: 1px solid #b7b9cc;
    color: #212529;   
    ${BoxShadow2}
}

&:disabled {
    opacity: 0.4;        
    background-color: #f8f9fa;
    cursor: default; //커서포인트해제 💘
  }
`;
export const NewsThumbnail = styled.div`
${FlexCenter}
width: 70px;
height: 70px;
margin: 0 auto; //💘 div(block)요소 가운데정렬
overflow: hidden;
border-radius: 50%;
border: 1px solid #e3e6f0;
flex-shrink: 0;
img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
${BoxShadowBasic}
`;
export const NewsDeleteBtn = styled.button`
${CircleBtn}
background-color: transparent;
color:  rgba(197, 49, 98, 0.87);
padding: 0.5rem;
${TransitionAll}
&:hover{
    background-color: #fdeaea;
}
`;
