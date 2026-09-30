'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import {
    FiTrash2, FiSearch, FiCheck
} from 'react-icons/fi'
import usePopup from '@/hooks/usePopup';
import Popup from '@/components/ui/Popup';
import * as S from'@/assets/css/admin/consult.style';
import * as P from '@/assets/css/common/Pagination.style';
import { formatDate } from "@/lib/dateUtils";


interface ConsultData{
    ID: number;
    NAME: string;
    PHONE: string;
    DEPARTMENT: string;
    CREATED_AT: string;
    STATUS: '대기중' | '상담완료';
}
export default function Consult(){
    const {openPopup, popupConfig, closePopup}=usePopup();

    const [selectedIds, setSelectedIds]=useState<number[]>([]);
    
    const [consultList, setConsultList]=useState<ConsultData[]>([]);

    //💘검색 및 페이징을 위한
    const [searchTerm, setSearchTerm]= useState('');
    const[currentPage, setCurrentPage]=useState(1);
    const ITEMS_PER_PAGE= 10; //10개까지만 보여주고 11개부터는 다음페이지로

    const fetchConsult = async()=>{
        try{
            const res = await axios.get('http://localhost:4000/api/admin/consult')
            if(res.data.success){
                setConsultList(res.data.data);
            }
        }catch(err){
            console.error('상담내역 로드실패:', err);
            openPopup('실패', '불러오기 실패');
        }
    }
    useEffect(()=>{
        fetchConsult();
    },[])

    //💘 검색어에 맞게 데이터 필터링(이름 또는 전화번호)
    const filteredList = consultList.filter(item=>{
        // 1단계: 검색어가 비어있다면, 모든 데이터를 그대로 보여줌(true 반환)
        if(!searchTerm) return true;
        return item.NAME.includes(searchTerm) || item.PHONE.includes(searchTerm)
    })

    //🌟 페이징 처리계산 (Math.ceil 올림해서 페이지수구함)
    const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
    //현재 페이지에 보여줄 데이터만 싹뚝(slice)
    const paginatedList = filteredList.slice(
        //자르기시작할 번호, 끝낼번호(마지막제외)1페이지면 10번앞
        (currentPage -1)*ITEMS_PER_PAGE,
        currentPage*ITEMS_PER_PAGE
    )
    //검색어 입력핸들러
    const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearchTerm(e.target.value);
        //💘검색어가 바뀌면 결과리스트가 변하므로 무조건 1페이지로 초기화
        setCurrentPage(1); 
    }

    const toggleStatus = async(id:number)=>{
        // setConsultList(prev=>(
        //     prev.map(list=> (
        //         list.ID === id ? {
        //             ...list,
        //             STATUS:  list.STATUS === '대기중' ? '상담완료' : '대기중' 
        //         } : list
        //     ))
        // ));

        try{
        const res = await axios.put(`http://localhost:4000/api/admin/consult/${id}/status`)
        if(res.data.success){
            fetchConsult(); // 상태 변경 후 목록 새로고침!
        }
        }catch(err){
            openPopup('알림', '상태 변경에 실패했습니다')
        }
    }

    const handleDelete = (id:number)=>{
        openPopup(
            '삭제 알림',
            '해당 상담을 삭제하시겠습니까?',
            async()=>{
                try{
                    const res = await axios.delete(`http://localhost:4000/api/admin/consult/${id}`)
                    if (res.data.success) {
                    fetchConsult(); // 삭제 후 목록 새로고침!
                    }
                    closePopup();
                }catch(err){
                    openPopup('알림', '상담삭제에 실패했습니다.')
                }
            }
        );
      
    }

    // 💡 최신 Temporal API를 활용한 날짜 포맷 함수 => util
   
    //전체선택/해제 
    const handleSelectAll = (e:ChangeEvent<HTMLInputElement>)=>{
        if(e.target.checked){
            setSelectedIds(consultList.map(consult=> consult.ID ))
        }else{
            setSelectedIds([]);
        }
    }

    //개별 체크박스 선택/해제
    const handleSelectOne = (id:number)=>{
        if(selectedIds.includes(id)){
            setSelectedIds(selectedIds.filter(i=> i !== id ))
        }else{
            setSelectedIds(prev=> [...prev, id])
        }
        const ids = consultList.map(consult => (
            consult.ID === id 
        ))
    }
    //선택된 항목 일괄 삭제 핸들러
    const handleDeleteSeleted = ()=>{
        if(selectedIds.length === 0){
            openPopup('알림',"삭제할 항목을 선택해주세요." )
            return;
        }
        openPopup(
            '확인 알림',
            `선택한 ${selectedIds.length}개의 항목을 삭제하시겠습니까?`,
            async()=>{
                try{
                    //API호출 백엔드 일괄삭제 (아직로직없음)
                    // await axios.post(`http://localhost:4000/api/admin/consult/bulk-delete`, selectedIds )
                    setConsultList(prev=>(
                        prev.filter(list=>(
                            !selectedIds.includes(list.ID)
                        ) )
                    ));
                    setSelectedIds([]); //초기화
                    closePopup();
                }catch(err){

                }
            }
        )
    }
  
{/*input요소의 onChange 이벤트는 
    입력필드의 값을 변경할때 발생하는 이벤트 */} 

    //🌟 return 밖(JSX를 그리기 전)에 미리 계산해두기 (map안에두면 계속계산하게됨)
    const startNo = filteredList.length - ((currentPage-1)*ITEMS_PER_PAGE)
    
    return(
        <>
         <S.ConsultContainer>
                <S.ConsultPageHeader>
                    <S.ConsultPageTitle>상담신청 관리</S.ConsultPageTitle>
                </S.ConsultPageHeader>

                {/* 🎯 검색 및 필터 영역 */}
                <S.ConsultFilterCard>
                    <S.ConsultInputGroup>
                        <S.ConsultInput 
                        type="text" 
                        value={searchTerm}
                        placeholder="이름 또는 연락처 검색"
                        onChange={handleSearchChange}
                         />
                        <S.ConsultSearchButton>
                            <FiSearch size={16} /> 검색
                        </S.ConsultSearchButton>
                    </S.ConsultInputGroup>
                </S.ConsultFilterCard>

                {/* 🎯 상담 내역 데이터 테이블 */}
                <S.ConsultTableCard>
                    <S.ConsultCardHeader style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <S.ConsultCardTitle>빠른 상담신청 접수 내역</S.ConsultCardTitle>
                        <S.ConsultSearchButton 
                        style={{background:'#fdeaea', color:'red'}}
                        onClick={handleDeleteSeleted}>선택 삭제</S.ConsultSearchButton>
                    </S.ConsultCardHeader>
                    
                    <S.ConsultTableWrapper>
                        <S.ConsultTable>
                            <thead>
                                <tr>
                                     {/* 전체 선택 체크박스 */}
                                    <th style={{width:'5%'}}>
                                        <S.CheckboxLabel>
                                        <input 
                                            type="checkbox" 
                                            onChange={handleSelectAll}
                                            checked={consultList.length > 0 && selectedIds.length === consultList.length}
                                        />
                                        <span className="custom-checkbox"></span>
                                        </S.CheckboxLabel>
                                    </th>
                                    <th style={{width:'10%'}}>No.</th>
                                    <th style={{width:'10%'}}>이름</th>
                                    <th style={{width:'15%'}}>연락처</th>
                                    <th style={{width:'22%'}}>상담분야</th>
                                    <th style={{width:'13%'}}>신청일시</th>
                                    <th style={{width:'18%'}}>상태</th>
                                    <th style={{width:'12%'}}>관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedList.map((item, index) => {
                                    // const startNo = filteredList.length - ((currentPage-1)*ITEMS_PER_PAGE)
                                    //내림차순(역순)
                                    return(
                                    <tr key={item.ID}>
                                        <td>
                                            <S.CheckboxLabel>
                                            <input 
                                            type="checkbox"
                                            checked={selectedIds.includes(item.ID)}
                                            onChange={()=>handleSelectOne(item.ID)}
                                             />
                                            <span className="custom-checkbox"></span>
                                            </S.CheckboxLabel>
                                        </td>
                                        <td>{startNo - index}</td>
                                        <td><strong>{item.NAME}</strong></td>
                                        <td>{item.PHONE}</td>
                                        <td>{item.DEPARTMENT}</td>
                                        {/* 💡 Temporal이 적용된 포맷 함수로 렌더링 */}
                                        <td>{formatDate(item.CREATED_AT)}</td>
                                        <td>
                                            <S.ConsultStatusBadge 
                                                $status={item.STATUS} 
                                                onClick={() => toggleStatus(item.ID)}
                                            >
                                                {item.STATUS === "상담완료" && <FiCheck size={12} />}
                                                {item.STATUS}
                                            </S.ConsultStatusBadge>
                                        </td>
                                        <td>
                                            <S.ConsultDeleteActionBtn onClick={() => handleDelete(item.ID)}>
                                                <FiTrash2 size={16} />
                                            </S.ConsultDeleteActionBtn>
                                        </td>
                                    </tr>
                                    )
                                })}
                                {filteredList.length === 0 && (
                                    <tr>
                                        <td colSpan={8} style={{ textAlign: 'center', padding: '3rem' }}>
                                            {searchTerm ? '검색결과가 없습니다.': '접수된 상담 내역이 없습니다.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </S.ConsultTable>
                    </S.ConsultTableWrapper>
                    {totalPages > 1 && (
                       <P.Pagination>
                        {Array.from({length:totalPages}, (_,i)=>i+1).map(page=>(
                            <P.PaginationBtn key={page}
                            $active={currentPage===page}
                            onClick={()=>setCurrentPage(page)}
                            >{page}
                            </P.PaginationBtn>
                        ))}
                       </P.Pagination>
                    )}
                </S.ConsultTableCard>

            </S.ConsultContainer>

            <Popup
            isOpen={popupConfig.isOpen}
            title={popupConfig.title}
            onClose={closePopup}
            onConfirm={popupConfig.onConfirm}
            >{popupConfig.message}</Popup>

        </>
    )
}