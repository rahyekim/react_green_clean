import styled from "styled-components";

export const MyPageWrapper= styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
/* margin-top: 10px; */
`;
export const PageTitle= styled.h2`
text-align: center;
font-size: 1.5rem;
font-weight: 700;
color: ${props=> props.theme.colors.title};
margin-bottom: 1.5rem;
`;

export const Form= styled.form`
display: flex;
flex-direction: column;
gap: 1.5rem;
width: 100%;
max-width: 500px;
`;