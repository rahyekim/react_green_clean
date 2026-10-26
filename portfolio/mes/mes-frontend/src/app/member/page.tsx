"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Script from "next/script";
import axios from "axios";

import * as S from "@/assets/css/Style.style";
import { useAlertStore } from "@/store/useAlertStore";
import { Divider , DividerText , ModalBg, ModalContent, RightBtn} from '@/assets/css/Common.style'
import Button from '@/ui/Button'
import Input from '@/ui/Input'
import { createMember } from "@/api/http";
import { setLogin } from "@/store/authSlice";

const handleInstargramLogin = () => {
    // 인스타그램 로그인 로직
};

const handleKakaoLogin = () => {
    // 카카오 로그인 로직
};

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
    companyName: string;
    position: string;
    tel: string;
    address: string;
    detailAddress: string;
    gender: string;
}

declare global {
    interface Window {
        daum: any;
    }
}

export default function Member() {

    const {showAlert} = useAlertStore();
    const router = useRouter();
    const dispatch = useDispatch();

    const postcodeRef = useRef<HTMLDivElement>(null);
    const [isPostcodeOpen, setIsPostcodeOpen] =useState(false);

    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
        companyName: "",
        position: "",
        tel: "",
        address: "",
        detailAddress: "",
        gender: "",
    });

    useEffect(()=>{
        if(isPostcodeOpen && window.daum && window.daum.Postcode && postcodeRef.current){
            new window.daum.Postcode({
                oncomplete: function (data: any) {
                    // 도로명 주소 또는 지번 주소 선택 시 address 상태 업데이트
                    const fullAddress = data.roadAddress || data.jibunAddress;
                    setFormData(prev => ({
                        ...prev,
                        address:fullAddress,
                    }));   
                    setIsPostcodeOpen(false);
                },
                width: '100%',   // ⭐ 
                height: '100%',   
            }).embed(postcodeRef.current);   
        }
    }, [isPostcodeOpen])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 다음 우편번호 검색 API 핸들러
    const handleAddressSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (window.daum && window.daum.Postcode) {
            setIsPostcodeOpen(true);
        }else{
            showAlert("주소 검색 스크립트가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요."); 
        }
    };

    // 3. 폼 제출 및 백엔드 전송 로직 완성
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 유효성 검사 (비밀번호 확인)
        if (formData.password !== formData.repeatPassword) {
            showAlert("비밀번호가 일치하지 않습니다.")
            return;
        }

        try {
            const data = await createMember(formData);
            if (data.success) {
                const token = data.token;
                if(token){
                    dispatch(setLogin({token}));
                    axios.defaults.headers.common['Authorization']=
                    `Bearer ${token}`
                }else{
                    router.push('/')
                }
                showAlert("회원가입이 완료되었습니다!",()=>{
                    router.push("/"); // 로그인 페이지로 이동
                });
            }
        } catch (error:any) {
            const errorMsg = error.response?.data?.message || "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.";
            showAlert(errorMsg)
            console.error("회원가입 에러:", error);
        }
    };

    return (
        <>
        <S.Container>
            {/* Next.js Script 컴포넌트를 사용한 비동기 로드 */}
            <Script
                src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
                strategy="lazyOnload"
            />
            <S.Card>
                <S.ImgColumn />
                <S.FormColumn>
                    <S.Title>회원가입</S.Title>
                    <S.Form onSubmit={handleSubmit}>
                        <S.RowGroup>
                            <Input
                                type="text"
                                placeholder="이름"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                type="text"
                                placeholder="성"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </S.RowGroup>

                        <Input
                            type="email"
                            placeholder="이메일"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <S.RowGroup>
                            <Input
                                type="password"
                                placeholder="비밀번호"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                type="password"
                                placeholder="비밀번호 확인"
                                name="repeatPassword"
                                value={formData.repeatPassword}
                                onChange={handleChange}
                                required
                            />
                        </S.RowGroup>

                        <S.RadioGroup>
                            <span>성별 :</span>
                            <S.RadioLabel>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={formData.gender === "male"}
                                    onChange={handleChange}
                                />{" "}
                                남자
                            </S.RadioLabel>
                            <S.RadioLabel>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={formData.gender === "female"}
                                    onChange={handleChange}
                                />{" "}
                                여자
                            </S.RadioLabel>
                            <S.RadioLabel>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    checked={formData.gender === "other"}
                                    onChange={handleChange}
                                />{" "}
                                선택안함
                            </S.RadioLabel>
                        </S.RadioGroup>

                        <S.RowGroup>
                            <Input
                                type="text"
                                placeholder="회사명"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                            <Input
                                type="text"
                                placeholder="직급"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                            />
                        </S.RowGroup>

                        <Input
                            type="text"
                            placeholder="전화번호"
                            name="tel"
                            value={formData.tel}
                            onChange={handleChange}
                        />

                        <S.AddressWrapper>
                            <Input
                                type="text"
                                placeholder="주소"
                                name="address"
                                value={formData.address}
                                readOnly
                                tabIndex={-1} // 👈 탭 키나 마우스 포커스 진입 방지
                                onClick={e=> handleAddressSearch(e as any)}
                                style={{cursor:'pointer'}}
                            /> 
                            <Button 
                            variant="secondary"
                            type="button" onClick={handleAddressSearch}>
                                주소검색
                            </Button>
                        </S.AddressWrapper>

                        <Input
                            type="text"
                            placeholder="상세주소"
                            name="detailAddress"
                            value={formData.detailAddress}
                            onChange={handleChange}
                        />
                        <Button 
                        variant="primary"
                        type="submit">가입하기</Button>

                        <DividerText>또는</DividerText>

                        <Button 
                        variant="insta" 
                        onClick={handleInstargramLogin}>
                            인스타그램으로 가입하기
                        </Button>

                        <Button 
                        variant="kakao" 
                        onClick={handleKakaoLogin}>
                           카카오로 가입하기
                        </Button>

                        <Divider/>
                    </S.Form>

                    <S.LinkWrapper>
                        <S.StyledLink href='/forgot'>비밀번호찾기</S.StyledLink>
                        <span>|</span>
                        <S.StyledLink href='/'>로그인</S.StyledLink>
                    </S.LinkWrapper>
                </S.FormColumn>
            </S.Card>
        </S.Container>

        {isPostcodeOpen && (
            <ModalBg onClick={() => setIsPostcodeOpen(false)}>
                <ModalContent onClick={e => e.stopPropagation()}>
                    <RightBtn>
                        <button onClick={() => setIsPostcodeOpen(false)}>
                            X
                        </button>
                    </RightBtn>
                    <div ref={postcodeRef} style={{ flex: 1, height: '500px'}}/>
                </ModalContent>
                    
            </ModalBg>
        )}
        </>
    )
}