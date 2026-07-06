
const fs = require('fs');

function readConfigFile(filename, callback){
    fs.readFile(filename, 'utf-8',(err,data)=> {
        //fs.readFile을 사용해 파일을 비동기적으로 읽습니다
        //파일읽기시작->(잠시기다림)->읽기끝나면 (err,data)=>{} 실행
        //{\"name\":\"Tom\",\"age\":20}" 읽기성공하면 이런 문자열이 들어옴

        if(err){//파일을 읽는 과정에서 물리적인 에러 발생하는지 확인
            //Error No ENTRY 파일/경로가 없음
            if(err.code == 'ENOENT'){
                return callback(new Error(`Config file ${filename} not found`))
            //파일이 없다는 알기쉬운 에러객체를 새로 만들어 콜백함수의 첫번째인자(에러자리)로
            //넘겨주고 종료
            }else if (err.code == 'EACCES'){
                //에러코드가 Error Accesss 즉, 파일에 접근할 권한이 없는 경우 
                return callback(new Error(`NO Permission to read ${filename}`));
            }
            return callback(err);
            //지정한 엥러외의 다른 모든 에러는 발생한 원본에러(err)그대로 받아서 콜백함수에...

            }try{ //파일은 성공적으로 읽었지만 JSON변환중 에러 날 수있으므로 try-catch문사용
                const config = JSON.parse(data);
                //읽어온 일반 텍스트 데이터(data)를 자바스크립트에서 쓸 수있는 객체형태(JSON)
                callback(null, config);
    //변환에 성공했다면 에러가 없다는 첫번째 의미로 null넣고 두번째인자는 변환된객체(config) 콜백실행
            }catch(parseError){
                //JSON.parse()과정에서 에러가 발생
                //예)파일 내용이 올바른 JSOn형식이 아닐때
                callback(new Error(`Invalid JSON in ${filename}`));
                //JSON형식이 잘못되었다는 에러 객체를 만들어 콜백함수로 넘겨줌
                //try-catch안에서는 return을 쓰지않아도 함수마지막이라 자연???
            }
        }
    )
}

//함수호출, 파일명 config.json 작업이 끝나면 실행될 콜백 함수 ..???
readConfigFile('config.json',(err,config)=>{
    if(err){ //콜백 함수의 첫번쨰 인자인 err에 값이 있다면 즉, 에러가발생해서 넘어왔다면
        console.error(`Failed to read config : `, err.message);
        //콘솔에 에러빨간글씨 출력
        return; //성공로그띄우지않고 실행을 멈춤 
    }
    console.log('config loaded successfully!',config);
    //성공메세지 와 parsing된 설정값(config을 콘솔에 출력
})


/*
"{\"name\":\"Tom\",\"age\":20}" 읽기성공하면 이런 문자열이 들어옴 */


/*
readConfigFile("config.json", callback)
            │
            ▼
      fs.readFile() 시작
            │
            ▼
     파일 읽기 완료
            │
     ┌──────┴────────┐
     │               │
   실패             성공
     │               │
callback(err)   JSON.parse()
                     │
          ┌──────────┴─────────┐
          │                    │
      parse 실패          parse 성공
          │                    │
callback(err)     callback(null, config)
                     │
                     ▼
      readConfigFile의 콜백 함수 실행
 */


      //✅ callback(err)는 비동기에서 에러 전달하는 방식
      //❌ throw new Error()는 여기서는 안 맞음

      /*비동기 함수

readFile 시작
↓
바로 함수 끝남
↓
나중에 파일 읽기 완료되면 콜백 실행

만약 여기서 throw하면?
if (err) {
    throw new Error("파일 없음");
}
👉 밖에서 잡을 사람이 없음
👉 프로그램이 터질 수 있음

callback(err, result): 에러가 나도 바로 던지지 말고, 결과를 함수로 전달해라

      */