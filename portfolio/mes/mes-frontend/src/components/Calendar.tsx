'use client'

import { useState, useEffect, use } from "react"
import { Temporal } from "@js-temporal/polyfill"
import * as S from '@/assets/css/Style.style'
import { Holiday } from "@/app/types/holiday"
import { fetchHolidays } from "@/app/api/holidays"
import ScheduleModal from "@/components/modal/ScheduleModal"

    // 1. 일정(Schedule) 타입 정의 
interface Schedule{
    id: string;
    year: number;  // 💡 연도 추가
    month: number; // 💡 월 추가
    date: number;
    content: string;
    status: '대기' | '완료' | '진행';
    createdAt: string;
}

// 2. 캘린더 메인 컴포넌트 (Props 기본값과 타입 지정)
export default function Calendar(
    {year : initialYear = Temporal.Now.plainDateISO().year,
    month : initialMonth = Temporal.Now.plainDateISO().month
    }:{year?:number, month?:number}
){  
    //🔹모달
    const [schedules, setSchedules]=useState<Schedule[]>([]);
    const [selectedDate, setSelectedDate]=useState<number|null>(null)
    const [isModalOpen, setIsModalOpen]=useState(false);

    //💡년, 월 
    const [year, setYear]=useState(initialYear);
    const [month, setMonth]=useState(initialMonth);

     //✨공휴일 데이터 관리를 위한 useState와 useEffect 작성하기
    const [holidays, setHolidays]=useState<Holiday[]>([]);
      
    useEffect(()=>{
        //달이 바뀌자마자 이전달의 공휴일데이터 싹 비워줌! (잔상줄이려궁..)
        setHolidays([]);
        fetchHolidays(year,month).then(setHolidays); //함축된(단축)버전 .then(res=> setHolidays(res))
    },[year,month])


    const handleDayClick =(day:number)=>{
        setSelectedDate(day);
        setIsModalOpen(true);
    } 

    const handlePrevMonth =()=>{
        const prev= Temporal.PlainYearMonth.from({year,month}).subtract({months:1})
        setYear(prev.year)
        setMonth(prev.month)
    }

    const handleNextMonth = ()=>{
        const next = Temporal.PlainYearMonth.from({year,month}).add({months:1});
        setYear(next.year)
        setMonth(next.month)
    }
    
    // 3. Temporal을 이용해 선택된 연/월 객체 만들기
    const targetYearMonth= Temporal.PlainYearMonth.from({year,month})

    // 4. 해당 월의 1일 요일 인덱스(0~6)와 마지막 날짜(총 일수) 구하기
    const firstDayDate = targetYearMonth.toPlainDate({day:1})

    const firstDayIdx =
    firstDayDate.dayOfWeek === 7 ? 0 : firstDayDate.dayOfWeek;

    const daysInMonth = targetYearMonth.daysInMonth;
    
    // 6. 오늘 날짜 계산 
    const today = Temporal.Now.plainDateISO();
    //2026년 9월이 이번달인가? 2026년 10월 =>false
    const isThisMonth = today.year === year && today.month === month;

    // 7. 달력 앞쪽 빈칸(empty)과 실제 날짜 칸(days)을 반복문(for)으로 채우기
    //조건에 맞는 아이템 하나(객체)를 리턴(없으면 undefiend)<-> filter([])/some(boolean)
    //{date:1, name:'신정'}
    const getHoliday = (day:number)=> holidays.find(h=> h.date === day)

    // 달력 칸들을 담을 배열 선언
    const days = [];

    // 1. [달력 앞쪽 빈칸 만들기]
    // 힌트: 1일이 시작하기 전의 요일 인덱스(firstDayIndex)만큼 빈 칸을 채워야 합니다!
    for(let i = 0; i < firstDayIdx; i++){
        // 빈 셀(<S.DayCell $isEmpty />)을 days 배열에 push 하기
        days.push(<S.DayCell key={`empty-${i}`} $isEmpty/>)
    }

    // 2. [실제 날짜 채우기]
    // 힌트: 1일부터 해당 월의 마지막 날(daysInMonth)까지 반복문을 돕니다.
    for(let d = 1; d <= daysInMonth; d++){
        // (1) 오늘 날짜에 해당하는 공휴일이 있는지 찾기 (getHoliday 활용)
        const holiday= getHoliday(d)
        // (2) 현재 날짜의 요일 인덱스 구하기 (일요일인지, 토요일인지 판별)
        const currentDayofWeek= (firstDayIdx+d-1) % 7;
        const isSunday = currentDayofWeek===0; 
        const isSaturday= currentDayofWeek ===6;

        const hasSchedule= schedules.some(sch=> sch.year=== year && sch.month=== month && sch.date === d)
        // (3) S.DayCell 컴포넌트를 생성해서 days 배열에 push 하기
        // (오늘인지, 공휴일인지, 주말인지 props 전달하고 날짜 숫자 및 이모지/툴팁 조건부 렌더링하기)
        days.push(
            <S.DayCell 
            key={d}
            $isToday={isThisMonth && today.day===d}
            $isHoliday={!!holiday}
            $isSaturday={isSaturday}
            $isSunday={isSunday}
            onClick={()=>handleDayClick(d)}
            > <span>{d}</span>
            {hasSchedule && <S.ScheduleDot/>}
            {holiday && <S.Tooltip>{holiday.name}</S.Tooltip>}
            {holiday?.emoji && <span>{holiday.emoji}</span>}
            </S.DayCell>
        )
    }


    // 8. 최종 UI 렌더링 반환 (JSX)
    return(
        <>
        <S.CalTopMargin>
            <S.CalWrapper>
                <S.CalHeader>
                    {/* 💡 이전달 버튼 */}
                    <S.CircleButton onClick={handlePrevMonth}>&lt;</S.CircleButton>
                    <div> {year}년 {month}월 </div>
                    {/* 💡 다음달 버튼 */}
                    <S.CircleButton onClick={handleNextMonth}>&gt;</S.CircleButton>
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

        {/* 분리한 스케쥴 모달 컴포넌트 렌더링 */}
        <ScheduleModal
        isOpen={isModalOpen}
        onClose={()=>setIsModalOpen(false)}
        year={year}
        month={month}
        selectedDate={selectedDate}
        schedules={schedules}
        setSchedules={setSchedules}
        />

        </>
    )
}

        
