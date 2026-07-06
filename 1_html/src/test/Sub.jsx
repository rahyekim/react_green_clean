import { BrowserRouter, Routes, Route,Link } from "react-router-dom";


function Home (){
    return (
        <h1>hello Home !</h1>
    )
}
function Sub1 (){
    return(
        <h1> hello Sub1 !</h1>
    )
}
function Sub2 (){
    return(
        <h1> hello Sub2 !!</h1>
    )
}

function Sub3 (){
    return(
        <h1> hello Sub3 !!!</h1>
    )
}

const Sub= ()=>{
    return (
        <>
        <BrowserRouter>
         <nav>
            <Link to="/">Home</Link> |
            <Link to="/sub1">Sub1</Link> |
            <Link to="/sub2">Sub2</Link> |
            <Link to="/sub3">Sub3</Link> |
         </nav>
         <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/sub1" element={<Sub1/>}></Route>
            <Route path="/sub2" element={<Sub2/>}></Route>
            <Route path="/sub3" element={<Sub3/>}></Route>
         </Routes>
        </BrowserRouter>
    
        </>
    )
}

export default Sub;