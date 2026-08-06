'use client'

import React, {useState } from "react"
import * as S from '../../css/style.styled'
import { PetsOutlined } from "@mui/icons-material";

export default function SignupPage(){

//🌟가입방법 선택: step1 약관 (동의)=> 2.휴대폰 (인증)=> 3.정보입력
    const [step, setStep]=useState(0);
    const [formData, setFormData]=useState({
        marketingAgreed:false,
        phone: '',
        email: '',
        nickname: '',
        password: '',
        passwordConfirm: ''

    });

    //폼데이터 세팅
    const handleChange= (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value})
    }
    //일반 가입 버튼 클릭시 
    const handleGeneralSignup = ()=>{
        setStep(1); //약관동의 화면으로 이동
    }
    //카카오 가입 버튼 클릭
    const handleKaKaoSignup = ()=>{
        alert('카카오 로그인 연동페이지로 이동합니다(빽단 OAuth 세팅 필요)')
    }

    const handleCheckEmail = async()=>{}
    const handleSubmit = async(e:SubmitEvent)=>{
        e.preventDefault()
    }
    
    
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
                        <S.Column>
                            <S.KaKaoBtn>카카오로 시작하기</S.KaKaoBtn>
                            <S.LocalBtn
                            onClick={handleGeneralSignup}
                            >일반 회원 가입하기</S.LocalBtn>
                        </S.Column>
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
                        <S.BtnEndWrap>
                            <S.LocalBtn
                            onClick={()=>setStep(2)}
                            > 다음으로 </S.LocalBtn>
                        </S.BtnEndWrap>
                    </S.BasicLayout>
                )}
            </S.Container>
        </S.AppWrapper>
        </>
    )
}