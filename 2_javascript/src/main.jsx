import { createRoot } from 'react-dom/client'
//main.jsx 단독으로 실행할때도 남겨야한다.
import './assets/scss/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css'; //기본 부트스트랩 cdn

import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./include/Header"
import Home from "./Home"
//자바스크립트학습
import Es6 from './sub/Es6'
import Geo from './sub/Geo'
import Async from './sub/Async'

import Fx from './sub/func/Fx';
import Re from './sub/func/Re';
import Cate from './sub/func/Cate';
import MyDate from './sub/date/MyDate';
import Temp from './sub/date/Temporal';
import DateVsTemp from './sub/date/DateVsTemp';

//css학습
import Flex from "./sub/Flex"
import Grid from './sub/Grid'
import Layout from './sub/Layout'
import FlexWeb from './sub/FlexWeb';

import GridWeb from './sub/GridWeb';
import GridTest from './sub/GridTest';
import Intro from './sub/jquery/Intro';
import Jsx from './sub/react/Jsx';
import Class from './sub/react/Class';
import Props from './sub/react/Props';
import Event from './sub/react/Event';
import Forms from './sub/react/Forms';

import Practice from './sub/react/my/Practice';
import MyPractice from './sub/react/my/Practice2';
import Forms2 from './sub/react/Forms2';
import Hoc from './sub/react/Hoc';

import Sus from './sub/react/Sus';
import Portals from './sub/react/Portals';
import Fref from './sub/react/Fref';
import Hooks from './sub/react/Hooks';
import Trans from './sub/react/Trans';


function App() {


  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/es6' element={<Es6/>}></Route>
        <Route path='/geo' element={<Geo/>}></Route>
        <Route path='/async' element={<Async/>}></Route>
        <Route path='/fx' element= {<Fx/>}></Route>
        <Route path='/re' element= {<Re/>}></Route>
        <Route path='/cate' element= {<Cate/>}></Route>

        <Route path='/date' element= {<MyDate/>}></Route>
        <Route path='/temp' element= {<Temp/>}></Route>
        <Route path='/datevstemp' element= {<DateVsTemp/>}></Route>


        <Route path='/flex' element={<Flex/>}></Route>
        <Route path='/flexweb' element={<FlexWeb/>}></Route>
        <Route path='/grid' element={<Grid/>}></Route>
        <Route path='/gridweb' element={<GridWeb/>}></Route>
        <Route path='/gridtest' element={<GridTest/>}></Route>
        <Route path='/layout' element={<Layout/>}></Route>


        <Route path='/intro' element={<Intro/>}></Route>
        <Route path='/jsx' element={<Jsx/>}></Route>
        <Route path='/class' element={<Class/>}></Route>
        <Route path='/props' element={<Props/>}></Route>
        <Route path='/event' element={<Event/>}></Route>
        <Route path='/forms' element={<Forms/>}></Route>
        <Route path='/forms2' element={<Forms2/>}></Route>
        <Route path='/hoc' element={<Hoc/>}></Route>

        <Route path='/sus' element={<Sus/>}></Route>
        <Route path='/trans' element={<Trans/>}></Route>
        <Route path='/portals' element={<Portals/>}></Route>
        <Route path='/fref' element={<Fref/>}></Route>
        <Route path='/hooks' element={<Hooks/>}></Route>
      

        <Route path='/practice' element={<Practice/>}></Route>
        <Route path='/practice2' element={<MyPractice/>}></Route>
      </Routes>


    </BrowserRouter>
    </>
  )
}

createRoot(document.getElementById('skz')).render(
  <App />
)




/*
최초설치시....
import { StrictMode } from 'react'
import App from './App.jsx'


<StrictMode> 
<App />
</StrictMode>,
*/