/*
🧩ORM은 Object-Relational Mapping(객체-관계 매핑)
서버를 아주 쉽게 만들 수 있도록 도와주는 Node.js 의 대표적인 프레임워크 'Express'
*/

require('dotenv').config();  //환경변수를 읽어서 프로그램에 적용
const express = require('express');
const cors = require('cors');   //주소가 다르면 브라우저가 보안상 요청을 막는데, 이를 허용해줌 

const bcrypt = require('bcrypt')
const AppDataSource =require('./db');
const Member = require('./src/entity/Member');

const app = express(); // Express 기능을 사용할수있도록 app이라는 서버 객체 만들어줌
app.use(cors());
app.use(express.json());  //클라이언트가 json형식{"":""}으로 보냈을때 서버가 자바스크립트 객체를 이해하고사용할수있도록 변환

const PORT = process.env.PORT || 5000;  //.env port값이 있으면 그거쓰고 없으면 5000

/*
html 폼(form) 태그를 통해 전송된 데이터를 서버가 이해할 수 있도록 변환
extended: true는 복잡한 객체 형태의 데이터도 해석
 */
app.use(express.urlencoded({extended:true}));

app.get('/api/health', (req,res)=> {
    res.json({status:'ok', message: "성형외과 백엔드 서버가 정상 작동중💙"})
})

//회원가입 API
app.post('/api/register', async(req,res)=>{
    try{
        const {
            userName, 
            userId, 
            userPW,
            email, 
            isSnsAgreed,
            isEmailAgreed,
            phone, 
            gender
         }=req.body;

        //✅비밀번호 암호화!
        /*
        해킹을 당해도 원본 비밀번호를 알 수 없도록 "소금"이라는
        무작위 문자열생성 숫자 10(보통)은 복잡도를 의미
        클수록 안전하지만 서버가 계산하는데 시간이 더걸림 
         */
        const salt = await bcrypt.genSalt(10);
        const hashedPw = await bcrypt.hash(userPW, salt);
        /*
        사용자가 입력한 비밀번호에 생성된 소금을 버무려
        알아볼수없는 복잡한 암호(해시)로 만듦 
         */
        const memberRepository = AppDataSource.getRepository(Member);

        const newMember= {
            USER_NAME : userName,
            USER_ID: userId,
            USER_PW: hashedPw, // ✅ 암호화된 비밀번호로 저장!
            EMAIL: email,
            IS_SNS_AGREED: isSnsAgreed ? 'Y' : 'N',
            IS_MAIL_AGREED: isEmailAgreed ? 'Y' : 'N',
            PHONE: phone,
            GENDER: gender
        };

        await memberRepository.save(newMember);
        res.status(201).json({success:true, message:'회원가입이 완료되었습니다'});

    }catch(err){
        if(err.message && err.message.includes("ORA-00001")){  //유니크 위배 중복 에러
            console.error("회원가입 에러, 중복된 아이디입니다...")
            return res.status(409).json({success:false, message: '이미 사용중인 아이디 입니다'})
        }
        console.error("회원가입에러:" , err)
        res.status(500).json({success:false, message:"회원가입중 서버오류 발생"})
    }
})



//🧩ORM은 Object-Relational Mapping(객체-관계 매핑)
//서버시작시 TypeORM DB연결 
// AppDataSource.initialize()
// .then(()=> {console.log("오라클 DB 성공적으로 연결💙")})
// .catch(err=> console.log("DB연결실패!", err))

// app.listen(PORT, ()=>{
//     console.log(`server is running on port ${PORT}💙`)
// })

//서버시작과정을 순서대로 처리하기 위한 비동기 함수를 ..?
async function startup(){
    console.log('서버시작중💙')

    try{
        //DB연결초기화
        await AppDataSource.initialize();
        console.log('🚀 TypeORM 오라클 DB연결 완료')
    
        //지정한 포트(5000)에서 클라이언트의 요청을 기다리기(listen) 시작
        app.listen(PORT, ()=>{
            console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다..🏖️`)
        })
    }catch(err){
        console.error("DB연결실패: ", err);
    }
}
startup();

// process.on('SIGINT', async()=>{
//     console.log('서버를 종료합니다..⚠️')

//     await db.close();
    
//     process.exit(0);
// })

//db.js의 close() 함수를 불러와 열려있는 DB연결을 안전하게 먼저 끊어줌
//DB연결 끊기완료=> Node.js 프로세스를 정상적으로 완전히 종료(0)