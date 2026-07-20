
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const CustomButton = styled(Link)`

background-color: #6c757d;
color: white;
padding: 8px 16px;
border-radius: 8px;
text-decoration: none;
font-weight: bold;
&:hover{
    background-color: #5a6268;
    color:#fff;
}
// 3단 콤보로 정중앙 정렬
display: flex;
align-items: center;     // 위아래 정중앙
justify-content: center;  // 좌우 정중앙

`;

export const FormContainer = styled.div`

background-color: #e5eff8 ; //#f8f9fa
padding: 20px;
border-radius: 10px;
box-shadow: 0 0px 20px rgba(0,0,0,.15); //0.1
`;