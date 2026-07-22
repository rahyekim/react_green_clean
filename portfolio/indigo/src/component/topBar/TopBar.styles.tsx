
import styled from "styled-components";

export const TopBarContainer = styled.nav`

height: 4.375rem; //70px
display: flex;
align-items: center;
justify-content: space-between;

padding: 0 1.5rem;
background-color: #fff;
box-shadow: 0 0.15rem 1.75rem 0 rgba(58,59,69,0.15);
margin-bottom: 1.5rem;


`;

export const TopBarSearch = styled.form`

display: inline-block;
margin-left: 1rem;
margin-right: auto; 
/*현재는 두개라 상관없지만 중요.
❄️margin-right:auto => 남는 공간만큼 커져라
|검색|       |버튼|       |사용자| 
|검색|----------------|버튼|사용자| ❄️
*/
`;

export const TopBarNavBar = styled.ul`
display: flex;
align-items: center;
list-style: none;
margin: 0;
`;

