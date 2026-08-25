'use client'
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation";

import * as S from '../../../style/Terms.styles'

export default function TermsPage (){

    const router = useRouter();

    //🔹스텝
    const [step, setStep] = useState(1);

    const [termsAgreed, setTermsAgreed]=useState(false);
    const [privacyAgreed, setPrivacyAgreed]=useState(false);

    //약관 박스 열림 /닫힘 토글 상태(디자인시안에 맞춰 기본값 true)
    const [isTermsOpen, setIsTermsOpen]=useState(true);
    const [isPrivacyOpen, setIsPrivacyOpen]=useState(true);

    //🔹폼입력값 관리할 객체 상태추가
    const [formData, setFormData]=useState({
        userName: '',
        userId:'',
        userPW:'',
        userPWconfirm:'',
        email:'', 
        emailDomain:'',
        isSnsAgreed:false,
        isEmailAgreed:false,
        phone:'' ,
        gender:'',
    });

    //필수 항목이 모두 동의되었는지 확인(파생된 상태)
    const isAllagreed = termsAgreed && privacyAgreed;

    //사용자가 키보드 입력할때마다 상태를 업데이트
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const {name, value, type}= e.target;
        const checked =(e.target as HTMLInputElement).checked;

        setFormData(prev=> ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value 
        }));
    }

    //🔹회원가입 버튼 클릭=> 백엔드(node.js)로 전송
    const handleSumbit = async()=>{
        //필수입력값체크
        if(!formData.userName || !formData.userPW || !formData.userId){
            return alert('필수 항목을 입력해 주세요');
        }
        if(formData.userPW !== formData.userPWconfirm){
            return alert('비밀번호가 일치하지 않습니다');
        }
        //이메일 주소 조합 (직접선택시 domain='')
        const fullEmail = 
        formData.emailDomain === '' 
        ? formData.email 
        : `${formData.email}@${formData.emailDomain}`

        try{
            const res= await fetch('http://localhost:5000/api/register',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    userName: formData.userName,
                    userId: formData.userId,
                    userPW: formData.userPW,
                    email: fullEmail, 
                    isSnsAgreed:formData.isSnsAgreed,
                    isEmailAgreed:formData.isEmailAgreed,
                    phone: formData.phone,
                    gender: formData.gender,
                })
            })

            const result = await res.json();
            //에러도 json으로 주니까 먼저 파싱!
            
            //200번대가 아니라면?
            if(!res.ok){
                alert(result.message || '회원가입 실패');
                console.log('회원가입 중 에러발생')
                return;
            }
            //성공처리
            if(result.success){
                alert('회원가입이 완료되었습니다')
                router.push('/');
            }else{
                alert(result.message);
            }

        }catch(err){
            
            console.error(err);
            alert('서버와 통신중에 오류가 발생')

        }
    }
    

    //전체동의핸들러
    const handleAllagreed = (e:React.ChangeEvent<HTMLInputElement>)=>{
        
        const isChecked = e.target.checked;

        setTermsAgreed(isChecked);
        setPrivacyAgreed(isChecked);
    }
    
    const handleNextStep = ()=>{
        if(!isAllagreed){
            alert('필수약관에 모두 동의해주세요');
            return;
        }
        //다음 회원가입 페이지 이동 로직
        setStep(2);
    }
    
    return(
        <S.Wrapper>
            {/* 2.회원가입 폼일때 보여줄 상단 타이틀 추가 */}
            {step === 2 && <S.PageTitle>회원가입</S.PageTitle>}
            <S.StepContainer>
                <S.Step $active={step===1}>
                    <S.StepNumber $active={step===1}>1</S.StepNumber>
                    <S.StepText $active={step===1}>약관동의</S.StepText>
                </S.Step>

                <S.StepDivider/>

                <S.Step $active={step===2}>
                    <S.StepNumber $active={step===2}>2</S.StepNumber>
                    <S.StepText $active={step===2}>회원가입</S.StepText>
                </S.Step>
                
            </S.StepContainer>

            {step ===1 && (
            <>
            {/* 전체 동의 영역 */}
            <S.CheckAllWrapper>
                <S.CheckboxLabel>
                    <S.CheckboxInput
                    type="checkbox"
                    checked={isAllagreed}
                    onChange={handleAllagreed}
                    />
                    <S.CheckAllText>
                        안호범 안스 성형외과의 모든 약관을 확인하고 전체동의합니다.
                        (전체동의, 선택항목도 포함됩니다)
                    </S.CheckAllText>
                </S.CheckboxLabel>
            </S.CheckAllWrapper>

            {/* 이용약관(필수) */}
          
            <S.TermSection>
                <S.TermHeader>
                    <S.CheckboxLabel>
                        <S.CheckboxInput
                        type="checkbox"
                        checked={termsAgreed}
                        onChange={(e)=>setTermsAgreed(e.target.checked)}
                        />
                        <S.TermTitle>이용 약관 (필수)</S.TermTitle>
                    </S.CheckboxLabel>
                    
                    <S.ToggleButton 
                    onClick={()=>setIsTermsOpen(prev=> !prev)}
                    >{isTermsOpen? '닫기 ✕' : '보기 ›'}</S.ToggleButton>
                </S.TermHeader>

                <S.TermContentBox $isOpen={isTermsOpen}>
                    {`[OO성형외과의원 온라인회원 약관]\n이 약관은 OO성형외과의원(이하 '회사')가 제공하는 서비스 이용조건 및 절차에 대한 사항과 기타 필요한 사항을 전기통신사업법 및 동법 시행령이 정하는 대로 준수하고 규정함을 목적으로 합니다.\n\n제 1조 목적\n① OO성형외과의원 이용자 약관(이하 "본 약관"이라 합니다)은 이용자가 OO성형외과의원에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 합니다)를 이용함에 있어 회원과 OO성형외과의원의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.\n\n제 2조 회원의 정의`}
                </S.TermContentBox>
            </S.TermSection>

            {/* 개인정보 수집 및 동의 (필수) */}
            <S.TermSection>
                <S.TermHeader>
                    <S.CheckboxLabel>
                        <S.CheckboxInput
                        type="checkbox"
                        checked={privacyAgreed}
                        onChange={e=>setPrivacyAgreed(e.target.checked)}
                        />
                        <S.TermTitle>개인정보 수집 및 동의 (필수)</S.TermTitle>
                    </S.CheckboxLabel>
                     <S.ToggleButton 
                    onClick={()=>setIsPrivacyOpen(prev=> !prev)}
                    >{isPrivacyOpen? '닫기 ✕' : '보기 ›'}</S.ToggleButton>
                </S.TermHeader>
                <S.TermContentBox $isOpen={isPrivacyOpen}>
                      {`1. - 목적 : 이용자 식별 및 본인여부 확인\n- 항목 : 이름, 아이디, 비밀번호\n- 보유 및 이용기간 : 회원탈퇴 후 5일까지\n\n2. - 목적 : 민원 등 고객 고충처리\n- 항목 : 이메일, 휴대전화번호\n- 보유 및 이용기간 : 회원탈퇴 후 5일까지\n\n3. - 목적 : 만 14세 미만 아동 확인\n- 항목 : 법정 생년월일`}
                </S.TermContentBox>
            </S.TermSection>

            <S.ButtonGroup>
                <S.Button $variant="outline" onClick={()=>router.back()} //window.history.back()
                >이전단계</S.Button>
                <S.Button 
                    $variant="solid"
                    // disabled={!isAllagreed} //아예 안눌려서 alert안나옴..
                    onClick={handleNextStep}
                >다음단계</S.Button>
            </S.ButtonGroup>
            </>
            )}
    {/* step2 회원가입 */}
            {step ===2 && (
                <>
                <S.FormContainer>
                    <S.FormGroup>
                        <S.Label>이름(필수)</S.Label>
                        <S.Input 
                        type="text" 
                        placeholder="이름을 입력해주세요"
                        value={formData.userName}
                        name="userName"
                        onChange={handleChange}
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label>아이디(필수)</S.Label>
                        <S.Input 
                        type="text" 
                        placeholder="아이디를 입력해주세요"
                        value={formData.userId}
                        name="userId"
                        onChange={handleChange}
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label>비밀번호(필수)</S.Label>
                        <S.Input 
                        type="password" 
                        placeholder="비밀번호를 입력해주세요"
                        value={formData.userPW}
                        name="userPW"
                        onChange={handleChange}
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label>비밀번호 확인(필수)</S.Label>
                        <S.Input 
                        type="password" 
                        placeholder="비밀번호 한 번더 입력해주세요"
                        value={formData.userPWconfirm}
                        name="userPWconfirm"
                        onChange={handleChange}
                        />
                    </S.FormGroup>

                     <S.FormGroup>
                        <S.Label>이메일(필수)</S.Label>
                        <S.EmailWrapper>
                            <S.Input 
                            type="text" 
                            placeholder="이메일 주소를 입력해주세요"
                            value={formData.email}
                            name="email"
                            onChange={handleChange}
                            />
                            <S.Select
                            value={formData.emailDomain}
                            name="emailDomain"
                            onChange={handleChange}
                            >
                                <option value="">직접입력</option>
                                <option value="naver.com">naver.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="daum.net">daum.net</option>
                            </S.Select>
                        </S.EmailWrapper>

                        <S.SubCheckboxLabel>
                            <input 
                            type="checkbox"
                            checked={formData.isEmailAgreed}
                            name="isEmailAgreed"
                            onChange={handleChange}
                            />
                            정보/이벤트 메일 수신에 동의합니다
                        </S.SubCheckboxLabel>
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label>휴대폰 번호</S.Label>
                        <S.Input 
                        type="tel" 
                        placeholder="-없이 입력하세요"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        />
                        <S.SubCheckboxLabel>
                                <input 
                                type="checkbox"
                                checked={formData.isSnsAgreed}
                                name="isSnsAgreed"
                                onChange={handleChange}
                                />
                                정보/이벤트 sns 수신에 동의합니다
                        </S.SubCheckboxLabel>
                    </S.FormGroup>

                    <S.FormGroup>
                        <S.Label>성별</S.Label>
                        <S.RadioWrapper>
                            <S.RadioLabel>
                                <S.RadioInput 
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                                />남성
                            </S.RadioLabel>
                            <S.RadioLabel>
                                <S.RadioInput 
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                                />여성
                            </S.RadioLabel>
                        </S.RadioWrapper>
                    </S.FormGroup>
                </S.FormContainer>

                <S.ButtonGroup>
                    <S.Button $variant="outline" 
                    onClick={()=>setStep(1)} //router.back(), window.history.back()
                    >취소</S.Button>
                    <S.Button 
                        $variant="solid"
                        onClick={handleSumbit}
                    >회원가입</S.Button>
                </S.ButtonGroup>
                </>
            )}
        </S.Wrapper>
    )
}