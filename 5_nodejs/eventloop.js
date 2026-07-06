
/* 1️⃣2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 
nodejs에 이벤트 루프와 비동기 작업들의 실행 우선순위

1️⃣ 메인스크립트(동기코드[synchronous])실행
가장 먼저 Call stack 들어온 동기코드들이 실행
먼저 1번 실행 중간에 비동기 함수들은 당장 실행되지 않고 각자의 대기열 Queue 로 보내짐
그리고 6번이 출력

2️⃣ Next tick 큐처리 : 동기 실행이 모두 끝나면 (콜스택이 비워지면)
이벤트 루프가 시작되기 전에 가장먼저 next Tick Queue를 확인

3️⃣ 마이크로태스크 큐 처리 : nextTick 큐가 비워지면 다음으로 microTask Queue 확인

4️⃣ 타이머실행 : 마이크로 태스크 큐까지 모두비워지면 <본격적인 이벤트 루프의 페이즈에 진입>

5️⃣ 타이머 단계 이후 몇가지 중간단계 (Pending I/O , Poll등을) 거친 후 체크단계에 도달
setImmediate 는 항상 이 Check단계에서 실행되도록 설계

I/O 콜백실행 
5) 프로세스 세트 즉시 콜백 
6) 소켓 닫기 이벤트(close)를 처리
 */


console.log('1.start');

//2) Next tick queue
process.nextTick(()=> console.log('2.Next tick'));

//3) Microtask queue (Promise)
Promise.resolve().then(()=> console.log("3.Promise"))

//4) Timer phase
setTimeout(()=> console.log("4.Timeout"), 0);

//5) check phase
setImmediate(()=> console.log("5.Immediate"));

console.log('6.end'); ///난왜 16 23 //54????


/**
 * 
 * 처음에는 
 * Call Stack(무대) 에서 동기 코드만 실행 
 * 
 * 잠깐! 이벤트 루프 들어가기전에 nextTick부터 확인! (최우선) //다음째깍ㅋㅋ
 * 
 * 어? Promise(.then)도 남았네? (그다음)
 * 
 * 이제 진짜 이벤트 루프 시작! -----------------------------------
 * 
 * Timers단계 (setInterval/setTimeout)
 * 
 * Poll 단계 ( 파일 읽기 끝남? 네트워크 데이터왔음? DB응답 왔어? => I/O작업 처리하는곳) :여론조사ㅋㅋ
 * 
 * Check단계 ( setImmediate 만 실행) : immediate지금당장이 아니라
   현재 이벤트 루프가 한 바퀴 돌면 바로 실행해 줘
  
 * 메인코드(동기코드) - nextTick - Primise - Timer - Poll - Check

메인 스크립트(메인코드) : 
파일전체 위에서 아래로 한줄씩 쭈욱 읽음- 동기코드 모두실행 -Call Stack 비움

 nextTick Queue
┌────────────┐
│ nextTick   │
└────────────┘

Microtask Queue
┌────────────┐
│ Promise    │
└────────────┘

Timer Queue
┌────────────┐
│ setTimeout │
└────────────┘

Check Queue
┌────────────┐
│setImmediate│
└────────────┘

................. 이벤트 루프의 '진짜' 6단계 구조....................

┌───────────────────────────┐
│           Timers          │ ─── (Timer Queue) : setTimeout() setInterval()
└─────────────┬─────────────┘
┌─────────────┴─────────────┐
│     Pending Callbacks     │ ─── (이전 루프에서 지연된 에러/콜백)
└─────────────┬─────────────┘
┌─────────────┴─────────────┐
│      Idle, Prepare        │ ─── (Node.js 내부용)
└─────────────┬─────────────┘
┌─────────────┴─────────────┐
│            Poll           │ ─── (Poll Queue: 파일/네트워크 I/O) ⭐ 바로 여기!
└─────────────┬─────────────┘
┌─────────────┴─────────────┐
│           Check           │ ─── (Check Queue: setImmediate)
└─────────────┬─────────────┘
┌─────────────┴─────────────┐
│      Close Callbacks      │ ─── (close 이벤트 처리)
└─────────────┬─────────────┘
(※ process.nextTick과 Microtask는 위 단계들 사이사이에 끼어드는 '특권층 큐'입니다.)


무대(Call Stack) - 에서 동기코드만 실행 나머지는 예약만 해둠

▶ console.log("1")
▶ process.nextTick() 등록
▶ Promise 등록
▶ setTimeout 등록
▶ setImmediate 등록
▶ console.log("6")
 */