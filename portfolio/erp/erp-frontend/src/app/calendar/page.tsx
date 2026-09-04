'use client'

import { useState, useEffect } from "react"
import { Temporal } from "@js-temporal/polyfill"
import * as S from '@/assets/css/Style.style'
import { Holiday } from "@/app/types/holiday"
import { fetchHolidays } from "@/app/api/holidays"


//🌟plain(타임존정보가없는순수한날짜) ISO 8601 달력 형식(YYYY-MM-DD)으로 반환
export default function Calendar( 
    {year = Temporal.Now.plainDateISO().year,
    month = Temporal.Now.plainDateISO().month,
    }:
    {year?: number; month?:number}){

    // 입력받은 연/월을 기준으로 Temporal 객체 생성
    // 연도와 월 데이터를 넣어서 PlainYearMonth 객체를 생성!
    const targetYearMonth = Temporal.PlainYearMonth.from({year,month})
    //해당 월의 1일 날짜 정보 추출 //1:월요일
/*
    Temporal의 dayOfWeek(요일)는 1(월요일) ~ 7(일요일)입니다
    일요일부터 시작하는 달력 그리드를 위해 0(일) ~ 6(토) 인덱스로 변환합니다.
*/  
    const firstDayDate=
    targetYearMonth.toPlainDate({day:1}) //2026-06 + -01(day:1)
    const firstDayIndex= 
    firstDayDate.dayOfWeek ===7 ? 0 : firstDayDate.dayOfWeek;

    //해당 월의 마지막 날짜(총 일수) 직관적으로 가져옴
    const daysInMonth= targetYearMonth.daysInMonth;

    const [holidays,setHolidays]=useState<Holiday[]>([]);
    
    useEffect(()=>{
        fetchHolidays(year,month).then(setHolidays);
    }, [year,month])

    //오늘 날짜 가져오기 
    const today = Temporal.Now.plainDateISO();
    const isthisMonth = today.year === year && today.month===month;

    const getHoliday = (day:number)=> holidays.find(h=> h.date === day);
    const days =[];

    //달력 빈칸 만들기
    for(let i=0; i< firstDayIndex ; i++){
        days.push(<S.DayCell key={`empty-${i}`} $isEmpty/>)
    }
    //실제 날짜 채우기
    for(let d=1 ; d <= daysInMonth ; d++){
        const holiday= getHoliday(d);

        const currentDayofWeek = (firstDayIndex+d -1) % 7;
        const isSunday = currentDayofWeek === 0;
        const isSaturday = currentDayofWeek === 6;
        days.push(
            <S.DayCell key={d} 
                $isToday={isthisMonth && today.day=== d}
                $isHoliday={!!holiday}
                $isSaturday={isSaturday}
                $isSunday={isSunday}
                > <span>{d}</span>
                {holiday && <S.Tooltip>{holiday.name}</S.Tooltip>}
                {holiday?.name === '성탄절' && <span>🎄</span>} 
                {holiday?.name.includes('추석') && <span>🌕🐇</span>} 
            </S.DayCell>
        )
    }
    return(
        <S.CalTopMargin>
            <S.CalWrapper>
                <S.CalHeader>
                    {year}년 {month}월 
                </S.CalHeader>
                <S.Grid>
                    {['일','월','화','수','목','금','토'].map(day=>(
                        <S.Dayname key={day}>
                            {day}
                        </S.Dayname>
                    ))}
                    {days}
                </S.Grid>
            </S.CalWrapper>
        </S.CalTopMargin>
    )
}