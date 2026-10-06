import styled from "styled-components";

interface ToggleBtnProps{
    isOn :boolean;
    onToggle : ()=>void;
}
export const ToogleBtn = ({isOn, onToggle}:ToggleBtnProps)=>{
    return(
        <ToggleWrapper
        $isOn={isOn}
        onClick={onToggle}
        > 
            <div className="handle"/>
        </ToggleWrapper>
    )
}

//🏆토글
export const ToggleWrapper=styled.button<{$isOn:boolean}>`
width: 48px;
height: 26px;
border-radius: 13px;
border: none;
background-color: ${({$isOn})=> $isOn ? '#ff8c00' : '#ddd'};

position: relative;
cursor: pointer;
transition: all 0.3s ease;

&:focus{
    outline: none;
}

/* 토글스위치 손잡이*/
.handle{
    width: 22px;
    height: 22px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: ${({$isOn})=>$isOn ? '24px': '2px'};
    box-shadow: 0px 2px 4px rgba(0,0,0,.2);
    transition: left 0.3s ease;
}
`;


/*
<ToggleButton 
    isOn={isAlertOn} 
    onToggle={() => setIsAlertOn(prev => !prev)} 
    />
   

 */