/* */

/* if else if else */ 

// 시간 객체에서 시간을 불러옴
const time = new Date().getHours() ;

//인사말 선언;
let greeting;

if(time < 10) {
    greeting = 'Good Morning :)';
} else if (time < 20) {
    greeting = 'good Afternoon !';
} else {
    greeting = 'Good Evening';
}

document.getElementById('hour').innerHTML = greeting ;

/* 스위치 */

let day; //선언만
let date = new Date().getDay();  //....변수 데이트에 시간 객체에 속한 day를 대입

switch (date) { //스위치 예약어 (매개변수)
    case 0 :
        day = "일요일";
        break;
    case 1 :
        day = "월요일"
        break;
    case 2 :
        day = "화요일"
        break;
    case 3 :
        day = "수요일"
        break;
    case 4 :
        day = "목요일"
        break;
    case 5 :
        day = "금요일"
        break;
    default :
        day = "토요일"
        break;

}

document.getElementById("whatday").innerHTML = `오늘은 ${day} 입니다..후후`

/* 삼항 연산자 : 조건 ? true: false */

let age = 99;
let text = (age < 19) ? "미성년자" : "성인";

document.getElementById("age").innerHTML = text ;

/* true false */

let x = 5;
document.getElementById("true1").innerHTML = (x == 8);
document.getElementById("true2").innerHTML = (x != 8);
document.getElementById("true3").innerHTML = (x != 5);
document.getElementById("true4").innerHTML = (x >= 4);
document.getElementById("true5").innerHTML = (x <= 4);
document.getElementById("true6").innerHTML = (x === '5');
document.getElementById("true7").innerHTML = (x !== '5');

/* 논리 연산자 */

let q = 6 ; 
let w = 3 ;

document.getElementById("log").innerHTML = 
(q < 10 && w > 1) +"<br>" +
( q < 10 && w < 1) +"<br>" + 
( q > 3 || w < 1) +"<br>" + 
!(q===w) +"<br>" + "참&&참---참&&거짓---참||거짓----!거짓"

/* 복습용예제 */

function checkGrade() {
    
    const score = document.getElementById('scoreinput').value;
    const resultDiv = document.getElementById('result');

    // js boolean & logical 검사
    const isValid = score >=0 && score <= 100 ; //점수가 0~100 인지 유효성검사
    // 논리 부정 연산자 사용
    if(!isValid){
        resultDiv.textContent = '0~100점 사이를 입력하세요.';
        return; // return; 반환 => 함수의 실행을 여기서 종료하고 원래 호출한곳으로 돌아가라.
    }

    //js if / else if
    let grade;
    if(score >= 90) grade= "A";
    else if (score >= 80) grade= "B";
    else if (score >= 70) grade= "C";
    else grade = "F";

    // js ternary 삼항연산자
    const status = (score>=70)? "합격" : "불합격" ;

    // js switch
    let message;

    switch(grade) {
        case "A" : message = "최우수학생입니다"; break;
        case "B" : message = "잘했다"; break;
        case "C" : message = "조금 더 노력하십시오"; break;
        default : message = "재시험 봐라"; break;
    }
    resultDiv.innerHTML = `등급:${grade} <br> 결과: ${status} 입니다
                        <br> 메세지: ${message}`
}