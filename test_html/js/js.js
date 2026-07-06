/* 자바스크립트는 괜찮은데 , 자바는 무조건 마감할때 세미콜론 ; 사용해야함 */
let x= 7 ; let y=7;
let z= x+y ;

document.getElementById("syntax").innerHTML = z;

//경고창
// alert("자바스크립트 world에 오신걸 환영해요") 
/*
1) 스크립트로 문자열(string) 집어 넣기
*/
document.getElementById("inner").innerHTML = "나의 첫번째 자바스크립트" ;
//document는 element(tag)들중 #inner를 찾아서 문자열을 넣는다

/*
추후 배울 함수를 테스트 function 함수의 간략정의 함수는 호출할때만 실행됨
함수는 두종류 fucntion = () => {} 리액트의 모듈을 만들때 쓰던 함수가 화살표함수
함수를 호출할때: 함수명()
 */

function myString(){
    document.getElementById("demo").innerHTML= "함수는 호출할때만 실행되는 코드블럭"
}

/* 버튼을 클릭시 유투브 이동 */
function getUrl(){
    window.location.href= "https://www.youtube.com"
}
/* 아이디로 찾지않고 document에 집어넣기 옛날방식
 document.write(7+9)
단점: 어디에서 튀어나올지 몰라
정석대로 사용하는 것이 좋다-> DOM방식: document.getElementById("").innerHTML= "16"
 */


/*      ****es6 (ECMAScript 2015)**** 
    자바스크립트의 표준규격인 6번째 버젼 
    가장 큰 변화와 혁신을 가져온 업데이트
    
    var 맘대로 바꾸는게 가능해서 프로그래밍 혼란 
    const 등장 : 재선언 재할당 금지 
    let: 재할당(=) 가능, 재선언(let =) 에러 ( let a=1 let a=2 에러남)
    
*/

let str= '나나나';
// let str= 'ㅛㅛ'  재선언 불가능
str= 'nana' //가능

document.getElementById('var').innerHTML= str ;

/* 화살표 함수 arrow fuction 등장 */

var add = function ( a,b ) {
    return a+b
}

const add2 = (a,b)=> (a+b) ;

/* `백틱 사용하여 문자열안에 변수나 식을 쉽게 사용*/
const name= "google";

console.log(`hello ${name}`)

/* class등장 : 다른 객체 지향언어 Java, C++ 에서 사용하는 클래스 개념도입
prototype 기반의 상속을 더 명확하게 직관적인 문법으로 사용함

코드를 여러파일을 나누고 필요한 부분만 불러와서 사용할수있는 기능
=> export import 
export default : import시 {}필요없음 
export 변수명: import할때 {}중괄호 필요함

비동기 ( 일이 순차적으로 하나가 해결되어야 해결됨 )를 좀 더 발전시킴
=> Promise 객체로 발전 시킴 => async await 로 발전
*/





