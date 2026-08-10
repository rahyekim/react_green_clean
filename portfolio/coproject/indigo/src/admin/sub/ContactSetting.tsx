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
    action_memo?:string;
}
export default function ContactSetting (){

    //문의 내역 리스트를 담을 배열 상태
    const [contacts , setContacts]=useState<ContactItem[]>([]);
    //🔹체크박스로 선택된 항목들의 ID를 담아둘 배열 상태
    const [selectedIds, setSelectedIds]=useState<number[]>([]);

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

    //-----3.🔹체크박스 조작 함수들 -------
    const handleSelectAll = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.checked){
            setSelectedIds(contacts.map(contact=> contact.id)) //전체선택
        }else{
            setSelectedIds([]); ///전체해제
        }
    }
    //개별선택/해제
    const handleSelectOne = (id:number)=>{
        if(selectedIds.includes(id)){  //이미있으면 해제
            setSelectedIds(selectedIds.filter(selectedId=> selectedId !== id));
        }else{
            setSelectedIds([...selectedIds, id]); //추가
        }
    }
    //
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
    //🔹조치사항(메모) 입력/수정 함수
    const handleUpdateMemo = async(id:number, currentMemo:string|undefined)=>{
        //간단하게 브라우저 알림창을 이용해 메모를 입력받음
        //window.prompt(메시지, 기본값)
        const newMemo = window.prompt('해당문의에 대한 조치사항(메모) 입력해주세요', 
            currentMemo || ''
        )
        //취소버튼 누르면 중단
        if(newMemo === null) return;

        try{
            const res= await axios.put(`http://localhost:5000/api/contact/${id}/memo`, {
                action_memo: newMemo
            }); 
            //화면즉시반영
            setContacts(prev=> prev.map(contact=>(
                contact.id === id ? {...contact, action_memo: newMemo} : contact
            )))
        }catch(err){
            console.error("메모 업데이트 에러", err)
            alert("조치사항 저장 중 오류 발생")
        }


    }
    // (쓸모없는 스팸문의) 삭제하는함수
    const handleDelete = async(id:number) =>{
        //실수로 누를 수 있으니 경고창을 한번 띄움
        if(!window.confirm('정말 이 문의 내역을 삭제하시겠습니까?')) return;

          try{
            await axios.delete(`http://localhost:5000/api/contact/${id}`)
            
            // 👇 화면즉시반영 (방금 지운 id와 다른 애들만 남기기!)
            setContacts(contacts.filter(contact => contact.id !== id));
            setSelectedIds(prev=>prev.filter(selectedId=> selectedId !==id))
            alert("삭제되었습니다")
        }catch(err){
            console.error("삭제에러", err)
            alert("삭제중 오류발생")
        }

    }

    //🔹선택 삭제 함수(여러개 한 번에 지우기)
    const handleBulkDelete = async()=>{
        if(selectedIds.length===0){
            alert("삭제할 항목을 먼저 선택해주세요");
            return;
        }
        if(!window.confirm(`선택하신 ${selectedIds.length}개 문의를 한번에 삭제하시겠습니까?`)) return;

        try{
            const res = await axios.post(`http://localhost:5000/api/contact/bulk-delete`,{
                ids: selectedIds
            });

            //삭제성공시 화면에서도 싹 날려준다
            setContacts(prev=> prev.filter(contact=> !selectedIds.includes(contact.id)));
            //체크박스 초기화...
            setSelectedIds([]);
            alert("선택한 항목이 모두 삭제되었습니다")
        }catch(err){
            console.error("선택 삭제 에러", err)
            alert("선택 삭제 중 오류발생");
        }
    }

    return(
        <>
        <Layout>
            <S.PageWrapper>
                <S.PageTitle>CONTACT 문의관리</S.PageTitle>
                <S.Card>
                    <S.SpaceBetween>
                        <S.SectionTitle>고객 문의 리스트</S.SectionTitle>
                        <S.ColorButton
                        style={{fontSize:"14px"}}
                        bgColor="red"
                        onClick={handleBulkDelete}
                        >선택 삭제</S.ColorButton>
                    </S.SpaceBetween>
                    <S.CTable>
                        <thead>
                            <tr>
                                {/* 체크박스 중앙..style={{width:"4%"}} */}
                                <th className="text-center">  
                                    <S.CheckInput type="checkbox" onChange={handleSelectAll}
                                    checked={contacts.length>0 && selectedIds.length === contacts.length}
                                    /> 
                                    {/* 🌟🌟checked */}
                                </th>
                                <th style={{width:"5%"}}>No.</th>
                                <th style={{width:"8%"}}>이름</th>
                                <th style={{width:"15%"}}>연락처/이메일</th>
                                <th style={{width:"22%"}}>문의</th>
                                <th style={{width:"10%"}}>접수일</th>
                                <th style={{width:"11%"}}>상태</th>
                                <th style={{width:"12%"}}>메모</th>
                                <th style={{width:"14%"}}>관리</th>
                            </tr>
                        </thead>

                        <tbody>
                            {contacts.length > 0 ? (
                                contacts.map((contact,idx)=>(
                                    <tr key={contact.id}>
                                        <td>
                                            <S.CheckInput type="checkbox" 
                                            checked={selectedIds.includes(contact.id)}
                                            onChange={()=>handleSelectOne(contact.id)}
                                             />
                                        </td>
                                        <td>{contact.id}</td>
                                        <td>{contact.name}</td>
                                        <td>{contact.phone}<br/>{contact.email}</td>
                                        <td>{contact.message.length>50 
                                        ?contact.message.substring(0,50)+"..."
                                        :contact.message}</td>
                                        <td>{contact.created_at?.substring(0,10)}</td>
                                        {/* <td>{contact.is_replied===1 ? 
                                        <span>"답변 완료"</span> : <span>"답변 대기"</span>}
                                        </td> */}
                                        <td>
                                            <S.StatusText statusColor={contact.is_replied ===1 ? 'blue':'red'}>
                                                {contact.is_replied === 1 ? "답변완료" : "답변대기"}
                                            </S.StatusText>
                                        </td>
                                        {/* 🌟 메모 컬럼 추가 (handleUpdateMemo 연결 및 메모 내용 표시) */}
                                        <td>
                                            <div>
                                                {/* {contact.action_memo || "(메모없음)"} */}
                                                <S.ColorButton 
                                                bgColor="green"
                                                onClick={()=>handleUpdateMemo(contact.id, contact.action_memo)}
                                                >{contact.action_memo ? "메모수정" :"메모작성"}</S.ColorButton>
                                            </div>
                                        </td>


                                        {/* 🌟 관리 컬럼 (상태 변경 및 삭제) */}
                                        <td>
                                            <S.ButtonWrapper>
                                                <S.ColorButton
                                                bgColor='blue'
                                                onClick={()=>handleToggleReply(contact.id,contact.is_replied)}
                                                > {contact.is_replied ===1 ? '대기로 변경' : "완료 처리"}
                                                </S.ColorButton>
                                                <S.ColorButton
                                                // bgColor="pink"
                                                onClick={()=>handleDelete(contact.id)}
                                                >삭제
                                                </S.ColorButton>
                                            </S.ButtonWrapper>
                                        </td>
                                    </tr>
                                ))
                            ):(
                                // 데이터없을때 띄워주는 화면
                                <tr>
                                    <td colSpan={9} 
                                    style={{textAlign:"center", padding:"30px"}}
                                    >아직 접수된 문의 내역이 없습니다</td>
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
