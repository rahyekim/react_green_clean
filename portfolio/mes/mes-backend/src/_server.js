import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import oracledb from 'oracledb';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { AppDatasource } from "./config/data-source";
import { WorkOrder } from "./entities/WorkOrder";


dotenv.config();

const sequelize = require('./db');
const User = require('./Model/User');



const app = express();
//미들웨어
app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true,
}));
app.use(express.json());

//오라클 db연결설정

// oracledb.outOfDateChecking =false;

// const dbConfig = {
//     user: process.env.DB_USER || 'MES_USR',
//     password: process.env.DB_PASSWORD || '1234',
//     connectString: process.env.DB_CONNECTION_STRING || 'localhost:1521/FREEPDB1',
// };

const JWT_SECRET = process.env.JWT_SECRET || 'aB3$fG9!zXqW#mK7*vL2@pN5$sD8%yH1'
const PORT = process.env.PORT || 4000;

// JWT 인증 미들웨어(보호된 라우트용)  
// 400 오류 
// 401:인증안됨(토큰 없음/만료) 
// 403:권한없음 등 요청은이해하지만거부 404:요청 url아님
const verifyToken = (req,res, next)=>{
    const authHeader = req.headers['authorization'];

    // 1. 헤더가 없거나 'Bearer '로 시작하지 않는지 확인
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            success: false,
            message: '인증 토큰이 제공되지 않았거나 잘못되었습니다.'
        })
    } 
    // 'Bearer [토큰값]' 형태에서 토큰값만 분리
    const token = authHeader.split(' ')[1];

    try{
        //토큰 검증 및 디코딩
        const decoded = jwt.verify(token, JWT_SECRET);

        //요청 객체(req)에 사용자 정보를 담아두어 다음 라우터에서 쓸 수 있게 함
        req.user = decoded; 

        next(); //다음 로직(라우트 핸들러)으로 진행

    }catch(err){
        return res.status(403).json({
            success: false,
            message: '유효하지 않거나 만료된 토큰입니다.',
        });
    }
}


AppDatasource.initialize()
.then(()=>{

    console.log('데이터베이스 성공적으로 연결..🏖️')
    
    //조회테스트 api
    app.get('/api/work-orders', async(req,res)=>{
        const WorkOrderRepo = AppDatasource.getRepository(WorkOrder);
        const orders = await WorkOrderRepo.find();
        res.json(orders);
    });

    //로그인이 필요한 보호된 API
    app.get('/api/user/profile', verifyToken, async(req, res)=>{
    return res.status(200).json({
        success:true,
        user: req.user 
        })
    })

    // 🌟 회원가입 API
    app.post('/api/auth/register', async(req, res)=>{

        let connection;

        try{
            const{
                firstName, lastName, email, password,
                companyName, position, tel, address, detailAddress, gender
            }= req.body;

            if(!email || !password){
                return res.status(400).json({
                    success:false,
                    message:'이메일과 비밀번호는 필수입니다'
                });
            }

            connection = await oracledb.getConnection(dbConfig);

            // 이메일 중복 체크
            const checkResult = await connection.execute(
                `SELECT COUNT(*) AS cnt FROM users WHERE email= :email`,
                {email},
                {outFormat: oracledb.OUT_FORMAT_OBJECT}
            );

            if(checkResult.rows[0].CNT > 0){
                return res.status(409).json({
                    success:false,
                    message:'이미 존재하는 이메일 입니다'
                })
            }

            //bcrypt를 이용해 안전하게 암호화(해싱)
            const salt = await bcrypt.genSalt(10);
            const hashedPassword= await bcrypt.hash(password, salt);

            const query=`
            INSERT INTO users(
            id, first_name, last_name, email, password, 
            company_name, position, tel, address, detail_address,
            gender, created_at
            )VALUES(
             :firstName, :lastName, :email, :password, 
             :companyName, :position, :tel, :address, :detailAddress,
             :gender, SYSDATE
            )
            `
            await connection.execute(query, {
                firstName,
                lastName,
                email,
                password: hashedPassword, // 👈 해싱된 비번 전달!
                companyName,
                position,
                tel,
                address,
                detailAddress,
                gender
            }, {autoCommit:true});

            return res.status(201).json({
                success: true,
                message: '회원가입이 성공적으로 완료되었습니다! 🎉'
            });

        }catch(err){
            console.error('회원가입 에러:', err);
            return res.status(500).json({
                success: false,
                message: '서버 오류가 발생했습니다.'
            });
        }finally{
            //열었던 오라클 컨넥션 닫아주어야 Lock이 걸리지않음
            if(connection){
                try{
                    await connection.close();
                }catch(err){
                    console.error('커넥션닫기실패:', err)
                }
            }
        }
    })


    app.listen(PORT, ()=>{
        console.log(`🚀 MES Server running on http://localhost:${PORT}`);
    })
}).catch((err)=> console.error('db 연결 실패',err))
