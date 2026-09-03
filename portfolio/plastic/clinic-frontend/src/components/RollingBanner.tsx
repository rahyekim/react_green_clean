'use clinet'
import React from 'react'
import * as S from '@/components/RollingBanner.styles'

export default function RollingBanner(){

    const Text = "If IT'S PRETTY, IT'S skz!"
    const repeatedTextArray = Array(10).fill(Text);
    return(
        <>
        <S.BannerWrapper>
            <S.Track>
                {/* 원본 그룹 */}
                <S.TextGroup>
                    {repeatedTextArray.map((txt,idx)=>(
                        <S.TextItem key={`originatl=${idx}`}>
                            {txt}
                        </S.TextItem>
                    ))}
                </S.TextGroup>

{/* 복제본 텍스트 그룹(원본이 다 지나가기전에 뒤에서 자연스럽게 이어짐) */}
                <S.TextGroup aria-hidden="true">
                    {repeatedTextArray.map((txt,idx)=>(
                        <S.TextItem key={`originatl=${idx}`}>
                            {txt}
                        </S.TextItem>
                    ))}
                </S.TextGroup>
                
            </S.Track>
        </S.BannerWrapper>
        </>
    )
}