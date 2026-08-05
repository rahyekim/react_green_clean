//multer 패키지 설치 npm install multer 
//파일 업로드를 처리하기 위해 사용하는 가장 대표적인 미들웨어(Middleware) 라이브러리


import { useState, useEffect } from "react";
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
    is_replied:number; 
    //🌟DB에서는 true/fase대신 1(완료), 0(대기) 로 저장
}
export default function ContactSetting (){

    //문의 내역 리스트를 담을 배열 상태
    const [contacts , setContacts]=useState<ContactItem[]>([])

    // 데이터 불러오기(화면이 켜질때 DB에 저장된 모든 문의 내역을 최신순으로 가져옴)

    useEffect(()=>{

        const fetchContact = async()=>{

            try{
                const res = await axios.get("http://localhost:5000/api/settings/contact");
                setContacts(res.data);
            }catch(err){
                console.error("문의 내역 불러오기 실패: ", err);
            }
        }
        fetchContact();
    },[]);

    //조작함수들----
    //답변상태(대기<->완료)바꿔주는 함수
    const handleToggleReply = async(id:number, currentStatus:number)=>{
        //현재가 0(대기)면 1(완료), 1(완료)면 0(대기)로 바꿈
        const newStatus = currentStatus ===1 ? 0 : 1; 
        
        try{
            //백엔드에 상태를 업데이트 해달라고 요청
            await axios.put(`http://localhost:5000/api/contact/${id}/reply`,{
                is_replied: newStatus
            });
            //프론트엔드(화면) 배열에서도 해당 항목의 상태만 쏙 업데이트
            setContacts(contacts=> (
                contacts.map(contact=>(
                    contact.id === id ? {...contact, is_replied: newStatus}: contact
                ))
            ));
        }catch(err){
            console.error("상태 변경 에러", err)
            alert("상태변경중 오류 발생")
        }
    }

    // (쓸모없는 스팸문의) 삭제하는함수
    const handleDelete = async(id:number) =>{
        //실수로 누를 수 있으니 경고창을 한번 띄움
        if(!window.confirm('정말 이 문의 내역을 삭제하시겠습니까?')) return;

          try{
            await axios.delete(`http://localhost:5000/api/contact/${id}`)
            alert("삭제되었습니다")
        }catch(err){
            console.error("삭제에러", err)
            alert("삭제중 오류발생")
        }
    }


    return(
        <>
        <Layout>
            <S.PageWrapper>
                <S.PageTitle>CONTACT 문의관리</S.PageTitle>
                <S.Card>
                    <S.SectionTitle>고객 문의 리스트</S.SectionTitle>
                    <S.CTable>
                        <thead>
                            <tr>
                                <th style={{width:"6%"}}>No.</th>
                                <th style={{width:"12%"}}>이름</th>
                                <th style={{width:"20%"}}>연락처/이메일</th>
                                <th style={{width:"34%"}}>문의</th>
                                <th style={{width:"12%"}}>접수일</th>
                                <th style={{width:"8%"}}>상태</th>
                                <th style={{width:"8%"}}>관리</th>
                            </tr>
                        </thead>

                        <tbody>
                            {contacts.length > 0 ? (
                                contacts.map((contact,idx)=>(
                                    <tr key={contact.id}>
                                        <td>{idx+1}</td>
                                        <td>{contact.name}</td>
                                        <td>{contact.phone}<br/>{contact.email}</td>
                                        <td>{contact.message.length>50 
                                        ?contact.message.substring(0,50)+"..."
                                        :contact.message}</td>
                                        <td>{contact.created_at.substring(0,10)}</td>
                                        <td>{contact.is_replied===1 ? 
                                        <span>"답변 완료"</span> : <span>"답변 대기"</span>}
                                        </td>
                                        <td>
                                            <button
                                            onClick={()=>handleToggleReply(contact.id,contact.is_replied)}
                                            > {contact.is_replied ===1 ? '대기로 변경' : "완료 처리"}
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                            onClick={()=>handleDelete(contact.id)}
                                            >삭제
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ):(
                                // 데이터없을때 띄워주는 화면
                                <tr>
                                    <td colSpan={7}>아직 접수된 문의 내역이 없습니다</td>
                                </tr>
                            )}
                        </tbody>
                    </S.CTable>

                    


                </S.Card>
            </S.PageWrapper>


        </Layout>
        </>
    )
}
