'use client'

import React, {useState, useRef} from "react"
import * as S from '../../css/style.styled'
import { Password, PestControlOutlined, PestControlRodent, PetsOutlined, PetsRounded, PetsSharp, PetsTwoTone, Phone } from "@mui/icons-material";

export default function SignupPage(){

//🌟가입방법: step1 약관 (동의)=> 2.휴대폰 (인증)=> 3.정보입력
    const [step, setStep]=useState(0);
    const [formData, setFormData]=useState({
        marketingAgreed:false, // 마케팅 정보 수신동의(선택)
        phone: '',
        email: '',
        nickname: '',
        password: '',
        passwordConfirm: '' 
    });

    // ✅사진미리보기 url과 숨겨진 input을 조종할 Ref선언
    const [profilePreview, setProfilePreview]=useState<string>('');
    const [ProfileFile, setProfileFile] = useState<File|null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    //추가2.사진 선택헀을때 실행될 함수
    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];

        if(!file) return;

        if(!file.type.startsWith("image/")){
        alert("이미지 파일만 등록 가능합니다.");
        return;
        }
        setProfileFile(file);
        //파일을 브라우저에서 볼수있는 가짜 임시 url로 변환
        const imgUrl= URL.createObjectURL(file);
        //d상태에 저장해서 화면에 그림
        setProfilePreview(imgUrl);
        
    };
    //추가3.회색박스를 클릭 v파일input을 대신 클릭해주는 함수
    const handleBoxClick = ()=>{
        fileInputRef.current?.click();
    }
    
    // 폼데이터 세팅 (체크박스와 일반 입력 분기 처리 추가)
    const handleChange= (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            ...formData,
            // [e.target.name]: e.target.value
            [e.target.name]: e.target.type === "checkbox" 
            ? e.target.checked 
            : e.target.value
        })
    }
    //일반 가입 버튼 클릭시 
    const handleGeneralSignup = ()=>{
        setStep(1); //약관동의 화면으로 이동
    }
    //카카오 가입 버튼 클릭
    const handleKaKaoSignup = ()=>{
        alert('카카오 로그인 연동페이지로 이동합니다(빽단 OAuth 세팅 필요)')
    }

    const handleCheckEmail = async()=>{
        //빈칸 방어로직
        if(!formData.email.trim()){
            alert("이메일을 입력해주세요");
            return;
        }
        try{
            const res= await fetch(`http://localhost:8080/api/members/check-email?email=${formData.email}`)
            if(!res.ok) throw new Error("서버 응답 에러");
            const isDuplicate = await res.json()
            if(isDuplicate){
                alert("이미 사용중인 이메일입니다. 다른 이메일을 입력해주세요")
            }else{
                alert("사용 가능한 이메일입니다.")
            }
        }catch(err){
            console.error("이메일 중복 확인 에러",err)
            alert("서버와 통신하는 중 문제가 발생했습니다")
        };
    }

     const handleCheckNickname = async()=>{
        //빈칸 방어로직
        if(!formData.nickname.trim()){
            alert("닉네임을 입력해주세요");
            return;
        }
        try{
            const res= await fetch(`http://localhost:8080/api/members/check-nickname?nickname=${formData.nickname}`)
            if(!res.ok) throw new Error("서버 응답 에러");
            const isDuplicate = await res.json()
            if(isDuplicate){
                alert("이미 사용중인 닉네임입니다. 다른 닉네임을 입력해주세요")
            }else{
                alert("사용 가능한 닉네임입니다.")
            }
        }catch(err){
            console.error("닉네임 중복 확인 에러",err)
            alert("서버와 통신하는 중 문제가 발생했습니다")
        };
    }


    const handleSubmit = async()=>{
        //1단계 유효성검증
        if(!formData.email || !formData.nickname || !formData.password){
            alert("이메일,닉네임,비밀번호는 필수 입력 사항입니다");
            return;
        }

        //2단계 비밀번호 더블체크
        if(formData.password !== formData.passwordConfirm){
            alert("비밀번호가 일치하지않습니다. 다시확인해주세요");
            return;
        }

        //3단계 ??????profile추가
        try{
            const res = await fetch(`http://localhost:8080/api/members/signup`,{
                method: "POST",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({
                    email:formData.email,
                    nickname:formData.nickname,
                    password: formData.password,
                    phone: formData.phone,
                    marketingAgreed: formData.marketingAgreed,
                    provider: "LOCAL" //🌟명시적으로 일반 가입임을 백엔드에게 알려줌
                    //
                    //???profileImageUrl: finalImageUrl
                })
            });
            //4단계 결과처리
            if(res.status===201 || res.ok){
                alert("어서찾아주시개냥 회원이 되신것을 환영합니다");
            }else{
                //백엔드에서 400등 에러를 뱉었을 경우
                const errText = await res.text();
                alert(`회원가입에 실패 ??? ${errText}`)
            }

        }catch(err){
            console.error("회원가입API에러",err);
            alert("회원가입처리중 서버와 연결할수없습니다. 백엔드 서버 켜졌는지 확인해주세요")

        }
        
    };
    
    const handleRemoveImage = ()=>{
        setProfilePreview("");
        setProfileFile(null);

        //같은 사진 다시 선택가능하게 input초기화
        if(fileInputRef.current){
            fileInputRef.current.value = "";
        }
    };
    
    
    return(
        <>
        <S.AppWrapper>
            <S.Container>
                <S.TopFlexBasic>
                    {/* 뒤로가기 */}
                    <S.Back
                    onClick={()=>step>0 ? setStep(step-1) : window.history.back()}
                    >&lt; 뒤로
                    </S.Back>
                    <S.H5Bold>회원 가입</S.H5Bold>
                    <S.None/> 
                    {/* None:회원가입 center로 미는 용도 */}
                </S.TopFlexBasic>

    {/* === step 0: 가입방식 선택(new) ===*/}
                {step===0 && (
                    <S.TextCenter>

                        <PetsOutlined style={{color:"#f28c28", marginBottom:"4px"}}/>
                        <S.H3Bold>어서 찾아주개냥 오신 것을 환영합니다 </S.H3Bold>
                        <S.BtnBottomWrap>
                            <S.Column>
                                <S.BaseBtn $variant='kakao'
                                onClick={handleKaKaoSignup}
                                >카카오로 시작하기</S.BaseBtn>
                                <S.BaseBtn
                                $variant="local"
                                onClick={handleGeneralSignup}
                                >일반 회원 가입하기</S.BaseBtn>
                            </S.Column>
                        </S.BtnBottomWrap>
                    </S.TextCenter>
                )}

                {/* 약관동의 */}
                {step===1 && (
                    <S.BasicLayout>
                        <PetsOutlined style={{color:"#f28c28", marginBottom:"4px"}}/>
                        <S.H3Bold>약관에 동의하고 어서찾아주개냥 회원이 되어주세요 </S.H3Bold>
                        <S.MemberInfo>
                            <label>
                                <input
                                type="checkbox"
                                value=""
                                /> 전체 동의
                            </label> <br/>
                             <label>
                                <input
                                type="checkbox"
                                value=""
                                /> 이용약관 동의(필수)
                            </label>  <br/>
                             <label>
                                <input
                                type="checkbox"
                                value=""
                                /> 개인정보 수집이용 동의(필수)
                            </label> <br/>
                            <label>
                                <input
                                type="checkbox"
                                value=""
                                /> 만 14세 이상입니다(필수)
                            </label> <br/>
                            <label>
                                <input
                                type="checkbox"
                                onChange={e=>setFormData({...formData, marketingAgreed:e.target.checked})}
                                /> 마케팅 정보 email, SMS 수신동의 (선택)
                            </label> <br/>
                        </S.MemberInfo>
                        <S.BtnBottomWrap>
                            <S.BaseBtn
                            $variant="primary"
                            onClick={()=>setStep(2)}
                            > 다음으로 </S.BaseBtn>
                        </S.BtnBottomWrap>
                    </S.BasicLayout>
                )}

            {/* ====== step.3 : 정보입력===== */}
            {step === 2 && (
                <>
                <S.TextCenter>
                    <S.PhotoUpload 
                    onClick={handleBoxClick} 
                    style={{marginBottom:"7px"}}
                    >
                    {profilePreview? (
                        <img src={profilePreview} alt="프로필 미리보기"/>
                    ):(
                        <PetsRounded style={{color:"pink", fontSize:"45px"}}></PetsRounded>
                    )}
                    </S.PhotoUpload>

                    {/* {삭제} */}
                    <S.PhotoUpBottomText
                    className="mt-2"
                    > <span style={{color:"#dd7979"}}>*</span> 발바닥을 클릭해서 사진을 등록하세요
                    </S.PhotoUpBottomText>

                    <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{display:"none"}}
                    onChange={handleImageChange}
                    />
                </S.TextCenter>
                <S.LayoutPadding>
                    <S.AlineItemsCenter className="mt-3">
                        <S.FormControl
                        type="email"
                        name="email"
                        placeholder="이메일 입력"
                        value={formData.email}
                        onChange={handleChange}/>
                        <S.BaseBtn
                        style={{padding: "10px", fontWeight:400}}
                        onClick={handleCheckEmail}
                        $variant="primary"
                        $mainColor="#ccc"
                        $width="25%"
                        >중복 확인
                        </S.BaseBtn>
                    </S.AlineItemsCenter>

                    <S.AlineItemsCenter>
                        <S.FormControl
                        type="text"
                        name="nickname"
                        placeholder="닉네임 입력"
                        value={formData.nickname}
                        onChange={handleChange}/>
                        <S.BaseBtn 
                        style={{padding: "10px", fontWeight:400}}
                        onClick={handleCheckNickname}
                        $variant="primary"
                        $mainColor="#ccc"
                        $width="25%"
                        >중복 확인
                        </S.BaseBtn>
                    </S.AlineItemsCenter>
    <div style={{padding:"5px"}}/>
                        <S.FormControl
                        type="password"
                        name="password"
                        placeholder="비밀번호 입력"
                        value={formData.password}
                        onChange={handleChange}/>
   <div style={{padding:"5px"}}></div>
                        <S.FormControl
                        type="password"
                        name="passwordConfirm"
                        placeholder="다시 비밀번호 입력"
                        value={formData.passwordConfirm}
                        onChange={handleChange}/>
                        

                    <S.BtnBottomWrap>
                        <S.BaseBtn
                        $variant="primary"
                        onClick={handleSubmit}
                        > 회원 가입 </S.BaseBtn>
                    </S.BtnBottomWrap>
                </S.LayoutPadding>
                </>
            )}
            </S.Container>
        </S.AppWrapper>
        </>
    )
}


/*

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if(!file) return;

    if(!file.type.startsWith("image/")){
        alert("이미지 파일만 등록 가능합니다.");
        return;
    }

    setProfileFile(file);

    const previewUrl = URL.createObjectURL(file);
    setProfilePreview(previewUrl);
};

const handleRemoveImage = () => {
    setProfilePreview("");
    setProfileFile(null);

    // 같은 사진 다시 선택 가능하게 input 초기화
    if(fileInputRef.current){
        fileInputRef.current.value = "";
    }
};

<S.TextCenter>
    <S.PhotoUpload 
        onClick={handleBoxClick}
        style={{marginBottom:"7px"}}
    >
        {profilePreview ? (
            <img src={profilePreview} alt="프로필 미리보기"/>
        ) : (
            <PetsRounded style={{color:"pink"}}/>
        )}
    </S.PhotoUpload>

    {profilePreview && (
        <button 
            type="button"
            onClick={handleRemoveImage}
        >
            사진 삭제
        </button>
    )}

    <S.PhotoUpBottomText>
        <span style={{color:"#dd7979"}}>*</span>
        발바닥을 클릭해서 사진을 등록하세요
    </S.PhotoUpBottomText>

    <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{display:"none"}}
        onChange={handleImageChange}
    />
</S.TextCenter>
 */