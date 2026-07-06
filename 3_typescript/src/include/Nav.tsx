import * as S from '../css/Main.styles';


const Nav = () => {

    return(
        <>
        <S.NavBar as = "header">
          <S.Logo>TypeScript</S.Logo>
        
            <ul>
            <li><S.StyledLink to="/">Home</S.StyledLink></li>
            <li><S.StyledLink to="/special">Special</S.StyledLink></li>
            </ul>
        </S.NavBar>
        </>
    )
};

export default Nav;



