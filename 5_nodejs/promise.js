
/**
 * 자바스크립트에서 비동기라는 것을 처음에 사용할때는 
 * 콜백 함수는 콜백함수지옥에 빠질 수있다
 * 그래서 다른 대안들 나오기 시작 => Promise aysnc/await
 * 
 * 
 */

const fs = require('fs').promises;

//아래 3명을 동시에 실행, 결과 순서 보장!(입력 순서를 기준으로 반환) 하나라도 실패하면 즉시 중단

const promise1= Promise.resolve('1st🥇 result');

const promise2= new Promise((resolve)=> setTimeout(()=> resolve("🥈2nd result"),2000))

const promise3= fs.readFile('myfile.txt', 'utf8');

Promise.all([promise1,promise2,promise3])
.then(result => console.log('Results:', result))
.catch(error => console.log("error in one of the promise error: ", error))



/*
const promise1 = new Promise((resolve) => {
  resolve('1st🥇 result');
});
 */