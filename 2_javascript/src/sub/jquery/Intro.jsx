import { useState, useEffect, useRef } from "react";
import { Container,Col, Row, Button } from "react-bootstrap";
import $ from "jquery"; //jquery에서는 🔥 선택자 개념 $ 🔥 이 중요하다

/*
💡 useRef : React안에서 특정 HTML 태그를 콕 찝어내기 위한 이름표 💡
$(document) $('#box') ❌ 이런것처럼 jquery에 <id나 className(.) 이 아닌> 😄 useRef를 사용하는것이 안전 
*/
function Intro() {

    const boxRef = useRef(null);
    const buttonRef = useRef(null);

    //😄 useEffect 화면이 완전히 그려진 다음에 jquery를 실행하도록 보장 
    // useRef로 잡아둔 태그를 jQuery 객체로 만들어줌 
    // jQ 는 애니메이션잘됨... 
    useEffect(() => {

        //🎯 jq 특유의 애니메이션 slideToggle이벤트만들기  //useRef로 만든 값은 항상 **.current**라는 주머니 안에 저장
        const $box = $(boxRef.current);
        const $button = $(buttonRef.current);

        $button.on('click', () => {
            $box.slideToggle('slow');
        });
        /* 💥 클린업 정리 함수 //컴포넌트가 사라질때 이벤트도 꼭 지워줘야 한다 ⚡️
            화면을 나갔다가 들어올때 마다 클릭 이벤트가 2개 3개씩 생성된다
*/
        return () => { $button.off('click'); };


    }, []);


    return (
        <>
            <button ref={buttonRef}>토글버튼</button>
            <div ref={boxRef}> Jquery 박스 </div>



            <h1>Jquery</h1>
            <pre>
                과거 리액트가 생기기전에 아주 훌륭한ㄷ ㅐ안
                하늘에 태양이 두개있을 수 없음...
                jquery: 화면에 있는 태그를 직접 잡아서 색깔도 바꾸고 애니메이션을 넣어라
                react: 데이터 (state) 만 바꿔...
                리액트가 화면을 관리하고 있는데 jquery가 몰래 화면을 바꿔버리면 리액트 헷갈려 심각한 버그 발생....
                과거에 만들어진 아주 훌륭한 jquery플러그인( 달력 슬라이더)을 사용하는 것이 원칙..
                best로만들어진것만사용...하자...
            </pre>

        </>
    );
}

export default Intro;