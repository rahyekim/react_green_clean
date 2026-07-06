import { useState } from "react"; //상태관리 선언
import { Container, Row, Col, Button,Form } from "react-bootstrap";

const Re = ()=>{

    // 초기값셋팅
    const [num, setNum] = useState(10); // 재귀함수에서 시작하는 값 셋팅
    const [result, setResult] = useState(0); //  


    //재귀함수: 1부터 n까지의 합을 구함...
        const sumRecurive = (n)=> {
            if(n<=1) return n;
            return n+ sumRecurive(n-1);

            /*종료조건(Base case): n이 1이하가 되면 1을 반환하고 멈충 
            10 9 .....2..1
            재귀호출(Recursive Step): n+(n-1까지의합)
            */

        }

    
    return(
        <>
        <Container>
            <Row>
                <Col>
                <Form.Control
                type="number" //유저가 오직 숫자만 타이핑할 수 있게
                value={num}  //브라우저는 무조건 문자열("5", "10") 형태로 우리에게줌
                onChange={(e)=> setNum(Number(e.target.value))}/> 

                {/*🚨사용자가 입력요소 input,textarea, select 등이
                상호작용하여 값이 변경될때마다 실행되는 이벤트= onChange🚨
                💡 (e) 이벤트가 발생할때 브라우저가 넘겨주는 이벤트 객체
                setNumber useState를 통해 만들어진 상태변경함수...
                e.target => input 
                .value => 값 태그에 적힌 글자..
                 */}
                <Button onClick={()=>setResult(sumRecurive(num))}>
                합계 계산하기</Button>
                <p>결과:{result}</p>

                </Col>
            </Row>
        </Container>
        </>
    )
};

export default Re;

/*

🔍 value={변수}의 진짜 의미
일반 HTML에서는 인풋창에 사용자가 키보드로 123이라고 치면 글자가 화면에 그냥 입력됩니다.

리액트는 "인풋창에 보일 글자는 무조건 자바스크립트 변수(num)에 적혀있는 대로만 보여라!" 
하고 통제권을 쥐어잡습니다.
value={num}은 "이 인풋창의 값은 num 변수와 연결되어 있다"라는 뜻
💡 사용자가 키보드를 누름
💡 onChange가 감지: "어? 입력값이 바뀌었네?" 하고 setNum(Number(e.target.value))를 실행해서
 변수 num 안에 들어있는 값을 새로운 숫자로 바꿔버립니다.
💡 화면 업데이트: 변수 num이 바뀌었으니 
리액트가 화면을 다시 그리면서 value={num} 자리에 바뀐 변수 값을 꽂아 넣습니다.


만약 변수가 아니라 value="10"처럼 고정된 값을 주면?? => 화면에는 무조건 10만 고정
*/


