
//이메일 형식 검증
export const isValidEmail = (email:string):boolean=>{
    const eamilRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return eamilRegex.test(email);
}

//비밀번호 보안검증(최소8자리, 영문/숫자/특수문자포함)
export const inStrongPassword= (password:string):boolean=>{
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
}

//빈 값(공백 포함) 체크

export const IsEmpty = (value:string | null | undefined): boolean =>{
    if(!value) return true;
    return value.trim() === '';
}

//휴대폰번호 형식 검증
export const isValidPhone = (phone: string): boolean => {
    //하이픈- 전부제거
    const cleanPhone = phone.replace(/-/g, '');
    // 숫자만 10-11자리인지 검증
    const phoneRegex=/^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    return phoneRegex.test(phone);
};


/*
    1. 빈 값 체크
    if (isEmpty(email) || isEmpty(password)) {
      setErrorMsg('모든 항목을 입력해주세요.');
      return;
    }
    2. 이메일 형식 체크
    if (!isValidEmail(email)) {
      setErrorMsg('올바른 이메일 주소를 입력해주세요.');
      return;
    }



 */