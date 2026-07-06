//lotto  ver2


function generateLotto(){

    
    const fixedNum = document.getElementById('fixedNums').value  //"2,7,10"
    const counts = parseInt(document.getElementById('counts').value,10)
    const resultDiv = document.getElementById('result')
    
    let html = "<h3>생성번호</h3>"
    const fixedNums = fixedNum ? fixedNum.split(',').map((num)=>(
        parseInt(num.trim()) 
    )) : [];

    if (fixedNums.length > 6) {
        alert("고정번호는 최대 6개까지 입력 가능합니다.");
        return;
    }

    if( fixedNums.some(num => !Number.isInteger(num) || num < 1|| num > 45)){
        alert ( "1~45 숫자를 입력하세요");
        return; // 👈 이 return 꼭필요 함수종료시켜야지,,
    }

    // if (fixedNums.some(num => isNaN(num) || num < 1 || num > 45)) {
    //     alert("1~45 사이의 숫자만 입력하세요.");
    //     return;
    // }
    //  isNaN() 보다 !Number.isInteger(값)추천 소수도 숫자니까...3.5..

    for ( let i=0 ; i < counts ; i++) {  //오천원 5번

        const halfLotto = new Set(fixedNums); //중복되지않는 주머니


        while( halfLotto.size < 6){  //6개가될때까지..
            
            let lotto = Math.floor( Math.random() * 45) + 1;

            halfLotto.add(lotto);
          
        }

            let rowLotto = Array.from(lottos).sort((a,b)=> a-b);

            html += `<p>${rowLotto.join(', ')}</p>`;
    
        }
                resultDiv.innerHTML = html;
}


/**
 ✨ && = 통과 조건
    || = 탈락 조건 ✨

?. = 💥 안 터지게 보호  null.name undefined.name 💥터짐-> 
        ?. 써서 에러막고 undefined 반환 => user?.name || "손님"(기본값)
&& = 🎯 조건 맞으면 실행   isAdmin && showAdminMenu()
|| = 🚨 하나라도 걸리면 반응 


//
 *  ✨입력 검증할 때 (true/false)✨
 * 
arr.some(...)   // 하나라도 만족하면 true // some안에 콜백함수(화살표함수)
arr.every(...)  // 전부 만족해야 true

------------------------------------------

arr.filter(...) // 만족하는 것만 새 배열 => 조건에 맞는거 전부반환(배열)
arr.find(...)   // 처음 만족하는 값 하나만 반환 
arr.map(...)    // 변환된 새 배열
 

fixedNums 안에

정수가 아니거나
1보다 작거나
45보다 큰 값이

하나라도 있냐? 검사 => 배열 안에 조건을 만족하는 요소가 하나라도 있으면 true
 * 

초보 때는 for문으로 다 하려고 하는데, some 한 줄로 표현할 수 있어서 가독성 
 */

/* 
중괄호 {} 쓰면 직접 return 해야 

중괄호 {} 없으면 자동 return

num => num * 2 ➡️ 자동 return //계산 한 줄이면 자동 return쓰는게 낫다

num => ({
    value: num 
}) 
    ➡️ 객체를 바로 반환하려면 괄호로 감싸야

num => {
    return num * 2; 
}
*/

