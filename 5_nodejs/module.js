// 자동차 엔진 구조 🚗 Node 내장 모듈 이해😆

const http = require('http'); //req, res
const https= require("https"); //SSL/TLS
const fs = require('fs'); // create read
const path = require("path"); //파일이나 폴더의 경로
const os = require("os"); //운영체제의 cpu메모리
const url = require('url'); //url을 분석하고 쪼개거나 합치는것
const EventEmitter = require("events"); //사용자 정의 이벤트를 만들고 감지(listen)하기위해서
const {Transform} = require("stream");//데이터를조각내어 흐름대로처리하기위해
const {Buffer} = require('buffer'); //컴퓨터가 이해하는 이진(Binary)데이터를 다루기 위해
const crypto = require('crypto'); 
/*
암호화 Encryption: 평문(데이터)->암호문(보호 및 보안)
복호화 Decryption: 암호문 -> 평문(원상복구 및 열람)
*/
const timers = require('timers');// 일정시간뒤에 실행하거나 반복실행하게 해주는 타이머모듈
const dns = require('dns'); // 도메인주소를 IP주소로 변환(또는역변환)해주는 모듈
const assert = require('assert'); //???
const util = require('util'); //문자열 포맷팅이나 디버깅 등 개발에 편리한 유틸리티 기능모음
const readline = require('readline');// 터미널(콘솔)화면에서 사용자가 키보드로 입력한 값을 읽어오는 모듈
const { log } = require('console');
/**
 HTTP(http): HTTP서버 및 클라이언트 생성 요청(Request)을 받아 응답(Response)을 처리
 HTTPS(https): SSL/TLS로 암호화된 안전한 HTTP 통신을 지원
 ⭐File(fs): 파일 시스템과 상호작용
 ⭐Path(path): 파일 읽기쓰기삭제 디렉토리생성등을 동기와 비동기방식(Promise,Callback)으로 처리
 OS(os): 현재실행중인 운영체제의 정보(CPU코어수 메모리용량 네트워크인터페이스 등) 가져옴
 URL(url):URL문자열을 파싱(Pasing)하여 호스트명, 쿼리스트링, 경로 등의 구성요소로 분리하거나
 반대로 구성요소를 조합하여 URL을 생성 ⭐url.parse()
 Events(events): 이벤트 주도 아키텍쳐
 Event Driven Architecture 의 핵심 사용자 정의 이벤트를 발생(emit)시키고 이를 감지하여
 특정콜백함수를 실행 on 할 수있습니다 ...⭐EventEmitter
 ⭐Stream(stream): 대용량 데이터를 작게 쪼개어 연속적으로 처리 메모리효율성 극대화 동영상 스트리밍이나
 대용량 파일처리에 주로사용
 Buffer(buffer): 이진데이터 Binary data를 다루기 위한 모듈 v8 엔진의 메모리 외부공간에
 원시 데이터를 저장 주로 파일이나 네트워크 통신에서 데이터를 주고받을때 사용
 ⭐Crypto(crypto): 해시hash, 암호화 encryption, 복호화, 전자서명등 강력한 암호기능제공
 Timers(timers): 특정 시간 이후에 콜백함수실행(setTimeout) 일정한 주기마다반복실행(setInterval)
 DNS(dns): 도메인 이름 시스템 조회기능을 제공
 Assert(assert): 유닛테스트unit test를 위한 모듈로 특정조건이 참true인지 검증
 Util(util): 디버깅,포맷팅, 구형콜백 API를 프로미스(Promise)로 변환
 Readline(readline):process.stdin 과 같은 readable 스트림에서 데이터를 한번에 한줄씩 
 읽어오는 인터페잉스를 제공
 */

 //Events 커스텀 이벤트 관리자
 class ServerEmitter extends EventEmitter {}
 //기본 EventEmitter를 상속받아 우리만의 이벤트 클래스 생성
 
 const serverEvents = new ServerEmitter();
 
 //[Path] & [Fs] 로그파일 경로 설정 및 스트림 준비

 //__dirname + path.join() 조합은

 const logDir = path.join(__dirname, 'logs');
 //현재파일이 있는경로(__dirname)에 'logs'라는 폴더경로를 안전하게 합침
 if(!fs.existsSync(logDir)){ //해당경로에 'logs'폴더가 존재하지않는다면
    fs.mkdirSync(logDir); // 동기식(실행이끝날때까지 멈춤)으로 logs폴더 새로생성 
 }

 const logFilePath = path.join(logDir, 'server.log');
 //'logs'폴더 안에 'server.log'라는 파일의 최종경로생성

//[Stream]데이터를 대문자로
const upperCaseStream = new Transform({
    //데이터 조각이 (chunk)이 들어올때마다 실행되는 함수
    transform(chunk, encoding, callback){
        this.push(chunk.toString().toUpperCase());
        //들어온 데이터를 문자열로 바꾸고 대문자로 변환해서 다음으로 넘김 
        callback(); //현재 조각의 처리가 끝났음을 시스템에 알림
    }
});

//'server.log'파일에 데이터를 이어쓰기
// ('a':append) 모드로 기록할 준비를 함 
const logWriteStream = fs.createWriteStream(logFilePath,{flags:'a'});

/* 파이프라인 연결: 입력 -> 대문자 변환 ->파일쓰기
upperCaseStream에 데이터가 들어오면 자동으로 logWriteStream(파일)로 흘러가도록
pipe파이프연결
*/
upperCaseStream.pipe(logWriteStream);

//로깅 유틸리티 함수(터미널과 파일에 동시에 로그를 남기는 함수)
function logMessage(msg){
    //[Util] 현재시간(ISO형식)과 메세지를 [시간]메세지 형태의 문자열로 깔끔하게 포맷팅
    const formattedMsg = util.format("[%s] %s\n", new Date().toISOString(), msg)
    upperCaseStream.write(formattedMsg); //포맷팅된 문자열을 대문자 변환
    console.log(formattedMsg.trim());
    //터미널 화면에도 출력 trim으로 끝에 불필요한 줄바꿈제거 
}

//[http]웹서버생성
const server = http.createServer((req,res)=> {
    //클라이언트가 접속할 때마다 실행되는 콜백함수
    const parsedUrl = url.parse(req.url, true);
    //[url]클라이언트가 요청한 웹주소(req.url)를 파싱하여 보기쉽게 객체 형태로만듦
    const traceID= crypto.randomBytes(8).toString('hex');
// [crypto] 요청을 구분하기 위해 무작위 8바이트 데이터를 생성-16진수 문자열로바꿈(traceID생성)
/*
[Assert] 방금 만든 TraceID 가 정확히 16글자인지 검사
만약아니면 TraceID생성오류 를 내고 서버중단
 */
assert.strictEqual(traceID.length, 16, 'TraceID 생성오류');
//요청 받은 경로(pathname)와 생성된 TraceID를 로그로 남김
logMessage(`요청수신: ${parsedUrl.pathname} (traceID: ${traceID})`);

//만약 사용자가 메인페이디 '/'로 접속했다면
if(parsedUrl.pathname === '/'){
    //[buffer] 화면에 보여줄 한글/영문 메세지를 메모리(Buffer)에 이진데이터로 담음
    const responseData = Buffer.from(`환영합니다 시스템 상태 모니터 서버입니다.
        (traceID: ${traceID})`);
//클라이언트에게 "요청성공200"
//응답 데이터는 일반텍스트 utf-8로 헤더를 보냄
res.writeHead(200,{'content-type': 'text/plain; charset=utf-8'});
res.end(responseData);
//준비해둔 버퍼 데이터를 전송하고 응답을 마무리

//[events] 응답을 성공적으로 마쳤다는 requestHandled 이벤트를 발생시키고
//traceID를 함께넘김

serverEvents.emit('requestHandled',traceID);
}
//만약 사용자가 상태확인 메세지('/health')로 접속했다면
else if (parsedUrl.pathname === '/health'){
    //[OS]현재 남은 메모리 용량을 바이트에서 메가바이트MB 단위로 계싼함
    const freeMem = os.freemem() / (1024 * 1024);
    //클라이언트에게 요청성공200 이며, 응답데이터는 json형식이라고 헤더를 작성
    res.writeHead(200, {'content-type': 'application/json'});
    //남은 메모리등의 정보를 json문자열로 변환하여 전송하고응답
    res.end(JSON.stringify({
        status:'ok', freeMemoryMB: Math.round(freeMem),
        platform: os.platform() 
    }));
}else{//페이지를 찾을수없음
    res.writeHead(404);
    res.end('not found'); 
}

});

//이벤트리스너 등록(앞서 발생시킨 requestHandled 이벤트를 기다림)
serverEvents.on('requestHandled', (id)=>{
    timers.setTimeout(()=>{
        logMessage(`traceID [${id}] 처리가 완료 되었습니다`)
    }, 2000);
})

//realine CLI환경 구성(터미널에서대화할수있는)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


console.log(`======node.js통합서버설정==========`);

//[DNS]현재 내 컴퓨터의 호스트이름(os.hostname())을 통해 실제ip주소를 조회함
dns.lookup(os.hostname(), (err,address)=>{
    if(err) throw err;
    console.log(`서버 호스트 ip확인 완료 : ${address}`)
    
    //터미널에서 사용자에게 질문을 던지고, 
    rl.question('서버포트를 3000에서 시작하시곘습니까? (y/n)',(answer)=>{

         // 입력을 기다림(입력값은 answer변수에 담김)
        if(answer.toLowerCase()==='y'){
            server.listen(3000, ()=>{
                logMessage('서버가 3000port에서 시작되었습니다');

                https.get('https://nodejs.org',(res)=>{
                    logMessage(`외부인터넷 연결 확인 완료 (상태코드:${res.statusCode})`)
                }).on('error', (e)=>{
                    logMessage(`외부인터넷 연결 실패 (상태:${e.message})`)

                });
            })
        
        }else{
            console.log('서버 시작을 취소합ㄴ디ㅏ');
            process.exit(0); //프로그램 종료
        }
        rl.close();// 입력받는 readline을 닫아줌 
    });
   
})