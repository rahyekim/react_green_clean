
/**
 ✨ 비동기 프로그래밍
 파일 입출력이나 네트워크 요청과 같은 작업이 완료될때까지 기다리는 동안 
 프로그램이 다른 작업을 수행할 수 있도록 함

 동기식 
 완료될때까지 실행을 차단 하고 지연 초래 readFileSync

 📌  Node.js .. 오래 걸리는 작업(파일 읽기, 네트워크 요청, DB 조회 등)을 만나면 
 멈춰서 기다리지 않고 뒤쪽 코드를 먼저 실행해 버리는 비동기 런타임
 */

const fs = require('fs'); // fileSystem : 파일을 읽거나 사용하는 노드js 모듈을 불러옴
// const { data } = require('jquery');

 console.log("1.비동기 읽기")
 fs.readFile('myfile.txt', 'utf8',(err,data)=> { 
    /*
    myfile.txt를 백그라운드에서 읽거라
    utf-8 사람이 읽을 수 있게 기계어가 아닌 일반적인 텍스트 형태......인코딩
    (err, data)=>{...} 
    파일을 읽는 작업이 다 끝나면 => 그때 이 콜백함수(괄호안의 내용을)를 실행해줘..
    행동지침서...
    */
   if(err) throw err;  //파일을 읽다가 에러가 났다면(파일이 없으면) err에 내용 담아 에러를 던져라!

// throw err; 💥서버 다운 대참사

//    if (err) {
//         console.error("❌ 에러 발생!! 파일 못 찾았음:", err.message);
//         return; (🛑 "야, 에러 났으니까 밑에 코드는 쳐다도 보지 말고 당장 이 함수 끝내!")
//     }
   console.log("3.읽기가 끝남");
   console.log("📄 파일: \n", data);


 }) 

 console.log("2. 나 먼저 퇴근함~ (비동기 증거)");

/*

throw err 즉시 강제 종료 (다운)
console.error + return 계속 살아있음 (정상 작동)

최신) async/await 쓰면 try 감시단 퇴근안하고 catch 해줌..
*/