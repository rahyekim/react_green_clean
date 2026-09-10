'use client'

import { useState, useEffect, use } from "react"
import { Temporal } from "@js-temporal/polyfill"
import * as S from '@/assets/css/Style.style'
import { Holiday } from "@/app/types/holiday"
import { fetchHolidays } from "@/app/api/holidays"
import ScheduleModal from "@/components/modal/ScheduleModal"

interface Schedule{
    id: string;
    year: number;  // 💡 연도 추가
    month: number; // 💡 월 추가
    date: number;
    content: string;
    status: '대기' | '완료' | '진행';
    createdAt: string;
}

export default function Calendar({
    year: initialYear = Temporal.Now.plainDateISO().year,
    month: initialMonth = Temporal.Now.plainDateISO().month
}:{year?:number,month?:number}
){

    const [year, setYear]=useState(initialYear);
    const [month, setMonth]=useState(initialMonth);
    const [seletedDate, setSelectedDate]=useState<number|null>(null);
    const [schedules, setSchedules]=useState<Schedule[]>([])
    const [holidays, setHolidays]=useState<Holiday[]>([]);
    const [isModalOpen, setIsModalOpen]=useState(false);

    useEffect(()=>{
        setHolidays([]);
        fetchHolidays(year,month).then(setHolidays)
    },[year,month])
    
    const handleDayClick = (day:number)=>{
        setSelectedDate(day);
        setIsModalOpen(true);
    }

    const handlePrevMonth =()=>{
        const prev=Temporal.PlainYearMonth.from({year,month}).subtract({months:1})
        setYear(prev.year)
        setMonth(prev.month)
    }

    const handleNextMonth = ()=>{
        const next= Temporal.PlainYearMonth.from({year,month}).add({months:1})
        setYear(next.year)
        setMonth(next.month)
    }

    const targetYearMonth=Temporal.PlainYearMonth.from({year,month})
    const firstDate = targetYearMonth.toPlainDate({day:1})
    const firstDateIdx= firstDate.dayOfWeek === 7 ? 0 : firstDate.dayOfWeek
    const daysInMonth = targetYearMonth.daysInMonth;
    const today = Temporal.Now.plainDateISO();
    const isThisMonth = today.year === year && today.month ===month
    const getHolidays =(day:number)=> holidays.find(h=> h.date === day)

    const days =[];

    for(let i=0; i<firstDateIdx; i++){
        days.push(<S.DayCell key={`empty-${i}`} $isEmpty/>)
    }

    for(let d=1; d <= daysInMonth ; d++){

        const holiday = getHolidays(d)
        const dayofWeek = (firstDateIdx +d-1 )% 7
        const hasSchedule= schedules.some(sch=> sch.date === d && sch.year === year && sch.month ===month )
        days.push(
        <S.DayCell 
        key={d}
        $isHoliday={!!holiday}
        $isToday={isThisMonth && today.day === d}
        $isSaturday={dayofWeek===6}
        $isSunday={dayofWeek===0}
        onClick={()=>handleDayClick(d)}
        > <span>{d}</span>
        {hasSchedule && <S.ScheduleDot/>}
        {holiday && <S.Tooltip>{holiday.name}</S.Tooltip>}
        {holiday?.emoji && <span>{holiday.emoji}</span>}
        </S.DayCell>)
    }
    return(
        <>
        <S.CalTopMargin>
            <S.CalWrapper>
                <S.CalHeader>
                    <S.CircleButton onClick={handlePrevMonth}>&lt;</S.CircleButton>
                    <p>{year}년 {month}월</p>
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

        <ScheduleModal
        isOpen={isModalOpen}
        onClose={()=>setIsModalOpen(false)}
        year={year}
        month={month}
        selectedDate={seletedDate}
        schedules={schedules}
        setSchedules={setSchedules}
        />
        
        </>
        
    )
}
