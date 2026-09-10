import * as S from '@/app/shelter/shleter.sytles'
import { useState } from 'react'

export default function Shelter(){

    const [activeTap, setActiveTap]=useState('보호동물');

    return(
        <>
        <S.TabContainer>
            {['보호동물','보호소찾기', '추천입양동물'].map(tab=>(
                <S.TabBtn key={tab}
                $active={activeTap===tab}
                onClick={()=>setActiveTap(tab)}
                > <span>{tab}</span>
                </S.TabBtn>
            ))}
        </S.TabContainer>
        </>
    )
}
