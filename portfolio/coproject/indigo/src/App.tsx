import { BrowserRouter,Routes,Route } from "react-router-dom"

import { ProtectedRoute } from "./admin/ProtectedRoute"
//admin
import { DashBoard } from "./admin/DashBoard"

import Header from "./include/Header" // import 컴포넌트명 from 'path'
import Footer from "./include/Footer"
import Slider from "./include/Slider"
import Home from "./Home"
import { Join } from "./admin/sub/Join"
import { Login } from "./admin/sub/Login"
import { UserList } from "./admin/sub/UserList"
import { HeaderSetting } from "./admin/sub/HeaderSetting"
import BannerSetting from "./admin/sub/BannerSetting"
import WeareSetting from "./admin/sub/WeareSetting"
import WorkSetting from "./admin/sub/WorkSetting"
import BlogSetting from "./admin/sub/BlogSetting"
import MapSetting from "./admin/sub/MapSetting"
import ContactSetting from "./admin/sub/ContactSetting"

import SearchResult from "./admin/sub/SearchResult"

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
      <Route path="/admin" element={
        <ProtectedRoute><DashBoard/></ProtectedRoute>}/>
      <Route path="/join" element={<Join/>}/> 
      <Route path="/login" element={<Login/>}/>
      <Route path="/userlist" element={<ProtectedRoute><UserList/></ProtectedRoute>}/>

      <Route path="/hdsetting" element={<ProtectedRoute><HeaderSetting/></ProtectedRoute>}/>
      <Route path="/bnsetting" element={<ProtectedRoute><BannerSetting/></ProtectedRoute>}/>
      <Route path="/wesetting" element={<ProtectedRoute><WeareSetting/></ProtectedRoute>}/>
      <Route path="/wksetting" element={<ProtectedRoute><WorkSetting/></ProtectedRoute>}/>
      <Route path="/blogsetting" element={<ProtectedRoute><BlogSetting/></ProtectedRoute>}/>
      <Route path="/contsetting" element={<ProtectedRoute><ContactSetting/></ProtectedRoute>}/>
      <Route path="/mapsetting" element={<ProtectedRoute><MapSetting/></ProtectedRoute>}/>
      <Route path="/search" element={<ProtectedRoute><SearchResult/></ProtectedRoute>}/>
      



    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
