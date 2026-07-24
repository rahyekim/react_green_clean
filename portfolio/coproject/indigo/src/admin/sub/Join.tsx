// npm install react-daum-postcode : 📬우편번호 찾기" / "주소 검색"
import { useState } from "react"
import {Link,useNavigate} from 'react-router-dom'
import DaumPostcode from 'react-daum-postcode'
//fontawesome추가
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook, faTwitter, faTwitterSquare, faXbox, faXTwitter } from "@fortawesome/free-brands-svg-icons"

import * as S from '../DashBoard.styled'
export const Join = ()=>{

    const navigate =useNavigate();

    //입력필드상태관리
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [repassword, setRePassword]=useState("");
    //😊주소관련상태관리
    const [zipCode, setZipCode]=useState(""); //국민우편넣기 
    const [address, setAddress]=useState('');
    const [detailAddress, setDetailAddress]=useState('');
    //주소모달창 열기
    const [isPostcodeOpen, setIsPostcodeOpen]=useState(false);

    //다음 주소 검색 완료시에 실행되는 함수
    const handleComplete= (data:any)=>{
        //data변수안에 사용자가선택한주소의 많은 정보가 담김
        let fullAddress = data.address; //기본주소(서울특별시 강남구 테헤란로)
        let extraAddress = ''; //추가주소(동이름 건물이름)
        //setIsPostcodeOpen(false); ???????

        if(data.addressType === 'R'){ //도로명주소(R)이면? (지번주소선택하면 무시하고 지나감..)
            if(data.addressType !== ''){ //주소정보 중 법정동이름(예:역삼동)이 비어잇지않다면,
                extraAddress += data.bname; //추가주소바구니에 동 이름을 넣음
            }
            if(data.buildingName !== ''){
                //동 이름이 이미 있다면 , 찍어서 이어붙이고(역삼동, 스타빌딩) 
                //비어있다면 건물이름만 넣음
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== ''? `(${extraAddress})` : '';
        }//추가주소바구니에 뭐라도 담겨있다면 기본주소뒤에 예쁘게 괄호에 담아서 합쳐줌

        setZipCode(data.zonecode); //5자리 우편번호
        setAddress(fullAddress); //전체주소
        setIsPostcodeOpen(false); //우편번호 팝업창 닫기
    }
    //회원가입전송함수
    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        //html폼은 원래 제출 버튼 누르면 웹페이지가 빤짝거림
        //새로고침되는 성격을 없애기 위해서
        if( password!== repassword){
            alert("비밀번호가일치하지않습니다")
            return;
        }
    }

    return(
        <>
        <S.Background>
            <div className="container">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            {/* 안보이다가 pc모드가되면 block이되고 보임.. */}
                            {/* background 이미지 왼쪽이미지영역 : CSS 배경 이미지로 채우려고 비워둔 영역*/}
                            <div className="col-lg-5 d-none d-lg-block bg-register-image">
                                </div>
                            {/* 오른쪽 회원가입 폼 입력창설정 */}
                                <div className="col-lg-7">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">
                                                Create an Account!
                                            </h1>
                                        </div>
                                        
                                        <form onSubmit={handleSubmit} className="user">
                                            <div className="form-group row mb-3"> 
                                            {/* 이름 */}
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="text" className="form-control form-control-user"
                                                    placeholder="Firstname"
                                                    value={firstName}
                                                    onChange={e=>setFirstName(e.target.value)}
                                                    required 
                                                    />
                                                </div>
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="text" className="form-control form-control-user"
                                                    placeholder="Lastname"
                                                    value={lastName}
                                                    onChange={e=>setLastName(e.target.value)}
                                                    required 
                                                    />
                                                </div>
                                            </div>
                                            {/* 이메일 */}
                                            <div className="form-group mb-3 mb-sm-0">
                                                <input type="email" className="form-control form-control-user"
                                                placeholder="email"
                                                value={email} 
                                                onChange={e=>setEmail(e.target.value)}
                                                required
                                                />
                                            </div>
                                            {/* 주소검색영역 */}
                                            {/* <div className="d-flex gap-2 mb-3"></div> */}
                                            <div className="form-group row align-items-center my-3"> 
                                                <div className="col-sm-8 mb-3 mb-sm-0">
                                                    <input type="text" className="form-control form-control-user"
                                                    placeholder="zipcode" value={zipCode} readOnly
                                                    onClick={()=>setIsPostcodeOpen(true)} />
                                                </div>

                                                <div className="col-sm-4">
                                                    <button
                                                    type="button"
                                                    className="btn btn-secondary btn-user btn-block h-100"
                                                    onClick={()=>setIsPostcodeOpen(true)}
                                                    >search
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="form-group mb-3">
                                                <input type="text"
                                                className="form-control form-control-user"
                                                placeholder="address"
                                                value={address}
                                                readOnly
                                                 />
                                            </div>

                                             <div className="form-group mb-3">
                                                <input type="text"
                                                className="form-control form-control-user"
                                                placeholder="detail address"
                                                value={detailAddress}
                                                onChange={e=>setDetailAddress(e.target.value)}
                                                />
                                            </div>

                                            {/* 비밀번호 */}
                                            <div className="form-group row mb-4">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="password" 
                                                    className="form-control form-control-user"
                                                    value={password}
                                                    placeholder="password"
                                                    onChange={e=>setPassword(e.target.value)}
                                                    required
                                                    />
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="password" 
                                                    className="form-control form-control-user"
                                                    value={repassword}
                                                    placeholder="repeat password"
                                                    onChange={e=>setRePassword(e.target.value)}
                                                    required
                                                    />

                                                </div>
                                            </div>
                                            {/* 버튼이 들어가는 영역 */}
                                            <div className="d-flex gap-2 justify-content-end">
                                                {/* <button className="btn btn-outline-secondary"
                                                type="button"
                                                >cancel</button> */}
                                                <button className="btn btn-primary btn-user btn-block"
                                                type="submit"
                                                >Register Account</button>
                                            </div>
                                   
                                            <div className="my-4"></div>
                                            <hr style={{borderTop:"1px solid gray"}}/>
                                             <div className="my-3"></div>

                                            {/* Oauth 카카오로로그인 */}
                                            <button type="button" 
                                            className="btn btn-google btn-user btn-block">
                                                <i className="fab fa-google fa-fw"></i>
                                                Register with google
                                            </button>

                                             <button type="button" 
                                            className="btn btn-facebook btn-user btn-block">
                                                <i className="fab fa-facebook fa-fw"></i>
                                                Register with facebook
                                            </button>

                                            <button type="button" 
                                            className="btn btn-twitter  btn-user btn-block">
                                                <FontAwesomeIcon icon={faXTwitter} 
                                                className="fa-fw"/>
                                                Register with twitter 
                                            </button>
                                    </form>
                                       
                                        <hr style={{borderTop:"1px solid gray"}}/>

                                        <div className="text-center mt-3">
                                            <Link className="small" to="/forgot-password">
                                            Forgot Password?
                                            </Link>
                                        </div>

                                        <div className="text-center">
                                            <Link className="small" to="/login">
                                            Aleardy have an account? Login!
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            {isPostcodeOpen && (
                <S.ModalBackground onClick={()=>setIsPostcodeOpen(false)}>
                    <S.PostcodeWrapper onClick={e=> e.stopPropagation()}>
                        <div className="close-btn-wrap">
                            <button className="btn btn-outline-secondary btn-sm"
                            onClick={()=>setIsPostcodeOpen(false)}
                            >close</button>
                        </div>
                        <DaumPostcode onComplete={handleComplete} autoClose={false}/>

                    </S.PostcodeWrapper>

                </S.ModalBackground>
            )}

        </S.Background>
        </>
    )
}


/*
CREATE DATABASE company;
USE company;

CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE, #중복불가
PASSWORD VARCHAR(255) NOT NULL,
zipcode VARCHAR(20) NOT NULL, 
address VARCHAR(255) NOT NULL,
detail_address VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT current_timestamp
);


const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  repassword: "",
  zipCode: "",
  address: "",
  detailAddress: "",
});


<input
  name="email"
  value={form.email}
  onChange={(e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
/>
*/