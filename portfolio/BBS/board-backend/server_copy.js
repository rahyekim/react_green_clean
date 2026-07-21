/*
npm init -y npm install express mysql2 cors
 */

const express = require('express');
// const mysql = require('mysql2'); //콜백방식
const mysql = require('mysql2/promise') //promise방식(async/await)
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173' //여러개는 배열로[]
}));
app.use(express.json())  //파싱..
//요청 body에 있는 json문자열데이터를 객체로 변환해 읽을수 있게 해주는 미들웨어

//app.use(미들웨어) : 중간에 끼워 넣는 공통 처리 과정 (순서 api들보다 먼저...)

/*
GET     → 가져와줘
POST    → 만들어줘
PUT     → 바꿔줘
PATCH   → 조금만 바꿔줘
DELETE  → 지워줘

axios.get('/users')       // 조회
axios.post('/users', data) // 등록
axios.put('/users/1', data) // 수정
axios.patch('/users/1', data) // 일부 수정
axios.delete('/users/1')   // 삭제
 */

//db연결 설정...키..패스워드.. //연결 여러개 createPool()
const db = mysql.createConnection({ //mysql port:3306 디폴트
    host: 'localhost',
    user: 'root',
    password: '2525',
    database: 'board_db'
})

//db접속 -  콜백함수.. promise에서는 삭제...
db.connect((err)=>{
    if(err) throw err;
    console.log("mysql connected!");
})


//게시글 조회 불러오기(Get) 콜백함수버젼
app.get('/api/posts', (req,res)=>{ 
  const sql = 'select * from posts order by created_at DESC'
  //sql실행
  db.query(sql, (err,data)=>{ // (에러객체,db조회결과데이터) 순서!
    if(err) return res.status(500).send(err);
    res.send(data)
  }) //db야 이 sql실행해줘...db조회끝나면 (err,data)=>{} 내가 준 함수 실행해줘...
})

app.get('/api/posts', async (req,res)=>{
    const sql = 'select * from posts order by created_at desc';
    try{
        const [data] = await db.query(sql);
//배열 구조분해할당은 '이름'이 아니라 '순서(인덱스)'로 가져다줌 [rows(실제데이터), fields(메타정보)]
        // res.send(data) => express가 알아서 json형태로 보내줌
        res.json(data) //의도명확, json data 보낼게
        //웹 브라우저로 전송하려면 문자로 변환 해야하는데
        //res.json(data)을 쓰면 알아서 JSON.stringify(data) 문자열로 변환해줌

    }catch(err){
        console.error('DB error',err);
        // res.status(500).send(err);
        res.status(500).json({ error: "data를 불러오는 중 오류가발생했습니다"})
    }
})

const express= require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')

const app = express();

// app.use(cors())
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json()); //json문자열-> 객체로 변환해줌


const db = mysql.createPool({
    host : 'localhost',
    user: 'root',
    password: '2525',
    database: 'board_db'
})

//조회..페이징없는버젼..이런건없다...
app.get('/api/posts', async (req,res)=>{
    const sql = 'select * from posts order by created_at desc';
    try{
        const [rows] = await db.query(sql)
        res.json(rows);
    }catch(err){
        console.error(err);
        res.status(500).json({error: "데이터를 불러오는 중 오류 발생"})
    }
})

//등록
app.post('/api/posts', async(req,res)=>{
    const {title,content,author} = req.body;

    //유효성검사 
    if(!title || !content || !author){
        return res.status(400).json({ error: "제목과 내용은 필수 입력 항목입니다." })
    }
    const sql = 'insert into posts( title, content, author) values(?,?,?)'

    try{
        const [result] = await db.query(sql, [title,content,author])
        res.status(201).json({  //201 : 새 리소스 생성 성공
            id: result.insertId, //등록 완료 후 생성된 id 
            message: "Post added successfully!"

        })
    }catch(err){
        console.error("DB 등록에러", err);
        res.status(500).json({message: "게시글 등록 실패 "})
    }
})

app.listen(5000, ()=>{
    console.log("server running on port 5000");
})


//➡️ 페이징 🔥

/* 
'/api/posts?page=3'
?뒤부터 쿼리 req.quary.page = "3"
'/api/posts/3
경로변수 req.params.id = "3"

*/

app.get('/api/posts', (req,res)=>{

    const page = parseInt(req.query.page) || 1 ;
    const limit = 6;
    const offset = (page-1)*limit ;

    //전체게시물수/한페이지 나오는 수 = 총페이지수
    const countSql='select count(*) as total from posts';
    db.query(countSql, (err,result)=>{
        if(err) return res.status(500).send(err);

        console.log(result); //result = [{total: 갯수}]

        const total = result[0].total;
        const totalPages= Math.ceil(total/limit);

        //해당페이지 게시물만 가져오기
        const sql= 'select * from posts order by created_at desc limit ? offset ?'

        db.query(sql,[limit, offset] ,(err,result)=>{
            if(err) return res.status(500).send(err);
            res.json({posts: result, totalPages, currentPage: page })

        })
    })
})

//📝 수정 1단계 데이터 불러오기get
app.get('/api/posts/:id', (req,res)=>{
    const sql = 'select * from posts where id = ?';
    db.query(sql, [req.params.id], (err,result)=>{
        if(err) res.status(500).send(err);
        res.send(result[0])
    })
})

//📝 2단계 수정
app.put('/api/posts/:id', (req,res)=>{
    const {title, content, author} = req.body;
    const sql = 'update posts set title = ? ,content =?, author=? where id = ?';
    db.query(sql, [title,content,author,req.params.id], (err, result)=>{
        if(err) return res.status(500).send(err);
        res.send("Post updated");
    })
})

//⚠️ 삭제 delete

app.delete('/api/posts/:id', (req,res)=>{

    const sql='delete from posts where id=?'
    db.query(sql, [req.params.id], (err,result)=>{
        if(err) return res.status(500).send(err);
        res.send("post deleted..")
    })
})
