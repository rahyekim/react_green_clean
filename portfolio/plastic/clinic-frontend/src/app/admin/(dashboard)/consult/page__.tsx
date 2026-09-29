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
// 🌟 컬러 상수 임포트 (경로는 본인 프로젝트 환경에 맞게 확인해주세요)
import { COLORS } from '@/assets/css/common/theme'; 

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

    // 💘 검색, 페이징, 그리고 상담 분야 필터를 위한 State
    const [searchTerm, setSearchTerm]= useState('');
    const [selectedDept, setSelectedDept] = useState<string>('전체'); // 👈 상담 분야 필터 상태 추가
    const [currentPage, setCurrentPage]=useState(1);
    const ITEMS_PER_PAGE= 10; 

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

    // 💘 검색어 + 상담 분야 조건에 맞게 데이터 필터링
    const filteredList = consultList.filter(item=>{
        // 1. 검색어 필터 (이름 또는 연락처)
        const matchesSearch = !searchTerm || item.NAME.includes(searchTerm) || item.PHONE.includes(searchTerm);
        
        // 2. 상담 분야 필터 ('전체'면 모두 통과, 아니면 분야가 일치하는 것만)
        const matchesDept = selectedDept === '전체' || item.DEPARTMENT === selectedDept;

        return matchesSearch && matchesDept;
    });

    // 🌟 페이징 처리 계산
    const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
    const paginatedList = filteredList.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // 검색어 입력 핸들러
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setSearchTerm(e.target.value);
        setCurrentPage(1); 
    }

    // 🎯 상담 분야 탭 변경 핸들러
    const handleDeptFilter = (dept: string) => {
        setSelectedDept(dept);
        setCurrentPage(1); // 탭이 바뀔 때 1페이지로 리셋
    };

    const toggleStatus = async(id:number)=>{
        try{
            const res = await axios.put(`http://localhost:4000/api/admin/consult/${id}/status`)
            if(res.data.success){
                fetchConsult(); 
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
                        fetchConsult(); 
                    }
                    closePopup();
                }catch(err){
                    openPopup('알림', '상담삭제에 실패했습니다.')
                }
            }
        );
    }
   
    // 전체 선택/해제 
    const handleSelectAll = (e: ChangeEvent<HTMLInputElement>)=>{
        if(e.target.checked){
            // 현재 필터링된 목록 기준으로 전체선택할지, 전체 데이터 기준으로 할지에 따라 선택 가능 (여기서는 필터된 목록 기준)
            setSelectedIds(filteredList.map(consult => consult.ID))
        }else{
            setSelectedIds([]);
        }
    }

    // 개별 체크박스 선택/해제
    const handleSelectOne = (id:number)=>{
        if(selectedIds.includes(id)){
            setSelectedIds(selectedIds.filter(i => i !== id))
        }else{
            setSelectedIds(prev => [...prev, id])
        }
    }

    // 선택된 항목 일괄 삭제 핸들러
    const handleDeleteSeleted = ()=>{
        if(selectedIds.length === 0){
            openPopup('알림', "삭제할 항목을 선택해주세요.")
            return;
        }
        openPopup(
            '확인 알림',
            `선택한 ${selectedIds.length}개의 항목을 삭제하시겠습니까?`,
            async()=>{
                try{
                    setConsultList(prev => (
                        prev.filter(list => (!selectedIds.includes(list.ID)))
                    ));
                    setSelectedIds([]); 
                    closePopup();
                }catch(err){
                    // 에러 처리
                }
            }
        )
    }
 
    const startNo = filteredList.length - ((currentPage - 1) * ITEMS_PER_PAGE);
    
    // 💡 화면에 보여줄 상담 분야 목록 카테고리 정의
    const categories = ['전체', '동안 성형', '쁘띠 성형', '눈 성형', '코 성형', '가슴 성형']; // 필요에 따라 추가/수정 가능

    return(
        <>
         <S.ConsultContainer>
                <S.ConsultPageHeader>
                    <S.ConsultPageTitle>상담신청 관리</S.ConsultPageTitle>
                </S.ConsultPageHeader>

                {/* 🎯 상담 분야별 필터 탭 영역 추가 */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    {categories.map((dept) => (
                        <button
                            key={dept}
                            onClick={() => handleDeptFilter(dept)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '20px',
                                border: `1px solid ${selectedDept === dept ? COLORS.POINT : '#ddd'}`,
                                backgroundColor: selectedDept === dept ? COLORS.POINT : '#fff',
                                color: selectedDept === dept ? '#fff' : COLORS.TEXT,
                                cursor: 'pointer',
                                fontWeight: selectedDept === dept ? 'bold' : 'normal',
                                fontSize: '14px',
                                transition: 'all 0.2s'
                            }}
                        >
                            {dept}
                        </button>
                    ))}
                </div>

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
                        <S.ConsultCardTitle>빠른 상담신청 접수 내역 ({filteredList.length}건)</S.ConsultCardTitle>
                        <S.ConsultSearchButton 
                            style={{background:'#fdeaea', color:'red'}}
                            onClick={handleDeleteSeleted}>선택 삭제</S.ConsultSearchButton>
                    </S.ConsultCardHeader>
                    
                    <S.ConsultTableWrapper>
                        <S.ConsultTable>
                            <thead>
                                <tr>
                                    <th style={{width:'5%'}}>
                                        <S.CheckboxLabel>
                                        <input 
                                            type="checkbox" 
                                            onChange={handleSelectAll}
                                            checked={filteredList.length > 0 && selectedIds.length === filteredList.length}
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
                                            {searchTerm || selectedDept !== '전체' ? '조건에 일치하는 검색 결과가 없습니다.' : '접수된 상담 내역이 없습니다.'}
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