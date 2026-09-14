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
    

    const hasAllagreed = (e:React.ChangeEvent<HTMLInputElement>)=>{
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
        }catch(err){
            if(profileFile){
                const imgFormData = new FormData();
                imgFormData.append('file',profileFile);

                const res = await fetch(`/api/members/upload-profile`,{
                    method:'POST',
                    body:imgFormData
                })

                if(!res.ok) throw new Error('이미지업로드실패')
            }

        }
    }
    
    return(
        <>
        </>
    )
    
}