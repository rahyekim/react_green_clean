const oracledb = require('oracledb');  //오라클 DB와 통신하기 위한 라이브러리

require('dotenv').config(); //.env파일에 저장된 비밀번호,접속 주소 등 숨겨야 할 환경변수 읽어오기( environment variables)

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;  
/*
오라클 thin 모드 사용(별도 오라클client프로그램 설치없이 가볍게 연결하는 방식)
DB에서 데이터가져올때 기본값인 배열 [...] 대신 우리가 다루기 쉬운 json객체{키:값} 형태로 받도록 설정
*/
async function initialize(){ //DB연결을 시작하는 비동기 함수(기다림이필요한함수)를 선언

    /*DB와 연결을 미리 맺어두고 재사용하는 커넥션 풀(connection Pool)을 생성, 매번 새로연결하는것보다 속도훨신빠름 */
    try{
        await oracledb.createPool({
            user:process.env.DB_USER,
            password:process.env.DB_PASSWORD,
            connectString:process.env.DB_CONNECTION_STRING,  //DB주소
            poolMax:10, //동시 접속자가 많아질때 최대 몇개까지 연결을 늘릴지 설정 
            poolMin:2, //접속자가 없어도 평소시에 최소한으로 유지해둘 연결 개수
            poolIncrement:1 //연결이 필요할때 한번에 몇개씩 연결 추가할지 결정 (1씩증가추가 )
        })
        console.log("oracle 커넥션 풀이 성공적으로 생성되었습니다");
    }catch(err){
        console.error("오라클 DB 연결 실패: ", err);
    }
}
//서버를 끌때 DB연결도 안전하게 끊어주기 위한 함수 선언
async function close(){
    try{
        //생성되어 있던 커넥션 풀을 가져와서(getPool) 안전하게 닫음(close)
        //괄호 안의 0은 하던 작업을 즉시 중단하고 닫으라는 의미
        await oracledb.getPool().close(0);

        console.log("오라클 DB 커넥션 풀 종료")
    }catch(err){
        console.error(err)
    }
}
//다른 파일(예:server.js)에서 이 파일에 있는 initialize 와 close함수를 가져와/???
module.exports = {initialize, close};