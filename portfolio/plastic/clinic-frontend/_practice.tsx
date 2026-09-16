import { Address } from "react-daum-postcode";



const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value,type}=e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if((name === 'residentFront' || name === 'residentBack') &&  !/^[0-9]*$/.test(value)) return;

    setFomData(prev=>({
        ...prev,
        [name]: type==='checkbox' ?  checked: value,
    }));
}

const handleCompletePostcode =( data:Address)=>{
    let fullAddress = data.address;
    let extraAddress = '';

    if(data.addressType==='R'){
        if(data.bname){
            extraAddress+= data.bname;
        }
        if(data.buildingName){
            extraAddress += extraAddress !== '' ?  `, ${data.buildingName}` : data.buildingName;
        }

        fullAddress+= extraAddress !=='' ? `(${extraAddress})` : ''
    }

    setFormData(prev=>({
        ...prev,
        zipcode : data.zonecode,
        address1: fullAddress,
    }))

}