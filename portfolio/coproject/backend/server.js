
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

//🌟파일올릴 경우 추가
const multer = require('multer');
const path= require('path');
const fs = require('fs'); 

const app = express();

app.use(cors()) //cors
app.use(express.json()) //파싱..프론트엔드에서 보내는 JSON 데이터를 읽기위한 설정...


//업로드할 폴더(uploads)가 없으면 자동으로 만들어주는 코드
//__dirname(절대파일경로) C:/../../indigo/uploads

const uploadDir = path.join(__dirname, 'uploads');  
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

//🌟multer설정 (저장 위치와 이름 정하기)
//cb(callback)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); //에러없고, 업로드 폴더에 저장
    },
    filename:(req,file,cb)=>{
        //한글이름 깨짐 중복방지 위해 '현재시간.확장자' 형태로저장(1748405.jpg)
        //확장자(Extension)
        const ext = path.extname(file.originalname);
        cb(null, Date.now()+ext)
    }
})
//최대 8장까지 업로드 가능한 multer 미들웨어 준비
const upload = multer({storage: storage});

//🔥🌟 프론트엔드에서 upload폴더 안의 이미지를 볼 수 있게 권한 열어줌
//정적 파일 제공
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//---------------------------

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
        const user = result[0]; //검색된 배열중에 첫번째 [{회원정보}] , 이름도같이보냄...
        res.status(200).json({
            message: "로그인 성공!",
            name: user.first_name,
            email: user.email, //이메일 -> localstorage에저장..rememberme...
        })
    })
})

//회원목록조회 API
app.get('/api/users', (req,res)=>{
    //비밀번호를 제외한 회원정보들을 최근 가입순으로 가져옴
    const sql=`select id, first_name, last_name, email, zipcode, address, detail_address  
    from users 
    order by created_at desc`
    

    db.query(sql, (err, result)=>{

        if(err){
            console.error("회원목록 조회 에러", err)
            return res.status(500).json({message: "회원목록 서버에러 발생"})
        }

        //조회된 회원을 프론트엔드로 보냄
        //💡 회원이 없더라도 에러가 나지 않게 빈 배열 그대로 전달하거나,
        // 프론트에서 length로 체크할 수 있게 result 자체를 보내는 것이 좋습니다.
        res.status(200).json(result)
    })
})

//관리자
//POST 헤더 설정 저장 API
//바로 비동기 순서(로고 저장 ➡️ 메뉴 삭제 ➡️ 메뉴 대량 삽입)

app.post('/api/settings/header', (req,res)=>{

    const {logoType, logoText, logoImage, menus}=req.body
    
    //DB에 실행할 쿼리문을 미리 문자열로 만들어 둔다

    const sql= `insert into header_setting (
    id, logo_type, logo_text, logo_image) values(1,?,?,?)
    on duplicate key update 
    logo_type = values(logo_type),
    logo_text =values(logo_text),
    logo_image = values(logo_image)
    `;
    //ID 1번으로 헤더 설정을 저장하되, 첫 저장일 때는 새 데이터로 넣고, 
    //두 번째부터는 계속 덮어씌워서 1개의 데이터만 유지
    //처음이면 만들고, 두 번째부터는 수정해 줘

    //?자리에 [logoType, logoText, logoImage]순서대로 값을넣어 쿼리실행
    //1.로고 설정 먼저 저장
    db.query(sql,  [logoType, logoText, logoImage], (err,result)=>{

        //쿼리실행중 오류발생
        if(err){
            console.error('설정저장에러: ', err)
            return res.status(500).json({message: "설정 저장중 오류"})
        }
        
            //2.기존등록된 메뉴 싹 비우고 새로 입력받은 메뉴 
            db.query('delete from header_menus', (err)=> {
                if(err) return res.status(500).json({message: "메뉴 갱신 중 오류"});
               
        
                //3. menus배열이 존재하고 메뉴가 1개이상 잇을때만 대량삽입
                if(menus && menus.length >= 1){
        
                   // MySQL 대량 삽입용 2차원 배열 생성
                    const menuValues = menus.map(menu=>(
                        [menu.title, menu.link]
                    ));
                    // 물음표를 하나만 쓰고 2차원 배열을 통째로 넘김
                    const insertMenuSql=`
                    insert into header_menus (title,link) values ?;
                    `
                    db.query(insertMenuSql, [menuValues], (err)=>{
                        if(err){
                            console.error("메뉴저장중에러: ", err)
                            return res.status(500).json({ message: "메뉴 저장 중 에러" });
                        }
                        // 모든 작업이 완벽하게 끝났을 때 딱 한 번만 응답 전송!
                        return res.status(200).json({message:"헤더 설정 및 메뉴 저장 완료",
                             affectedRows: result.affectedRows})
                    });
        
                }else{
                    //메뉴가 하나도 없는 경우: 삽입없이 바로 성공 응답 보냄
                    return res.status(200).json({message: '헤더설정이 성공적으로 저장(메뉴없음)'})
                }
            });
    })
});
//[get]헤더 설정 불러오기

app.get('/api/settings/header', (req,res)=>{

    //1.로고데이터가져오기
    db.query(`select * from header_setting where id=1`, (err,result)=>{

        //조회중에 에러 
        if(err){
            return res.status(500).json({message:'설정불러오기에러', err});
        }
        

        // DB에 설정 데이터가 없을 경우를 대비한 기본값 설정 ???위치...
        const settings = result[0] || {
            logo_type: 'text', 
            logo_text: 'indigo', 
            logo_image: '/assets/logo.png'
        };

        // 2. 로고 조회가 성공하면, 그 안에서 메뉴 목록 조회하기
        db.query(`select id,title,link from header_menus`,(err,menuResult)=>{
            
            if(err){
                return res.status(500).json({message:'메뉴불러오기에러', err});
            }
            //조회결과 배열의 첫번째 행(로고설정)을 꺼냄
            //{...} DB에 데이터가 없을 경우 처음접속시 기본값 사용
            
            //로고정보와 메뉴 목록을 하나의 객체로 클라이언트에게 응답
            res.status(200).json({
                logoType: settings.logo_type,
                logoText: settings.logo_text,
                logoImage: settings.logo_image,
                menus: menuResult // 조회된 메뉴 배열 통째로 전달
            })
    })

    //header_menus 테이블에서 모든 메뉴의 id,title,link를 조회
    })
});

// 관리자 메인 배너설정 저장 및 불러오기

app.post("/api/settings/banner", (req, res)=>{

    //프론트에서 보낸 3가지 데이터 꺼냄
    const {  bannerType,
            singleBanner,
            carouselBanner }=req.body

    const updateSql=`insert into banner_setting
    (id, banner_type, single_banner) values(1,?,?)
    on duplicate key update 
    banner_type = values(banner_type),
    single_banner = values(single_banner)
    `

    db.query(updateSql, [bannerType, singleBanner], (err)=>{
        if(err){
            // 🛑 에러가 났을 때만 여기서 끝내야 합니다!
            console.error("배너 설정 저장에러: ", err)
            return res.status(500).json({message: "배너 설정 저장 중 오류 발생"})
        }
    //🟢 첫 번째 저장이 성공했으므로, 이제 기존 캐러셀 이미지를 싹 지웁니다.
    //---🌟기존에 저장되어 있던 캐러셀 이미지들을 싹 지움
    //수정삭제 복잡하게 하는 대신, 다 지우고 새로 입력받은 걸로 덮어쓰는게 훨씬 안전하고 쉬움
        db.query(`delete from carousel_images`, (err)=>{
            if(err){
                console.error("캐러셀 초기화중에 에러", err)
                return res.status(500).json({message: "캐러셀 초기화중에 에러발생"})
            }

            if(carouselBanner && carouselBanner.length>0){

                
// ✅ 전달하는 데이터가 [ [값1], [값2], [값3] ] 같은 2차원 배열 구조여야만
//  MySQL이 각 행(Row)으로 인식해서 한 번에 싹 밀어 넣을 수 있음
//{ url: '이미지경로1' }, { url: '이미지경로2' }] 형태라면?
                const imagesValues = carouselBanner.map(img=>[img.url])
//결과: [ ['이미지경로1'], ['이미지경로2'] ] (2차원 배열 완성!)
                const caroselsql=`insert into carousel_images 
                (url) values ?`

                db.query(caroselsql, [imagesValues], (err)=>{
                    if(err){
                        console.error('캐러셀 삽입 에러',err)
                        return res.status(500).json({message:"캐러셀 삽입중 에러발생"})
                    }
                    //모든 과정이 끝났으므로 프론트엔드에 성공 응답을 보냄...
                    return res.status(200).json({message:"배너 설정이 성공적으로 저장"})

                })
            }else{
                return res.status(200).json({message:"배너 설정이 성공적으로 저장(캐러셀 저장안함)"})
            }
        })
    })
})

//2.[GET] 저장된 배너 설정 불러오는 api
app.get("/api/settings/banner",(req,res)=>{
    //1. 기본배너설정( banner_setting) 데이터가져옴
    db.query('select * from banner_setting where id=1', (err, bnResult)=>{

        if(err){
            console.error(err);
            return res.status(500).json({message:"배너설정조회중 에러발생"})
        }
        //캐러셀 슬라이드용 이미지들 가져옴
        db.query('select id, url from carousel_images', (err,imgResult)=>{

            if(err) return res.status(500).json({message:"캐러셀 이미지 불러오기 에러발생"})
            
            //db에 값이 있다면 그 값을 쓰고, 처음 접속해서 DB가 텅 비어잇다면 우측값 씀
            
//DB에서 가져온 데이터가 있으면 그걸 쓰고, 없으면 기본값 객체 지정
//🔥 {} : 빈객체 속성이 아무것도 없는 텅 빈 상자 : 비상용 빈상자 
//DB에서 가져온 데이터(bnResult[0])가 아예 없을 때(undefined나 null일 때) 에러가 나는 걸 막기 위한 안전장치
//🚨undefined.banner_type => 에러발생 
//{}.banner_type 
// 빈 객체에 banner_type이라는 속성이 없네? 기본값 || 뒤에거 써야지
            const bannerData = bnResult[0] || {}

            //프론트 엔드로 보낼 데이터
            const settings= {
                
                bannerType: bannerData.banner_type || 'single',
                singleBanner: bannerData.single_banner || '/assets/p-images/slide01.jpg',
                carouselBanner: imgResult || []
            }
            return res.status(200).json(settings);
        })

    })
})

//--- we are 섹션 설정!
//관리자가 수정한 내용을 DB에 저장
app.post('/api/settings/weare', (req,res)=>{

    const { mainTitle, mainDescription, feature } = req.body;

    //기존내용 있으면 덮어쓰기!
    const mainSql= `
    insert into weare_main (id, main_title, main_description)
    values(1,?,?) 
    on duplicate key update
    main_title = values(main_title),
    main_description = values(main_description)
    `

    db.query(mainSql, [mainTitle, mainDescription], (err)=> {

        if(err){
            console.error("메인설정저장에러",err)
            return res.status(500).json({message: "메인 설정 저장 중 에러발생"})
        }

        //기존 feature 데이터를 모두 삭제 (누적 방지)
        db.query(`delete from weare_feature`, (err)=>{

            if (err) {
                console.error("아이콘 기존 데이터 삭제 에러: ", err);
                return res.status(500).json({message: "아이콘 설정 초기화 중 에러" });
            }
            
            //새로운 feature 데이터가 있다면 일괄 삽입
            if(feature && feature.length > 0){
    
                //한꺼번에 넣기위해 객체->배열 형태 변환 .. [[icon,title,desc],[],[]]
                const featureValues= feature.map(item=>
                    [item.icon,item.title,item.description])
    
                const ftSql = `insert into weare_feature(
                icon_class, title, description) values ? `
    
                db.query(ftSql,[featureValues], (err)=>{
    
                    if(err){
                        console.error("아이콘항목 삽입 에러: ",err)
                        return res.status(500).json({message: "아이콘항목 삽입 중 에러"})
                    }
                    return res.status(200).json({message: "we are 설정 저장완료"})
                })
            }else{
                return res.status(200).json({message: "we are 설정 저장완료"})
    
            }

        })


    })


})

//DB에 저장된 내용 불러오기!
app.get('/api/settings/weare', (req,res)=>{

    //1단계 메인영역 정보가져오기 
    db.query('select * from weare_main where id=1', (err, result)=>{

        if(err){
            return res.status(500).json({message: "weare 메인 설정 불러오기 중 에러"})
        }


        db.query(`select id, icon_class AS icon, title, description
            from weare_feature`, (err,ftResult)=>{

            if(err){
            return res.status(500).json({message: "weare 아이콘 설정 불러오기 중 에러"})
            }
            
            const mainData = result[0] || {}
    
            res.status(200).json({
                mainTitle: mainData.main_title || 'WE ARE',
                mainDescription: mainData.main_description || 'stay',
                feature: ftResult
            })
        })
    })
})

/*
// 프론트에 보낼 때 필드명을 맞춰주는 센스! 💡
const formattedFeatures = ftResult.map(item => ({
    id: item.id,
    icon: item.icon_class, // DB의 icon_class를 프론트가 쓰는 icon으로 매핑!
    title: item.title,
    description: item.description
}));

res.status(200).json({
    mainTitle: mainData.main_title || 'WE ARE',
    mainDescription: mainData.main_description || 'stay',
    feature: formattedFeatures // 매핑된 배열을 전달
});

 */

//[관리자] work섹션 설정 저장
//post work설정 및 이미지저장(upload.array를 통해 파일받음)

app.post('/api/settings/work', upload.array('workImages',8), (req,res)=>{

    //프론트에서 넘긴 줄 수 (문자열로 오므로 숫자로 변환)
    const rowCount = parseInt(req.body.rowCount) || 2;
    const files = req.files; //정보(이름,크기등)를 꺼냄

    //1단계: '몇출 노출할것인지' (rowCount)
    const updateSettingsql= `
    insert into work_setting ( id, row_count) 
    values (1,?)
    on duplicate key update 
    row_count = values(row_count)
    `

/*
    on duplicate key update 
 id가 1인 데이터가 이미 있으면 새로만들지 말고 값을 덮어씌워라! 
 */

        //위에서만든 sql실행
        db.query(updateSettingsql, [rowCount], (err)=>{
        if(err){
            console.error("work 줄수 저장 에러", err)
            return res.status(500).json({message: "설정 저장 중 오류 발생"});
        }

        //줄 수 저장 성공, 프론트에서 새로올린 사진파일이 1개라도 잇으면..
        if(files && files.length > 0){

            db.query(`delete from work_image`,(err)=>{
                
                if(err) return res.status(500).json({message: "이미지 초기화 오류 발생"})
                
                //새로올린 사진들의 경로(주소)를 🌟 배열형태로 
                const imgValues= files.map(file=>(
                    [`/uploads/${file.filename}`]
                ))

                const insertImgsql=`insert into work_image(image_url)
                values ?`;

                db.query(insertImgsql, [imgValues], (err)=>{
                    if(err){
                    console.error("work 이미지 저장 에러", err)
                    return res.status(500).json({message: "이미지 저장 중 오류 발생"});
                    }

                    return res.status(200).json({message: "work설정 성공적으로 저장"});
                })
            })
        }else{ //🟢위는 콜백함수return이라 else안하면 res 두번 응답해서 에러터짐 
            return res.status(200).json({message: "work설정 노출수가 변경되었습니다"});
        }
    })
 })

 app.get('/api/settings/work', (req,res)=>{

    //db에서 몇줄 노출할건지(row_count) 
    db.query('select * from work_setting where id = 1 ', (err,result)=>{
        if(err) return res.status(500).json({message: "work설정 불러오기 오류 발생"})
        
        //db에 저장된 사진주소들을 싹 다 가져옴

        db.query('select id, image_url as previewUrl from work_image', (err,imgResult)=>{

            if(err) return res.status(500).json({message: "work이미지 불러오기 오류 발생"})
            
            const settings = result[0] || {row_count: 2};

            res.status(200).json({
                rowCount: settings.row_count,
                images: imgResult})
        })
        
    })
    
 })
/*
🟢미들웨어가 실행: 전송된 파일들을 서버(지정된 폴더)에 자동으로 저장
=> 저장된 파일 정보들을 req.files에 담음 
req.files로 들어가는 것: 사용자가 업로드한 진짜 이미지 파일들 (최대 6개)
req.body로 들어가는 것: rowCount, bolgTexts, blogDate 같은 텍스트 데이터들
*/

//[관리자] 블로그 섹션 설정 저장 및 불러오기 API
app.post("/api/settings/blog", upload.array('blogImages',6),(req,res)=>{
    
    const rowCount = parseInt(req.body.rowCount) || 1;

    //multer가 서버의 uploads 폴더에 방금 저장한 진짜 사진 파일들  
    const files = req.files || [];
    
    // 안전장치: 무조건 배열모양([데이터])으로 통일시켜주는 작업
    //1칸만 채워서 보내면 '글자'로오고=>[]강제전환 // 여러칸을 채우면 '배열(목록)[ , , ]'
    const texts = Array.isArray(req.body.blogTexts) ? req.body.blogTexts: [req.body.blogTexts]
    const date = Array.isArray(req.body.blogDate) ? req.body.blogDate : [req.body.blogDate]
    const existing = Array.isArray(req.body.blogExistingImages) ? req.body.blogExistingImages : [req.body.blogExistingImages]
    //⭐새파일이 몇번째 칸인지 
    const blogImageIdx = req.body.blogImageIdx ===undefined
    ? []  //0개일때 빈배열
    : Array.isArray(req.body.blogImageIdx)
        ? req.body.blogImageIdx   //2개이상일때 (배열그대로)
        : [req.body.blogImageIdx]  //1개일때 (단수'') 배열로 변환
    //sql
    const updateSql=`insert into blog_setting(id, row_count)
    values (1, ?) 
    on duplicate key update
    row_count = values(row_count)
    `;

    db.query(updateSql, [rowCount], (err)=>{

        if(err) return res.status(500).json({message:"블로그 줄 수 저장에러"})
        
        db.query(`delete from blog_item`, (err)=>{

            if(err) return res.status(500).json({message:"블로그이미지 초기화에러"})
            
            const insertValues = [];  //DB에 넣을 데이터바구니

            const totalItems = rowCount === 1 ? 3 : 6;
            // ⭐ 새 이미지들을 "몇 번째 칸인지" 기준으로 객체화
            const newImages={} 
            files.forEach((file,idx)=>{
                const blogIdx= parseInt(blogImageIdx[idx])
                newImages[blogIdx]=`/uploads/${file.filename}`
            })
            
            //🟢으렵당.. 
            //multer은 하드디스크저장까지만..생성된filename이름만 건내줌..
            for(let i =0; i<totalItems ; i++){ //1칸부터 3번(6번)칸까지 하나씩 확인하며 조립
                //최종적으로 DB에 저장될 이미지 주소
                let finalImageUrl= '';  //루프실행될때마다 초기화..ㅎ

                //우선순위🔴 최신 데이터(새 파일) > 기존 데이터(기존 URL) 
                //경우의 수 A: 관리자가 새로운 사진 파일을 업로드했을 때
                if(newImages[i]){  //새파일이 있으면 새파일 주소 씀..
                    finalImageUrl= newImages[i];
                   //새 파일이 없으면 기존 이미지 적용
                }  else if(existing && existing[i] && existing[i] !== 'undefined' && existing[i]!==''){
                    finalImageUrl = existing[i]; } 
                //경우의 수 B : 관리자가 사진을 안바꾸고 '기존사진' 그대로 뒀을때
/*
🟢FormData.append('blogDate', date)를 할 때 
date 변수가 undefined 상태이면, FormData가 이걸 자동으로 
문자열 "undefined"로 바꿔서 보내는 기괴한(?) 버그
 */             
                //🟢문자열 "undefined"=>참으로 인식=> DB로 들어갈수잇어서 걸러준다
                //텍스트와 날짜도 빈값이면(undefined) 빈칸('')으로 깔끔하게 처리
                const finalDate = date[i] && date[i] !== 'undefined' ? date[i] :''
                const finalText = texts[i] && texts[i] !== 'undefined' ? texts[i] :''
                //조립이 끝난 [사진주소,날자, 글]세트 
                insertValues.push([finalImageUrl, finalDate, finalText]);
            }   

            const insertSql = `insert into blog_item 
            (image_url, date_str, text_content) values ?`

            db.query(insertSql, [insertValues], (err)=>{
                if(err)  return res.status(500).json({message:"블로그item 저장에러"})
                    console.error("블로그item 저장에러",err)
                res.status(200).json({message:"블로그 설정 성공적으로 저장"})
            });
        })
    })
});

//프론트엔드에서 저장된 블로그 정보 좀 줘! 라고 요청할때 데이터 보내줌
app.get('/api/settings/blog', (req,res)=>{

    db.query(`select * from blog_setting where id=1`, (err,result)=>{

        if(err) return res.status(500).json({message:"블로그줄수 불러오기에러"})

        db.query(`select * from blog_item order by id asc`, (err, itemsResult)=> {

            if(err) return res.status(500).json({message:"블로그아이템 불러오기에러"})

            const settings = result[0] || {row_count:1};
    
            res.status(200).json({
                rowCount: settings.row_count,
                blogs: itemsResult
            })
        })
    })
})

//[관리자] Contact 문의내역

app.get('/api/settings/contact', (req,res)=>{
    const sql = `select * from contacts order by created_at desc`;

    db.query(sql, (err, result)=>{

        if(err){
            console.err("불러오기에러", err);
            return res.status(500).json({message:"불러오기에러"});
        }
        return res.status(200).json(result);

    });
})
//2. put 특정 문의의 답변 상태 변경

app.put('/api/contact/:id/reply', (req,res)=>{

    const contactId = req.params.id;
    const {is_replied} = req.body;
    const sql= `update contacts set is_replied = ? where id= ?`;
    
    db.query(sql, [is_replied, contactId], (err)=>{
        if(err){
            console.err("답변상태변경에러", err);
            return res.status(500).json({message:"답변상태변경에러"});
        }
        return res.status(200).json({message:"상태가 변경되었습니다"});


    })
})

//3. put 특정 문의의 조치사항(메모) 업데이트하기
app.put('/api/contact/:id/memo', (req,res)=>{

    const contactId = req.params.id;
    const {action_memo} = req.body;
    const sql= `update contacts set action_memo = ? where id= ? `;

    db.query(sql, [action_memo, contactId], (err)=>{
        if(err){
            console.err("메모변경에러", err);
            return res.status(500).json({message:"메모변경에러"});
        }
        return res.status(200).json({message:"메모 변경되었습니다"});
    })
} )
//4. delete 특정 단일 문의 내역 삭제하기
app.delete('/api/contact/:id', (req,res)=>{

    const contactId = req.params.id;
    const sql= `delete from contacts where id=?`;

    db.query(sql, [contactId], (err)=>{
        if(err){
            console.err("문의내역삭제에러", err);
            return res.status(500).json({message:"문의내역삭제에러"});
        }
        return res.status(200).json({message:"문의내역이삭제되었습니다"});
        
    })
} )
//5. post 선택된 문의내역 일괄 삭제 bulk Delete
app.post('/api/contact/bulk-delete', (req,res)=>{

    //🌟배열형태의 id들을 한번에 지우는 쿼리(🌟in사용)
    const sql= `delete from contacts where id in(?) `;
    const {ids} =req.body;
    if(!ids || ids.length === 0){
        return res.status(400).json({ message: "삭제할항목이없습니다"})
    }

    db.query(sql, [ids], (err)=>{
        if(err){
            console.err("일괄삭제에러", err);
            return res.status(500).json({message:"일괄삭제에러"});
        }
        return res.status(200).json({message:"일괄삭제되었습니다"});
    })
});

//프론트에서 쓰는 포스트
app.post('/api/contact', (req,res)=>{
    const { name, phone, email, message} = req.body;
    const sql=`insert into contacts (name, phone, email, message) values(?,?,?,?)`

    db.query(sql, [name,phone,email,message],(err,result)=>{
        if(err){
            console.error("문의접수에러")
            return res.status(500).json({message:"문의접수에러"})
        }
        return res.status(200).json({message:"문의가 성공적으로 저장"})
    })
})

//[관리자&사용자] map 지도 섹션
//[post] 지도 설정 저장하기
app.post('/api/settings/map', (req, res)=>{

    const {mapType, mapUrl} = req.body;

    const sql=`insert into map_settings(id, map_type, map_url)
    values(1,?,?) 
    on duplicate key update
    map_type = values(map_type),
    map_url = values(map_url)
    `

    db.query(sql,[mapType, mapUrl], (err)=>{

        if(err){
            console.error("지도 설정 저장에러:",err)
            return res.status(500).json({message:"지도 설정 저장중 서버에러발생"})
        }

        return res.status(200).json({message:"지도 설정 성공적으로 저장 완료"})
    })
} )
    
//[get] db에 저장되어있는 지도설정을 프론트엔드로 불러오는 api
app.get('/api/settings/map', (req,res)=>{

    const sql=`select map_type as mapType,
    map_url as mapUrl from map_settings where id=1`;

    db.query(sql, (err, result)=>{
        if(err){
            console.error("지도 설정 불러오기 에러")
            return res.status(500).json({message:"지도 설정 불러오기 에러"})
        }
        //바구니에 데이터가 1개라도 들어있다면?
        if(result.length>0){
            return res.status(200).json(result[0]);
        }else{
            //바구니 텅 비어있다면? 사이트를 처음켜서 아무것도 저장 안한 상태
            return res.status(200).json({mapType:'google', mapUrl:''})
        }
    })
})


///🔍 검색기능
app.get('/api/search',(req,res)=>{

    //1.🔎 프론트엔드에서 보낸 검색어(q)를가져옴
    const keyword = req.query.q;
    if(!keyword){
        return res.status(400).json({message:"검색어를 입력해주세요"});
    }
    //2.sql의 like검색을 위해 앞뒤 % 를 붙여줌 ( %황현진% )
    const searchKeyword = `%${keyword}%`;

    //각 테이블을 뒤지는 쿼리문을 준비  user 테이블 (이름, 성, 이메일에서 검색)
    const sqlUser = `
    select id, last_name, first_name, email 
    from users
    where first_name like ? or last_name like ? or email like ? `;

    const sqlBlogs = `
    select id, text_content, date_str from blog_item
    where text_content like ? `;

    const sqlContact = ` 
    select id, name, email, message from contacts
    where name like ? or email like ? or message like ?` 

    // 쿼리 3개를 순서대로 실행하고 결과를 모은다..(콜백지옥을 피하기 위해 단순 중첩 사용)
    db.query(sqlUser, [searchKeyword, searchKeyword, searchKeyword], (err1, users)=>{

        if(err1){
            console.error("유저검색에러: ",err1);
            return res.status(500).json({message: "유저검색에러"});
        }

        db.query(sqlBlogs, [searchKeyword], (err2,blogs)=>{

            if(err2) {
                console.error("블로그검색에러: ",err2);
                return res.status(500).json({message:"블로그 검색에러"});
            }
            db.query(sqlContact, [searchKeyword,searchKeyword,searchKeyword], (err3,contacts)=>{

              if(err3) return res.status(500).json({message:"문의내역 검색에러"});

              //모든 검색이 끝나면 묶어서 프론트엔드로 보냄
              res.status(200).json({
                users: users,
                blogs: blogs,
                contacts: contacts
                })
            })
        })
    })
})

//인디고프론트)npm install recharts
//📊 관리자 대시보드 통계 API 📈
app.get('/api/statistics',(req,res)=>{
    
    const sqlUser = ``;

    const sqlContact = ``;

    db.query(sqlUser, (err1, userStats)=>{
        if(err1){
            return res.status(500).json({message:"유저 통계 에러"})
        }
        db.query(sqlContact, (err2, contactStats)=>{
            if(err2){
                return res.status(500).json({message:"문의 통계 에러"})
            }
            const contacts = contactStats[0]
            const resolveRate = contacts.totalInquiries > 0 ?
            Math.round((contacts.resolved / contacts.totalInquiries) * 100) : 0;

            return res.status(200).json({
                userSignups: userStats.reverse(),
                claimRate :[ 
                    {}, {}
                ],
                summary: {

                },
                traffic: [
                    {},{},{},{}
                ],
                inquiriesVsClaims: [
                    {},{},{},{}
                ]
            });
        })
    })
})

//관리자끝

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


/* ✅ async / await 방식

app.post('/api/settings/header', async (req, res) => {
    try {
        const { logoType, logoText, logoImage, menus } = req.body;

        // 1. 로고 설정 저장 (await를 써서 끝날 때까지 기다림)
        const sql = `insert into header_setting (id, logo_type, logo_text, logo_image) values(1,?,?,?)
                     on duplicate key update logo_type = values(logo_type), logo_text = values(logo_text), logo_image = values(logo_image)`;
        
        await db.promise().query(sql, [logoType, logoText, logoImage]);

        // 2. 기존 메뉴 삭제
        await db.promise().query('delete from header_menus');

        // 3. 메뉴가 있으면 대량 삽입
        if (menus && menus.length >= 1) {
            const menuValues = menus.map(menu => [menu.title, menu.link]);
            const insertMenuSql = `insert into header_menus (title, link) values ?`; // 대량 삽입은 values 뒤에 괄호 없이 ? 하나가 정석입니다!
            
            const [result] = await db.promise().query(insertMenuSql, [menuValues]);
            
            return res.status(200).json({
                message: "헤더 설정 및 메뉴 저장 완료",
                affectedRows: result.affectedRows
            });
        } else {
            return res.status(200).json({ message: '헤더설정이 성공적으로 저장(메뉴없음)' });
        }

    } catch (err) {
        // 어디서든 에러가 나면 이 catch로 뚝 떨어집니다! (콜백 지옥 탈출)
        console.error("에러 발생: ", err);
        return res.status(500).json({ message: "서버 오류 발생", error: err.message });
    }
});


*/