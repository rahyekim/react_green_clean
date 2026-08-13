import { BrowserRouter,Routes,Route } from "react-router-dom"

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
      <Route path="/admin" element={<DashBoard/>}/>
      <Route path="/join" element={<Join/>}/> 
      <Route path="/login" element={<Login/>}/>
      <Route path="/userlist" element={<UserList/>}/>
      <Route path="/hdsetting" element={<HeaderSetting/>}/>
      <Route path="/bnsetting" element={<BannerSetting/>}/>
      <Route path="/wesetting" element={<WeareSetting/>}/>
      <Route path="/wksetting" element={<WorkSetting/>}/>
      <Route path="/blogsetting" element={<BlogSetting/>}/>
      <Route path="/contsetting" element={<ContactSetting/>}/>
      <Route path="/mapsetting" element={<MapSetting/>}/>
      <Route path="/search" element={<SearchResult/>}/>
      



    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
