
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// app.use(cors()) //cors
app.use(cors({
    origin: 'http://localhost:5173' //여러개는 배열로[]
}));
app.use(express.json()) //파싱..프론트엔드에서 보내는 JSON 데이터를 읽기위한 설정...

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:"2525",
    database: 'company'
})

db.connect(err => {
    if(err)throw err;
    console.log('mysql company db connedted')
})

//등록 
app.post('/api/users/register', (req,res)=>{
    const {first_name, last_name, email, password, zip_code, address, detail_address} = req.body
    const sql = `insert into users
    (first_name, last_name, email, password, zip_code, address, detail_address) 
    values(?,?,?,?,?,?,?)`

    //검증
    if(!first_name || !last_name || !password || !email ){
       return res.status(400).json({message:"필수항목을 입력해주세요"})        
    }
    if(password.length <8){
    return res.status(400).json({message:"비밀번호는 8자리이상이어야합니다"})        

    }
    db.query(
        sql,
        [first_name,last_name, email, password, zip_code, address, detail_address],
    (err,result)=>{
        if (err) {
            console.error("회원가입에러: ",err);
            if(err.code === 'ER_DUP_ENTRY'){
            return res.status(400).json({message: '이미존재하는 이메일입니다'})
        }
        return res.status(500).json({message: "서버오류발생"});
    }res.status(201).json({message: "회원가입이 완료되엇습니다 welcome", userID : result.insertId})
    })
})

//login=>조회(select).. 이미있는 회원데이터를 찾음
app.post('/api/users/login', (req,res)=>{
    const { email, password} = req.body;
    const sql = 'select * from users where email = ? and password = ?' //회원정보 일치하는거 꺼냄

    if(!email || !password){
        return res.status(400).json({
            message:"이메일과 비밀번호를 입력해주세요"
        });
    }
    db.query(sql,[email, password], (err,result)=>{
        if(err){
            console.error("로그인 에러:", err);
            return res.status(500).json({message: '서버 오류 발생'});
        }
        if(result.length === 0){ //일치하는 회원이 없다면... []... 안에..{회원정보}없음
            return res.status(401).json({message: "이메일 또는 비밀번호가 올바르지 않습니다"})
        }
        const user = result[0]; //검색된 배열중에 첫번째 [{회원정보}] 
        res.status(200).json({message: "로그인 성공!", name: user.first_name})
    })
})

//회원목록조회 API
app.get('/api/users' ,(req,res)=>{
    
    const sql=`select id , first_name, last_name, email, zip_code, address, detail_address  
    from users order by created_at desc`

    db.query(sql, (err, result)=>{

        if(err){
            console.error("회원목록 조회중에러:", err)
            return res.status(500).json({message: "회원목록 조회중 에러"})
        }
        res.status(200).json(result) //목록 봐로 쏴줌
    })

})

//서버실행
app.listen(5000, ()=>{
    console.log("✨ server running on port 5000 ✨");
})

//값 존재 여부 //형식 검사 //길이 검사  => DB저장
/*
npm install -D nodemon

🔥 INSERT → result.insertId
🔥 SELECT → result[0]
🔥 UPDATE/DELETE → affectedRows

400 Bad Request
→ 사용자가 잘못된 데이터를 보냄 (이메일 중복, 형식 오류 등)
401 Unauthorized
→ 로그인 안 됨
403 Forbidden
→ 권한 없음
500 Internal Server Error
→ 서버 문제
 */

/*⭐mysql2/promise ⭐버젼
app.post('/api/users/login', async(req,res)=>{
    const {email, password}=req.body
    const sql=`select * from users where email=? and password=?`
    
    try{
       const [rows]= await db.query(sql,[email,password])

       if(rows.length === 0){
        return res.status(401).json({
            message: "이메일또는 비번이 올바르지않습니다"})
    } 
        const users = rows[0];
        res.status(200).json({message:"로그인성공!", name: users.first_name} )

    }catch(err){
            console.error("로그인에러:", err);
            return res.status(500).json({message:"서버오류발생"})
    }
    });

 */