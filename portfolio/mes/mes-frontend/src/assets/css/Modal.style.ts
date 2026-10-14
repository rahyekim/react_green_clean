import styled from "styled-components";

export const ModalOverlay= styled.div`
position: fixed;
top:0;
left: 0; 
right: 0;
bottom: 0; //inset:0
width: 100%;
height: 100%;
background-color: rgba(0,0,0,.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 10;
`;
export const ModalContainer= styled.div`
background-color: #eee;
max-width: 400px;
width: 100%;
padding: 24px;
border-radius: 20px;
box-shadow: 0 4px 12px rgba(0,0,0,.2);

`;
export const ModalHeader= styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 1rem;
`;
export const ModalTitle= styled.h3`
margin: 0;
font-size: 1.2rem;
font-weight: 600;
color: #536692;
`;
export const CloseButton= styled.button`
transform: rotate(45deg);
font-size: 2rem;
color: #3b5998;
border: none;
font-weight: 300;
line-height: 1; //회전 중심을 잡고 여백을 없애기 위해 유지 추천!
cursor: pointer;

width: 25px;
height: 25px;
border-radius: 50%;
background-color: #ddd;
display: flex;
justify-content: center;
align-items: center;

transition: all 0.2s;
&:hover{
  background-color: #fefefe;
}
`;

export const ModalBody= styled.div``;