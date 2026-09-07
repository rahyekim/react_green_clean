'use client'

import { useState, useEffect, use } from "react"
import { Temporal } from "@js-temporal/polyfill"
import * as S from '@/assets/css/Style.style'
import { Holiday } from "@/app/types/holiday"
import { fetchHolidays } from "@/app/api/holidays"

    // 1. 일정(Schedule) 타입 정의 
interface Schedule{
    // id, date, content, status, createdAt 등의 필드 작성하기
}

// 2. 캘린더 메인 컴포넌트 (Props 기본값과 타입 지정)
export default function Calendar(
    {year = Temporal.Now.plainDateISO().year,
    month = Temporal.Now.plainDateISO().month
    }:{year?:number, month?:number}
){

    // 3. Temporal을 이용해 선택된 연/월 객체 만들기
    const targetYearMonth= Temporal.PlainYearMonth.from({year,month})

    // 4. 해당 월의 1일 요일 인덱스(0~6)와 마지막 날짜(총 일수) 구하기
    const firstDayDate = targetYearMonth.toPlainDate({day:1})

    const firstDayIdx =
    firstDayDate.dayOfWeek === 7 ? 0 : firstDayDate.dayOfWeek;

    const daysInMonth = targetYearMonth.daysInMonth;

    // 5. 공휴일 데이터 관리를 위한 useState와 useEffect 작성하기
    const [holidays, setHolidays]=useState<Holiday[]>([])

    useEffect(()=>{
        fetchHolidays(year,month).then(setHolidays); //함축된(단축)버전 .then(res=> setHolidays(res))
    },[year,month])

    // 6. 오늘 날짜 계산 및 특정 날짜의 공휴일 찾아주는 헬퍼 함수 작성하기
    const today = Temporal.Now.plainDateISO();
    const isThisMonth = today.year === year && today.month === month;

    // 7. 달력 앞쪽 빈칸(empty)과 실제 날짜 칸(days)을 반복문(for)으로 채우기
    //조건에 맞는 아이템 하나(객체)를 리턴/<-> filter([])/some(boolean)
    const getHoliday = (day:number)=> holidays.find(h=> h.date === day)

    // 달력 칸들을 담을 배열 선언
    const days = [];

    // 1. [달력 앞쪽 빈칸 만들기]
    // 힌트: 1일이 시작하기 전의 요일 인덱스(firstDayIndex)만큼 빈 칸을 채워야 합니다!
    for(let i = 0; i < firstDayIdx; i++){
        // 빈 셀(<S.DayCell $isEmpty />)을 days 배열에 push 하기
    }

    // 2. [실제 날짜 채우기]
    // 힌트: 1일부터 해당 월의 마지막 날(daysInMonth)까지 반복문을 돕니다.
    for(let d = 1; d <= daysInMonth; d++){
        // (1) 오늘 날짜에 해당하는 공휴일이 있는지 찾기 (getHoliday 활용)
        
        // (2) 현재 날짜의 요일 인덱스 구하기 (일요일인지, 토요일인지 판별)
        
        // (3) S.DayCell 컴포넌트를 생성해서 days 배열에 push 하기
        // (오늘인지, 공휴일인지, 주말인지 props 전달하고 날짜 숫자 및 이모지/툴팁 조건부 렌더링하기)
    }

    // 8. 최종 UI 렌더링 반환 (JSX)
    return(
        <S.CalTopMargin>
            {/* CalWrapper, CalHeader, Grid, Dayname, days 등을 배치하기 */}
        </S.CalTopMargin>
    )
}

        
