import { createRoot } from 'react-dom/client';
import { BrowserRouter,Routes,Route,Link, useNavigate } from 'react-router-dom';
//스타일드 컴포넌트를 불러옴 
// 별칭을 사용하지않을 경우: {Container,Header,Sidebar,Nav등등등 } from './css/AppLayout.styles'
// import * as S from './css/Layout.styles';
import * as S from './css/AppLayout.styles';
import {RentalStore} from './sub/RentalStore';
import {MyPage} from './sub/MyPage';
import {Restoration} from './sub/Restoration';
import { Home } from './sub/Home';



interface LayoutProps {
  children: React.ReactNode;

}

function App ({children} : LayoutProps) {  //엄격모드제거 

  const navigate = useNavigate();  //🔵BrowserRouter 내부에서 실행되어야함!!

  return(
    <>
 
    <S.AppContainer>
      <S.Header>
        <Link to='/'>럭셔리 플랫폼 MVP</Link>
      </S.Header>
      <S.MainContent>{children}</S.MainContent> {/* URL에 따라 바뀌는 콘텐츠 영역 */}
      <S.BottomNav>
        <button onClick={()=> navigate('/rentalstore')}>렌탈/스토어</button>
        <button onClick={()=> navigate('/restoration')}>수선/복원</button>
        <button onClick={()=> navigate('/mypage')}>마이페이지</button>
      </S.BottomNav>
    </S.AppContainer>
    </>
  )

}

createRoot(document.getElementById('root')!).render(
   <BrowserRouter>  {/*BrowserRouter는 반드시 Routes를 사용하는 컴포넌트 상위에서 감싸야 합니다.*/}
   <App>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/rentalstore' element={<RentalStore/>}/>
          <Route path='/restoration' element={<Restoration/>}/>
          <Route path='/mypage' element={<MyPage/>}/>
        </Routes>
      </div>
    </App>
  </BrowserRouter>

)
