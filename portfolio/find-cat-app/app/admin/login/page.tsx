'use client'

import {  useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import Link from 'next/link'; // ✅
import {Container, Row, Col, Button, Card, Form} from 'react-bootstrap'
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";

import * as S from '../DashBoard.styled'

export default function Login  (){

     // 💡 4. useNavigate() 대신 useRouter()를 사용합니다.
    const router = useRouter();


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
            const res = await axios.post('/api/admin/login',  //http://localhost:8080
                {email,password},
                {withCredentials: true},
            )
            alert(`${res.data.name}님, ${res.data.message}`)

            //✨❄️ 로그인후 저장된 이름이 보이게 하려면 ❄️
            localStorage.setItem('userName', res.data.name);
            
            // 💡 5. navigate('/admin') 대신 router.push('/admin')으로 이동합니다.
            router.push('/admin');

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
                        <Card.Body className="p-0">
                            <Row>
                                <Col lg={6} className="d-none d-lg-block bg-login-image"></Col>
                                <Col lg={6}>
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-500 mb-4 mt-3">💙Welcome back💙</h1>
                                        <form className="user" onSubmit={handleSubmit}>
                                            <div className="form-group mb-3">
                                                {/* <Form.Label className="fw-bold small text-secondary ps-0 mb-1">
                                                    이메일 주소
                                                </Form.Label> */}
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
                                                {/* <Form.Label className="fw-bold small text-secondary ps-0 mb-1">
                                                    비밀번호
                                                </Form.Label> */}
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
                                            <div className="form-group my-3">
                                                <div className="custom-control custom-checkbox small text-start">
                                                    <input
                                                    type="checkbox"
                                                    className="custom-control-input form-check-input mx-3"
                                                    id="customCheck"
                                                    checked={rememberme}
                                                    onChange={e=>setRememberme(e.target.checked)}
                                                    
                                                    />
                                                    <label className="custom-control-label"
                                                    htmlFor="customCheck">
                                                        Remember me
                                                    </label>

                                                    <Button 
                                                    type="submit"
                                                    variant="primary"
                                                    className="btn btn-block w-100 my-3"
                                                    >login</Button>

                                                    <hr className="my-3" style={{borderTop:"1px solid #999"}}/>
                                                    {/* 소셜 로그인 */}      
                                                    <Button 
                                                    type="button"
                                                    variant="warning"
                                                    className="btn-user btn-block btn-google w-100 mb-2"
                                                    >
                                                        <FontAwesomeIcon icon={faGoogle} className="fa-fw me-1"/>
                                                        login with google
                                                    </Button>

                                                     <Button 
                                                    type="button"
                                                    variant="secondary"
                                                    className="btn-user btn-block btn-facebook w-100 mb-2"
                                                    >
                                                        <FontAwesomeIcon icon={faFacebookF} className="fa-fw me-1"/>
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


 */