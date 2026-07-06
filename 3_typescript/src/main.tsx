import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import * as M from './css/Main.styles'

import Home from './sub/Home';
import Basic from './sub/Basic';
import Special from './sub/Special';
import Test from './sub/Test';
import TestHome from './TestHome';

import Array from './sub/Array';
import Tuple from './sub/Tuple';
import Enum from './sub/Enum';
import Interface from './sub/Interface';
import Object from './sub/Object';
import Tensorflow from './sub/Tensorflow';
import { ClassUnion } from './sub/ClassUnion';
import { Last } from './sub/Last';

const App = () => {
  return (
    <>
    <BrowserRouter>
    <M.GlobalStyle/>
      <M.Container>
        <M.Head>Type Script</M.Head>
        <M.Nav>
          <ul>
            <li><M.StyledLink to="/">home</M.StyledLink></li>
            <li><M.StyledLink to="/basic">1_Basic</M.StyledLink></li>
            <li><M.StyledLink to="/special">1.1_special</M.StyledLink></li>
            <li><M.StyledLink to="/test">test</M.StyledLink></li>
            <li><M.StyledLink to="/array">2_array</M.StyledLink></li>
            <li><M.StyledLink to="/tuple">3_tuple</M.StyledLink></li>
            <li><M.StyledLink to="/enum">4_enum</M.StyledLink></li>
            <li><M.StyledLink to="/object">5_objectType</M.StyledLink></li>
            <li><M.StyledLink to="/interface">6.interface</M.StyledLink></li>
            <li><M.StyledLink to="/tensor">7.tensorflow</M.StyledLink></li>
            <li><M.StyledLink to="/classunion">8.classUnion</M.StyledLink></li>
            <li><M.StyledLink to="/last">9.last🎉</M.StyledLink></li>
          </ul>
        </M.Nav>
        {/*✨ 레이아웃은 유지하고 content만 교체 ✨*/}
        <M.Content>
          <Routes>  {/*기본 페이지 리다이렉트 */}
            <Route path='/' element={<Navigate to="/home" replace/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/basic' element={<Basic/>}></Route>
            <Route path='/special' element={<Special/>}></Route>
            <Route path='/test' element={<Test/>}></Route>
            <Route path='/test/home' element={<TestHome/>}></Route>

            <Route path='/array' element={<Array/>}></Route>
            <Route path='/tuple' element={<Tuple/>}></Route>
            <Route path='/enum' element={<Enum/>}></Route>
            <Route path='/object' element={<Object/>}></Route>
            <Route path='/interface' element={<Interface/>}></Route>
            <Route path='/tensor' element={<Tensorflow/>}></Route>
            <Route path='/classunion' element={<ClassUnion/>}></Route>
            <Route path='/last' element={<Last/>}></Route>
           
          </Routes>
        </M.Content>

        <M.SideBar>Side바</M.SideBar>
        <M.Ads>ads</M.Ads>
        <M.Footer>the footer</M.Footer>


      </M.Container>
    </BrowserRouter>
     
     
    </>
  )
};

createRoot(document.getElementById('root')!).render(
    <App />
)
