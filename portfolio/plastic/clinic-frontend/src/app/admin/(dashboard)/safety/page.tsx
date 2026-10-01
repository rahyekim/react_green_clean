"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "@/assets/css/admin/Safety.style";
import { FiSave, FiPlus, FiTrash2, FiImage, FiArrowUp, FiArrowDown } from "react-icons/fi";
import usePopup from "@/hooks/usePopup";
import Popup from "@/components/ui/Popup";

// 📋 [타입 정의] 백엔드에서 받아올 데이터의 구조 정의
interface SafetyData {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

export default function Safety() {
    const {popupConfig,closePopup,openPopup}=usePopup();

    // 🗂️ [상태 관리] 데이터 목록 및 입력 폼 상태
    const [safetyList, setSafetyList] = useState<SafetyData[]>([]);

    const [newSafety, setNewSafety] = useState({ title: "", description: "" });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string>("");
    
    useEffect(() => {
        fetchSafetyItems();
    }, []);

    // 🔄백엔드 GET API 호출
    const fetchSafetyItems = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/admin/safety");
            if (response.data.success) {
                // DB 컬럼명을 프론트엔드 타입에 맞게 매핑
                const formatted = response.data.data.map((item: any) => ({
                    id: item.SAFETY_IDX,
                    title: item.TITLE,
                    description: item.DESCRIPTION,
                    imageUrl: `http://localhost:4000/images/${item.FILE_NAME}`
                }));
                setSafetyList(formatted);
            }
        } catch (error) {
            console.error("안전 시스템 데이터 로드 실패 ❌", error);
        }
    };

    //업로드할 이미지 파일을 선택하고 미리보기 생성
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
            setPreviewUrl(URL.createObjectURL(file)); 
        }
    };

    const handleAddSafety = async() => {
        // [검증]
        if (!newSafety.title || !newSafety.description || !selectedFile) {
            openPopup('입력 오류', '이미지, 타이틀, 상세 설명을 모두 입력해주세요.')
            return;
        }

        //// 이미지 파일과 텍스트 데이터를 담기 위해 FormData 사용
        const formData = new FormData();
        formData.append("safetyImg", selectedFile);
        formData.append("title", newSafety.title);
        formData.append("description", newSafety.description);

        try {
            const response = await axios.post("http://localhost:4000/api/admin/safety", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (response.data.success) {
                //초기화 및 목록 새로고침 🔄
                setNewSafety({ title: "", description: "" }); 
                setSelectedFile(null);
                setFileName(""); 
                setPreviewUrl(""); 
                fetchSafetyItems();
            }
        } catch (error) {
            openPopup('입력 오류', '등록에 실패했습니다.')
        }
   
    };
   
    const handleDeleteClick = (id: number) => { 
        openPopup(
        '삭제 확인', 
        '해당 시스템을 리스트에서 삭제하시겠습니까?',
        async()=>{
            try {
                const response = await axios.delete(`http://localhost:4000/api/admin/safety/${id}`);
                if (response.data.success) {
                    fetchSafetyItems(); // 목록 갱신
                    closePopup();
                }
            } catch (error) {
                alert("삭제 중 문제가 발생했습니다. 😢");
            }
        }
        )
    };

    // ↕️ [순서 변경 함수] 화면상에서 위/아래 버튼을 눌렀을 때 배열 순서 변경
    const moveSafety = (index: number, direction: 'UP' | 'DOWN') => {
        const newList = [...safetyList]; 
        
        if (direction === 'UP' && index > 0) {
            [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
        } 
        else if (direction === 'DOWN' && index < newList.length - 1) {
            [newList[index], newList[index+1]] = [newList[index+1], newList[index]];
        }
        setSafetyList(newList); 
    };

    // 💾 [순서 저장 함수] 변경된 순서(ID 배열)를 백엔드로 전송 (PUT)
    const handleSave = async() => {
        const orderedIds = safetyList.map(item => item.id);
        
        try {
            const response = await axios.put("http://localhost:4000/api/admin/safety/order", { orderedIds });
            if (response.data.success) {
                openPopup('저장 완료', '안전 시스템 순서가 성공적으로 저장되었습니다.');
            }
        } catch (error) {
            alert("순서 저장 중 문제가 발생했습니다.");
        }
        openPopup('저장 실패', '순서 저장 중 문제가 발생했습니다.');

    };

    return (
        <>
        <S.SafetyContainer>
            <S.SafetyPageHeader>
                <S.SafetyPageTitle>안전 시스템 관리</S.SafetyPageTitle>
                <S.SafetySaveButton onClick={handleSave}>
                    <FiSave size={18} /> 설정 저장하기
                </S.SafetySaveButton>
            </S.SafetyPageHeader>

            <S.SafetyGrid>
                {/* ⚙️ 1. 새 안전시스템 등록 폼 (좌측) */}
                <S.SafetyLeftColumn>
                    <S.SafetyCard>
                        <S.SafetyCardHeader>
                            <S.SafetyCardTitle>새 장비/시스템 등록</S.SafetyCardTitle>
                        </S.SafetyCardHeader>
                        <S.SafetyCardBody>
                            <S.SafetyFormGroup>
                                <S.SafetyLabel>배경 이미지 (정방형 비율 권장)</S.SafetyLabel>
                                <S.SafetyFileInputWrapper>
                                    <S.SafetyFileInput 
                                        type="file" 
                                        id="safety-img" 
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <S.SafetyFileLabel htmlFor="safety-img"><FiImage /> 이미지 선택</S.SafetyFileLabel>
                                    <span className="file-name">{fileName || "선택된 파일 없음"}</span>
                                </S.SafetyFileInputWrapper>
                                
                                {previewUrl && (
                                    <S.SafetyPreviewRect>
                                        <img src={previewUrl} alt="미리보기" />
                                    </S.SafetyPreviewRect>
                                )}
                            </S.SafetyFormGroup>

                            <S.SafetyFormGroup>
                                <S.SafetyLabel>타이틀 (예: EtCO2 모니터링)</S.SafetyLabel>
                                <S.SafetyInput 
                                    type="text" 
                                    placeholder="장비 및 시스템 명칭 입력"
                                    value={newSafety.title}
                                    onChange={(e) => setNewSafety({...newSafety, title: e.target.value})}
                                />
                            </S.SafetyFormGroup>

                            <S.SafetyFormGroup>
                                <S.SafetyLabel>상세 설명 (카드 하단 노출)</S.SafetyLabel>
                                <S.SafetyTextarea 
                                    placeholder="해당 시스템에 대한 상세 설명을 입력해주세요."
                                    value={newSafety.description}
                                    onChange={(e) => setNewSafety({...newSafety, description: e.target.value})}
                                    rows={3}
                                />
                            </S.SafetyFormGroup>

                            <S.SafetyAddButton onClick={handleAddSafety}>
                                <FiPlus size={18} /> 리스트에 추가
                            </S.SafetyAddButton>
                        </S.SafetyCardBody>
                    </S.SafetyCard>
                </S.SafetyLeftColumn>

                {/* 📋 2. 등록된 시스템 리스트 (우측) */}
                <S.SafetyRightColumn>
                    <S.SafetyCard style={{ height: '100%' }}>
                        <S.SafetyCardHeader>
                            <S.SafetyCardTitle>현재 노출 순서 (총 {safetyList.length}개)</S.SafetyCardTitle>
                        </S.SafetyCardHeader>
                        <S.SafetyTableWrapper>
                            <S.SafetyTable>
                                <thead>
                                    <tr>
                                        <th style={{ width: '15%' }}>순위/이동</th>
                                        <th style={{ width: '20%' }}>이미지</th>
                                        <th style={{ width: '50%' }}>타이틀 및 설명</th>
                                        <th style={{ width: '15%' }}>관리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {safetyList.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                                    <S.SafetyRankBadge>{index + 1}</S.SafetyRankBadge>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                                        <S.SafetyActionBtn onClick={() => moveSafety(index, 'UP')} disabled={index === 0}>
                                                            <FiArrowUp size={14} />
                                                        </S.SafetyActionBtn>
                                                        <S.SafetyActionBtn onClick={() => moveSafety(index, 'DOWN')} disabled={index === safetyList.length - 1}>
                                                            <FiArrowDown size={14} />
                                                        </S.SafetyActionBtn>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <S.SafetyThumbnail>
                                                    {item.imageUrl ? <img src={item.imageUrl} alt={item.title} /> : <span>No Img</span>}
                                                </S.SafetyThumbnail>
                                            </td>
                                            <td style={{ textAlign: 'left' }}>
                                                <strong style={{ display: 'block', marginBottom: '0.4rem', fontSize: '1.05rem' }}>{item.title}</strong>
                                                <div style={{ fontSize: '0.85rem', color: '#858796', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                    {item.description}
                                                </div>
                                            </td>
                                            <td>
                                                <S.SafetyDeleteBtn onClick={() => handleDeleteClick(item.id)}>
                                                    <FiTrash2 size={16} />
                                                </S.SafetyDeleteBtn>
                                            </td>
                                        </tr>
                                    ))}
                                    {safetyList.length === 0 && (
                                        <tr><td colSpan={4} style={{ padding: '3rem 0' }}>등록된 안전 시스템이 없습니다.</td></tr>
                                    )}
                                </tbody>
                            </S.SafetyTable>
                        </S.SafetyTableWrapper>
                    </S.SafetyCard>
                </S.SafetyRightColumn>
            </S.SafetyGrid>
        </S.SafetyContainer>
          
        <Popup 
        isOpen={popupConfig.isOpen} 
        title={popupConfig.title}
        onClose={closePopup}
        onConfirm={popupConfig.onConfirm}
        >{popupConfig.message}
        </Popup>
        </>
    );
}