const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const {User, MatchRequest, PointHistory, sequelize} = require('../models');


//1.매칭 요청 API
router.post('/request', async(req,res)=>{
    try{
        //플러터에서 보낸 내 ID(senderId)와 상대방 ID(receiverId)를 꺼냅니다
        const {senderId, receiverId} =req.body;
        
        //DB에서 두사람사이에 이미 진행중인 요청이 있는지 먼저 검색
        const existing = await MatchRequest.findOne({
            where: {sender_id:senderId, receiver_id : receiverId}
        })
        if(existing){
            return res.status(400).json({success:false, message:"이미 요청을 보냈습니다"});
        }
        //새 매칭 요청을 DB에 'PENDING(대기 중)' 상태로 저장합니다.
        await MatchRequest.create({
            sender_id:senderId,
            receiver_id:receiverId,
            status:'PENDING'
        })
        return res.json({success: true, message:'요청 완료'});

    }catch(err){
        return res.status(500).json({success:false, message:"요청 실패"});
    }
})

//수락 및 거절 api
router.post('/respond', async(req,res)=>{
    try{
        //요청번호, 내ID, 동작(ACCEPT, REJECT)
        const{requestId, responderId, action}= req.body;
        
        //DB에서 해당 매칭요청찾기
        const request = await MatchRequest.findByPk(requestId);
        //요청이 아예 없거나 이요청을 받을 사람이 내가 아니라면 튕겨냄
        if(!request || request.receiver_id !== responderId){
            return res.status(400).json({success:false, message:"유효하지않은 요청입니다"});
        }

        //만약 거절버튼을 눌럿다면
        if(action === 'REJECT'){
            await request.update({status:'REJECTED'});
            return res.json({success: true, message:'거절 처리 되었습니다'});
        }

        //수락버튼눌렀다면
        if(action === 'ACCEPT'){
            //해당 요청의 상태를 'ACCEPTED(수락됨)'로 바꿉니다. (이제 채팅 등이 가능해집니다)
            await request.update({status:'ACCEPTED'});

            //이사람을 수락했으니 다른사람들의대기(pending)요청은 모두거절(rejected)상태로 일괄변경하여깔끔하게정리
            await MatchRequest.update(
               { status:'REJECTED'},
                {where: {
                    receiver_id: responderId, 
                    status:'PENDING',
                    id: { [Op.ne]: requestId} //// 현재 수락한 요청은 제외
                }}
            );
            return res.json({success:true, message:'매칭이 수락 되었습니다. 약속을 잡아보세요'});
        }

    }catch(err){
        return res.status(500).json({success:false, message:"서버에러"});
    }
})

//만남완료 api(실제 만났을때 포인트 동시차감)
router.post('/complete', async(req,res)=>{
    const MATCH_COST = 10000;
    //돈이 오가는 과정이므로 중간에 서버가 꺼져도 원상복구되도록 트랜잭션 시작
    const t= await sequelize.transaction();
    try{
        const {requestId}=req.body;
        //해당 매칭 요청을 찾아옴 (조회할때 트랜잭션t에 묶어둠 )
        const request = await MatchRequest.findByPk(requestId,{transaction:t});

        if(!request || request.status !== 'ACCEPTED'){
            throw new Error('정상적인 만남 완료 대상이 아닙니다')
        }
        //매칭을 요청했던 사람(sender)와 받은ㅇ사람(receiver)의 전체 정보를 DB에서 불러옴
        const sender = await User.findByPk(request.sender_id, {transaction:t})
        const receiver = await User.findByPk(request.receiver_id, {transaction:t})
        
        //두사람중에 한명이라도 포인트가 부족하면 그 즉시 진행 멈추고 에러
        if(sender.points < MATCH_COST || receiver.points < MATCH_COST){
            throw new Error('포인트가 부족하여 만남을 완료할수없습니다. 충전이 필요합니다');
        }
        //매칭 상태를 최종단계인 'COMPLETED(만남완료)'로 변경
        await request.update({status:'COMPLETED'},{transaction:t});

        //포인트를 차감했다는 영수증을 양쪽 유저 이름으로 각각 만들어 저장
        await PointHistory.bulkCreate([
            {user_id: sender.id , amount: -MATCH_COST, reason: '만남완료(발신)' },
            {user_id: receiver.id , amount: -MATCH_COST, reason: '만남완료(수신)' }
        ],{transaction:t});

        //여기까지 아무에러없이 왓다면 지금까지 진행한 모든 변경사항을 DB에 완전확정(commmit)짓기
        await t.commit();
        return res.json({success:true, message:'만남완료. 양쪽 포인트가 차감되었습니다'});

    }catch(err){
        //만약 트랜잭션과정중 하나라도 에러가 난다면 ..
        //트랜잭션 발동하여 돈이 깎이기 전 상태로 되돌아감
        await t.rollback();
        return res.status(400).json({success:false, message:err.message});
    }
});

module.exports= router;