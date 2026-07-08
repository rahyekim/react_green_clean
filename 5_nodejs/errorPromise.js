
const fs= require('fs').promises;
//콜백지옥없이
//async/await 문법 사용할 수있따

async function loadUserData (userId){//함수앞에  async 키워드 븥여 비동기함수선언

    try{
        const data = await fs.readFile(`users/${userId}.json`,'utf-8');
        const user = JSON.parse(data);
        //읽어온 텍스트데이터(data)를 자바스크립트 객체로 변환
        if(!user.email){ //파싱된 객체에 email데이텉가 누락됐는지 검사
            throw new Error(`Invalid user data: missing email`)
        }
        return user; //최종적으로 완성된 사용자 객체를 반환

    }catch(error){
        if(error.code === 'ENOENT'){
            throw new Error(`User ${userId} not found`);
        }else if(error instanceof SyntaxError) { //syntaxError 문법에러
            throw new Error ( "invalid user data format");
        } throw error;

    }finally{//성공또는 실패가 끝난후 무조건 마지막에 한번 실행
        console.log(`finished processing user ${userId}`);

    }

}

(async ()=>{
    try{
        const user = await loadUserData("id123");
        //위에서 만든 비동기함수 호출 하고 결과를 받아올때까지 기다림 
        console.log('user loaded: ', user)
    }catch(error){
        console.error("Failed to load user: ", error.message);

    }
})();