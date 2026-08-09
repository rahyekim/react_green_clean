import { useState } from "react";


const [formData, setFormData]=useState({
    agreeTerm: false,
    agreePrivacy:false,
    agreeAge:false,
    marketingAgreed:false, // 마케팅 정보 수신동의(선택)
})