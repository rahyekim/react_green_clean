'use client'

import React, {useState, useRef, use} from "react"
import { useRouter } from "next/navigation";
import * as S from '@/css/style.styled'
import { Password, PestControlOutlined, PestControlRodent, PetsOutlined, PetsRounded, PetsSharp, PetsTwoTone, Phone } from "@mui/icons-material";
import DaumPostcodeEmbed, {Address} from 'react-daum-postcode';
import Header from '@/app/components/Header'

export default function SignupPage(){

    const router = useRouter();

    const [step, setStep]= useState(0);
    const [formData, setFormData] =useState({
        agreeTerms:false,
        agreePrivacy:false,
        agreeAge:false,
        marketingAgreed:false,

        email: '',
        nickname: '',
        password: '',
        passwordConfirm: '' , 
        name:'',
        phone: '',
        address: '',
        detailAddress:'',
        userType: 'GENERAL' //사업자/소비자
    })

    const [profilePreview,setProfilePreview]=useState<string>('');
    const [profileFile, setProfileFile]=useState<File|null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isOpenPostcode, setIsOpenPostcode]=useState(false);

    const[showTerms, setShowTerms] = useState(false);
    const[showPrivacy, setShowPrivacy]=useState(false);


    const handleFileChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];

        if(!file) return;

        if(!file.type.startsWith('image/')){
            alert('이미지파일만 등록가능합니다');
            return;
        }
        if(profilePreview) URL.revokeObjectURL(profilePreview);

        const imgUrl = URL.createObjectURL(file);
        setProfileFile(file);
        setProfilePreview(imgUrl);
    }

    const handleCompletePostcode = (data:Address)=>{
        let fullAddress = data.address; //서울강남구테헤란로123
        let extraAddress = ''; // 추가주소: (역삼동,역삼빌딩)

        if(data.addressType === 'R'){
            if(data.bname !== '') extraAddress+= data.bname;
            if(data.buildingName !=='') {
                extraAddress += extraAddress !== ''? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !==''? `(${extraAddress})` : '';
        }

        setFormData(prev=> ({...prev, address: fullAddress}));
        setIsOpenPostcode(false);
    }
    

    const isAllagreed = 
    formData.agreeAge && formData.agreePrivacy && formData.agreeTerms && formData.marketingAgreed;
    

    const handleAllagreed = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const isChecked = e.target.checked;
        setFormData(prev=>({
            ...prev,
            agreeAge: isChecked,
            agreePrivacy: isChecked,
            agreeTerms: isChecked,
            marketingAgreed: isChecked
        }))
    }
    const handleStep1Next = ()=>{
        if(!formData.agreeAge || !formData.agreePrivacy || !formData.agreeTerms){
            alert('필수약관에 모두 동의해주세요');
            return;
        }
        setStep(2);
    }

    const handleBoxClick =()=>{
        fileInputRef.current?.click();
    }

    const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData(prev=>({
            ...prev,
            [e.target.name]: e.target.type === 'checkbox'
            ? e.target.checked
            : e.target.value
        }))
    }

    const handleGederalSignup = ()=>{
        setStep(1);
    }

    const handleSubmit = async()=>{
        //빈칸방어

        //비밀번호 더블체크

        //프로필추가
        try{
            let finalImgUrl=''; //DB에 들어갈 이미지 주소
            if(profileFile){
                const imgFormData = new FormData();
                imgFormData.append('file',profileFile);

                const res = await fetch(`/api/members/upload-profile`,{
                    method:'POST',
                    body:imgFormData
                })

                if(!res.ok) throw new Error('이미지업로드실패');
                
                finalImgUrl = await res.text();
                console.log('보낼 프로필 이미지 url:', finalImgUrl)
            }

            const fullAddressTosend = formData.detailAddress 
            ? `${formData.address} ${formData.detailAddress}`
            : formData.address;

            const res = await fetch(`/api/members/signup`, {
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({
                    email: formData.email,
                    nickname:formData.nickname,
                    password: formData.password,
                    marketingAgreed: formData.marketingAgreed,
                    provider: 'LOCAL',
                    profileImgUrl: finalImgUrl || '',
                    name: formData.name,
                    phone: formData.phone,
                    address: fullAddressTosend,
                    userType: formData.userType,
                })
            })
            
        }catch(err){
            console.error("회원가입API에러",err);
            alert("회원가입처리중 서버와 연결할수없습니다. 백엔드 서버 켜졌는지 확인해주세요")
        }
    }

    //이미지삭제처리
   const handleRemoveImg = ()=>{
    if(profilePreview) URL.revokeObjectURL(profilePreview);
    setProfileFile(null);
    setProfilePreview('');

    if(fileInputRef.current){
        fileInputRef.current.value='';
    }
   }
    
    return(
        <S.AppWrapper>
            <S.Container>
                <S.MT70></S.MT70>
                <Header title="회원 가입"
                onBackClick={()=>step>0 ? setStep(step-1) :window.history.back()}
                />
                {step=== 0 && (
                    <S.TextCenter>
                        <div className="">환영합니다</div>
                        <S.BtnBottomWrap>

                        </S.BtnBottomWrap>
                    </S.TextCenter>
                )}

                {step===1 && (
                    <S.BasicLayout>
                        <p>약관에 동의하고 회원이되어주세요</p>
                        <S.MemberInfo>
                            <label htmlFor="">
                                <input
                                type="checkbox"
                                checked={isAllagreed}
                                onChange={handleAllagreed}
                                />전체 동의
                            </label> <br/>

                            <label>
                                <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleChange}
                                />이용약관 동의(필수)
                            </label>
                            <S.UpandDown
                            onClick={()=>setShowTerms(prev=>!prev)}
                            >{showTerms ? '▲ 닫기':'👉보기'}</S.UpandDown>

                           <S.Terms $IsOpen={showTerms}>
                                <S.TermsInner>

                                </S.TermsInner>
                           </S.Terms>

                           <label htmlFor="">
                            <input type="checkbox"
                            name="agreePrivacy"
                            checked={formData.agreePrivacy}
                            onChange={handleChange}
                             />개인정보 수집이용 동의(필수)
                           </label>
                           <S.UpandDown onClick={()=>setShowPrivacy(prev=>!prev)}>
                                {showPrivacy ? '▲ 닫기': '보기'}
                           </S.UpandDown>
                           <S.Terms $IsOpen={showPrivacy}>
                                <S.TermsInner>
                                수집 항목: 이메일, 닉네임, 이름, 연락처, 주소 <br/>
                                수집 목적: 서비스 제공 및 회원 관리 <br/>
                                보유 기간: 회원 탈퇴 시까지      
                                </S.TermsInner>
                           </S.Terms>
                        </S.MemberInfo>
                    </S.BasicLayout>
                )}

                {/* 정보입력 */}
                {step === 2 && (
                    <>
                    <S.TextCenter>
                        <S.PhotoUpload
                        onClick={handleBoxClick}
                        >{profilePreview ? (
                            <img src={profilePreview} alt="대표이미지"/>
                        ) : (
                            <PetsRounded></PetsRounded>
                        )}
                        </S.PhotoUpload>

                        {profilePreview && (
                            <button
                            type="button"
                            onClick={handleRemoveImg}
                            > X
                            </button>
                        )}

                        <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{display:'none'}}
                        />
                    </S.TextCenter>
                    </>
                )}
            </S.Container>
        </S.AppWrapper>
    )
    
}