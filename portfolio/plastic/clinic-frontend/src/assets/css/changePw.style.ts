import styled from "styled-components";
import { FlexCenter, BoxShadow,
    FlexBetween,BlueButtonTheme,LinearGradient, 
    FlexColumn,
    TransitionAll,
    ButtonBasic,
    TextCenter} from "./Common.style";


export const Wrapper= styled.div`
${FlexCenter};
width: 100%;
background-color: #4e73df;
background-size: cover;
${LinearGradient};
min-height: 100vh;
padding: 1.4rem;
`;
export const Card= styled.div`
background-color: #fff;
border: none;
border-radius: 0.35rem;
width: 100%;
max-width: 500px;
padding: 3rem;
${BoxShadow};
`;
export const Header = styled.header`
text-align: center;
margin-bottom: 2rem;
`;
export const Title= styled.h6`  
  font-size: 1.5rem;
  font-weight: 400;
  color: #3a3b45;
  margin: 0;
`;
export const Desc= styled.p`
font-size: 0.875rem;
font-weight: 300;
color: #858796;
margin-bottom: 0.5rem ;
padding: 0;

`;

export const Form= styled.form`
${FlexColumn};
gap: 1rem;
`;
export const Input= styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 0.8rem;
  border-radius: 10rem; /* 완전히 둥근 모서리 */
  border: 1px solid #d1d3e2;
  color: #6e707e;
  outline: none;
  ${TransitionAll};

  &:focus {
    border-color: #bac8f3;
    box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
  }
`;

export const Button = styled.button`
${ButtonBasic};
background-color: #4e73df;
border: 1px solid #4e73df;
color: #fff;
${TransitionAll};
margin-top: 10px;
cursor: pointer;

  &:hover {
    background-color: #2e59d9;
    border-color: #2653d4;
  }
`;
export const Divider= styled.hr`
margin: 1.5rem 0;
border: 0; 
border-top: 1px solid #e3e6f0;
`;
export const LinkGroup = styled.div`
${FlexColumn};
${TextCenter};
gap: 0.5rem;
`;
export const StyledLink= styled.a`
font-size: 0.8rem;
color: #4e73df;
text-decoration: none;
cursor: pointer;

&:hover {
text-decoration: underline;
color: #224abe;
}
`;
//export const = styled.div``;
//export const = styled.div``;