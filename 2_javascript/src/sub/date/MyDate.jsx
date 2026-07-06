import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const MyDate = ()=> {  //예약어는 변수명으로 사용할수 없음 const Date 에러남

    const [now, setNow] = useState(new Date());
    //부작용 실시간 업데이트 1초마다 새로운 데이트 객체 생성
    
    useEffect(()=> { //1초마다 시간 바뀜 구현
        const timer = setInterval(()=> {setNow(new Date());}, 1000)

        //⭐ 1초(1000ms)마다 현재 시간 객체를 새로 만들어서 변수에 쏙 집어넣음
        //컴포넌트가 사라질때 타이머정리 => 메모리 누수 방지 
        // ⭐화면에서 시계가 사라질 때 타이머를 확실하게 청소(Clean-up)해 줌!

        return () => clearInterval(timer);  //📜return(유언장)
        console.log("처음 한번만 실행")
    }, []);

     // 🚨 [] ⭐처음 켜질 때 딱 한 번만 타이머가 세팅
    // ,[count] => count값이 바뀔때마다 다시 그려줌...
    // 최악의상황 []빼먹었을때 ;1초마다 시간이 바뀔 때마다(리렌더링) 타이머가 매번 새로 계속 만들어져서
    //  타이머가 수천 개로 증식 -브라우저터짐
    
    //날짜 포맷팅 도우미 함수
    const formatDate = (date) => {
        const year= date.getFullYear();
        const month= String(date.getMonth()+1).padStart(2,'0') //0 ->1월, 11->12월
        // 무조건 두자리로 ... 한자리일때 맨앞에'0'채우기 ...
        //⭐padStart()는 오직 '문자열(String)'에만 쓸 수 있는 기능
        const day= String(date.getDate()).padStart(2, '0')
        const hours= String(date.getHours()).padStart(2, '0')
        const minutes= String(date.getMinutes()).padStart(2, '0')
        const seconds=String(date.getSeconds()).padStart(2, '0')
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = days[date.getDay()]

        return `${year}년 ${month} 월 ${day}일 (${dayOfWeek}) ${hours}: ${minutes}: ${seconds}`;
       }; 
        //getDay() ⚠️=> “요일 숫자” (0~6 일요일~토요일)
       


    //날짜 계산 함수 (ex 일주일뒤)
    const getNextWeek = () => {
        const future = new Date(); //오눌 날짜 기준으로 새로운 Date 객체 생성 
        future.setDate(future.getDate()+7); // 현재날짜에 7더함 
        return formatDate(future);
    }

    return(
        <>
        <Container>
            <Row>
                <Col>
                <h1 className="mt-5 mb-3">Date 객체 핵심</h1>
                <div className="bg-secondary p-5">
                    <h2 className="text-warning">1. 현재시간 실시간</h2>
                    <p className="display-1 text-warning">{formatDate(now)}</p>
                </div>
                <div className="bg-primary text-warning p-5">
                    <h2 className="mt-5 mb-3">2.날짜계산 7일뒤</h2>
                    <p><code>setDate(getDate()+7)</code>사용</p>
                    <p className="display-1">{getNextWeek()}</p>
                </div>
                </Col>
            </Row>
        </Container>
        
        </>
    )
};

export default MyDate;



/*
"화면이 다 그려진 후, 컴포넌트가 몰래 컴퓨터 뒷단에서 따로 처리해야 하는 '기타 작업'이 있을 때"

🎭 렌더링(화면 그리기) vs useEffect(기타 작업)

화면을 그리는 일(JSX 리턴): 배우들이 무대 위에서 대사를 치고 연기를 해서 관객(유저)들에게 
눈으로 보여주는 메인 작업입니다.

useEffect가 하는 일: 무대 뒤(비하인드)에서 스태프들이 조명을 끄고 켜거나, 배경 음악을 재생하거나,
 무대 장치를 세팅하는 일입니다.
 관객에게 직접 대사를 치는 건 아니지만, 연극이 굴러가려면 '부수적'으로 꼭 필요한 일들이죠.

 프로그래밍에서는 이를 부수 효과(Side Effect)라 부르고 리액트에서는 useEffect라고한다


 2. 💡 대표적으로 "언제" 쓰나요? (딱 4가지 상황)
내 눈앞에 보이는 HTML 태그를 그리는 일 외에, 뒷단에서 따로 돌아가야 하는 모든 일에 씁니다.

① 서버에서 데이터 가져올 때 (API 통신)
상황: 쇼핑몰 페이지가 딱 켜졌을 때, 화면 틀은 먼저 보여주고 상품 목록은 서버 DB에서 슥 긁어와서 채워 넣어야 합니다.

코드: 페이지가 처음 열리자마자 "서버야, 상품 데이터 좀 줘!" 하고 요청을 보낼 때 씁니다.

② 아까 우리가 만든 "타이머" 기능 (setInterval)
상황: 화면에 숫자가 가만히 있는 게 아니라, 자바스크립트 엔진이 뒷단에서 1초마다 시계를 째깍째깍 돌려야 합니다.

코드: 컴포넌트가 켜질 때 타이머를 구동하고, 꺼질 때 타이머를 부수는 작업을 할 때 씁니다.

③ 로컬 스토리지에 값 저장할 때 (자동 저장)
상황: 카운터 숫자가 바뀔 때마다 사용자가 버튼을 안 눌러도 자동으로 브라우저에 저장하고 싶습니다.

코드: count 상태 변수가 바뀔 때를 감시하고 있다가, 바뀌는 순간 스토리지에 .setItem()을 실행할 때 씁니다.

④ 이벤트 리스너를 달 때 (마우스, 키보드 감지)
상황: 유저가 키보드의 ESC 키를 누르면 모달창이 닫히게 만들고 싶습니다.

코드: 창이 열릴 때 브라우저 전체에 keydown 이벤트를 딱 붙여둘 때 씁니다.

3. ⚙️ 어떻게 쓰나요? (3가지 형태만 기억하세요)
useEffect는 맨 뒤에 붙는 대괄호([], 의존성 배열)를 어떻게 적느냐에 따라 성격이 완전히 바뀝니다. 이것만 외우면 끝이에요!

형태 1: 맨 뒤에 빈 배열 []을 넣을 때 (가장 많이 씀!)
⏱️ "이 컴포넌트가 처음 화면에 나타날 때 딱 한 번만 실행해라!"

useEffect(() => {
  console.log("화면이 처음 켜졌습니다. 서버에서 데이터를 가져올게요!");
}, []); // 👈 빈 대괄호

형태 2: 대괄호 안에 변수를 넣을 때 [count]
👁️ "너 가만히 감시하고 있다가, count 값이 바뀔 때마다 실행해라!"

useEffect(() => {
  console.log(`값이 ${count}로 바뀌었네요! 로컬 스토리지에 자동 저장합니다.`);
}, [count]); // 👈 count를 감시하겠다는 뜻

형태 3: 청소기 함수를 리턴할 때 (return () => {})
🧹 "이 컴포넌트가 화면에서 사라질 때(혹은 다음번 실행 직전에) 청소해라!"

useEffect(() => {
  const timer = setInterval(() => { console.log("째깍") }, 1000);

  // 뒷정리 (Clean-up)
  return () => {
    clearInterval(timer);
    console.log("화면이 꺼졌으니 타이머 청소 완료!");
  };
}, []);

🎯 최종 요약
화면을 그리는 메인 연기 외에, 
서버 통신 / 타이머 / 자동 저장 / 이벤트 감지 같은 무대 뒤 스태프의 작업이 필요하다면?
 ➔ 무조건 useEffect를 켠다!

처음 한 번만 실행하고 싶다면? ➔ 맨 뒤에 []를 붙인다!
 */