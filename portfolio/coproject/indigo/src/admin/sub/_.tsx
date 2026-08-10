import { useState, useEffect, ChangeEvent } from "react";
import axios from 'axios'

import { Layout } from "../../component/layout/Layout";
import * as S from "../css/sub.styled"

interface ContactItem {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    message: string;
    created_at: string;
    is_replied: number;
    action_memo?: string;
}

export default function ContactSetting (){


    const [contacts, setContacts]=useState<ContactItem[]>([])

    const [selectedIds, setSelectedIds]=useState<number[]>([])

    //데이터 불러오기 최신순으로..

    useEffect(()=>{
        const fetchContact = async()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/settings/contact')
                setContacts(res.data);

            }catch(err){
                console.error("문의 내역 불러오기 실패: ", err);
            }
        }
        fetchContact()
    },[])
    
    const handleSelectAll=(e:ChangeEvent<HTMLInputElement>)=>{
        if(e.target.checked){
            setSelectedIds(contacts.map(contact=>contact.id))
        }else{
            setSelectedIds([]);
        }
    }

    const handleSelectOne =(id:number)=>{
        if(selectedIds.includes(id)){
            setSelectedIds(selectedIds.filter(selectedId=> selectedId !== id));
        }else{
            setSelectedIds([...selectedIds, id])
        }

    }

    const handletoggleReply =async(id:number,currentStatus:number)=>{
        
    }
    
    
    return(
        <>
        
        </>
    )
}