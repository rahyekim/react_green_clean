import { BrowserRouter,Routes,Route } from "react-router-dom"

//admin
import { DashBoard } from "./admin/DashBoard"

import Header from "./include/Header" // import 컴포넌트명 from 'path'
import Footer from "./include/Footer"
import Slider from "./include/Slider"
import Home from "./Home"

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
      <Route path="/admin" element={<DashBoard/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
