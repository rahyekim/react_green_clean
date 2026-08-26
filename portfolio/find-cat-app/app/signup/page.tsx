'use client'

import React, {useState, useRef} from "react"
import { useRouter } from "next/navigation";
import * as S from '../../css/style.styled'
import { Password, PestControlOutlined, PestControlRodent, PetsOutlined, PetsRounded, PetsSharp, PetsTwoTone, Phone } from "@mui/icons-material";
import DaumPostcodeEmbed, {Address} from 'react-daum-postcode';

import Header from "../components/Header";
export default function SignupPage(){

    const router = useRouter();

//🌟가입방법: step0.가입종류-> step1.약관(동의)=> step2.휴대폰(인증)=>step3.정보입력
    const [step, setStep]=useState(0);
    const [formData, setFormData]=useState({
        agreeTerms:false,
        agreePrivacy:false,
        agreeAge:false,
        marketingAgreed:false, // 마케팅 정보 수신동의(선택)

        email: '',
        nickname: '',
        password: '',
        passwordConfirm: '' , 
        name:'',
        phone: '',
        address: '',
        detailAddress:'',
        userType: 'GENERAL' //사업자/소비자
    });

    // ✅사진미리보기 url과 숨겨진 input을 조종할 Ref선언
    const [profilePreview, setProfilePreview]=useState<string>('');
    const [profileFile, setProfileFile] = useState<File|null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    //🔹우편번호
    const [isOpenPostcode, setIsOpenPostcode]=useState(false);
    //🔹[약관추가] 약관내용 슬라이딩(열림/닫힘) 상태 관리
    const [showTerms, setShowTerms]=useState(false);
    const [showPrivacy, setShowPrivacy]=useState(false);
    
    //추가2.사진 선택헀을때 실행될 함수
    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];

        if(!file) return;

        //file.type: image/jpeg , image/png 등등
        if(!file.type.startsWith("image/")){
        alert("이미지 파일만 등록 가능합니다.");
        return;
        }
        //메모리해제
        if(profilePreview) URL.revokeObjectURL(profilePreview); 
        //파일을 브라우저에서 볼수있는 가짜 임시 url로 변환
        const imgUrl= URL.createObjectURL(file);
        //상태에 저장해서 화면에 그림
        setProfileFile(file);
        setProfilePreview(imgUrl);
    };

    //🔹주소검색
    const handleCompletePostcode = (data:Address)=>{
        let fullAddress = data.address; //기본주소: 서울 강남구 테헤란로 123
        let extraAddress = '';          //추가주소: (역삼동, 역삼빌딩)

        
        if(data.addressType === 'R') { //도로명 주소일 경우
            if(data.bname !== '') extraAddress += data.bname; //역삼동
            if(data.buildingName !== '') { //그린빌딩
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}`
                : data.buildingName;
            }//서울 강남구 테헤란로 123(역삼동, 역삼빌딩)
            fullAddress += extraAddress !== '' ? `(${extraAddress})` : ''; 
        };  
        //주소를 formData에 업데이트하고 창닫기
        setFormData({...formData, address: fullAddress});
        setIsOpenPostcode(false);
    }

    const isAllagreed=
    formData.agreeAge && 
    formData.agreePrivacy &&
    formData.agreeTerms &&
    formData.marketingAgreed;
    
    //🔹[약관 추가] 약관 동의 관련 로직
    const handleAllagreed = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const isChecked= e.target.checked;
        setFormData(prev=>({
            ...prev,
            agreeAge: isChecked,
            agreePrivacy: isChecked,
            agreeTerms: isChecked,
            marketingAgreed: isChecked
        }))
    }

    const handleStep1Next = ()=>{
        //필수 약관 검증
        if(!formData.agreeAge || !formData.agreePrivacy || !formData.agreeTerms){
            alert("필수약관에 모두 동의해주세요")
            return;
        }
        setStep(2); //모두 동의했으면 다음단계(정보입력)이동.. 휴대폰인증생략..
    }
    
    //추가3. 디자인용 예쁜박스를 클릭=> 파일input을 대신 클릭해주는 함수
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
            const res= await fetch(`/api/members/check-email?email=${formData.email}`)
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
            const res= await fetch(`/api/members/check-nickname?nickname=${formData.nickname}`)
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
        if(!formData.email || !formData.nickname || !formData.password || !formData.phone
            || !formData.name
        ){
            alert("이메일,닉네임,비밀번호,이름,휴대폰번호는 필수 입력 사항입니다");
            return;
        }

        //2단계 비밀번호 더블체크
        if(formData.password !== formData.passwordConfirm){
            alert("비밀번호가 일치하지않습니다. 다시확인해주세요");
            return;
        }

        // 🔴3단계 profile추가
        try{        
            let finalImageUrl = "";  //DB에 들어갈 이미지 주소

            //💡 사용자가 올린 사진 파일이 있다면 먼저 백엔드로 쏩니다!
            //// 프로필 사진을 선택했을 때만 업로드 진행
            if(profileFile){
                //이미지는 JSON이아니라 FormData라는 택배 상자에 담아서 보내야
                const imageFormData = new FormData(); 
                imageFormData.append('file', profileFile);
    
                const res = await fetch(`/api/members/upload-profile`,{
                    method:"POST",
                    body: imageFormData, //헤더에 Content-Type을 적지않아야 브라우저가 알아서
                })

                if (!res.ok) throw new Error("이미지 업로드 실패");

                //백엔드에서 이미지 url주소 돌려줌 (예: http://.../uploads/123.jpg)
                finalImageUrl = await res.text();
                console.log("보낼 프로필 이미지 URL:", finalImageUrl);
                //☑️회원가입할때 이미지주소를 받아와서 저장해놔야 마이페이지에서 볼 수있음  
            }
            
            const fullAddressTosend = formData.detailAddress 
            ? `${formData.address} ${formData.detailAddress}`
            : formData.address;
            
            
            const res = await fetch(`/api/members/signup`,{
                method: "POST",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({
                    email:formData.email,
                    nickname:formData.nickname,
                    password: formData.password,
                    marketingAgreed: formData.marketingAgreed,
                    provider: "LOCAL", //🌟명시적으로 일반 가입임을 백엔드에게 알려줌
                    profileImageUrl: finalImageUrl || '', 
                     //✅업로드된 최종 이미지 URL 대입
                    name: formData.name,
                    phone: formData.phone,
                    address: fullAddressTosend,
                    userType: formData.userType,

                })
            });
            //4단계 결과처리
            if(res.status===201 || res.ok){
                alert("🎉 어서찾아주시개냥 회원이 되신것을 환영합니다");
                router.push('/login')
                // window.location.href = '/login';
            }else{
                //백엔드에서 400등 에러를 뱉었을 경우
                const errText = await res.text();
                alert(`회원가입에 실패했습니다: ${errText}`)
            }

        }catch(err){
            console.error("회원가입API에러",err);
            alert("회원가입처리중 서버와 연결할수없습니다. 백엔드 서버 켜졌는지 확인해주세요")

        }
        
    };
    
    // 이미지 삭제 처리
    const handleRemoveImage = ()=>{
        if (profilePreview) URL.revokeObjectURL(profilePreview);
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
                <S.MT70></S.MT70>
                <Header title="회원 가입"
                onBackClick={()=>step>0 ? setStep(step-1) : window.history.back()}
                />
                {/* === step 0: 가입방식 선택(new) ===*/}
                {step===0 && (
                    <S.TextCenter>
                        <PetsOutlined 
                        fontSize="large"
                        style={{color:"#f28c28", marginBottom:"15px"}}/>
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

                {/* step1. 약관동의 */}
                {step===1 && (
                    <S.BasicLayout>
                        <PetsOutlined style={{color:"#f28c28", marginBottom:"4px"}}/>
                        <S.H3Bold>약관에 동의하고 어서찾아주개냥 회원이 되어주세요 </S.H3Bold>
                        <S.MemberInfo>
                            <label>
                                <input
                                type="checkbox"
                                checked={isAllagreed}
                                onChange={handleAllagreed}
                                /> 전체 동의
                            </label> <br/>
                             <label>
                                <input
                                type="checkbox"
                                name="agreeTerms" //👈 name 속성
                                checked={formData.agreeTerms}
                                // onChange={e=> setFormData({...formData, agreeTerms:e.target.checked})}
                                onChange={handleChange} //👈 
                                /> 이용약관 동의(필수)
                            </label>
                            <S.UpandDown 
                            onClick={()=>setShowTerms(!showTerms)}>
                                {showTerms ? '▲ 닫기:':'👉보기'}
                            </S.UpandDown>
                            <br/>
                            <S.Terms $IsOpen={showTerms}>
                                <S.TermsInner>
                                제 1조 (목적) <br/>
                                본 약관은 어서찾아주개(이하 "회사")가 제공하는 서비스의 
                                이용조건 및 절차, 권리, 의무 및 책임사항을 규정함을 목적으로 합니다. <br/>
                                (여기에 실제 약관 내용을 넣으시면 됩니다.)        
                                </S.TermsInner>
                            </S.Terms>

                             <label>
                                <input
                                type="checkbox"
                                name="agreePrivacy"
                                checked={formData.agreePrivacy}
                                onChange={handleChange}
                                // onChange={e=> setFormData({...formData, agreePrivacy:e.target.checked})}
                                /> 개인정보 수집이용 동의(필수)
                            </label>
                             <S.UpandDown 
                            onClick={()=>setShowPrivacy(!showPrivacy)}>
                                {showPrivacy ? '▲ 닫기': '👉보기'}
                            </S.UpandDown>
                            <br/>
                            <S.Terms $IsOpen={showPrivacy}>
                                <S.TermsInner>
                                수집 항목: 이메일, 닉네임, 이름, 연락처, 주소 <br/>
                                수집 목적: 서비스 제공 및 회원 관리 <br/>
                                보유 기간: 회원 탈퇴 시까지      
                                </S.TermsInner>
                            </S.Terms>
                            <label>
                                <input
                                type="checkbox"
                                name="agreeAge"
                                checked={formData.agreeAge}
                                onChange={handleChange}
                                // onChange={e=> setFormData({...formData, agreeAge: e.target.checked})}
                                /> 만 14세 이상입니다(필수)
                            </label> <br/>
                            <label>
                                <input
                                type="checkbox"
                                name="marketingAgreed"
                                checked={formData.marketingAgreed}
                                onChange={e=>setFormData({...formData, marketingAgreed:e.target.checked})}
                                /> 마케팅 정보 email, SMS 수신동의 (선택)
                            </label> <br/>
                        </S.MemberInfo>
                        <S.BtnBottomWrap>
                            <S.BaseBtn
                            $variant="primary"
                            onClick={handleStep1Next}
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

                    {/*삭제*/}
                    {profilePreview && (
                    <div>
                        <button
                        type="button"
                        onClick={handleRemoveImage}
                        >X</button>
                    </div>
                    )}
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
                        <S.LabelGroup>
                            <S.Label>
                                <input type="radio"
                                name="userType"
                                value="GENERAL"
                                checked={formData.userType==='GENERAL'}
                                onChange={handleChange}
                                />일반회원
                            </S.Label>
                             <S.Label>
                                <input type="radio"
                                name="userType"
                                value="BUSINESS"
                                checked={formData.userType==='BUSINESS'}
                                onChange={handleChange}
                                /> 사업자
                            </S.Label>
                        </S.LabelGroup>
                    </S.AlineItemsCenter>

                    <S.AlineItemsCenter className="mt-2">
                        <S.FormControl
                        type="text" 
                        name="name"
                        value={formData.name}
                        placeholder="이름(실명)을 입력하세요"
                        onChange={handleChange}
                        />
                        
                    </S.AlineItemsCenter>
                    <S.AlineItemsCenter className="mt-3">
                        <S.FormControl
                        type="text" 
                        name="phone"
                        value={formData.phone}
                        placeholder="전화번호를 입력하세요 ( - 제외)"
                        onChange={handleChange}
                        />
                        <S.BaseBtn
                        $variant="primary"
                        $width="25%"
                        $padding="10px"
                        >인증</S.BaseBtn>
                    </S.AlineItemsCenter>

                    <S.AlineItemsCenter className="mt-3">
                        <S.FormControl
                        type="email"
                        name="email"
                        placeholder="이메일 입력"
                        value={formData.email}
                        onChange={handleChange}/>
                        <S.BaseBtn
                        onClick={handleCheckEmail}
                        $variant="primary"
                        $mainColor="#ccc"
                        $width="25%"
                        $padding="10px"
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
                        onClick={handleCheckNickname}
                        $variant="primary"
                        $mainColor="#ccc"
                        $width="25%"
                        $padding="10px"

                        >중복 확인
                        </S.BaseBtn>
                    </S.AlineItemsCenter>
   <div className="mt-3"></div>

                        <S.FormControl
                        type="password"
                        name="password"
                        placeholder="비밀번호 입력"
                        value={formData.password}
                        onChange={handleChange}/>
   <div className="mt-3"></div>
                        <S.FormControl
                        type="password"
                        name="passwordConfirm"
                        placeholder="다시 비밀번호 입력"
                        value={formData.passwordConfirm}
                        onChange={handleChange}/>   
   <div className="mt-3"></div>

                    <S.AlineItemsCenter>
                        <S.FormControl
                        type="text"
                        name="address"
                        placeholder="주소를 검색해주세요"
                        readOnly
                        value={formData.address}
                        onClick={()=>setIsOpenPostcode(true)}
                        />
                        <S.BaseBtn
                        onClick={()=>setIsOpenPostcode(true)}
                        $variant="primary"
                        $mainColor="#ccc"
                        $width="25%"
                        $padding="10px"
                        >주소검색</S.BaseBtn>
                    </S.AlineItemsCenter>

                    <S.AlineItemsCenter>
                        <S.FormControl
                        type="text"
                        name="detailAddress"
                        placeholder="상세주소를 입력해주세요"
                        value={formData.detailAddress}
                        onChange={handleChange}
                        />
                    </S.AlineItemsCenter>

                    {isOpenPostcode && (
                        <S.ModalBg>
                        <S.Modal>
                            <S.Exit
                            onClick={()=>setIsOpenPostcode(false)}
                            >
                                닫기 X
                            </S.Exit>
                            <DaumPostcodeEmbed
                            onComplete={handleCompletePostcode}
                            />

                        </S.Modal>
                        </S.ModalBg>
                    )}
                        

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

*/


/*
해시태그 설정
입양캠패인 등록할때 말머리 선택 해야 그군으로 설정됨
썸네일 이미지? 동영상 / 최대 2메가 바이트...
동영상 트래픽생겨 비쌈
스트리밍 서버, 아이프레임
유튜브... 남의 서버 제어가 안됨
아이프레임 링크... 썸네일을 자동으로 추출...
동영상: 웹용으로 서버에 ogg형태로 변환 30초 제한
썸네일 클릭하거나 제목 클릭하면 상세페이지로 연결..

 */