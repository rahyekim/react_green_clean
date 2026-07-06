
//세트만들기 일반적인 방법

const letters = new Set(["b","a","n","a","n","a"])

console.log(letters) //Set(3) 

document.getElementById('set').innerHTML = letters.size;

//비어진 값에 새로추가

const Null = new Set();

Null.add(1);
Null.add(3);
Null.add(2);
Null.add(4);
// document.getElementById('set').innerHTML = Null.size;


let txt1 = "";
let txt2 = "";

for (const letter of letters) {

    txt1 += letter;

}

for( const letter of Null) {

    txt2 += letter;
}

// document.getElementById('set').innerHTML = txt1 + txt2

const mySet = new Set(["사과", "바나나", "딸기"]);

mySet.forEach((value)=> {
    console.log(value);
})



