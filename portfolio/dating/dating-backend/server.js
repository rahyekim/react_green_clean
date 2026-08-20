
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