/*
서버를 아주 쉽게 만들 수 있도록 도와주는 Node.js 의 대표적인 프레임워크 'Express'
 */
const express = require('express');
const cors = require('cors');   //주소가 다르면 브라우저가 보안상 요청을 막는데, 이를 허용해줌 

require('dotenv').config();  //환경변수를 읽어서 프로그램에 적용

// const db = require('./db'); //직접만든 오라클 DB연결 파일(db.js)를 불러와서 사용
const AppDataSource = require('./db');
const User = require('./user.schema'); // 아까 만든 User 엔티티 스키마 파일

const app = express(); // Express 기능을 사용할수있도록 app이라는 서버 객체 만들어줌

const port = process.env.PORT || 5000;  //.env port값이 있으면 그거쓰고 없으면 5000

app.use(cors());
app.use(express.json());  //클라이언트가 json형식{"":""}으로 보냈을때 서버가 자바스크립트 객체를 이해하고사용할수있도록 변환

/*
html 폼(form) 태그를 통해 전송된 데이터를 서버가 이해할 수 있도록 변환
extended: true는 복잡한 객체 형태의 데이터도 해석
 */
app.use(express.urlencoded({extended:true}));

app.get('/api/health', (req,res)=> {
    res.json({status:'ok', message: "성형외과 백엔드 서버가 정상 작동중"})
})

//회원가입 API
app.post('/api/register', async(req,res)=>{
    try{
        const {username, password, phone }=req.body;
        const userRepository = AppDataSource.getRepository(User);

        const newUsr = userRepository.create({
            username : username,
            password: password,
            phone:phone,
        })
        await userRepository.save(newUsr);
        res.json({succee:true, message:'회원가입이 완료되었습니다'});

    }catch(err){
        if(err.message && err.message.includes("ORA-00001")){  //유니크 위배 중복 에러
            console.error("회원가입 에러, 중복된 아이디입니다...")
            return res.status(409).json({succee:false, message: '이미 사용중인 아이디 입니다'})
        }
        console.err("회원가입에러:" , err)
        res.status(500).json({succee:false, message:"회원가입중 서버오류 발생"})
    }
})

//서버시작과정을 순서대로 처리하기 위한 비동기 함수를 ..?
async function startup(){
    console.log('서버시작중💙')

    try{
        //DB연결초기화
        await AppDataSource.initialize();
        console.log('🚀 TypeORM 오라클 DB연결 완료')
    
        //지정한 포트(5000)에서 클라이언트의 요청을 기다리기(listen) 시작
        app.listen(port, ()=>{
            console.log(`서버가 http://localhost:${port}에서 실행 중입니다..🏖️`)
        })
    }catch(err){
        console.error("DB연결실패: ", err);
    }
}
startup();

process.on('SIGINT', async()=>{
    console.log('서버를 종료합니다..⚠️')

    await db.close();
    
    process.exit(0);
})

//db.js의 close() 함수를 불러와 열려있는 DB연결을 안전하게 먼저 끊어줌
//DB연결 끊기완료=> Node.js 프로세스를 정상적으로 완전히 종료(0)