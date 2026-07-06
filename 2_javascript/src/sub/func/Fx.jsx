// 리액트에서 이벤트를 발생하려면 상태관리를 사용해야됨... useState
//  {useState 상태관리 , useEffect 부수적인효과[부작용]}
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

//useEffect : 특정값이 변할때 실행할 로직을 관리;
/*
Number(saved ?? 0) ➔ undefined나 null이면 0으로 바꿔서 Number(0)을 하니 최종 결과는 0!
Number(saved) || 0 ➔ Number(undefined)가 NaN이 되어도 ||가 0으로 바꿔주니 최종 결과는 0!
|| 연산자는 null, undefined, 공백 문자열 "", 숫자 0 
다 거짓(false)으로 소화해서 0으로 바꿔줌
*/
const Fx = () => {

    /* 1.초기값 설정: 로컬 스토리지에서 값을 불러오거나 없으면 0으로 설정 */

    const[count, setCount]=useState(()=>{
        const saved = localStorage.getItem("count")
        return saved !==null ? Number(saved) : 0 ;  // Number(saved) || 0

        // //⭐ 2. 자동 저장 카메라 설치 (useEffect)
        // useEffect(()=>{
        //     localStorage.setItem("count", count.toString())
        // }, [count])

        // const handleIncrement = () => setCount(prev=> prev+1)
        

        // const handleDecline = ()=> setCount(prev=> prev-1);

        // const reset = ()=> setCount(0)
        
        //localstorage: 브라우저 저장소 에서 count키를 가진 데이터를 가져온다
        
        /*
        count는 현재값을 저장하는 변수
        setCount 그 값을 변경할때 사용하는 함수
        📌useState(()=>{...}) 컴포넌트가 처음 렌더링 될 때 딱 한번 실행하는 초기화 로직

        (모든개발은 똑같다 ..java..getter 세팅하는것 setter)
        */
    });

    /* 2.저장함수 count의 값을 localstorage 문자열 형태로 저장 (count라는 칸에다가)
    브라우저 보관함이 약간 멍청해서 '글자(문자열)' 형태로만 물건을 맡아줍니다*/

    const saveCount = () => {
        localStorage.setItem("count", count.toString())
        alert("현재 값이 저장되었음")
    };
    /* 3. 불러오기 함수(필요시 직접 혹은 초기 로딩시 자동적용
    
    loadCount: localstorage에서 데이터를 다시 불러와 
            setCount를 통해 count값을 업데이트하여 화면에 반영
    */

    const loadCount = () => { 
        const saved= localStorage.getItem("count");

        if(saved!==null){
            setCount(Number(saved));
        }
    }
    
    return(
        <>
        <Container>
            <Row>
                <Col>
                <h1 className="display-1 mt-5 mb-3 text-primary">{count}</h1>
                <div className="">
                    <Button onClick={()=>setCount(prev=>prev+1)}>+</Button>
                    <Button onClick={()=>setCount(prev=>prev-1)}>-</Button>
                    <Button onClick={()=>setCount(0)}>RESET</Button>
                    <Button onClick={saveCount}>SAVE</Button>
                    <Button onClick={loadCount}>LOAD</Button>
                </div>
                </Col>
            </Row>
        </Container>
        
        </>
    )
};

export default Fx;


/*
📌 useState 안의 콜백 함수 (게으른 초기화: Lazy Initialization)
왜 함수 형태로 넣었을까? 그냥 값을 넣으면 컴포넌트가 내부에 글자 하나 바뀔 때마다(리렌더링) 
매번 로컬 스토리지를 뒤적거려서 컴퓨터가 느려집니다. 이렇게 함수 () => {...} 형태로 감싸주면, 
"컴포넌트가 세상에 처음 태어날 때(최초 렌더링) 딱 한 번만" 
스토리지를 뒤져서 초기값을 세팅하므로 성능이 엄청나게 좋아집니다.

💡 브라우저 저장소 (LocalStorage) 다루기
저장할 때 (setItem): 로컬 스토리지는 오직 '문자열(String)'만 저장할 수 있는 똑똑하지만 멍청한 저장소입니다.
그래서 숫자인 count를 그대로 넣지 않고 .toString()으로 문자로 바꿔서 집어넣었습니다.

불러올 때 (getItem): 꺼내올 때도 문자열로 나오기 때문에, 화면에 숫자로 그리거나 계산하기 위해서 
Number(saved)를 통해 다시 숫자로 변환(형변환)해 준 것입니다.

🔥[챌린지 코드 예시]
saveCount 함수와 SAVE 버튼을 아예 지워버리고, 코드 중간에 이걸 슬쩍 넣어보세요.
// count 값이 변할 때마다(부수 효과) 알아서 로컬 스토리지에 자동 저장해라!
useEffect(() => {
    localStorage.setItem("count", count.toString());
}, [count]); // <--- 감시할 대상으로 count를 딱 찍어두는 것!


**💡 브라우저 저장소 (LocalStorage)** 컴퓨터를 껐다 켜도 영구 보존, 여러 탭, 여러 창에서 전부 공유됨

1. 🔑 로그인 상태 유지 ("로그인 기억하기")
웹사이트에 로그인한 후, 페이지를 새로고침하거나 창을 닫았다가 다시 켰을 때 또 로그인하라고 하면 엄청 짜증 나겠죠?

유저가 로그인에 성공하면 서버에서 발급해 준 인증 토큰(JWT 등)을 브라우저 저장소에 보관해 둡니다.

브라우저는 페이지가 켜질 때마다 "저장소에 토큰이 있네? 로그인된 유저구나!" 하고 알아서 회원 화면을 보여줍니다.

2. 🛒 쇼핑몰 장바구니 & 비회원 기능
쿠팡이나 아마존 같은 곳에서 로그인을 안 한 상태로 장바구니에 상품을 담아도 그대로 유지되는 걸 보셨을 겁니다.

비회원 데이터는 서버 DB에 저장할 수 없기 때문에, 우선 사용자의 브라우저 저장소에 상품 ID 배열을 ['prod_01', 'prod_02'] 형태로 저장해 둡니다.

3. 🌙 다크 모드 / 라이트 모드 설정
유저가 화면 우측 상단 해 모양 버튼을 눌러 '다크 모드'로 바꿨다면, 이 설정을 브라우저 저장소에 theme: 'dark'라고 저장해 둡니다.

다음번에 유저가 접속했을 때 이 값을 읽어서 눈이 아프지 않게 처음부터 다크 모드로 화면을 켜줍니다.

4. ❌ "오늘 하루 이 창 열지 않기" 팝업창
홈페이지에 접속했을 때 뜨는 이벤트 팝업창에서 '오늘 하루 보지 않기'를 누르면, 브라우저 저장소에 hidePopup: '2026-06-22' 같은 형태로 날짜를 기록해 둡니다.

브라우저는 매번 켤 때마다 저장소를 확인해서 오늘 날짜가 적혀있으면 팝업창을 띄우지 않고 숨깁니다.

5. ✍️ 글쓰기 임시 저장 기능
블로그나 카페에서 장문의 글을 쓰다가 실수로 브라우저 창을 닫거나 컴퓨터가 꺼졌을 때, 다시 들어가면 "작성 중이던 글이 있습니다. 불러오시겠습니까?" 문구가 뜨는 기능입니다.

유저가 키보드를 칠 때마다 그 내용을 실시간으로 브라우저 저장소에 임시 저장(Backup)해 두기 때문에 가능한 기능입니다.

*/

/*
브라우저 저장소 3대장
LocalStorage (가장 많이 씀) : 브라우저를 껐다 켜도 데이터가 평생 안 지워짐 (직접 지우기 전까지)
ex) 다크모드 설정, 자동 로그인 토큰, 오늘 하루 창 열지 않기

SessionStorage : 현재 탭을 닫으면 데이터가 즉시 날아감
입력 폼 임시 저장, 일회성 보안 인증 정보, 페이지 새로고침 시 상태 유지

IndexedDB : 수백 MB 이상의 대용량 데이터를 저장할 수 있는 브라우저 안의 작은 DB
오프라인 웹 앱, 웹 게임 데이터 저장
*/

/*
💡 sessionStorage는 '딱 이럴 때' 씁니다 
브라우저 탭을 닫으면 데이터가 그 즉시 흔적도 없이 사라진다
오직 현재 탭 하나에서만 독립적으로 작동

💳 은행/금융 사이트나 쇼핑몰 결제 페이지 (보안)
📝 회원가입, 설문조사 등 "여러 단계"로 이뤄진 입력창
🔄 쇼핑몰 상세 페이지 보고 '뒤로 가기' 했을 때 스크롤 위치 기억
*/