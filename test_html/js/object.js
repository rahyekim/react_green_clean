
// 1)객체 만들기

const person = {
    firstName : "현진",
    lastName : "황",
    age: 24,
    job: 'idol',
    fullName : function(){
        return this.firstName + " "+ this.lastName;
    }
}

document.getElementById("one").innerHTML =
`${person.firstName} is ${person.age} years old.
${person.fullName()}`  ;

const human = new Object({
    firstName : "현진",
    lastName : "황",
    age: 24,
    job: 'idol',
    fullName : () => {
        return human.firstName + " "+ human.lastName;
    }
})

document.getElementById("two").innerHTML =
`${human.firstName} is ${human.age} years old.
${human.fullName()}`;


//생성자...........

function Iphone(display,spec,cam){ //(파라미터)

    this.dp = display;
    this.sp = spec;
    this.ca = cam;
}


const myFather = new Iphone("lg", 17, 2);
const myMather = new Iphone("lg", "mini", 2);


/*
position	기준	스크롤 시
static	기본 흐름	같이 움직임
relative	원래 위치 기준	같이 움직임
absolute	가장 가까운 position 조상 기준	같이 움직임
fixed	브라우저 화면 기준	안 움직임
sticky	원래는 흐름, 특정 위치 도달 시 고정	조건부 고정
*/