import { useState } from "react";
import { Container, Row, Col, Button, Spinner, Alert, Form} from "react-bootstrap";
//📝 실사 예제 1. 할 일 목록 (Todo List)

//겅부해라 ㅋㅋ

//📝 실사 예제 2. 회원가입 Form (객체 State + 로딩 처리)

const Practice = ()=>{
    //1여러 입력값을 객체 하나로 묶어서 관리
    const [formData, setFormData] =useState({
        email: "",
        password: "",
        nickname: ""
    });

    const[isLoading, setIsLoading] = useState(false);
    const[isSuccess, setIsSuccess] = useState(false);

    //2.모든 인풋창을 하나로 지배하는 만능 onChange함수
    const handleInputChange = e =>{
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev, 
            [name] : value
        }));
    }

    //3. 가입버튼 눌렀을 떄 실행
    const handleSignupSubmit = async (e)=> {

        e.preventDefault();
        setIsLoading(true); //로딩 스위치 on

        //가짜 서버와 통신하는 2초짜리 타이머  
        //resolve()가 울릴 때까지 이 밑으로 절대 아무도 못 지나간다!"
        await new Promise((resolve)=> setTimeout(resolve, 5000));

        setIsLoading(false); //통신 끝났으니 로딩 스위치 off
        setIsSuccess(true); // 성공알림켜기
        
        console.log("서버로 전송된 데이터", formData);
    };

    return(
        <>
        <Container className="mt-5" style={{maxWidth:'400px'}}>
            <Row>
                <Col>
                    <h2 className="mb-4"> 🔐 회원가입 </h2>
                    {isSuccess && <Alert variant="success">🎉 회원가입이 완료되었습니다!</Alert>}

                    <Form onSubmit={handleSignupSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>이메일 주소:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="example@email.com"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>비밀번호:</Form.Label>
                            <Form.Control
                                type="password"
                                name="password" // 👈 formData의 key와 똑같이 맞춰주는 게 핵심!
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="비밀번호입력"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>닉네임</Form.Label>
                            <Form.Control
                                type="text"
                                name="nickname" //👈 formData의 key와 똑같이 맞춰주는 게 핵심!
                                value={formData.nickname}
                                onChange={handleInputChange}
                                placeholder="닉네임"
                                required
                            />
                        </Form.Group>

                   
                    {/* 로딩 중일 떄는 버튼을 못누르게 막고 disabled 스피너보여줌  */}
                    <Button variant="primary" type="submit" className="w-100"
                    disabled={isLoading}>{isLoading ? (
                        <>
                        <Spinner as="span" animation="border" size="sm" 
                        role="status" aria-hidden="true" className="me-2" />
                        🚨 가입요청중...
                        </>
                    ) : "가입하기" } </Button>

                    </Form>
                </Col>

            </Row>
        </Container>

       
        
        </>
    )
};

export default Practice;
