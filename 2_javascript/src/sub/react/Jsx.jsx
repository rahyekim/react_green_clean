import { useState, useEffect } from "react"


export default function Jsx () { //본 함수형 컴포넌트... 

    const hp = 218 * 1.36 ;
    const myobj = {
        name : "BMW", model: "640" , color: "red"
    }

    // 🚨 만약 함수를 만들경우 상단에 쓴다 
    function kwtohp (kw) {
        //함수는 리턴을 실행시키고 종료
        return kw*1.36 
    } ;

    const x = "myclass";
    
    const mystyles= { color: "white", fontSize: "20px", backgroundColor: "pink" , border: "1px solid aqua" }

    let value = 12;

    const q= 17;
    let w= "apple";
    if (q < 10) { w = "banana";}

    //🔥 if 컴포넌트 추상화 =
    function If ({condition, children}){
        return condition ? children : null;
    } 
    //조건에 따라 보여줄 화면을 별도 컴포넌트로 분리해서 코드 깔끔하게 만드는 것"
    //<If condition={user.isAdmin}> <AdminPanel/> </If>
    // => {isAdmin && <AdminPage />}
    return(
        <>
        <h1>Javascript XML</h1>  {/*hxml은 고정된 태그 xml은 내가 사용할 태그를 만들어씀*/}
        <p>
            (1) jsx의 가장 강력한 기능 중 하나는 자바스크립트 표현식을 마크업내 직접 사용한다
            (ex) 변수를 만든 다음 중괄호 안에 표시 할 수 있다.
        </p>
        <p> 1번 예시 : it has {hp} horse power </p>
        <p> 2번 예시 : 표현식안에서 함수를 호출할 수 있다 
            it has {kwtohp(218)}
        </p>
        <p> 3번 예시 : 객체속성을 참조할 수있다
            My car is a {myobj.name} and {myobj.model} and {myobj.color}    
        </p>
        <p className={x}>
            4번 예시 : 동적 className를 사용할 때 좋다. 클래스명 간단히 관리! {/*은닉시킬수있다*/}
        </p>
        <p style={mystyles}> 
            5번 예시 : 변수로 스타일 선언
        </p>
        <p> 리액트에서는 if를 지원하지만 ❌jsx에서는 내부에서 사용할 수 없어서 외부로 내보내거나
             ✅삼항연산자 사용해야함
           <br/> 6번예시:  { value < 10 ? "바나나" : "사과"}
           <br/> 위에서 if사용: {w}
        </p>
        <p>
         📍 if 컴포넌트 추상화.. user.isAdmin 일시 관리자 화면 !user.isAdmin 그냥 유저일시 유저화면
        </p>
        {/*
        <div>
        📍 <If condition={user.isAdmin}>
                <AdminPanel/>
            </If>
        📍 <If condition={!user.isAdmin}>
                <StandardPanel/>
            </If>
        </div>
        */}
        </>
    )
};

