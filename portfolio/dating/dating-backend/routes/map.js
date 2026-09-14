//Express 웹 프레임워크와 라우터(경로관리기능)을 불러옴
const express = require('express');

const router = express.Router();

//DB모델들( User, MatchRequest)과 복잡한 쿼리를 직접쓰기위한 sequelize객체를 불러옴

const { User, MatchRequest, sequelize } = require('../models');

//조건부 검색(예:같지않다, 작거나같다 등)을 사용하기 위한 연산자Op를 가져옴
const { Op, where } = require('sequelize');

//📦GET 요청 (주소창에 실어 보내기)  //POST 요청 (택배 상자에 숨겨 보내기)
router.get('/nearby', async(req,res)=>{  
    try{
        const{ lat, lng, radius, userId } = req.query;

        const parsedLat = parseFloat(lat);
        const parsedLng = parseFloat(lng);

        //거리 계산 함수는 미터m를 기준이므로 받아온km에 1000곱함
        const radiusInMeters= parseFloat(radius)*1000;
        //지구 둥글기를 반영한 정밀거리계산함수(ST)를 sql문장으로 만듦
        //DB에 있는 사람의(longitude, latitude)와 내 현재위치(lan,lat)사이의 거리를 미터로 계산해줌
        const distanceQuery= sequelize.literal(
            `ST_Distance_Sphere(point(longitude, latitude), point(${parsedLng}, ${parsedLat}))`
        )
        //DB 유저테이블에서 조건에 맞는 사람들을 모듀 findAll 찾아옴
        const nearbyUsers = await User.findAll({
            where:{
                //조건A: 검색된 사람의 id가 내 id와 같지 않아야함 (나자신제외)
                id:{[Op.ne]:userId},  //[Op.ne] (Not Equal):
                //조건B: 위에서 만든 거리계산식의 결과값이 설정한 반경보다 작거나같아야함(<=)
                [Op.and]:sequelize.where(distanceQuery, '<=', radiusInMeters)
            },
            //프론트엔드로 보낼 데이터(컬럼)만 골라냄
            attributes:[ //계산된 실제 거리(미터) 값도 'distanceValue'라는 이름으로 결과에 포함해서 플러터로 보내줍니다.
                'id', 'nickname', 'gender', 'bio', [distanceQuery, 'distanceValue']
            ],//💡추가: 가까운 거리순으로 정렬 (Order)
            order: [[sequelize.literal('distanceValue'), 'ASC']]
        });

        res.json({success:true, users: nearbyUsers});

    }catch(err){
        console.error(err);
        res.status(500).json({success:false, message:'서버에러'});
    }
})

module.exports = router;