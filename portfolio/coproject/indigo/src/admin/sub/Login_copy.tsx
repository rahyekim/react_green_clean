import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { Container, Row,Col,Button,Card,Form } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle,faFacebook,faXTwitter } from "@fortawesome/free-brands-svg-icons";

import * as S from '../DashBoard.styled'



export const Login = ()=>{

    const navigate = useNavigate();

    //컴포넌트 마운트 시 LocalStorage에 저장된 아이디 불러오기
    //useState의 초기값(Lazy Initialization)기능
    const [email, setEmail]=useState(() => {
    return localStorage.getItem('savedEmail') || "";
});
    const [password, setPassword]= useState("");

    //아이디 기억하기 
const [rememberme, setRememberme] = useState(() => {
    // 만약 로컬스토리지에 저장된 이메일이 이미 있다면, 
    // 처음 들어왔을 때 'Remember me' 체크박스도 체크된 상태로 시작하게 하면 센스 있겠죠?
    return !!localStorage.getItem('savedEmail');
});

  
 

    // useEffect(() => {
    // const savedId = localStorage.getItem('savedId');
    // if (savedId) {
    //     setUserId(savedId);
    // }
    // }, []);
    
    

    //로그인버튼 누를때 실행되는 함수
    const handleLogin= async(e:React.FormEvent)=>{
        e.preventDefault();

        //유효성검사
        if(!email || !password){
            alert("이메일과 비밀번호 모두 입력해주세요")
            return;
        }
        try{
            //{email, password} => 단축문법{ email: email, password: password }
            const res  = await axios.post("http://localhost:5000/api/users/login", {email,password})
            alert(`${res.data.name}님 , ${res.data.message}`)

            //✨로그인후 저장된 이름이 보이게 
            localStorage.setItem('userName', res.data.name)
            
        // 2. 로그인 시 체크박스 상태에 따라 LocalStorage 처리
            if (rememberme) {
            localStorage.setItem('savedEmail', email.trim());
            } else {
            localStorage.removeItem('savedEmail');
            }
            navigate('/admin'); //마지막에 화면전환

        }catch(err:any){
            //1.서버가 응답을 주면서 에러를 낸 경우
            if(err.response && err.response.data){
                alert(err.response.data.message)
            }else{
                //2. 서버가 꺼졌거나 인터넷이 안 연결된 경우
                alert("로그인 중 에러발생");
            }
        }
    };
    //프론트엔드 코드 오타 (자바스크립트 에러): 서버요청도 못해서 err.response없음
    //서버가 꺼져있거나 인터넷이 끊긴 경우: err.response가 undefined

    {/* axios가 예쁘게 포장해준=> err.response 
        err.response = {
        status: 400, // 백엔드가 보낸 res.status(400)
        statusText: "Bad Request",
        data: { 
            message: "비밀번호가 틀렸습니다." // 👈 백엔드가 .json({ message: ... })으로 보낸 진짜 데이터!
        }
}        */}
    {/* 💡
        align-items-stretch : 양쪽 칸의 세로 높이를 똑같이 키 맞춰줌
        g-0 :칸과 칸 사이, 테두리와의 가로 여백을 싹 지워줌
        border-0 :미세하게 붕 뜨게 만들던 1px 회색 테두리를 제거함
    */}
    return(
        <>
        <S.Background>
            <Container>
                <Row className="justify-content-center">
                    <Col xl={10} lg={12} md={9}>
                    {/* overflow-hidden 사진 튀어나온거 잘라줌.. */}
                        <Card className="overflow-hidden border-0">
                            <Card.Body className="p-0">
                                <Row className="g-0 align-items-stretch">
                                    <Col lg={6} className="d-none d-lg-block bg-login-image">
                                    </Col>
                                    <Col lg={6}>
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-500 mb-4">💙Welcome back💙</h1>
                                                <form className="user" onSubmit={handleLogin}>
                                                    <div className="form-group mb-3">
                                                        <Form.Label className="fw-bold small text-secondary ps-0 mb-1">
                                                            이메일주소
                                                        </Form.Label>
                                                        <Form.Control
                                                        type="email"
                                                        className="form-control-user"
                                                        placeholder="enter email address..."
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
                                                        placeholder="enter password..."
                                                        value={password}
                                                        onChange={e=>setPassword(e.target.value)}
                                                        required
                                                        />
                                                    </div>
                                                    
                                                    {/* 아이디 기억하기 체크박스 */}
                                                    <div className="form-group mb-3">
                                                        <Form.Check
                                                        type="switch"
                                                        className="d-flex gap-2 align-items-center small text-secondary"
                                                        id="customCheck"
                                                        label="Remember me"
                                                        checked={rememberme}
                                                        onChange={e=>setRememberme(e.target.checked)}
                                                        />
                                                    </div>

                                                    <Button
                                                    type="submit"
                                                    variant="primary"
                                                    className="btn btn-block w-100 mb-2"
                                                    >Login</Button>
                                                    
                                                    <hr className="my-3" style={{borderTop:"1px solid #999"}}/>
                                                    {/* 소셜 로그인 */}      
                                                    <Button
                                                    type="button"
                                                    variant="danger"
                                                    className="btn-user btn-block btn-google w-100 mb-2 py-2"
                                                    > 
                                                        <FontAwesomeIcon icon={faGoogle} className="fa-fw me-2"/>
                                                        login with google
                                                    </Button>
                                                    <Button
                                                    type="button"
                                                    variant="primary"
                                                    className="btn-user btn-block btn-facebook w-100 mb-2 py-2"
                                                    > <FontAwesomeIcon icon={faFacebook}
                                                    className="fa-fw me-2"/>
                                                    Login with facebook
                                                    </Button>

                                                    <Button
                                                    type="button"
                                                    variant="dark"
                                                    className="btn-user btn-block btn-twitter w-100 mb-2 py-2"
                                                    > <FontAwesomeIcon icon={faXTwitter}
                                                    className="fa-fw me-2"/>
                                                    Login with twitter
                                                    </Button>
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