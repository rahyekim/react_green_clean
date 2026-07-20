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
app.use(express.json()); //클라이언트가(리액트)가 보낸 데이터(JSON 문자열형태)를 백엔드(서버)가 읽을 수 있게(자바스트립트 객체로)변환해 준다

//글을 쓸때 아이디,패스워드 (데이터베이스 연결 설정)
const db= mysql.createConnection({
    host: 'localhost', //현재는 로컬호스트지만...aws사용할때는 엔드포인트 사용
    user: 'root', //mysql 사용자명 기본
    password: '',
    database: 'board_db'
});

//실제로 데이터베이스 접속을 시도 
db.connect((err)=>{
    if(err)throw err; //접속중 에러발생 에러내용 출력하고 멈춤..
    console.log('MySql connected!')
})

//게시글 불러오기(GET)
//사용자가 서버주소 /api/posts 로 요청하면 실행 
app.get('/api/posts', (req,res)=> {
    const sql = 'SELECT * FROM posts ORDER BY created_at DESC';
    //db에서 모든 게시글 정보를 가져와서 생성시간(created_at) 역순으로 정렬하는 sql문장
    db.query(sql, (err, result)=>{ //한 번의 요청에는 단 한 번의 응답-return써라

        if(err) return res.status(500).send(err); //⭐return(즉시종료)! return없으면 밑에줄까지읽음       
        res.send(result); //에러가 없다면 가져온 게시글 데이터를 사용자에게 전송
    })
});

//게시글 작성(POST)
//사용자가 게시글 정보를 담아 서버주소 /api/posts 로 보내면 실행
app.post('/api/posts', (req,res)=>{
    //사용자가 보낸 데이터에서(body) 제목,내용,작성자 정보를 꺼내옴
    const {title, content, author} = req.body;
    //새로운 게시글을 입력하는 sql문장 ⭐? 자리에 실제 데이터가 들어감..
    const sql = 'INSERT INTO posts ( title, content, author) values (?,?,?)'
   
    db.query(sql,[title, content, author], (err,result)=>{
        if(err) return res.status(500).send(err);

        console.log('DB 저장 결과:', result);
        res.send('Post added,,,');
        // 리액트로 보내기
        res.status(201).json({ success: true, insertId: result.insertId,
            message: 'Post added successfully!' 
         });
    })
});

app.listen(5000,()=>{ //5000번 port에서 실행 
    console.log('Server running on port 5000');
})



/*
 db.query 완료 후 들어오는 result 객체의 실제 모습
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

//프론트
//npm create vite@latest board-frontend -- --template react-ts
// npm install react-router-dom axios bootstrap styled-components