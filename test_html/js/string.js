
// 1-1) '' , " " 쓰고 싶을 경우 -> ` ` 사용

let str = `He's "handsome" guy.`;

document.getElementById('haptic').innerHTML = str;

// 1-2) \ escape 문자 사용

let die = "we are the so-called \"best-friends\""; 

document.getElementById("die").innerHTML = die;

//2) 보간법

let fistName= "현진";
let lastName= "황";

let name = `Welcome to the React World. 전 ${fistName}, ${lastName} 입니다.`;

console.log(name); //html 없이도 JS값을 브라우저 콘솔에 출력하는 디버깅 도구...html>사용자 화면출력

document.getElementById('name').innerHTML = name;

//계산도 가능

let price = 10; //정수
let VAT = 0.25; //실수
let total = `Total: ${(price * (1+VAT)).toFixed(2)}`

console.log(total);
document.getElementById("total").innerHTML = total;

// 🔥현업개발....

let header = "Template String";
let tags = ["tss", "javascript", "es6"]

let html = `<h2>${header}</h2><ul>`

for (const x of tags){
    html += `<li>${x}</li>`
}
html += `</ul>`

document.getElementById("ul").innerHTML = html;

//indexOf -1

let string = "plz locate where 'locate' occurs!";

let index = string.indexOf("where"); //11

document.getElementById("find").innerHTML = index;
console.log(index);

// indexOf replace 흐으으음...