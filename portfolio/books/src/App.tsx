
import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Middle } from './sub/Middle'

import Home from './Home'
import * as S from './assets/css/styles'




export default function App(){
  return(
    <>
    <S.GlobalStyle />
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/middle' element={<Middle/>}/>
      {/* <Route path='/' element={</>}/> */}
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

