'use client'
import styled from "styled-components";
import React,{useState} from "react"
import { usePathname } from "next/navigation"
import EventPopup from "@/components/EventPopup";
import Header from "@/components/layout/Header";

const MainWrapper = styled.div`

`;

interface categoryData {
    id:number;
    title:string;
    imageUrl:string;
    link:string;
}
export default function ConditionalLayout({children}:{children:React.ReactNode}){

    const [categories, setCategories] = useState<categoryData[]>([]);
    
    const pathname = usePathname();
    const isHide = pathname.startsWith('/admin') || pathname.startsWith('/find')
    
    const moveCategory = (idx:number,direction:'UP'|'DOWN')=>{
    
        const newCategories = [...categories]
        if(direction==='UP' && idx > 0){
            [newCategories[idx-1],newCategories[idx]]=[newCategories[idx], newCategories[idx-1]]
        }else if(direction==='DOWN' && idx < newCategories.length-1 ){
            [newCategories[idx],newCategories[idx+1]]=[newCategories[idx+1], newCategories[idx]]
        }
        setCategories(newCategories)
    }
    return(
        <>
        {!isHide && <EventPopup/>}
        {!isHide && <Header/>}
        <MainWrapper>

        </MainWrapper>
        </>
    )
}
