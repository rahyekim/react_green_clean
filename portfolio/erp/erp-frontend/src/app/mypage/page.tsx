'use client'

import React from "react"
import  Layout  from "@/components/Layout"
import { SmallCalendar } from "@/components/SmallCalendar"
import Calendar from "@/components/Calendar"
import * as S from '@/assets/css/Style.style'

export default function CalendarMypage(){
   
    return(
        <Layout>
        <S.CalendarLayout>
            <S.LeftPanel>
                <SmallCalendar/>
            </S.LeftPanel>
            <S.RightPanel>
                <Calendar/>
            </S.RightPanel>
        </S.CalendarLayout>
        </Layout>
    )
}