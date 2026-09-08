'use client'

import { useState, useEffect } from "react"
import { Temporal } from "@js-temporal/polyfill"
import * as S from '@/assets/css/Style.style'
import { Holiday } from "@/app/types/holiday"
import { fetchHolidays } from "@/app/api/holidays"
import ScheduleModal from "./modal/ScheduleModal"

//1.일정 타입 정의 추가
interface Schedule{
    id: string;
    date: number;
    content: string;
    status: '대기' | '진행' | '완료';
    createdAt: string;
}

//🌟plain(타임존정보가없는순수한날짜) ISO 8601 달력 형식(YYYY-MM-DD)으로 반환
// 빈값호출=기본값(default값) 지정
export default function Calendar(  
    {year = Temporal.Now.plainDateISO().year, //1️⃣ 매개변수(Props)와 기본값 설정
    month = Temporal.Now.plainDateISO().month, 
    }:
    {year?: number; month?:number} //2️⃣ 이 매개변수의 "타입" 정의
){ 

    // 입력받은 연/월을 기준으로 Temporal 객체 생성
    // 연도와 월 데이터를 넣어서 PlainYearMonth 객체를 생성!
    const targetYearMonth = Temporal.PlainYearMonth.from({year,month})
    //해당 월의 1일 날짜 정보 추출 //1:월요일
    const firstDayDate=
    targetYearMonth.toPlainDate({day:1}) //2026-06 + -01(day:1)
/*
    Temporal의 dayOfWeek(요일)는 1(월요일) ~ 7(일요일)입니다
    일요일부터 시작하는 달력 그리드를 위해 0(일) ~ 6(토) 인덱스로 변환합니다.
*/  
    // Temporal의 dayOfWeek (1:월 ~ 7:일) -> 0:일 ~ 6:토 로 변환
    // 달의 1일 요일👉 달력 앞에 빈칸 몇 개 만들지 결정할 때
    const firstDayIndex=  
    firstDayDate.dayOfWeek ===7 ? 0 : firstDayDate.dayOfWeek;

    //해당 월의 마지막 날짜(총 일수) 직관적으로 가져옴
    const daysInMonth= targetYearMonth.daysInMonth;

    const [holidays,setHolidays]=useState<Holiday[]>([]);
    
    //🔹모달에 관련된 추가 
    const [schedules, setSchedules]=useState<Schedule[]>([]);
    const [selectedDate, setSelectedDate]=useState<number|null>(null);
    const [isModalOpen, setIsModalOpen]=useState(false);

    useEffect(()=>{
        fetchHolidays(year,month).then(setHolidays);
    }, [year,month])

    //오늘 날짜 가져오기 
    const today = Temporal.Now.plainDateISO();
    const isthisMonth = today.year === year && today.month===month;

    //🔹
    const handleDayClick = (day:number)=>{
        setSelectedDate(day);
        setIsModalOpen(true)
    }

    const getHoliday = (day:number)=> holidays.find(h=> h.date === day);
    const days =[]; //// 달력 칸들을 담을 배열 선언

    //달력 빈칸 만들기
    for(let i=0; i< firstDayIndex ; i++){
        days.push(<S.DayCell key={`empty-${i}`} $isEmpty/>)
    }
    //실제 날짜 채우기
    for(let d=1 ; d <= daysInMonth ; d++){
        const holiday= getHoliday(d);

        //지금 반복문의 d는 무슨요일?=> 토요일 일요일 판별 
        const currentDayofWeek = (firstDayIndex+d -1) % 7;
        const isSunday = currentDayofWeek === 0;
        const isSaturday = currentDayofWeek === 6;

        //🔹해당 날짜에 등록된 일정이 있는 지 확인(파란 점 표시용)
        const hasSchedule = schedules.some(sch=> sch.date ===d);

        days.push(
            <S.DayCell key={d} 
                $isToday={isthisMonth && today.day=== d}
                $isHoliday={!!holiday}
                $isSaturday={isSaturday} //토요일여부전달
                $isSunday={isSunday}
                onClick={()=>handleDayClick(d)}
                > 
                    <S.DayHeader>
                        <span>{d}</span>  {/* flex구조에서 씹히지않도록 span으로 감쌈 */}
                        {hasSchedule && <S.ScheduleDot/>} 
                    </S.DayHeader>
                    
                {holiday && <S.Tooltip>{holiday.name}</S.Tooltip>}
                {holiday?.name === '성탄절' && <span>🎄</span>} 
                {holiday?.name.includes('추석') && <span>🌕🐇</span>} 
            </S.DayCell>
        )
    }

    /*
    <S.DayCell>은 화면에 바로 그려지는 DOM 노드가 아니라 "이런 모양으로 컴포넌트를 만들어줘"라는
    정보가 담긴 자바스크립트 객체이므로 
    일반 자바스크립트 배열(const days = [])에 숫자나 문자열을 push 하듯이, 
    JSX 객체도 얼마든지 push로 배열에 집어넣을 수 있다 대신 key값은 꼭 필수!
     */

    return(
        <>
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
        {/* 분리한 스케쥴 모달 컴포넌트 렌더링 */}
        <ScheduleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        month={month}
        selectedDate={selectedDate}
        schedules={schedules}
        setSchedules={setSchedules}
        >
        </ScheduleModal>
    </>
    )
}