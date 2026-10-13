'use client';

import { useState } from 'react';

import {
    CustomSelectContainer,SelectTrigger,SelectList,SelectItem
} from '@/assets/css/Style.style'

export const CustomSelect = ()=>{

    const [isSelectOpen, setIsSelectOpen]=useState(false);
    const [formStatus, setFormStatus]=useState('');
    
    return(
        <>
         <CustomSelectContainer>
            <SelectTrigger onClick={()=>setIsSelectOpen(prev=>!prev)}>
                {formStatus}
                <span style={{fontSize:'0.7rem', color:'#94a3b8'}}>
                    {isSelectOpen ? '▲' : '▼'}
                </span>
            </SelectTrigger>

            {isSelectOpen && (
                <SelectList>
                    {['대기','진행','완료'].map(status=>(
                        <SelectItem key={status}
                        $isSelected={formStatus===status}
                        onClick={()=>{
                            setFormStatus(status as '대기'|'진행'|'완료');
                            setIsSelectOpen(false);
                        }}>
                            {status}
                        </SelectItem>
                    ))}
                </SelectList>
            )}
        </CustomSelectContainer>
        </>
    )
}