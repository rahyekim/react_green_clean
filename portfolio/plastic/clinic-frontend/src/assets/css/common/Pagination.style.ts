import styled from "styled-components";
import { FlexCenter } from "./Common.style";

// export const = styled.div``;

export const Pagination= styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 20px;
gap: 8px;
padding-bottom: 20px;
`;

export const PaginationBtn = styled.button<{$active:boolean}>`
${FlexCenter}
width: 32px;
height: 32px;
border: 1px solid #ddd;
border-radius: 4px;
font-weight: ${props=> props.$active ? 'bold' : 'normal' }; 
background-color: ${props=> props.$active ? '#333' : '#fff' }; 
color: ${props=> props.$active ? '#fff' : '#333' };
cursor: pointer;

`;
// export const = styled.div``;
// export const = styled.div``;
