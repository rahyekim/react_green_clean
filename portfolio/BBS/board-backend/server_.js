
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
});

//db.connect()..삭제
//🔥 [추가] 서버 시작 시 DB 접속 테스트 진행

(async ()=>{
    try{
        const conn = await db.getConnection(); //연결테스트
        console.log("✅ MySQL DB 연결 성공!");
        conn.release(); //사용 완료 후 반납 
    }catch(err){
        console.error("❌ MySQL DB 연결 실패! (비밀번호나 설정을 확인하세요)")
        console.error(err.message); //어떤 에러인지 상세 출력

    }
})();

//조회
// app.get('/api/posts', async (req,res)=>{
//     const sql = 'select * from posts order by created_at desc';
//     try{
//         const [rows] = await db.query(sql)
//         res.json(rows);  //status(200) 생략
//     }catch(err){
//         console.error(err);
//         res.status(500).json({error: "데이터를 불러오는 중 오류 발생"})
//     }
// });
//조회
app.get('/api/posts', async(req,res)=>{

    try{
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const offset = (page-1)*limit;
        
        //전체게시물 수 구하기-> totalPages 총페이지 구하기
        const countSql= 'select count(*) as total from posts '
        const [countRows] = await db.query(countSql);

        const total = countRows[0].total;
        const totalPages = Math.ceil(total/limit);

        //해당 페이지 게시글 조회
        const sql= 'select * from posts order by created_at desc limit ? offset ?';
        const [rows] = await db.query(sql, [limit,offset]);
        //프론트 전송
        res.json({
            currentPage: page,
            totalPages,
            posts: rows
        })
    }catch(err){
        res.status(500).send(err);
    }
})
//등록
app.post('/api/posts', async(req,res)=>{
    const {title,content,author} = req.body;

    //유효성검사 
    if(!title?.trim() || !content?.trim() || !author?.trim()){
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
});

//✅ 수정: get조회=>update
app.get('/api/posts/:id', async(req,res)=>{

    try{

        const sql='select * from posts where id =?'
        // mysql2/promise [[{data...}],[]] 구조분해 첫번째값가져오기
        const [rows] = await db.query(sql, [req.params.id]);

        if(rows.length===0){
            return res.status(404).json({
                message:"Post not found"
            });
        }
        res.json(rows[0]);
        
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

//✅put(update)
app.put('/api/posts/:id', async(req,res)=>{

    const {title,content,author} = req.body;

    if(!title?.trim() || !content?.trim() || !author?.trim()){
        return res.status(400).json({message: "필수입력값 누락"});
    }

    try{
        const sql='update posts set title=?, content=?, author=? where id=?'
        //구조분해 첫번째값가져오기 [{..data}, []]
        const [result] = await db.query(sql, [title,content,author,req.params.id]);

        ////✅ 정상 실행은 됐지만 해당 id가 없음(try안!)
        if(result.affectedRows===0){
            return res.status(404).json({message: "Post not found"})
        }
        //// ✅ 수정 성공
        res.json({
            id: req.params.id,
            affectedRows: result.affectedRows, //해당 id의 게시글을 찾아서 1개 수정 성공 이라는뜻
            message:"Posts updated"});

    }catch(err){
        // ❌ DB 연결 오류, SQL 문법 오류 등 
        // DB연결실패 or SQL실행실패 => 이런게 catch 500:Internal Server Error
        res.status(500).json({message:err.message});
    }
})

//삭제
app.delete('/api/posts/:id', async(req,res)=>{
    try{

        const sql='delete from posts where id=?'
        const [result] = await db.query(sql,[req.params.id])
        
        res.json({affectedRows: result.affectedRows,
            message: "Post deleted"
        })
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
//서버실행
app.listen(5000, ()=>{
    console.log("server running on port 5000");
})
