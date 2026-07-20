
const express= require('express')
const mysql = require('mysql2/promise') //promise방식
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

//db.connect()..삭제

//조회
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