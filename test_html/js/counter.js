let count = 0; // 숫자를 담을 그릇을 만들고 0으로 

// let 은 바꿀수있는 변수에 선언
// html요소 가져오기 => 화면에 있는 태그들을 자바스크립트가 제어하게 데려오겟음
/*
 * HTML = 화면(버튼/숫자/박스)
JS = 그 화면을 조종하는 ...
getElementById = 화면 특정 부품(요소..div,button) 통째로 꺼내서 가져오기...

 */


const display= document.getElementById('number')
const upBtn= document.getElementById('up')
const downBtn= document.getElementById('down')

// 3. 이벤트 설정 대상 .addEventListener("이벤트 종류", 실행할 함수)
// 웹페이지에서 우리가 하는 모든 행동(클릭,키보드입력,마우스움직임 등)
// 컴퓨터가 알 수 있게 해주는 귀 역할
upBtn.addEventListener('click', ()=>{
    count ++ ;
    display.textContent = count; //화면에 출력 
})

downBtn.addEventListener('click', ()=>{
    count --;
    display.textContent = count;
})