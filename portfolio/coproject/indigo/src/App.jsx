import { BrowserRouter,Routes,Route } from "react-router-dom"

//admin
import { DashBoard } from "./admin/DashBoard"

import Header from "./include/Header" // import 컴포넌트명 from 'path'
import Footer from "./include/Footer"
import Slider from "./include/Slider"
import Home from "./Home"
import { Join } from "./admin/sub/Join"
import { Login } from "./admin/sub/Login"

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={
        <div id="wrap">
          <Header />
          <Slider />
          <Home />
          <Footer />
        </div>
      }/>
      {/* admin에 못들어가게 토큰...설정해야함... */}
      <Route path="/admin" element={<DashBoard/>}/>
      <Route path="/join" element={<Join/>}/> 
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
