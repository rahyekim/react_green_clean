'use client'

import { useState } from "react"
import axios from 'axios'
import { useRouter } from "next/navigation"
import Script from 'next/script'
import * as S from "@/assets/css/Member.style"


const handleInstargramLogin = ()=>{

}

const handleKaKaoLogin=()=>{

}

interface FormData {
    firstname: string;
    lastname: string;
    email: string;
    password:string;
    repeatPassword:string,
    companyName:string;
    position: string;
    tel:string;
    address:string;
    detailAddress:string;
    gender:string;
}

declare global{
    interface Window {
        daum: any;
    }
}

export default function Member(){

    const router = useRouter();
    const [formData, setFormData]=useState<FormData>({
        firstname: "",
        lastname: "",
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

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFormData(prev=> ({
            ...prev,
            [name]:value,
        }))
    }

    const handleAddressSearch = (e:React.MouseEvent<HTMLButtonElement>)=>{
        
    }

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        //유효성검증..

        //비밀번호확인검증

        try{
            const res= await axios.post(`http://localhost:4000/api/`, formData)
        }catch(err){

        }
    }
    return(
        <S.Container>
            {/* Next.js Script 컴포넌트를 사용한 비동기 로드 */}
            <Script 
            src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" 
            strategy="lazyOnload"
            />
            <S.Card>
                <S.ImgColumn/>
                <S.FormColumn>
                    <S.Title>Create an Account!</S.Title>
                <S.Form onSubmit={handleSubmit}>
                    <S.Row>
                        <S.Col>
                            <S.Input
                            type="text" placeholder="이름"
                            name="firstname" value={formData.firstname}
                            onChange={handleChange}
                            />
                        </S.Col>

                        <S.Col>
                            <S.Input
                            type="text" placeholder="성"
                            name="lastname" value={formData.lastname}
                            onChange={handleChange}
                            />
                        </S.Col>
                    </S.Row>

                    <S.Input
                    type="email" placeholder="이메일"
                    name="email" value={formData.email}
                    onChange={handleChange}
                    />

                    <S.Row>
                        <S.Col>
                            <S.Input
                            type="password" placeholder="비밀번호"
                            name="password" value={formData.password}
                            onChange={handleChange}
                            />
                        </S.Col>

                        <S.Col>
                            <S.Input
                            type="password" placeholder="비밀번호 확인"
                            name="repeatPassword" value={formData.repeatPassword}
                            onChange={handleChange}
                            />
                        </S.Col>
                    </S.Row>

                    <S.RadioGroup>
                        <span>성별 : </span>
                        <S.RadioLabel>
                            <input type="radio" 
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                            /> 남자
                        </S.RadioLabel>
                        <S.RadioLabel>
                            <input type="radio" 
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                            /> 여자
                        </S.RadioLabel>
                        <S.RadioLabel>
                            <input type="radio" 
                            name="gender"
                            value="other"
                            checked={formData.gender === "other"}
                            onChange={handleChange}
                            /> 기타
                        </S.RadioLabel>
                    </S.RadioGroup>

                    <S.Row>
                        <S.Col>
                            <S.Input
                            type="text" placeholder="회사명"
                            name="companyName" value={formData.companyName}
                            onChange={handleChange}
                            />
                        </S.Col>

                        <S.Col>
                            <S.Input
                            type="text" placeholder="직급"
                            name="position" value={formData.position}
                            onChange={handleChange}
                            />
                        </S.Col>

                        <S.Col>
                            <S.Input
                            type="tel" placeholder="전화번호"
                            name="tel" value={formData.tel}
                            onChange={handleChange}
                            />
                        </S.Col>
                    </S.Row>

                    <S.AddressWrapper>
                        <S.Input
                        type="text" placeholder="주소"
                        name="address" value={formData.address}
                        readOnly/>
                        <S.SearchButton
                        type="button"
                        onClick={handleAddressSearch}
                        >주소검색
                        </S.SearchButton>
                    </S.AddressWrapper>

                    <S.Input
                    type="text" placeholder="상세주소"
                    name="detailAddress" value={formData.detailAddress}
                    onChange={handleChange}
                    />

                    <S.Button
                    type="submit"
                    > 가입하기</S.Button>
                    
                    <S.Divider $margin="0.5rem"/>

                    <S.SocialButton $provider="insta"
                    onClick={handleInstargramLogin}
                    >인스타그램으로 로그인</S.SocialButton>

                    <S.SocialButton $provider="kakao"
                    onClick={handleKaKaoLogin}
                    >카카오로 로그인</S.SocialButton>

                <S.Divider/>

                </S.Form>

                <S.LinkWrapper>
                    <S.StyledLink href='/forgot'>비밀번호 찾기</S.StyledLink>
                    <span> | </span>
                    <S.StyledLink href='/'>로그인</S.StyledLink>
                </S.LinkWrapper>
                
                </S.FormColumn>
            </S.Card>
        </S.Container>
    )
}
