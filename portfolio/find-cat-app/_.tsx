import { useRef, useState } from "react";


const [formData, setFormData]=useState({
    agreeTerm: false,
    agreePrivacy:false,
    agreeAge:false,
    marketingAgreed:false, // 마케팅 정보 수신동의(선택)
})

const fileInputRef = useRef<HTMLInputElement>();

const [isOpenPostcode,setIsOpenPostcode ]=useState(false)
const[showTerms, setShowTerms]=useState(false)
const [showPrivacy, setShowPrivacy]=useState(false);

const handleImgch = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0];

    if(!file) return;
    if(!file.type.startsWith('image/')){
        alert("이미지파일등록가능")
        return;
    }
}


const handleCompletePostcode =(data:Address)=>{
    let fullAddress = data.address;
    let extraAddress = '';

    if(data.addressType === 'R'){
        if(data.bname!=='') extraAddress+= data.bname;
        if(data.buildingName !==''){
            extraAddress += extraAddress !==''
            ? `, ${data.buildingName}`
            : data.buildingName;
        }
        fullAddress += extraAddress !==''
        ? `(${extraAddress})` : '';
    }
    setFormData({
        ...formData,
        address: fullAddress
    });
    setIsOpenPostcode(false);
}

const isAllagreed =
formData.agreeAge &&
formData.agreePrivacy &&
formData.agreeTerms &&
formData.marketingAgreed;


const handleAllagreed =(e:React.ChangeEvent<HTMLInputElement>)=>{
    const isChecked = e.target.checked;
    setFormData(prev=>({
        ...prev,
        agreeAge: isChecked,
        agreePrivacy: isChecked,
        agreeTerms: isChecked,
        marketingAgreed: isChecked
    }))
}

const handleStep1next = ()=>{
    if(!formData.agreeAge || !formData.agreePrivacy || !formData.agreeTerm){
        alert("필수약관에 모두 동의해주세요")
        return;
    }
    setStep(2);
}

const handleBoxClick =()=>{
    fileInputRef.current?.click();
}

const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.type==='checkbox'
        ? e.target.checked
        : e.target.value
    })
}

const handleCheckEmail = async()=>{

    if(!formData.email.trim()){
        alert("")
        return;
    }

    try{ 
        const res= await fetch(`http://localhost:8080/api/members/check-email?email=${formData.email}`)
        if(!res.ok) throw new Error();
        const isDuplicate = await res.json()
        if(isDuplicate){
            alert()
        }else{
            alert()
        }

    }catch(Err){

    }
}

const handleSubmit = async()=>{

    //유효성검증
    if(!formData.email || !formData.nickname ){
        alert('')
        return
    }

    if(formData.password !==formData.passwordConfrim){
        alert('')
        return;
    }

    try{
        let finalImgUrl='';

        if(profileFile){
            const imgFormdata= new FormData();

            imgFormdata.append('file', profileFile);
            const res= await fetch('http://localhost:8080/api/members/upload-profile',{
                method: "POST",
                body: imgFormdata})
            if(!res.ok) throw new Error()

            finalImgUrl= await res.text();
            
        }
    }

    const fullAddressTosend= formData.detailAddress
    ? `${formData.address} ${formData.detailAddress}`
    : formData.address;
    

    const res=await fetch(`http://localhost:8080/api/members/signup`,{
        method:"POST",
        headers:{"Content-Type": 'application/json'},
        body:JSON.stringify({
            email:formData.email,
            marketingAgreed: formData.marketingAgreed,
            provider: "LOCAL",
            profileImageUrl: finalImgUrl || '',
            name:
            phone:
            email:
            address: fullAddressTosend
            userType: 
        })

        if(res.status===201 || res.ok){
            alert("")
            window.location.href('/login')

        }else{
            const errText =await res.text();
            alert(`회원가입실패 ${errText}`)
        }
    })
}

const handleRemoveImg= ()=>{
    if(profilePreview) URL.revokeObjectURL(profilePreview);
    setProfilePreview("")
    setProfileFile(null)

    if(fileInputRef.current){
        fileInputRef.current.value='';
    }
}

()=>step>0 ? setStep(step-1) : window.history.back()


return(


    <input
    type="radio"
    name="userType"
    value="general"
    checked={formData.userType==='general'}
    onChange={handleChange}
    />

    <input
    type="checkbox"
    name="agreeAge"
    checked={formData.agreeAge}
    onChange={handleChange}
    />

)