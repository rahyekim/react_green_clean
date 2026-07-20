//1) 라우팅설정
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import {BoardList} from './components/BoardList'
import BoardWrite from './components/BoardWrite'

function App() {

  return (
    <>
    <BrowserRouter>
      <div className='container mt-5'>
        <h2 className='mb-4'>BBS</h2>
        <Routes>
          <Route path='/' element={<BoardList/>}/>
          <Route path='/write' element={<BoardWrite/>}/>
        </Routes>
      </div>
    </BrowserRouter>

    </>
  )
}

export default App
