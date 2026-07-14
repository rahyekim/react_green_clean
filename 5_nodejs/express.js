/**
 * Node.js → 자바스크립트를 서버에서 실행하는 환경(Runtime)
   Express → Node.js에서 웹 서버를 쉽게 만들도록 도와주는 프레임워크
 * 서버를 쉽게 만들 수 있게 해주는 프레임워크

   Node.js(실행 환경) -> Express(express())(웹 프레임워크) -> app -app.get().post()라우팅등록 
   
   listen()=->서버실행 🌳 특정 포트에서 들어오는 요청을 듣는다(Listen)
 *  
 * 가장 인기있고 단순성과 유연성으로 유명
 * npm install express
 *              REST API (CURD)                        express
 * app.get() 데이터 조회(Read)            GET 요청을 처리하는 라우팅 메서드
 * app.post()  데이터 생성(Create)
 * app.put() 데이터 전체 수정(Update)
 * app.delete() 데이터 삭제(Delete)
 * app.all() :모든 http 요청메서드를 처리함 
 */

//1.초기설정

const express = require('express');
//프로젝트에 설치돤 Express 모듈을 불러옴

const app = express();   //이 app객체(서버객체)를 통해🌳서버의 길안내(라우팅)및 각종설정제어! 

const port = 8080; //포트는 서버로 들어오는 통로번호..

//2,기본 라우팅(경로설정)

/**
 * app.get(...) 클라이언트(웹브라우저)가 특정주소('/..')로 
 * GET요청을 보냈을때 서버가 어떻게 응답할지 정의
 * 
 * 🍁 / : 웹 사이트의 가장 기본주소(루트경로)를 의미 http://localhost:8080 "/"  a href="/"
 * 🌿 (req,res)=>{...}: 콜백함수 , 사용자가 접속했을때 실행
 * req(Request): 사용자의 요청 정보가 담긴
 * res(Response): 서버가 사용자에게 응답할때 사용하는 객체
 */
app.get('/', (req,res)=> {  
    res.send('home page') //브라우저화면에 home page라는 텍스트 띄워줌

});

app.get('/about' , (req, res)=> {  //화살표함수: 함수명없이 익명으로 손쉽게사용
    res.send("about page")

});

app.get('/contact', (req,res)=>{
    res.send('contact page');
});

//404에러 ...없는 주소 처리
app.use((req,res)=>{
    res.status(404).send('404 - page not found ')
})


//여기까지가 라우팅!

//라우팅 응답하는 와꾸 html을 그림 

app.get('/html', (req,res)=>{
    res.send(`
        <html>
        <head>
        <title>Express Routing</title>
        <style>
        body{font-family:Arial; sans-serif; margin: 40px;}
        h1{color:#0066cc;} p{margin-bottom:20px;}
        </style>
        </head>
        <body>
            <h1>HTML Response from express</h1>
            <p> this response was sent using Express Routing </p>
            <nav>
            <a href='/'>home</a> | 
            <a href='/about'>about</a> | 
            <a href='/contact'>contact</a>
            </nav>
        </body>
        </html>
        `);
})



//서버실행
app.listen(port,()=>{
    console.log(`app listening at http://localhost:${port}`)
})

