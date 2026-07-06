
async function loadData() {

    /** 이함수안에서 시간이 걸리는 작업(데이터 통신)을 수행할것을 선언 
     * async 가 있어야 내부에서 await을 사용할 수 있다.
    */
   const resultDiv = document.getElementById('result');
   /*html에서 id='result'를 가진 요소를 찾아와서 자바스크립트 객체로 가져옴.
    const 참조만 할뿐  값이 바뀌지 않게 고정
   시도해봐 error가 생기면 catch하고...*/ 
  try{ //이 안에 있는 코드들 중에 에러가 발생할 가능성 있는 것들을 감싼다.

    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    /*
    fetch() : 서버에 해당 주소의 데이터를 달라고 요청을 보낸다.
    await : 서버에서 응답 올때까지 여기서 기다려....
    기다린후에 결과값이 오면 response변수에 담아...
     */
    const data = await response.json()  
    /* 서버로 받은 응답은 날것의 상태... 
    데이터가공,파싱할때까지 기다려..
    자바스크립트가 바로 쓸 수 있는 객체(Json)로 바꾸는 과정...
    */
    //html태그를 생성하여 화면에 출력
    resultDiv.innerHTML = `
    
    <div style="border:1px solid #ccc; padding:15px; border-radius:8px;">
    <h3> ID: ${data.id}</h3>
    <h2 style="color:blue;"> 제목: ${data.title}</h2>
    <p> 내용: ${data.body}</p>
    </div>
    
    `
    //에러가 발생하면 바로 아래 catch구문으로 점프!!
  } catch(error){
    resultDiv.innerHTML = "데이터를 불러오는데 실패했습니다."
    console.error("에러", error)
  }
}

loadData();//호출하여 실행


/**
 * 서버가 JSON 문자열 전송
res.json()이 JSON을 객체로 변환
우리가 보는 건 JavaScript 객체

{ userId: 1 } → JavaScript 객체
'{"userId":1}' → JSON 문자열
API는 보통 JSON 문자열로 보내고, response.json()이 JavaScript 객체로 바꿔준다.

서버와 클라이언트(브라우저) 사이를 이동할 때는 문자열 형태(JSON 텍스트)로 이동
:네트워크에서는 결국 문자(바이트)의 나열로 전송

서버 → JSON 문자열 전송
브라우저가 response.json() 을 실행
JavaScript 객체로 변환

 */