
const express = require('express');

const mysql = require('mysql2/promise');

const cors = require('cors');

const app = express(); //서버역할을 할 핵심객체


//미들웨어(중간역할) 서버의 기본규칙(미들웨어)설정
app.use(cors());

app.use(express.json());

//mariaDB 연결할 통로 커넥션 풀 만듦

const pool = mysql.createPool({
    host: 'localhost',
    user: 'dateuser',
    password: '1234',
    database: 'dating_db',
    waitForConnections:true, 
    connectionLimit: 10,
    port:3307
});

//유저 목록줘!
app.get('/api/profiles', async(req,res)=>{
    try{
        const sql=`
        select u.id, u.nickname, timestampdiff(year, u.birthdate, curdate()) as age,
        u.bio, p.photo_url 
        from users u 
        left join user_photos p on u.id = p.user_id 
        and p.is_main = true 
        limit 10
        `
        const [rows] = await pool.query(sql)

        return res.status(200).json({ 
            success: true,
            message: 'DB조회성공!',
            data: rows
        });


    }catch(err){
        console.error(err);
        return res.status(500).json({success:false, message: 'DB조회중에러발생'})
    }
})

/*
🎯 left join=> 왼쪽(먼저 적은 테이블)을 절대적기준으로
 오른쪽(나중에 붙이는 테이블)을 갖다 붙임

<-> 사진이 null값이면 이너join일때는 리스트에 등장하지 못함..

left join은 기준이 절대적인 왼쪽(여기선 유저 테이블 users)
"왼쪽에 있는 유저 정보는 사진이 있든 없든 무조건 다 가져와! 
오른쪽 사진 테이블에 사진이 있으면 붙여주고, 
사진이 없으면 그냥 사진 자리에 비워둔 채(null)로라도 유저는 꼭 데려와!"

💘 timestampdiff(단위, 시작일, 종료일)
생년월일(birthdate)부터 오늘(curdate())까지의 기간을 '년(year)'단위로 계산해서 나이를 구하라
 */

//좋아요 싫어요 기록
app.post('/api/swipe', async(req,res)=>{
    const {sender_id, receiver_id, action} = req.body;

    try{
        const sql=`
        insert into matches(sender_id, receiver_id, action) 
        values (?,?,?)
        on duplicate key update action = values(action)
        `
        //on duplicate key update action = ? 지금 2명밖에없어서 유저제외못하고 계속나와서 덮어써야
        await pool.query(sql, [sender_id, receiver_id, action])
        
        return res.status(200).json({ success: true, message: '스와이프 기록 저장 성공!' });

    }catch(err){
        console.error(err);
        return res.status(500).json({success:false, message: '메세지저장실패'})
    }

})

//새로운 유저를 맞이할 준비 (회원가입)
app.post('/api/signup', async(req,res)=>{

    //프론트앤드 사용자가보낸 가입정보꺼냄
    const {email, password, nickname, age, gender, photo, birthdate, bio} =req.body;

    //필수정보 다 있는지 확인 (문지기역할)
    if(!nickname || !age || !gender ){
        return res.status(400).json({
            success:false,
            message: '필수정보를 모두 입력해주세요'
        })
        //트랜잭션을 위해서 단독 커넥션 하나 빌려옴
        const connection = await pool.getConnection();

    }
    try{
        await connection.beginTransaction(); //롤백 
        //mariaDB 에 새로운 유저정보를 등록 insert
        const [result] = await connection.query(
            `insert into users(email, password, nickname, age, gender, bio)values(?,?,?,?,?,?)`,
             [emeail,pasword,nickname, age, gender, bio] );
            
             //방금가입된 사람의 고유ID번호
             const newUserId = userResult.insertId;

             //user_photos 테이블에 사진저장
             if(photos && photos.length >0){ 
                //여러장의 사진을 한번에 저장하기위해 배열 형태로 묶어줌
                const photoValues = photos.map(p=>[newUserId, p.url, p.isMain]);
                await connection.query(
                    `insert into user_photos (user_id, photo_url, is_main) values ?`,
                    [photoValues]
                );
             }

             if(interests && interests.length >0 ){
                const interestsValues = interests.map(interest=> [newUserId, interest])
                await connection.query(
                    `insert into user_interests (user_id, interests) values ?`,[interestsValues]
                )
             }

             await connection.commit();
             
             //성공적으로 가입되었다고 안내
             res.json({
                success:true,
                message: '회원가입이 완료되었습니다! 승인여부 확인후 2-3일 내로 처리해드리겠습니다'
             })
    }catch(err){
        await connection.rollback();

        console.error(err);
        //만약 DB에 이메일이나 닉네임이 unique로 설정되어잇는데 똑같은 값이 들어오면 ER_DUP_ENTR냄 뱉어냄
        if(err.code === 'ER_DUP_ENTRY'){
            return res.status(409).json({
                success:false,
                message: '이미가입된정보가 존재합니다'
            });
        }
        //그외 사고발생시
        res.status(500).json({
            success:false, message: "회원가입 처리중에 서버에러가 발생"
        })
    }finally{
        connection.release();
    }
})

const PORT=3000
app.listen(PORT, ()=>{
    console.log(`백엔드 서버가 http://localhost:${PORT} 에서 열심히 돌아가고있습니다`)
})

/*

where u.id != ? -- 1. 자기 자신은 추천에서 제외
        and u.id not in (
            select receiver_id from matches where sender_id = ?
        ) -- 2. 내가 이미 좋아요/싫어요를 보낸 사람은 제외!

create user 'dateUser'@'localhost' identified by '1234';
grant all privileges on dating_db.* to 'dateUser'@'localhost';
flush privileges;


//on duplicate key update action = ? 
하면 [....., action] 하나 더추가해야함
 */