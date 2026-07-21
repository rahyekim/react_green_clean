/*
⭐ npm init -y는 Node.js 프로젝트를 빠르게 시작하는 명령어(기본package.json을 만드는 명령어)
npm install express mysql2 cors             
package.json 프로젝트 설명서 
*/

//외부 라이브러리 모듈 불러오기(요즘://import express from 'express'; // "type": "module"((ES Modules)))
const express = require('express'); //웹서버를 만들기위한 프레임워크 express가져옴
const mysql = require('mysql2'); //mysql데이터베이스와 통신하기위한 도구 가져오기..
const cors = require('cors'); //다른 도메인 주소에서 이 서버에 접속할수 있게 허용해주는 보안


const app = express(); //express실행객체생성..app변수에 담기..(서버의본체)

app.use(cors());  // 모든 다른 곳, 컴퓨터(리액트:프론트)의 접속을 허용
app.use(express.json()); //클라이언트가(리액트)가 보낸 데이터(JSON 문자열형태)를 백엔드(서버)가 읽을 수 있게(자바스트립트 객체로)변환

//글을 쓸때 아이디,패스워드,키 (데이터베이스 연결 설정)
const db= mysql.createConnection({
    host: 'localhost', //현재는 로컬호스트지만...aws사용할때는 엔드포인트 사용
    user: 'root', //mysql 사용자명 기본
    password: '',
    database: 'board_db'
    //mysql port:3306 디폴트
});

//실제로 데이터베이스 접속을 시도 
db.connect((err)=>{
    if(err)throw err; //접속중 에러발생 에러내용 출력하고 멈춤..
    console.log('MySql connected!')
})

//[🔥페이징]   

/*
URL
│
├── /api/posts          → req.path
│
├── ?page=3             → req.query.page
│
└── /:id                → req.params.id

 ✔️Query String(?뒤에 붙는것) => req.query.page
 ?key=value 형태의 데이터 영역 

 ✔️Route Parameter (경로 변수) :주소자체에 포함  => req.params.id
 /api/posts/3  

 ✔️body  POST 요청 데이터 => req.body.title

*/
app.get('/api/posts', (req,res)=>{
    const page= parseInt(req.query.page) || 1; //클라이언트가 page파라미터(문자열)를 안보내면 1페이지로 간주..
    const limit = 5; //한페이지당 5개씩 출력
    const offset= (page-1) * limit ; //  건너뛸 데이터 개수 
    //데이털 가져올때 몇개를 건너뛰고 가져올지 계산... 1page 2page 5개건너뛰고 6-10개 보여줌

    //page는 사람이 보는 번호고, offset은 DB가 이해하는 위치

    //💡 전체 게시물 수 구하기
    const countSql = 'select count(*) as total from posts'
    db.query(countSql, (err, countResult)=>{
        if(err) return res.status(500).send(err);

        console.log(countResult); // [ { total: 7 } ]
        
        const total = countResult[0].total;  //✨✨DB가 알려준 전체 게시물 개수를 변수에 담는다 
        const totalPages = Math.ceil(total/limit); //🌿ceil 올림처리..
        
        //해당페이지의 게시물만 가져오기
        const sql= 'select * from posts order by created_at desc limit ? offset ?';
        //우리가 계산한 limit(5)와 offset을 넣어서 잘라옴
        db.query(sql, [limit, offset], (err,result)=>{
            if(err) return res.status(500).send(err);
            res.json({posts: result, totalPages, currentPage: page})
            //결과데이터(게시물들)외 페이징 정보(총페이지,현재페이지)를 하나로 묶어서 프론트엔드로 보냄..
        })
    })
})


/*
//📌 페이징을 하지 않을 때.... 페이징은 꼭해줘야하거덩?
//게시글 불러오기(GET)
//사용자가 서버주소 /api/posts 로 요청하면 실행 
app.get('/api/posts', (req,res)=> {
    const sql = 'SELECT * FROM posts ORDER BY created_at DESC';
    //db에서 모든 게시글 정보를 가져와서 생성시간(created_at) 역순으로 정렬하는 sql문장
    db.query(sql, (err, result)=>{ //한 번의 요청에는 단 한 번의 응답-return써라
        //⭐(에러객체,db조회결과데이터) 순서!
        if(err) return res.status(500).send(err); //⭐return(즉시종료)! return없으면 밑에줄까지읽음       
        res.send(result); //에러가 없다면 가져온 게시글 데이터를 사용자에게 전송
    })
});
*/

//📚 게시글 작성(POST)
//사용자가 게시글 정보를 담아 서버주소 /api/posts 로 보내면 실행
app.post('/api/posts', (req,res)=>{
    //사용자가 보낸 데이터에서(body) 제목,내용,작성자 정보를 꺼내옴
    const {title, content, author} = req.body;
    //새로운 게시글을 입력하는 sql문장 ⭐? 자리에 실제 데이터가 들어감..
    const sql = 'INSERT INTO posts ( title, content, author) values (?,?,?)'
   
    db.query(sql,[title, content, author], (err,result)=>{ //⭐(?,?,?)+[] 안전힌방식
        if(err) return res.status(500).send(err);

        console.log('DB 저장 결과:', result);
        res.send('Post added,,,');
        // 리액트로 보내기
        // res.status(201).json({ success: true, insertId: result.insertId,
        //     message: 'Post added successfully!' 
        //  });
    })
});

//📝 put 수정페이지 : 우선 페이지를 불러와야함(get) 그후에=> update
app.get('/api/posts/:id', (req, res)=>{
    const sql = 'select * from posts where id = ?'
    db.query(sql, [req.params.id], (err,result)=>{
        if(err) return res.status(500).send(err);
        res.send(result[0]); //객체하나..
    })
})

//📝 put 수정페이지2

app.put('/api/posts/:id', (req,res)=>{
    const {title, content, author} = req.body;
    const sql = 'update posts set title = ? , content= ?, author =? where id = ?'
    db.query(sql, [title,content,author, req.params.id], (err, result)=>{
        if(err) return res.status(500).send(err);
        res.send('Post updated');
    })
});

//⚠️ 삭제 delete
app.delete('/api/posts/:id', (req,res)=>{
    const sql = 'delete from posts where id = ?'
    db.query(sql, [req.params.id], (err, result)=>{
        if(err) return res.status(500).send(err);
        res.send("post deleted ");
    })
})

//5000번 port에서 실행 
app.listen(5000,()=>{ 
    console.log('Server running on port 5000');
})

//⭐Rest API => get, post, put, delete CURD

/*아주 위험하고 취약한 코드예시
const sql = `INSERT INTO posts (title, content, author)
 VALUES ('${title}', '${content}', '${author}')`;
 🟦(?,?,?)+ [] :안전힌방식

*/
/*
 db.query 등록 완료 후 들어오는 result 객체의 실제 모습
{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 15,       // 👈 바로 여기에 방금 등록된 자동 증가 번호가 담깁니다!
  info: '',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 0
}
 */

/*
⭐ npm init -y는 Node.js 프로젝트를 빠르게 시작하는 명령어(기본package.json을 만드는 명령어)
npm install express mysql2 cors             
package.json 프로젝트 설명서 
*/

//⭐ 프론트
// npm create vite@latest board-frontend -- --template react-ts
// npm install react-router-dom axios bootstrap styled-components
// 타입스크립트 버젼으로 한번 더 설치
// npm install -D @types/styled-components


/*백엔드
npm install -D nodemon :서버가 알아서 자동으로 새로고침

pakage.json=>
"scripts": {
    "start": "node server.js",  //나중에 배포할 때 쓸 것!
    "dev": "nodemon server.js"  //npm run dev 가능단축키!&&서버가 알아서 자동으로 새로고침
  },
*/



/*
CREATE database board_db;

USE board_db;

CREATE TABLE posts(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
content TEXT NOT NULL,
author VARCHAR(100) NOT NULL,
created_at TIMESTAMP DEFAULT current_timestamp
); 

SELECT * FROM posts;
*/


