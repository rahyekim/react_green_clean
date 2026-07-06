import {BrowserRouter, Routes, 
  Route, Link, Outlet} 
  from 'react-router-dom'
import reactLogo from './assets/react.svg'

function Home() {
  return <h1>Home page</h1>
}

function Products(){
  return(
    <div className="">
      <h1>Products Page</h1>
      <nav className="">
        <Link to="/products/car">Cars</Link>|
        <Link to="/products/bike">Bikes</Link>
      </nav>
      <Outlet/>
    </div>
  )
}
function CarProducts() {
  return(
    <div className="">
      <h2> Cars </h2>
      <ol className="">
        <li>BMW</li>
        <li>Audi</li>
        <li>Mercedes-Benz</li>
      </ol>
    </div>
  )
}
function BikeProducts() {
  return(
    <div className="">
      <h2>Bikes</h2>
      <ul className="">
        <li>Yamaha</li>
        <li>suzuki</li>
        <li>Honda</li>
      </ul>
    </div>
  )
}

function App() {

  return (
    <>
    <BrowserRouter>
    <nav className="">
      <Link to="/">Home</Link> |
      <Link to="/products">Products</Link> |
      <Link to="/contact">Contact</Link> |
    </nav>
    {/* 아래는 라우팅설정 */}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<Products/>}>
        <Route path="car" element={<CarProducts/>}/>
        <Route path="bike" element={<BikeProducts/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
