// npm install react-daum-postcode : 📬우편번호 찾기" / "주소 검색"
import  {FormEvent, useState } from "react"
import {Link,useNavigate} from 'react-router-dom'
import DaumPostcode from 'react-daum-postcode'

import * as S from '../DashBoard.styled'
export const Join = ()=>{

    const navigate =useNavigate();

    //입력필드상태관리
    const [form, setForm]=useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repassword: "",
        zipcode: "",
        address: "",
        detailAddress: "",
    })
    //우편창 열기
    const [isPostcodeOpen, setIsPostcodeOpen]=useState(false);

    const handleChange = (e:React.ChangeEvent<
        HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>)=>{
        const {name, value} = e.target;
         setForm(prev=>({
                ...prev,
                [name]:value
        }));
    }

    //다음 주소 검색 완료시에 실행되는 함수
    const handleComplete= (data:any)=>{
        //data변수안에 사용자가선택한주소의 많은 정보가 담김
        let fullAddress = data.address; //기본주소(서울특별시 강남구 테헤란로)
        let extraAddress = ''; //추가주소(동이름 건물이름)

        // 도로명 주소(R)일 경우 추가 주소 가공
        if(data.addressType === 'R'){ 
            if(data.bname !== ''){ //주소정보 중 법정동이름(예:역삼동)이 있다면
                extraAddress += data.bname; //추가주소바구니에 동 이름을 넣음
            }
            if(data.buildingName !== ''){
                //동 이름이 이미 있다면 , 찍어서 이어붙이고(역삼동, 스타빌딩) 
                //비어있다면 건물이름만 넣음
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== ''? `(${extraAddress})` : '';
        }//추가주소바구니에 뭐라도 담겨있다면 기본주소뒤에 예쁘게 괄호에 담아서 합쳐줌

        setForm(prev=>({
            ...prev,
            zipcode: data.zonecode, //5자리 우편번호
            address: fullAddress, //조합된 전체주소
        }))
        setIsPostcodeOpen(false); //우편번호 모달창 닫기
    }
    //회원가입전송함수
    //🛑 [1] 필수값 확인 -> [2] 조건(유효성) 확인 -> [3] 서버 전송
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        //html폼은 원래 제출 버튼 누르면 웹페이지가 빤짝거림
        //새로고침되는 성격을 없애기 위해서

         //[1]필수 입력값 빈 값 체크 (하나라도 비어있으면 막기)
        // form 객체 안의 값들 중 하나라도 빈 문자열("")이 있으면 걸러냄
        const isFormIncomplete = Object.values(form).some(value=> value.trim()=="");
        if(isFormIncomplete){
            alert("모든 필수 입력 항목을 작성해주세요!")
            return;
        }
        //[2] 이메일 유효성 검사(간단한 정규식)
         const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if(!emailRegex.test(form.email)){ //정규식검사메서드(test)=> true.false
            alert("비밀번호는 최소 8자리 이상이어야합니다");
            return;
         }
         //3.비밀번호 자리수 
         if(!form.password || form.password.trim().length < 8){
            alert("비밀번호는 최소 8자리 이상이어야 합니다")
            return;
         }
         // 4. 비밀번호 일치 확인 (기존 코드)
        if( form.password!== form.repassword){
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
                                            <div className="form-group row"> 
                                            {/* 이름 */}
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input 
                                                    type="text" 
                                                    className="form-control form-control-user"
                                                    placeholder="Firstname"
                                                    value={form.firstName}
                                                    name="firstName"
                                                    onChange={handleChange}
                                                    required 
                                                    />
                                                </div>
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input 
                                                    type="text"
                                                    name="lastname" 
                                                    className="form-control form-control-user"
                                                    placeholder="Lastname"
                                                    value={form.lastName}
                                                    onChange={handleChange}
                                                    required 
                                                    />
                                                </div>
                                            </div>
                                            {/* 이메일 */}
                                            <div className="form-group mb-3 mb-sm-0">
                                                <input
                                                type="email" 
                                                name="email"
                                                className="form-control form-control-user"
                                                placeholder="email"
                                                value={form.email} 
                                                onChange={handleChange}
                                                required
                                                />
                                            </div>
                                            {/* 주소검색영역 */}
                                            {/* <div className="d-flex gap-2 mb-3"></div> */}
                                            <div className="form-group row align-items-center"> 
                                                <div className="col-sm-8 mb-3 mb-sm-0">
                                                    <input type="text" className="form-control form-control-user"
                                                    placeholder="zipcode" value={form.zipcode} readOnly
                                                    onClick={()=>setIsPostcodeOpen(true)} />
                                                    {/* input 박스를 마우스로 찰칵 클릭 */}
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
                                                name="address"
                                                className="form-control form-control-user"
                                                placeholder="address"
                                                value={form.address}
                                                readOnly
                                                 />
                                            </div>

                                             <div className="form-group mb-3">
                                                <input type="text"
                                                name="detailAddress"
                                                className="form-control form-control-user"
                                                placeholder="detail address"
                                                value={form.detailAddress}
                                                onChange={handleChange}
                                                />
                                            </div>

                                            {/* 비밀번호 */}
                                            <div className="form-group row mb-4">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="password" 
                                                    name="password"
                                                    className="form-control form-control-user"
                                                    value={form.password}
                                                    placeholder="password"
                                                    onChange={handleChange}
                                                    required
                                                    />
                                                </div>
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="password" 
                                                    name="repassword"
                                                    className="form-control form-control-user"
                                                    value={form.repassword}
                                                    placeholder="repeat password"
                                                    onChange={handleChange}
                                                    required
                                                    />

                                                </div>
                                            </div>
                                            {/* 버튼이 들어가는 영역 */}
                                            <div className="d-flex gap-2 justify-content-end">
                                                <button className="btn btn-outline-secondary"
                                                type="button"
                                                >cancel</button>
                                                <button className="btn btn-primary btn-user btn-block"
                                                type="submit"
                                                >Register Account</button>
                                            </div>

                                            <hr style={{borderTop:"1px solid gray"}}/>
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
                                                <i className="fab fa-twitter  fa-fw"></i>
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
            {/* 🔥e.stopPropagation() :진짜주소창하얀박스 클릭해서 안닫히도록 방어 */}
            {isPostcodeOpen && (
                <S.ModalBackground onClick={()=>setIsPostcodeOpen(false)}> {/* 👈 배경 */}
                    <S.PostcodeWrapper onClick={e=> e.stopPropagation()}>  {/* 👈 하얀 상자 */}
                        <div className="close-btn-wrap">
                            <button className="btn btn-outline-secondary btn-sm"
                            onClick={()=>setIsPostcodeOpen(false)}
                            >close</button>
                        </div>
                        {/* 카카오/다음에서 제공 주소 검색 엔진 컴포넌트 */}
                        <DaumPostcode onComplete={handleComplete} autoClose={false}/>

                    </S.PostcodeWrapper>

                </S.ModalBackground> 
            )}

        </S.Background>
        </>
    )
}


/*


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