import React, { useState, useEffect, ChangeEvent } from "react";
import axios from 'axios'
import { Temporal } from "@js-temporal/polyfill";
import { Navigate } from "react-router-dom";
import { Layout } from "../../components/layout/Layout";
import * as S from "../css/sub.styled"
import { useSearchParams } from "react-router-dom";

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
        const newStatus = currentStatus === 1 ? 0 :1;

        try{
            await axios.put(`http://localhost:5000/api/contact/${id}/reply`,{
                is_replied: newStatus
            });
            //프론트화면 배열에서 해당항목의 상태만 쏙 업그레이드
            setContacts(contacts=> 
                contacts.map(contact=>(
                    contact.id === id ? {...contact, is_replied: newStatus} : contact
                ))
            )
        }catch(err){
            console.error("")
            alert("")
        }
    }

    const handleUpdataMemo = async(id:number, currentMemo:string|null)=>{
        const newMemo = window.prompt('조치사항 입력해주세요',
            currentMemo || ''
        )
        //취소버튼 누르면 중단
        if(newMemo === null) return;

        try{
            const res= await axios.put(`http://localhost:5000/api/contact/${id}/memo`,{
                action_memo: newMemo
            });

            setContacts(contacts=> 
                contacts.map(contact=>(
                    contact.id===id ? {...contact, action_memo: newMemo} : contact
                ))
            )
        }
    }
    
    const handleDelete = async(id:number)=>{
        if(!window.confirm('삭제?'))return;

        try{
            await axios.delete(`http://localhost:5000/api/contact/${id}`)
            alert("삭제 ㅇㅇ")
        }catch(err){
            console.error("")
            alert("")
        }
        
    }

    const handleBulkDelete =async()=>{
        if(selectedIds.length===0){
            alert("삭제항목선택해주세요")return;
        }
        if(!window.confirm(`선택하신 ${selectedIds.length}개를 삭제?`))return;

        try{
            const res= await axios.post(`http://lcoalholst:5000/api/contacts/bulk-delete`,{
                ids: selectedIds
            })
            //삭제성공시 화면도 싹 날려줌
            setContacts(prev=> prev.filter(contact=>
                !selectedIds.includes(contact.id)
            ))
            setSelectedIds([]);
            alert("모두삭제되었습니다")
        }catch(err){
            
        }
    }
    
    return(
        <>
        
        </>
    )
}

export const SearchResult = ()=>{

    const [searchParams]=useSearchParams();
    const keyword= searchParams.get('q');

    const[result, setResult]=useState({users:[], bologs:[], contacts:[]})
    const [loading, setLoading]=useState(false);

    useEffect(()=>{
        const fetchResults = async()=>{

            // 1. 검색어가 없으면 결과를 비우고 로딩 종료
            if(!keyword){
                setResult({users:[], bologs:[], contacts:[]}); 
                // ✨ 검색어 지웠을 때 이전 결과도 지워주는 것이 좋습니다.
                setLoading(false);
                return;
            }
            try{
                const res=await axios.get(`/api/search?q=${keyword}`)
                setResult(res.data);
            }catch(err){
                console.error("검색불러오기에러", err)
            }finally{
                setLoading(false);
            }

        }
        fetchResults();
    },[keyword]);


    return(
        <>
        <div>
            <h3>{keyword} 검색결과</h3>
            {loading? (
                <p>검색중...</p>
            ):(
                <div>
                    <h5>회원 {result.users.length} 건</h5>
                    {result.users.length === 0 ?
                    <p> 검색된 회원이 없습니다 </p>
                :(
                    <ul>
                        {result.users.map((user:any)=>(
                            <li key={user.id}>
                                <strong>{user.first_name} {user.last_name}</strong>
                            </li>
                        ))}
                    </ul>
                )}
                </div>
            )}
        </div>

        <div>
            <h5></h5>
        </div>
        </>
    )
    
    
    
}
type props={
    children: React.ReactNode;
}
export const ProtectedRoute = ({children}:props)=>{

    const userName = localStorage.getItem('userName');
    const expiryStr = localStorage.getItem('loginExpiry');

    if(!userName || !expiryStr){
        alert('');
        return <Navigate to='/login' replace/>
    }

    const expiryTime = Temporal.Instant.from(expiryStr);

    const now = Temporal.Now.instant();

    if(Temporal.Instant.compare(now,expiryTime)>=0){
        alert('')
        localStorage.removeItem('')
        return <Navigate to='/login' replace/>
    }

    return(
        <>
        {children}
        </>
    )
}

