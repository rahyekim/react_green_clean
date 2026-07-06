
const cars = [ "BMW", "Bentz", "Volvo", "Ford", "Audi"]
 // 단일 솔루션에 여러변수값을 사용하고자 할때쓰는 array 배열
 // 배열은 색인(index) [0,1,2,3,4] 
 // cars.length => 5 

 let text = "";
text += cars[0] + "<br>";
text += cars[1] + "<br>";
text += cars[2] + "<br>";
text += cars[3] + "<br>";
text += cars[4] + "<br>";

document.getElementById('bad').innerHTML = text;

 let car = "";
 
 for( let i=0 ; i< cars.length ; i++) {
    // car += cars[i] + "<br>";
    car += `${cars[i]}<br>`;

 }
document.getElementById('good').innerHTML = car;

/* for( leti=0 ; i범위 ; i증가 ) {}
 let i=0 ; 색인시작 ::초기식
 i < cars.length(5) 색인의 끝까지 :: 조건식
 i++ 0~4까지 각각 개별증가 :: 증감식
 for문을 사용하면 지정한 범위까지 반복한다
 */

// while loop

let nums = "";
let n = 0; //초기식

while (n<9){ //조건식
    // nums += "출력되는숫자는" + n + "<br>"
    nums += `출력되는 숫자는 ${n}<br/>`
    n++; // 증감식 : 증가를 선언하지 않으면 무한 루프에 빠진다.....블랙홀....
}
document.getElementById("while").innerHTML = nums;

//do while loop

let num = "";
let m = 0;

do {
    num += "출력되는숫자는" + m + "<br>"
    m++; // 증가를 선언하지 않으면 무한 루프에 빠진다.....블랙홀....
} while (m<9) ;

document.getElementById("do").innerHTML = num;


//break stop

let stop="";

for ( let z=0; z< 10; z++){
    if(z === 3) {break;} // 여기서 중지 0 1 2 
    stop += `the number is ${z} <br>`
}

document.getElementById('stop').innerHTML = stop;

//continue id keep

let keep="";

for ( let s=0; s< 10; s++){
    if(s === 3) {continue;} // 여기서 건너뛰기 012 ..456789
    keep += `the number is ${s} <br>`
}
document.getElementById('keep').innerHTML = keep;
