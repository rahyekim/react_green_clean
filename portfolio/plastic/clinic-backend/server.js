/*
🧩ORM은 Object-Relational Mapping(객체-관계 매핑)
서버를 아주 쉽게 만들 수 있도록 도와주는 Node.js 의 대표적인 프레임워크 'Express'
*/

require('dotenv').config();  //환경변수를 읽어서 프로그램에 적용
const express = require('express');
const cors = require('cors');   //주소가 다르면 브라우저가 보안상 요청을 막는데, 이를 허용해줌 
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')
const AppDataSource =require('./db');
const Member = require('./src/entity/Member');

const app = express(); // Express 기능을 사용할수있도록 app이라는 서버 객체 만들어줌
app.use(cors());
app.use(express.json());  //클라이언트가 json형식{"":""}으로 보냈을때 서버가 자바스크립트 객체를 이해하고사용할수있도록 변환

const PORT = process.env.PORT || 4000;  //.env port값이 있으면 그거쓰고 없으면 5000

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
            gender,
            address1,
            address2,
            zipcode,
            regidentNum

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
            GENDER: gender,
            RESIDENT_NUM:regidentNum,
            ZIPCODE:zipcode,
            ADDRESS1:address1,
            ADDRESS2:address2,
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

//로그인 api 코드 추가하기
app.post('/api/login', async(req,res)=>{
    try{
        //프론트엔드에서 보낸 아이디와 비번받기 
        const {userId, userPW} = req.body;
        //비어진 것에 대한 방어
        if(!userId || !userPW){
            return res.status(400).json({success:false, message:'아이디와 패스워드를 모두 입력해주세요'})
        }
        //DB 레파지토리 가져오기
        const memberRepository = AppDataSource.getRepository(Member);
        //DB에서 해당 아이디를 가진 회원 찾기
        const user = await memberRepository.findOne({
            where:{USER_ID: userId}
        })
        //가입된 아이디가 없는경우
        if(!user) {
            return res.status(401).json({success:false, message:'존재하지않는 아이디입니다'})
        }
        //비밀번호 검증(프론트에서 온 평문비밀번호 vs DB의 암호화된 비밀번호)
        const isMatch = await bcrypt.compare(userPW, user.USER_PW);
        //비밀번호가 틀린경우
        if(!isMatch){
            return res.status(401).json({success:false, message:'비밀번호가 일치하지않습니다'});
        }
        
        //로그인성공(프론트엔드에서 라우팅을 위해 isAdmin 값을 같이 넘겨줌)
        return res.status(200).json({success:true, message:'로그인 성공', isAdmin:user.IS_ADMIN})
        //관리자면 1, 일반회원이면 0
        
    }catch(err){
        console.error('로그인 에러:',err);
        return res.status(500).json({success:false, message:'로그인처리중 서버 에러'});

    }
})

//비밀번호 찾기
app.post('/api/send-reset-email', async(req,res)=>{
    
    const {userId, userName, phone} = req.body;
    try{
        if(!userId || !userName || !phone) {
            return res.status(400).json({success:false, message:'인증정보를 모두 입력해주세요'})
        }

        const memberRepository = AppDataSource.getRepository(Member);

        //오라클에서 찾기
        const user = await memberRepository.findOne({
            where:{USER_ID: userId,USER_NAME:userName, PHONE: phone}
        });
        if(!user){
            return res.status(401).json({success:false, message:'입력하신 정보와 일치하는 회원이 없습니다'})
        }

        //이메일 발송기 세팅(구글 gmail기준)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL_USER, //// 운영자 이메일
                pass: process.env.EMAIL_PW ////운영자 앱 비밀번호
            }
        })

        const resetUrl =
        `http://localhost:3000/find/reset?userId=${user.USER_ID}`;

        const mailOptions = {
            from : `"성형외과관리자" <${process.env.EMAIL_USER}>`,
            to: user.EMAIL, 
            subject: '[성형외과] 비밀번호 재설정안내',
            html:`
            <div style="padding: 20px; text-align: center;">
                <h2>비밀번호 재설정</h2>
                <p>${user.USER_NAME}님, 본인인증이 완료되었습니다.</p>
                <p>아래 버튼을 클릭하여 새로운 비밀번호를 설정해 주세요.</p>
                <a href="${resetUrl}" style="display:inline-block; padding:10px 20px; background-color:#4e73df; color:#fff; text-decoration:none; border-radius:5px; margin-top:20px;">
                    새 비밀번호 설정하기
                </a>
            </div>
            `
        }
        //이메일 전송
        await transporter.sendMail(mailOptions);
        res.status(200).json({success:true, message:'이메일 발송성공'});
        
    }catch(err){
        console.error('이메일 발송에러', err);
        res.status(500).json({success:false, message:'서버 오류 발생'});
    }
})

//비밀번호변경 api
app.post('/api/reset-password', async(req,res)=>{
    try{
        const {userId, newPW} = req.body;

        if(!userId || !newPW){
            return res.status(400).json({success:false, message:'잘못된요청입니다'});
        }

        const memberRepository = AppDataSource.getRepository(Member);
        
        const user= await memberRepository.findOne({
            where: {USER_ID: userId}
        })
       
        if(!user){
            return res.status(404).json({success:false, message:'회원을 찾을 수 없습니다'});
        }

        //새 비밀번호를 암호화
        const hashedPw = await bcrypt.hash(newPW,10);
        user.USER_PW = hashedPw;

        //// DB 저장
        await memberRepository.save(user);

        // 🎯 성공 응답 
        return res.status(200).json({ 
            success: true, 
            message: '비밀번호가 성공적으로 변경되었습니다.' 
        });

    }catch(err){
        console.error('비밀번호 업데이트 에러:', err);
        res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
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
    
        //지정한 포트(4000)에서 클라이언트의 요청을 기다리기(listen) 시작
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