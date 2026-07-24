
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors()) //cors
app.use(express.json()) //파싱..프론트엔드에서 보내는 JSON 데이터를 읽기위한 설정...

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:"",
    database: 'company'
})

db.connect(err => {
    if(err)throw err;
    console.log('mysql company db connedted')
})

//등록 
app.post('/api/users/register', (req,res)=>{
    const {first_name, last_name, email, password, zipcode, address, detail_address} = req.body
    const sql= 'insert into users(first_name, last_name, email, password, zipcode, address, detail_address)values(?,?,?,?,?,?,?)'

     // ✅ Node 백엔드 검증 영역
    if(!first_name || !last_name || !email || !password){
        return res.status(400).json({
            message:"필수 항목을 입력해주세요"
        });
    }

    if(password.length < 8){
        return res.status(400).json({
            message:"비밀번호는 8자 이상이어야 합니다"
        });
    }
    
    db.query(sql,[first_name, last_name, email, password, zipcode, address, detail_address],(err,result)=>{
        if(err) {
            console.error("회원가입 에러:", err);
            if(err.code === 'ER_DUP_ENTRY'){  //DB가 알려주는 에러 종류 : UNIQUE 중복 발생

                return res.status(400).json({message: '이미존재하는 이메일입니다'}); //409충돌
            }
            return res.status(500).json({message: '서버오류발생'});
        }
        res.status(201).json({message: "회원가입이 완료되었습니다", userId: result.insertId}); 
        //저장이 완료되었다고 알림
    });
});

//login
app.post('/api/users/login', (req,res)=>{
    const { email, password} = req.body;
    const sql = 'select * from users where email = ? and password = ?' //회원정보 일치하는거 꺼냄
    db.query(sql,[email, password], (err,result)=>{
        if(err){
            console.error("로그인 에러:", err);
            return res.status(500).json({message: '서버 오류 발생'});
        }
        if(result.length === 0){ //일치하는 회원이 없다면... mysql은 비어있는 배열 []을 반환
            return res.status(401).json({message: "이메일 또는 비밀번호가 올바르지 않습니다"})
        }
        const user = result[0]; //검색된 배열중에 첫번째 [{회원정보}]
        res.status(200).json({message: "로그인 성공!", name: user.first_name})
    })
})



//서버실행
app.listen(5000, ()=>{
    console.log("✨ server running on port 5000 ✨");
})

//값 존재 여부 //형식 검사 //길이 검사  => DB저장
/*
npm install -D nodemon

400 Bad Request
→ 사용자가 잘못된 데이터를 보냄 (이메일 중복, 형식 오류 등)
401 Unauthorized
→ 로그인 안 됨
403 Forbidden
→ 권한 없음
500 Internal Server Error
→ 서버 문제
 */