const oracledb = require('oracledb');

require('dotenv').config();

async function initialize(){

    try{
        await oracledb.createPool({
            user:process.env.DB_USER,
            password:process.env.DB_PASSWORD,
            connectString:process.env.DB_CONNECTION_STRING,
            poolMax:10,
            poolMin:10,
            poolIncrement:0
        })
        console.log("oracle 커넥션 풀이 성공적으로 생성되었습니다");
    }catch(err){
        console.error("오라클 DB 연결 실패: ", err);
    }
}
module.exports = {initialize};