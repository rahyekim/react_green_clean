import * as S from '../Main.styles2';
// import { Outlet } from 'react-router-dom';

//스타일드 컴포넌트 linking
// import Home from '../Home';

const Test = () => {
  return (
    <>
    
   
     <S.GlobalStyle/> {/*전역스타일 */}
      <S.Container>
         <S.Head>Type Script</S.Head>
         <S.NavBar as = "header">
                    <ul>
                    <li><S.StyledLink to="/test/home">Home</S.StyledLink></li>
                    <li><S.StyledLink to="#">special</S.StyledLink></li>
                    </ul>
                </S.NavBar>
        <S.Content>
          <h1>Content Area</h1>
          <p>Lorem ipsum dolor sit, amet consectetur ?</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </S.Content>
        <S.SideBar>
          Sidebar
        </S.SideBar>

        <S.Ads> Ads </S.Ads>
        <S.Footer>the footer</S.Footer>
      {/* 🔥 이게 핵심 */}
        {/* <Outlet /> */}
       </S.Container>
    
   
    </>
  )
};

export default Test;
