import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form , Alert } from "react-bootstrap";

const Hooks = () => {

    const [color, setColor] = useState("blue");

    
    
    
    return(
        <>
        <Container fluid style={{border: "2px solid lightblue", borderRadius: "25px"}}>
            <Row>
                <Col md={12}>
                <h1 className="mt-4 mb-2">React Hooks</h1>
                <h2>: 리액트 v16.8  </h2>
                <h3>리액트의 핵심 기능들을 갈고리처럼 걸어서 사용한다고 하여 후크</h3>
                  
                  React 기능을 함수 컴포넌트에서 사용할 수 있게 해주는 함수(옛날엔 클래스 컴포넌트😭 )
                
                <p>(1)훅을 사용하는 이유
                    - 코드의 간결함: 클래스형 특유의 복잡한 문법을 사용하지 않는다
                    - 로직의 재사용성: 내가만든 커스텀 훅을 사용하면 서로다른 컴포넌트에서
                    상태관리 로직을 쉽게 공유해 사용
                    
                    (2) 가장 자주쓰는 핵심 훅
                    ✔️ useState  (상태관리 훅) 
                    ✔️ useEffect (side effect 처리 훅)
                    ✔️ useRef    (저장공간 및 DOM 접근) 
                    
                    (3) 훅을 사용할때 어기면 안되는 규칙 2가지
                    ⚠️ 최상위에서만 호출
                    ⚠️ 리액트 함수내에서만 호출 
                </p>

                </Col>
            </Row>

            <Row>
                <Col md={3}>
                <h1>my favorite color is {color} ! </h1>
                <button onClick={()=>setColor("yellow")}>yellow색깔</button>
                <button onClick={()=>setColor("blue")}>blue색깔</button>

                <h1>useState : 저장소 </h1>
                <h3>컴포넌트에서 상태를 추적 할수있다.</h3>
                </Col>
                
                <Col md={3}>
                <h1>useEffect</h1>
                <h3>구성요소에 부작용을 발생시킬 수 있다</h3>
                <h2>"언제 실행할지" 정하는 Hook //🎯 감시카메라
                  []:  화면에 처음 나타날 때 한 번 실행
                  [count]: count가 바뀔 때마다 실행
                </h2>
                <code>
                    {/*
                    useEffect(()=>{
                        setTimeout((),3000)
                    return ()=>cleanTimeout()} , []) */}
                </code>
                </Col>
                <Col md={3}>
                <h1>✅ useContext</h1>
                <h3>다섯명에게 전달을 할 때 1-2-3-4-5 차례대로가 아니라
                    1-5번으로 간편하게 전달 가능</h3>
                <p> props를 사용하는데 절차 복잡하여 
                    useContext.Provider 를 사용하면 좀 더 원활하게 전달 할 수있다
                </p>
                </Col>
                <Col md={3}>
                <h1>✅useRef: DOM 접근하거나 값 저장🎯 </h1>
                <h2>렌더링 간에 값을 유지함 1초전에 값이 30 현재는 35
                🌱과거의 값을 추적....하고 변경가능한 값을 저장하는데 사용할수있음
                </h2>
                <p>리렌더링을 유발하지않는다.</p>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                <h1>✅ useReducer</h1>
                <h3>useState랑 동일하지만 사용자 정의 상태 로직을 허용하기에 
                    복잡한 논리에 의존하는 여러 상태 정보를 추적해야 하는경우
                    userReducer를 사용하는 편이 좋다
                </h3>

                </Col>

                <Col md={3}>
                <h1>✅ useCallback</h1>
                <h3> 콜백함수를 메모이제이션 하는데 사용된다
                    함수결과를 캐싱하여 다시 계산할 필요가 없도록한다 
                    저번에 했잖아 지겹지않니? 
                </h3>
                
                </Col>
                <Col md={3}>
                <h1>✅ useMemo</h1>
                <h3>메모리제이션된 값을 리턴</h3>
                </Col>
                <Col md={3}>
                <h1>✅Custom hook </h1>
                <h3>json으로 제목을 달았는데 이걸 다른 컴포넌트에서도 
                    동일하게 사용하고 싶어서 본을 떠서 만들어 놓음
                </h3>
                </Col>
            </Row>
        </Container>
        </>
    )
};

export default Hooks;