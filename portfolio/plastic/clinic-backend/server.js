/*
🧩ORM은 Object-Relational Mapping(객체-관계 매핑)
서버를 아주 쉽게 만들 수 있도록 도와주는 Node.js 의 대표적인 프레임워크 'Express'
*/
require('dotenv').config();  //환경변수를 읽어서 프로그램에 적용
const express = require('express');
const cors = require('cors');   //주소가 다르면 브라우저가 보안상 요청을 막는데, 이를 허용해줌 
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {Like}=require('typeorm'); //

const AppDataSource =require('./db');
const Member = require('./src/entity/Member');
const FooterSettings = require('./src/entity/FooterSettings');
const Consult =require('./src/entity/Consult');
const NavSetting = require('./src/entity/NavSettings');
const Carousel = require('./src/entity/Carousel');
const Tone = require('./src/entity/Tone');
const Popup = require('./src/entity/Popup');
const PopupSetting = require('./src/entity/PopupSetting');

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

// ❄️이미지
app.use('/images', express.static(path.join(__dirname,'public/images')))

//업로드 폴더 없을경우 자동으로 생성
const uploadDir = path.join(__dirname, '/public/images')
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, {recursive:true});
}
//파일저장규칙 설정
const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null, uploadDir);
    },
    filename: function(req,file,cb){
    //한글 이름 깨짐 방지 및 중복 방지를 위해 파일명 앞에 현재 시간(ms)을 붙임
        const ext = path.extname(file.originalname);
        cb(null, Date.now()+ext);
    }
});
const upload = multer({storage:storage});

//

app.post('/api/admin/upload', upload.single('logoImage'), (req,res)=>{
    if(!req.file){
        return res.status(400).json({success:false,message:'파일이 없습니다'})
    }
    res.status(200).json({success:true, filename: req.file.filename})
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

//footer세팅 관리자
app.get('/api/admin/footer', async(req,res)=>{
    try{
        //테이블 데이터를 다룰수 있는 권한(저장소) 가져옴
        const footerRepo = AppDataSource.getRepository(FooterSettings);
        //푸터 설정은 여러개 필요없이 무조건 고유번호가 1번인 데이터 딱 하나만 찾음
        const footer = await footerRepo.findOne({where:{id:1}});
        //만약 테이블을 방금 만들어서 아직 한번도 저장한적이 없다면
        if(!footer){
            //에러가아니기에 프론트엔드가 뻗지않게 빈껍데기를 성공상태로 보냄
            return res.status(200).json({success:true,data:null});
        }
        //db에서 찾은 데이터를 프론트엔드의 3가지 상태(state)구조에 완벽히 맞춰서 조립
        res.status(200).json({
            success:true,
            data:{
                companyInfo:{
                    name: footer.name || "",
                    address: footer.address || '',
                    clinicName: footer.clinicName || '',
                    phone:footer.phone || '',
                    email:footer.email || '',
                    locationUrl: footer.locationUrl || '',
                    
                },
                schedules: footer.schedules || [],
                familySites:footer.familySites || [],
            }
        });
        
    }catch(err){
        console.error('footer조회 에러: ',err);
        res.status(500).json({
            success:false,
            message:'푸터 데이터를 불러오지 못했습니다'
        })
    }
})

//푸터 post
app.post('/api/admin/footer', async(req,res)=>{
    try{
        //프론트에서 post로 보낸 데이터
        const {
            companyInfo,
            schedules,
            familySites
        }= req.body;
        //테이블 저장소를 가지고 옴
        const footerRepo = AppDataSource.getRepository(FooterSettings);
        //덮어쓰기를 하기 위해 기존에 설정된 설정(id가1번인데이터)이 있는지 먼저 찾음
        let footer = await footerRepo.findOne({where:{id:1}})
        //만약 최초 저장이라 기존 데이터가 없다면?
        if(!footer){
            //db에 새롭게 넣을 준비, 이때 고유번호 id는 무조건 강제 1로 고정
            footer= footerRepo.create({id:1});
        }
        // 3. 공통으로 값 세팅 (최초 생성일 때도, 수정일 때도 공통 적용)
        footer.name = companyInfo.name;
        footer.clinicName = companyInfo.clinicName;
        footer.phone = companyInfo.phone;
        footer.address = companyInfo.address;
        footer.email = companyInfo.email;
        footer.locationUrl = companyInfo.locationUrl;
        footer.schedules = schedules;
        footer.familySites = familySites;

        //footer객체를 최종적으로 저장
        await footerRepo.save(footer);

        res.status(200).json({success:true, message:'footer설정이 성공적으로 저장되었습니다'});
        
    }catch(err){
        console.error('푸터저장에러: ', err);
        res.status(500).json({success:false, message:'푸터 데이터를 저장하지 못했습니다'})
    }
});

//퀵상담
app.post('/api/consult/quick', async(req,res)=>{

    const {name, phone, department, password}= req.body;
    try{
        //필수값검증
        if(!name || !phone || !department || !password){
            return res.status(400).json({success:false, message:
                '필수정보를 모두 입력해주세요'
            })
        };
        const consultRepo = AppDataSource.getRepository(Consult);
        const newConsult = consultRepo.create({
            NAME:name, 
            PHONE:phone, 
            DEPARTMENT:department,
            USER_ID: '비회원',
            PASSWORD: password,
            TITLE: `[빠른상담] ${department} 문의입니다`,
            CONTENT: `${name}님의 빠른 상담 신청입니다. 빠른 시일내에 연락바랍니다`,
            STATUS: '대기중'
        });
        await consultRepo.save(newConsult);
        res.status(200).json({success:true, message:'빠른상담신청완료'})
    }catch(err){
        console.error('빠른상담신청에러:', err);
        res.status(500).json({success:false, message:'빠른상담신청중 오류발생'})

    }
})
//상담내역 전체조회
app.get('/api/admin/consult', async(req,res)=>{
    try{
        const consultRepo= AppDataSource.getRepository(Consult)
        const list = await consultRepo.find({order:{CREATED_AT:'DESC'}})
        res.status(200).json({success:true, data:list})
    }catch(err){
        console.error('상담신청조회에러:', err);
        res.status(500).json({success:false, message:'상담신청조회중 오류발생'})
    }
})
app.put('/api/admin/consult/:id/status', async(req,res)=>{
    const { id }= req.params;
    try{
        const consultRepo= AppDataSource.getRepository(Consult)
        const consult = await consultRepo.findOne({where:{ID:id}})
        if(!consult){
        return res.status(404).json({ success: false, message: '데이터가 없습니다' });
        }
        // ✨상태 토글 로직
        consult.STATUS = consult.STATUS === '대기중' ? '상담완료' : '대기중';
        await consultRepo.save(consult)
        res.status(200).json({ success: true, message: '상담 상태가 변경되었습니다.' });
    }catch(err){
        console.error('상태 변경 에러:', err);
        res.status(500).json({ success: false, message: '상태 변경 실패' });
    }
})

app.delete('/api/admin/consult/:id', async(req,res)=>{
    try{
        const consultRepo= AppDataSource.getRepository(Consult)
        await consultRepo.delete(req.params.id);
      
        res.status(200).json({ success: true, message: '상담신청 삭제성공' });
    }catch(err){
        console.error('상담신청 삭제 에러:', err);
        res.status(500).json({ success: false, message: '상담신청 삭제 실패' });
    }
})

//admin 내비게이션 설정 api
app.get('/api/admin/nav', async(req,res)=>{
    try{
        const navRepo = AppDataSource.getRepository(NavSetting);
        let setting = await navRepo.findOne({where:{ID:1}})

        // 데이터가 아예 없을 때의 기본값 반환
        if(!setting){
            return res.status(200).json({
                success: true, 
                data: {
                    LOGO_TYPE:'TEXT',
                    LOGO_TEXT:'안효범안스성형외과',
                    LOGO_FILE:'',
                    MENUS:'[]'
                }
            })
        }
        return res.status(200).json({ success:true, data:setting});
    }catch(err){
        console.error('네비게이션 조회에러:', err);
        res.status(500).json({ success: false, message: '네비게이션 조회 오류' });
    }
})

//최초저장이거나 변경
app.put('/api/admin/nav', async(req,res)=>{
    try{
        const {logoType, logoText, logoFileName, menus} = req.body;
        const navRepo = AppDataSource.getRepository(NavSetting);
        
        //🌟기존에 ID:1 데이터가 있는지 먼저 조회
        let setting = await navRepo.findOne({ where: { ID: 1 } });

        //데이터가 없으면 새로 생성
        if(!setting){
            setting = navRepo.create({ID:1});
        }

        setting.LOGO_TYPE= logoType;
        setting.LOGO_TEXT= logoText || '';
        setting.LOGO_FILE= logoFileName || '';
        //프론트에서 넘어온 배열을 오라클 clob에 넣기위해 문자열(JSON)로 변환
        setting.MENUS = JSON.stringify(menus);

        await navRepo.save(setting);
        res.status(200).json({success:true});
    }catch(err){
        console.error('네비게이션 저장에러:', err);
        res.status(500).json({success:false});
        
    }
})

//캐로셀 메인 비쥬얼 슬라이더
app.get('/api/admin/carousel', async(req,res)=>{
    try{
        const visuRepo= AppDataSource.getRepository(Carousel);
        let setting = await visuRepo.findOne({where:{ID:1}});
        if(!setting){
            return res.status(200).json({success:true, data:{SLIDES:'[]'}});
        }
        return res.status(200).json({success:true, data:setting})
    }catch(err){
        console.error('메인비쥬얼 캐로셀 조회에러:', err);
        return res.status(500).json({success:false})

    }
})

app.put('/api/admin/carousel', async(req,res)=>{
    try{
        const {slides}=req.body;
        const visuRepo= AppDataSource.getRepository(Carousel);
        let setting = await visuRepo.findOne({where:{ID:1}});
        //ID 1이 존재하면 UPDATE(수정)를 하고, 없으면 INSERT(생성)
        if(!setting){
            setting = visuRepo.create({ID:1});
        }
        // 데이터가 있든 없든 슬라이드 값 세팅 (배열을 문자열로 변환)
        setting.SLIDES = JSON.stringify(slides);
        await visuRepo.save(setting);
        return res.status(200).json({success:true});
    }catch(err){
        console.error('메인비쥬얼 캐로셀 수정에러:', err);
        return res.status(500).json({success:false})

    }
})

//회원목록 전체조회(최신가입순)
// 예시: GET /api/admin/users?page=1&limit=10
app.get('/api/admin/users', async(req,res)=>{
    try{
        const repo = AppDataSource.getRepository(Member);
        //프론트에서 보낸 파라미터받기(기본값설정)
        const page= parseInt(req.query.page) || 1;
        const limit= parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        //데이터베이스에게 건너뛸 개수 계산(offset)
        const skip = (page-1)*limit;
        //검색어가 있으면 이름(user_name)으로 필터링
        const whereClause = search? {USER_NAME: Like(`%${search}%`)} : {};

        //데이터 검색 및 전체 개수(totalCount)같이 가져오기
        const [users, totalCount]=await repo.findAndCount({
            where: whereClause,
            order: {USER_IDX:'DESC'},
            skip:skip,
            take:limit
        });
        //총페이지수 계산
        const totalPages = Math.ceil(totalCount/limit);

        return res.status(200).json({
            success:true, 
            data:users,
            pagination:{
                totalPages,
                totalCount,
                currentPage:page,
                limit
            }
        });

    }catch(err){
        console.error('회원목록 조회에러:', err);
        return res.status(500).json({success:false, message:'서버에러'})
    }
})



app.put('/api/admin/users/:idx/status', async(req,res)=>{
    try{
        const userIdx = Number(req.params.idx);
    const repo = AppDataSource.getRepository(Member);
    const user = await repo.findOneBy({USER_IDX:userIdx})
    if(!user) return res.status(404).json({success:false, message:'등록된 회원이 없습니다'})
    //상태변경
    user.STATUS = user.STATUS === '정지' ? '정상' : '정지';
    await repo.save(user); //저장
    return res.status(200).json({success:true, message:'상태가 변경되었습니다'});

    }catch(err){
    console.error('회원목록 수정에러:', err);
    return res.status(500).json({success:false, message:'상태변경 에러'})
    }
})

app.delete('/api/admin/users/:idx', async(req,res)=>{
    try{
    const userIdx = Number(req.params.idx);
    const repo = AppDataSource.getRepository(Member);

    // 회원이 실제로 존재하는지 먼저 확인하는 것이 안전
    const user = await repo.findOneBy({ USER_IDX: userIdx });
    if (!user) {
        return res.status(404).json({ success: false, message: '회원이 없습니다' });
    }
    await repo.delete(userIdx)
    return res.status(200).json({success:true, message:'삭제되었습니다'});

    }catch(err){
    console.error('회원삭제에러:', err);
    return res.status(500).json({success:false, message:'회원삭제 에러'})
    }
})

//톤앤매너
app.get('/api/admin/tone', async(req,res)=>{
    try{
        const repo = AppDataSource.getRepository(Tone);
        let setting = await repo.findOne({where:{ID:1}});
        if(!setting){
            return res.status(200).json({success:true, data:{PRIMARY_TONE:'BLUE', IS_DARK_MODE:'N'}})
        }
        return res.status(200).json({success:true, data:setting});

    }catch(err){
    console.error('톤앤매너 조회에러:', err);
    return res.status(500).json({success:false, message: '서버 에러가 발생했습니다.'})  
    }
})

app.put('/api/admin/tone', async(req,res)=>{
    try{
        const {primaryTone, isDarkMode} = req.body;
        const repo = AppDataSource.getRepository(Tone);
        let setting = await repo.findOne({where:{ID:1}});

        if(!setting){
            setting = repo.create({
                ID:1,
                PRIMARY_TONE: primaryTone || 'BLUE',
                IS_DARK_MODE: isDarkMode || 'N'
            });
        }else{
            setting.PRIMARY_TONE = primaryTone;
            setting.IS_DARK_MODE = isDarkMode;
        }
        
        await repo.save(setting);
        return res.status(200).json({success:true, message:'톤앤매너 저장성공'});

    }catch(err){
    console.error('톤앤매너 저장에러:', err);
    return res.status(500).json({success:false})  
    }
})

//팝업목록 및 설정 전체 조회
app.get('/api/admin/popup', async(req,res)=>{
    try{
        const repo = AppDataSource.getRepository(Popup);
        const setRepo = AppDataSource.getRepository(PopupSetting);
        let setting = await setRepo.findOne({where:{ID:1}});
        const popups = await repo.find({order:{POPUP_IDX:'DESC'}});

        return res.status(200).json({
            success:true,
            maxPopups: setting ? setting.MAX_POPUPS : 1,
            popups
        });
    }catch(err){
        console.error('팝업 조회에러:', err);
        return res.status(500).json({success:false})  
    }
})

//최대노출갯수설정 저장
app.put('/api/admin/popup/setting', async(req,res)=>{
    try{
        const {maxPopups} = req.body;
        const repo = AppDataSource.getRepository(PopupSetting);
        let setting = await repo.findOne({where:{ID:1}});
        if(!setting) {
            setting = repo.create({
            ID:1,
            MAX_POPUPS: maxPopups || 1
        });
        }else{
            setting.MAX_POPUPS = maxPopups;
        }
        await repo.save(setting);
        return res.status(200).json({success:true, message:'팝업 노출 개수 저장 완료'});

    }catch(err){
        console.error('팝업 노출 개수 설정 에러:', err);
        return res.status(500).json({success:false})  
    }
})

//새 팝업등록(이미지 업로드 포함)
app.post('/api/admin/popup',upload.single('popupImg'), async(req,res)=>{
    try{
        if(!req.file) return res.status(400).json({success:false, message:'이미지가 없습니다'})

        const { title,link,startDate, endDate, useTodayClose }= req.body;
        const repo = AppDataSource.getRepository(Popup);

        const newPopup = repo.create({
            TITLE: title,
            LINK: link || '',
            FILE_NAME: req.file.filename,
            START_DATE: startDate,
            END_DATE: endDate,
            USE_TODAY_CLOSE: useTodayClose === 'true' ? 'Y' : 'N'
        })
        await repo.save(newPopup);

        return res.status(200).json({success:true, message:'새 팝업등록 성공'});

    }catch(err){
        console.error('팝업 등록에러:', err);
        return res.status(500).json({success:false})  
    }
})

app.delete('/api/admin/popup/:idx', async(req,res)=>{
    try{
        const repo = AppDataSource.getRepository(Popup);
        await repo.delete(req.params.idx)
        return res.status(200).json({success:true, message:'팝업 삭제성공'});

    }catch(err){
        console.error('팝업 삭제에러:', err);
        return res.status(500).json({success:false})  
    }
})

// app.post('/api/admin/users', async(req,res)=>{
//     try{
//         const repo = AppDataSource.getRepository();
//         return res.status(200).json({success:true, message:''});

//     }catch(err){
//     console.error('회원목록 등록에러:', err);
//     return res.status(500).json({success:false})  
//     }
// })


//서버시작과정을 순서대로 처리하기 위한 비동기 함수를
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

