
function generateLotto(){
    const fixedNum = document.getElementById('fixedNum').value;
    //사용자가 입력창에 적은 고정으로 뽑고 싶은 번호들을 가져온다
    const count = parseInt(document.getElementById('combo').value);
    //사용자가 선택한 몇개임을 생성하지 에 대한 숫자를 가져옵니다
    //parseInt는 문자를 숫자로 바꿔주는 도구
    const resultDiv = document.getElementById('result');
//결과를 화면에 보여줄 html공간을 찾아내서  resultDiv이름으로 준비   

//2단계 데이터가공 
    const selectNums = fixedNum ? fixedNum.split(',').map(
    num => parseInt(num.trim()) 
    ) : [];
/*쪼갠 각각의 글자 앞뒤의 공백을(trim()) 없애고 숫자로 바꾼다(parseint)
값이 없으면 빈 배열[]
*/
//로또 생성 루프시작
    let html = "<h3>생성된 번호</h3>";

    for(let i=0 ; i < count; i++){//지정된 범위까지 반복

        let halfLotto = new Set(selectNums);
        //중복되지 않는 고정수가 들어간 주머니를 만듬 Set(중복제거)

        while(halfLotto.size < 6){//번호가 6개 될때까지..
        let autoLotto = Math.floor(Math.random() * 45)+1; 
//0 ~ 0.9999 거기다가 45를 곱해서 0 .44.999 // floor(0~44.9999) +1 =1~45
        halfLotto.add(autoLotto)//뽑은 번호를 주머니에 넣음
        }

        let lotto = Array.from(halfLotto).toSorted( (a,b) => a-b)
//정렬을 이용하여 작은숫자부터 큰숫자로 // b-a 내림차순 

        html += `<p>${lotto.join(', ')}</p>`
        //정렬된 번호들을 쉼표로 묶어서(join)화면에 보여줄 문구(html)뒤에 덧붙임
    }
    resultDiv.innerHTML = html;
}

/*

parseInt는 "공백이나 부호 떼고, 처음 마주치는 숫자부터 문자 직전까지만" 
쏙 뽑아내는 친구  // 문자열에서 정수만 뽑고 싶을때

그래서 첫 대가리(?)에 숫자가 안 보이면 바로 포기해 버립니다!-> NaN
parseInt("2026년") ➡️ 2026
parseInt("No.1") ➡️ NaN

parseInt("-50") ➡️ -50
parseInt("   42") ➡️ 42

2진수 16진수로도 파싱가능... parseInt( ,10) 10진수가기본..
*/

/*
💡HTML 태그의 속성(Attribute) 값들은 
전부 💡문자열 데이터 타입
①: 오늘 배운 parseInt() 쓰기 
②: 더 간단하게 Number() 쓰기

*/