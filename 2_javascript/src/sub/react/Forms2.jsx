import { useState } from "react";
import { Container, Row, Col, Button, Form, Alert} from "react-bootstrap";

const Forms2 = ()=> {
    //(1) 다중입력 기존에는 원시값 적용했었음 블록이 아닌 리턴하는것이 객체..

    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        //const {name, value} = e.target;

        setInputs(prev => ({
            ...prev,
            [name] : value
        }))
    } 

    // const handleChanage = (e) => {
    //     const { name , value} = e.target;

    //     setInputs(prev => ({
    //         ...prev,
    //         [name]:value
    //     }))
    // }

   
    /*
    values: 리액트에서 이전상태를 안전하게 가져와서 다음상태를 만들때 사용하는 함수형 업데이트 방식
    ...values: 스프레드 연산자 기존객체의 내용을 그대로 복사해서 전개 펼쳐놓는다...
    ⚠️ React 는 상태가 변경 되었음을 감지할때 주소값을 비교하기 때문에 ⚠️ 
    ⚠️ 기존객체를 직접 수정하면 안되고 반드시 새로운 객체를 만들어야 한다. ⚠️ 

    [name]: value 계산된속성명 변수 name에 담긴 문자열을 그대로 객체의 key로 사용하겠다는 뜻

    이렇게 쓰는 이유?
    입력창이 5개일때 5개에 대한 useState를 만들어야 하므로 불편하다

    name만 잘 적어주면 입력창이 10개든 100개든 단하나의 함수로 처리할 수 있다

    e.target : 이벤트가 발생한 input 태그 자체
    name : input태그의 name속성값 ( name="username")
    value: 사용자가 현재  input창에 타이핑한 속성 값
    
    */

    
    
    //(2) 체크박스 👉 (ON/OFF) checked 가 중요
    /*
    true -> 체크됨 ☑️ 
    false → 체크 안됨 ⬜ 
    여러개 선택 객체필요
    checked={true / false}

    */
    const [checks, setChecks] = useState({  //초기값 넣어줘야 안전 
        firstname: "",
        lastname: "",
        tomato: false,
        lettuce: false
    });

    //e.target.checked → true / false
    const checkChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setChecks(prev => ({
            ...prev,
            [name] : value
        }))
    }
    /*🚀
        const handleChange = (e) => {
        const { name, checked } = e.target;

        setChecks(prev => ({
            ...prev,
            [name]: checked
        }));
        };
    ✔️
    const checkChange = (e) => {
    const { name, type, value, checked } = e.target;

    setChecks(prev => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value
  }));
}; 
    */

    const checkSubmit = (e) => {

        e.preventDefault();

        let fillings = '';

        if(checks.tomato) fillings+= 'tomato';
        if(checks.lettuce) {
            if(checks.tomato) fillings += ' and '; 
            fillings += 'lettuce';

        }

        if(fillings ===  '') fillings = 'nofilling';
        alert( `${checks.firstname} wants a bugur with ${fillings}`) 
    }
    
    
    //(3) 라디오 //여러개 중  하나 선택 👉 "무엇을 선택했느냐 (value)가 중요

    const [selectedFruits, setSelectedFruits] = useState("");

    const radioChange = (e)=>{
        setSelectedFruits(e.target.value)
    }

    const radioSubmit = e => {
        e.preventDefault();

        Alert(`your favorite 과일은 : ${selectedFruits}`)
    }
    //(4) 리스트

    const cars =[
        {id:1001, brand: 'ford'},
        {id:1002, brand: 'bmw'},
        {id:1003, brand: 'benz'},

    ]
    
    
    
    

    return(
        <>
        <Container fluid>
            <Row>
                <Col md={3}>
                <h1>Multiple Inputs <small>다중입력처리</small></h1>
                <Form>
                    <Form.Group>
                    <label htmlFor="">first Name:</label>
                    <input type="text" name="firstname" value={inputs.firstname} onChange={handleChange} />
                    <label htmlFor="">Last Name:</label>
                    <input type="text" name="lastname" value={inputs.lastname} onChange={handleChange} />
                    </Form.Group>
                    <p>current values:{inputs.firstname} {inputs.lastname} </p>
                </Form>
                </Col>

                <Col md={3}>
                <h1>CheckBox</h1>
                <Form onSubmit={checkSubmit}>
                    <Form.Label htmlFor="">My name is :</Form.Label>
                    <Form.Control type="text" onChange={checkChange} name="firstname" value={checks.firstname} />
                    <p> i want a burger with :</p>

                    <label htmlFor="">토마토:</label>
                    <input type="checkbox" name="tomato" onChange={checkChange} checked={checks.tomato}/>
                    <label htmlFor="">상추:</label>
                    <input type="checkbox" name="lettuce" onChange={checkChange} checked={checks.lettuce}/>
                    
                    <Button variant="outline-primary" type="submit"> 버튼</Button>
                </Form>
                   
            
                </Col>

                <Col md={3}>
                <h1>Radio</h1>
                <Form onSubmit={radioSubmit}>
                    <p> 먹고싶은 과일 골라 :</p>
                    <label htmlFor="apple">사과</label>
                    <input type="radio" name="fruits" id="apple" value="apple" checked={selectedFruits === 'apple'} onChange={radioChange} />
                    <label htmlFor="tomato">tomato</label>
                    <input type="radio" name="fruits" id="tomato" value="tomato" checked={selectedFruits === 'tomato'} onChange={radioChange} />
                    <Form.Label htmlFor="banana">바나나</Form.Label>
                    <input type="radio" name="fruits" id="banana" value="banana" checked={selectedFruits === 'banana'} onChange={radioChange} />
                </Form>
                </Col>

                <Col md={3}>
                <h1>Lists</h1>
                <h2>My cars:</h2>
                <ul>
                    {cars.map((car)=> (
                        <li key={car.id}> iam a {car.brand} </li>
                    ))}
                </ul>
                <h2>keys: </h2>
                <ul>
                    {cars.map((car)=> (
                        <li key={car.id}> iam a {car.id}</li>
                    ))}
                </ul>
                </Col>

                <Col md={3}>
                <h1></h1>
                </Col>
            </Row>
        </Container>
        </>
    )
};

export default Forms2;