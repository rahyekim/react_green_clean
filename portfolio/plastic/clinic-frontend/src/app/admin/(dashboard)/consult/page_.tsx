import React, { useState } from 'react';
import { FiCheck, FiTrash2 } from 'react-icons/fi';
import * as S from'@/assets/css/admin/consult.style';

// 💡 데이터 아이템 타입 예시 (프로젝트에 맞게 수정하세요)
interface ConsultItem {
    id: number; // 또는 string
    name: string;
    phone: string;
    category: string;
    regDate: string;
    status: string;
}

interface ConsultTableProps {
    consultList: ConsultItem[];
    toggleStatus: (id: number) => void;
    handleDelete: (id: number) => void;
    setConsultList: React.Dispatch<React.SetStateAction<ConsultItem[]>>;
}

export default function ConsultManageTable({ 
    consultList, 
    toggleStatus, 
    handleDelete, 
    setConsultList 
}: ConsultTableProps) {
    
    // 💡 선택된 항목들의 ID를 담을 상태 (타입 지정)
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // 1. 전체 선택 / 해제 핸들러
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const allIds = consultList.map(item => item.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    // 2. 개별 체크박스 선택 / 해제 핸들러
    const handleSelectOne = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    // 3. 선택된 항목 일괄 삭제 핸들러
    const handleDeleteSelected = () => {
        if (selectedIds.length === 0) {
            alert("삭제할 항목을 선택해주세요.");
            return;
        }
        
        if (window.confirm(`선택한 ${selectedIds.length}개의 항목을 삭제하시겠습니까?`)) {
            setConsultList(consultList.filter(item => !selectedIds.includes(item.id)));
            setSelectedIds([]); // 선택 초기화
        }
    };

    const handleDeleteSeleted = ()=>{
        if(selectedIds.length == 0){
            alert() 
            return;
        }
        if(window.confirm(`선택한 ${selectedIds.length}개의 `)){
           setConsultList(prev=>(
            prev.filter(list=> !selectedIds.includes(list.id))
           ))
           setSelectedIds([]);
        }
            
    }

    return (
        <div>
            {/* 선택 삭제 버튼 */}
            <button onClick={handleDeleteSelected} style={{ marginBottom: '10px' }}>
                선택 삭제 ({selectedIds.length})
            </button>

            <S.ConsultTableWrapper>
                <S.ConsultTable>
                    <thead>
                        <tr>
                            {/* 전체 선택 체크박스 */}
                            <th style={{width:'5%'}}>
                                <input 
                                    type="checkbox" 
                                    onChange={handleSelectAll}
                                    checked={consultList.length > 0 && selectedIds.length === consultList.length}
                                />
                            </th>
                            <th style={{width:'8%'}}>No.</th>
                            <th style={{width:'10%'}}>이름</th>
                            <th style={{width:'15%'}}>연락처</th>
                            <th style={{width:'22%'}}>상담분야</th>
                            <th style={{width:'13%'}}>신청일시</th>
                            <th style={{width:'15%'}}>상태</th>
                            <th style={{width:'12%'}}>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultList.map((item, index) => (
                            <tr key={item.id}>
                                {/* 개별 체크박스 */}
                                <td>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedIds.includes(item.id)}
                                        onChange={() => handleSelectOne(item.id)}
                                    />
                                </td>
                                <td>{consultList.length - index}</td>
                                <td><strong>{item.name}</strong></td>
                                <td>{item.phone}</td>
                                <td>{item.category}</td>
                                <td>{item.regDate}</td>
                                <td>
                                    <S.ConsultStatusBadge 
                                        $status={item.status} 
                                        onClick={() => toggleStatus(item.id)}
                                    >
                                        {item.status === "상담완료" && <FiCheck size={12} />}
                                        {item.status}
                                    </S.ConsultStatusBadge>
                                </td>
                                <td>
                                    <S.ConsultDeleteActionBtn onClick={() => handleDelete(item.id)}>
                                        <FiTrash2 size={16} />
                                    </S.ConsultDeleteActionBtn>
                                </td>
                            </tr>
                        ))}
                        {consultList.length === 0 && (
                            <tr>
                                {/* 열이 1개 늘어나서 colSpan이 8이 됨 */}
                                <td colSpan={8} style={{ textAlign: 'center', padding: '3rem' }}>
                                    접수된 상담 내역이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </S.ConsultTable>
            </S.ConsultTableWrapper>
        </div>
    );
}