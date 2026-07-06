
let x= 10; let y= "20"; 

let z= x+y ;

document.getElementById('small').innerHTML = z;

//nan
let nan = NaN;

document.getElementById('nan').innerHTML = 
`${100/ "후후"} + ${100/"10"} + ${typeof nan}`;

//NaN 10 number





//infinity

let num = 2;

let txt = "";

while ( num != Infinity) { 
    //무한수까지 증가 
    num = num * num ;
    txt = txt + num + "<br>";
}

document.getElementById('mu').innerHTML = txt;

//진수

let q= 0xFF ;

document.getElementById('sixteen').innerHTML = "OxFF=" + q ;

let qq = 123e5;  //1230000 
let ww = 123e-5; // 0.00123


document.getElementById('e').innerHTML = `${qq}<br>${ww}`

//qq + "<br>" + ww

let fiveDigits = 9999999999999999999999999 ; //15자리
let sixDigits = 99999999999999999999999999 ; //16자리 근사값저장됨=> 부정확해져서 big int 등장

document.getElementById('int').innerHTML = "accurate:" + fiveDigits + "<br> Inacurrate:" + sixDigits ;

//소수점연산

let float = 0.2 + 0.1;//0.30000000000000004

document.getElementById('float').innerHTML =  float+ "what? 0.3이 아니네";

//소수점 연산을 정확히 하려면....곱해줘야한다... or toFixed(1) 표시할때 반올림(문자열 돼서 Number()해줘야)

let floating = ( 0.2* 10+ 0.1*10 ) /10;

document.getElementById('floating').innerHTML =  floating;

//BigInt

let max = Number.MAX_SAFE_INTEGER;
let min = Number.MIN_SAFE_INTEGER;

document.getElementById('minmax').innerHTML = `최소범위:${min}~<br>최대범위:${max}`

let big = 12345678910111213141516n;
let int = BigInt("12345678910111213141516");

document.getElementById('bigint').innerHTML = 
`n리터럴:${big}
 BigInt(""):${int}`

