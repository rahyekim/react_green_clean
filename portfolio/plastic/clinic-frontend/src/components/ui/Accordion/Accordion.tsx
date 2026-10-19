import React, { createContext, useContext, useState } from "react"
import styled from "styled-components";

interface AccordionProps{
    defaultOpenId?: string | null; //처음에 열릴 id지정
    children: React.ReactNode;
}

interface ContextProps{
        openId: string | null,
        toggleItem: (id:string)=> void
}

const AccordionContext = createContext<ContextProps|null>(null);

export const useAccordionContext = ()=>{
    const ctx = useContext(AccordionContext);
    if(!ctx){
        throw new Error('아코디언 컴포넌트안에서 사용되어야합니다')
    }
    return ctx;
}

export const Accordion=({defaultOpenId=null, children}:AccordionProps)=>{

    const [openId, setOpenId]= useState<string|null>(defaultOpenId);

    const toggleItem = (id:string)=>{
        setOpenId(prev=> prev === id ? null : id)
    }
    const ctxValue ={
        openId,
        toggleItem
    }
    return(
        <AccordionContext.Provider value={ctxValue}>
            <AccordionContainer>{children}</AccordionContainer>
        </AccordionContext.Provider>
    )
}

interface ItemProps{
    id: string;
    children: React.ReactNode;
}


const AccordionItemContext= createContext<string|null>(null);

export const useAccordionItemContext = ()=>{
    const id=useContext(AccordionItemContext);
    if(!id) throw new Error('아코디언item 안에서 사용되어야합니다');
    return id 
}

//아이템 = props로 id받음
export function Item({id, children}:ItemProps){

    return(
        <AccordionItemContext value={id}>
            <ItemContainer>{children}</ItemContainer>
        </AccordionItemContext>
    )
}

interface TitleProps{
    children: React.ReactNode;
}

//제목
export function Title({children}:TitleProps){

    const id = useAccordionItemContext();
    const {toggleItem} = useAccordionContext();

    return(
        <Hearder onClick={()=>toggleItem(id)}>
            {children}
        </Hearder>
    )
}

//내용
interface ContentProps{
    children: React.ReactNode
}
export function Content({children}:ContentProps){
    const id = useAccordionItemContext();
    const {openId} = useAccordionContext();

    const isOpen = openId === id;

    if(!isOpen) return null

    return(
        <Body>{children}</Body>
    )
}

Accordion.Item = Item
Accordion.Title = Title
Accordion.Content = Content 

//---------------------------styled css
const AccordionContainer = styled.div`
width: 100%;
border: 1px solid #e2e8f0;
border-radius: 8px;
overflow: hidden;
background-color: #fff;
`;
const ItemContainer = styled.div`
border-bottom: 1px solid #e2e8f0;
&:last-child{
    border-bottom:none;
}
`;

const Hearder = styled.div`
padding: 15px 20px;
background-color: #f8f9fc;
font-weight: bold;
cursor: pointer;

&:hover {
    background-color: #f1f5f9;
  }

`;

const Body= styled.div`
padding: 20px;
color: #475569;
`;