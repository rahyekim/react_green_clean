import {  useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import {Container, Row, Col, Button, Card, Form} from 'react-bootstrap'
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";

import * as S from '../DashBoard.styled'

export const Login = ()=>{

    const navigate = useNavigate();

    //사용자가 입력한 이메일과 패스워드를 담을 바구니(상태)
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const [rememberme, setRememberme] = useState(false);

    //로그인 버튼을 누를때 실행되는 함수
    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();

        //유효성검사
        if(!email || !password){
            alert("이메일과 비밀번호 모두 입력해주세요")
            return;
        }
        try{
            const res = await axios.post('http://localhost:5000/api/users/login', {email,password})
            alert(`${res.data.name}님, ${res.data.message}`)
            navigate('/admin')

        }catch(err:any){
            if(err.response && err.response.data){
                alert(err.response.data.message);
            }else{
                alert("로그인중 에러발생");
            }
        }
    };

    return(
        <>
        <S.Background>
            {/* 리액트부트스트랩사용... */}
            <Container>
                <Row className="justify-content-center">
                    <Col xl={10} lg={12} md={9}>
                    <Card className="o-hidden border-0 shadow-lg my-5">
                        <Card.Body>
                            <Row>
                                <Col lg={6} className="d-none d-lg-block bg-login-image"></Col>
                                <Col lg={6}>
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-500 mb-4">💙Welcome back💙</h1>
                                        <form className="user" onSubmit={handleSubmit}>
                                            <div className="form-group mb-3">
                                                <Form.Label className="fw-bold small text-secondary ps-0 mb-1">
                                                    이메일 주소
                                                </Form.Label>
                                                <Form.Control 
                                                type="email"
                                                className="form-control-user"
                                                placeholder="Enter email address..."
                                                value={email}
                                                onChange={e=>setEmail(e.target.value)}
                                                required
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <Form.Label className="fw-bold small text-secondary ps-0 mb-1">
                                                    비밀번호
                                                </Form.Label>
                                                <Form.Control 
                                                type="password"
                                                className="form-control-user"
                                                placeholder="Enter password..."
                                                value={password}
                                                onChange={e=>setPassword(e.target.value)}
                                                required
                                                />
                                            </div>
                                            {/* 아이디 기억하기 체크박스 */}
                                            <div className="form-group mb-3">
                                                <div className="custom-control custom-checkbox small">
                                                    <Form.Control
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id="customCheck"
                                                    />
                                                    <Form.Label className="custom-control-label"
                                                    htmlFor="customCheck">
                                                        Remember me
                                                    </Form.Label>

                                                    <Button 
                                                    type="submit"
                                                    variant="primary"
                                                    className="btn btn-block w-100 mb-2"
                                                    >login</Button>

                                                    <hr />

                                                    <Button 
                                                    type="submit"
                                                    variant="primary"
                                                    className="btn-user btn-block btn-google w-100 mb-2"
                                                    >
                                                        <FontAwesomeIcon icon={faGoogle} className="fa-fw"/>
                                                        login with google
                                                    </Button>

                                                     <Button 
                                                    type="submit"
                                                    variant="primary"
                                                    className="btn-user btn-block btn-facebook w-100 mb-2"
                                                    >
                                                        <FontAwesomeIcon icon={faFacebookF} className="fa-fw"/>
                                                        login with facebook
                                                    </Button>

                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                </Col>
                            </Row>

                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
            
        </S.Background>

        </>
    )
};

/*


 아이디 기억하기 토글 스위치 
<div className="form-group mb-3 text-start">
  <Form.Check 
    type="switch"
    id="remember-me-switch"
    label="Remember Me"
    className="small text-secondary fw-bold"
    checked={rememberMe}
    onChange={(e) => setRememberMe(e.target.checked)}
  />
</div>




import { FloatingLabel, Form } from 'react-bootstrap'; // 💡 FloatingLabel 임포트 필요

<FloatingLabel 
  controlId="floatingEmail" 
  label="이메일 주소" 
  className="mb-3 text-muted"
>
  <Form.Control 
    type="email"
    className="form-control-user"
    placeholder="name@example.com" // 플로팅 라벨에서는 placeholder 필수
    value={email}
    onChange={e => setEmail(e.target.value)}
    required
  />
</FloatingLabel>

 */