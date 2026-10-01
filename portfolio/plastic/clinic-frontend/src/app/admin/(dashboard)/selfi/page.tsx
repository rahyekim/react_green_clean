"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "@/assets/css/admin/Selfi.style";
import { FiSave, FiPlus, FiTrash2, FiImage, FiHeart, FiEye } from "react-icons/fi";
import Popup  from "@/components/ui/Popup";
import usePopup from "@/hooks/usePopup";

interface SelfieData {
    id: number;
    imageUrl: string;
    likes: number;
    views: number;
    isActive: boolean;
}

export default function Self() {
   
    const {openPopup, popupConfig, closePopup}=usePopup();
    
    const [selfies, setSelfies] = useState<SelfieData[]>([]);

    const [newSelfie, setNewSelfie] = useState({ likes: 0, views: 0 });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string>("");

    useEffect(() => {
        fetchSelfies();
    }, []);

    // 🔄 [데이터 조회 함수] 백엔드 GET API 호출
    const fetchSelfies = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/admin/selfies");
            if (response.data.success) {
                // DB 컬럼명을 프론트엔드 타입에 맞게 매핑 (DB의 'Y'/'N'을 true/false로 변환)
                const formatted = response.data.data.map((s: any) => ({
                    id: s.SELFIE_IDX,
                    imageUrl: `http://localhost:4000/images/${s.FILE_NAME}`,
                    likes: s.LIKES,
                    views: s.VIEWS,
                    isActive: s.IS_ACTIVE === 'Y'
                }));
                setSelfies(formatted);
            }
        } catch (error) {
            console.error("셀피 목록 로드 실패:", error);
            openPopup('알림','셀피목록 로드중 문제가 발생했습니다');
        }
    };

    // 이미지 첨부 및 썸네일 미리보기 처리
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
            setPreviewUrl(URL.createObjectURL(file)); 
        }
    };

    // 셀피 추가
    const handleAddSelfie = async() => {
        if (!selectedFile) {
            openPopup('입력 확인', '셀피 이미지를 등록해주세요');
            return;
        }
        const formData = new FormData();
        formData.append("selfieImg", selectedFile);
        formData.append("likes", String(newSelfie.likes));
        formData.append("views", String(newSelfie.views));

       try {
            const res = await axios.post("http://localhost:4000/api/admin/selfies", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (res.data.success) {
                // 등록 성공 시 입력값 초기화 및 목록 새로고침 🔄
                setNewSelfie({ likes: 0, views: 0 });
                setSelectedFile(null);
                setFileName("");
                setPreviewUrl("");
                fetchSelfies(); 
            }
        } catch (error) {
            openPopup('알림','셀피 등록에 실패했습니다');
        }
    };

    // 셀피 삭제
    const handleDelete = async(id: number) => {
        if (confirm("해당 셀피 게시물을 삭제하시겠습니까?")) {
            try {
                const response = await axios.delete(`http://localhost:4000/api/admin/selfies/${id}`);
                if (response.data.success) {
                    fetchSelfies(); // 목록 갱신
                }
            } catch (error) {
                openPopup('알림','셀피 삭제에 실패했습니다');
            }
        }
    };

    // 노출 상태 변경 토글
    const toggleStatus = (id: number) => {
        setSelfies(selfies.map(s => 
            s.id === id ? { ...s, isActive: !s.isActive } : s
        ));
    };

    // 변경된 노출 상태(isActive) 목록을 백엔드로 최종 전송 (PUT)
    const handleSave = async() => {
        const statuses = selfies.map(s => ({ id: s.id, isActive: s.isActive }));
        
        //statues이름표달려보내야하니까 중괄호안에🎁넣어보냄{ statuses: [ ... ] }
        try {
            const response = await axios.put("http://localhost:4000/api/admin/selfies/status", {statuses});
            if (response.data.success) {
                console.log("DB에 저장될 데이터:", selfies);
                openPopup('성공 알림', '셀피 설정이 성공적으로 완료되었습니다')
            }
        } catch (error) {
            openPopup('알림','상태 저장에 실패했습니다');

        }

    };

    return (
        <>
           
        <S.SelfContainer>
            <S.SelfPageHeader>
                <S.SelfPageTitle>셀피(Selfies) 관리</S.SelfPageTitle>
                <S.SelfSaveButton onClick={handleSave}>
                    <FiSave size={18} /> 설정 저장하기
                </S.SelfSaveButton>
            </S.SelfPageHeader>

            <S.SelfGrid>
                {/* ⚙️ 1. 새 셀피 등록 폼 */}
                <S.SelfLeftColumn>
                    <S.SelfCard>
                        <S.SelfCardHeader>
                            <S.SelfCardTitle>새 셀피 이미지 등록</S.SelfCardTitle>
                        </S.SelfCardHeader>
                        <S.SelfCardBody>
                            <S.SelfFormGroup>
                                <S.SelfLabel>세로형 이미지 (권장 비율 3:4)</S.SelfLabel>
                                <S.SelfFileInputWrapper>
                                    <S.SelfFileInput 
                                        type="file" 
                                        id="selfie-img" 
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <S.SelfFileLabel htmlFor="selfie-img"><FiImage /> 이미지 선택</S.SelfFileLabel>
                                    <span className="file-name">{fileName || "선택된 파일 없음"}</span>
                                </S.SelfFileInputWrapper>
                                
                                {previewUrl && (
                                    <S.SelfPreviewRect>
                                        <img src={previewUrl} alt="미리보기" />
                                    </S.SelfPreviewRect>
                                )}
                            </S.SelfFormGroup>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <S.SelfFormGroup style={{ flex: 1 }}>
                                    <S.SelfLabel><FiHeart color="#e74a3b" /> 초기 좋아요 수 (선택)</S.SelfLabel>
                                    <S.SelfInput 
                                        type="number" 
                                        min={0}
                                        value={newSelfie.likes}
                                        onChange={(e) => setNewSelfie({...newSelfie, likes: Number(e.target.value)})}
                                    />
                                </S.SelfFormGroup>

                                <S.SelfFormGroup style={{ flex: 1 }}>
                                    <S.SelfLabel><FiEye color="#4e73df" /> 초기 조회수 (선택)</S.SelfLabel>
                                    <S.SelfInput 
                                        type="number" 
                                        min={0}
                                        value={newSelfie.views}
                                        onChange={(e) => setNewSelfie({...newSelfie, views: Number(e.target.value)})}
                                    />
                                </S.SelfFormGroup>
                            </div>

                            <S.SelfAddButton onClick={handleAddSelfie}>
                                <FiPlus size={18} /> 리스트에 추가하기
                            </S.SelfAddButton>
                        </S.SelfCardBody>
                    </S.SelfCard>
                </S.SelfLeftColumn>

                {/* 📋 2. 등록된 셀피 리스트 */}
                <S.SelfRightColumn>
                    <S.SelfCard style={{ height: '100%' }}>
                        <S.SelfCardHeader>
                            <S.SelfCardTitle>등록된 셀피 목록 (총 {selfies.length}개)</S.SelfCardTitle>
                        </S.SelfCardHeader>
                        <S.SelfTableWrapper>
                            <S.SelfTable>
                                <thead>
                                    <tr>
                                        <th>미리보기</th>
                                        <th>반응 지표</th>
                                        <th>상태</th>
                                        <th>관리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selfies.map((selfie) => (
                                        <tr key={selfie.id}>
                                            <td>
                                                <S.SelfThumbnail>
                                                    {selfie.imageUrl ? <img src={selfie.imageUrl} alt="셀피" /> : <span>No Img</span>}
                                                </S.SelfThumbnail>
                                            </td>
                                            <td style={{ textAlign: 'left' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                                                    <FiHeart color="#e74a3b" /> <strong>{selfie.likes.toLocaleString()}</strong>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#858796', fontSize: '0.85rem' }}>
                                                    <FiEye /> {selfie.views.toLocaleString()}명이 보고 있어요
                                                </div>
                                            </td>
                                            <td>
                                                <S.SelfStatusBadge 
                                                    $isActive={selfie.isActive}
                                                    onClick={() => toggleStatus(selfie.id)}
                                                >
                                                    {selfie.isActive ? "노출중" : "숨김"}
                                                </S.SelfStatusBadge>
                                            </td>
                                            <td>
                                                <S.SelfDeleteBtn onClick={() => handleDelete(selfie.id)}>
                                                    <FiTrash2 size={16} />
                                                </S.SelfDeleteBtn>
                                            </td>
                                        </tr>
                                    ))}
                                    {selfies.length === 0 && (
                                        <tr><td colSpan={4} style={{ padding: '3rem 0' }}>등록된 셀피가 없습니다.</td></tr>
                                    )}
                                </tbody>
                            </S.SelfTable>
                        </S.SelfTableWrapper>
                    </S.SelfCard>
                </S.SelfRightColumn>
            </S.SelfGrid>
        </S.SelfContainer>
          
        <Popup
        isOpen={popupConfig.isOpen}
        title={popupConfig.title}
        onClose={closePopup}
        onConfirm={popupConfig.onConfirm}
        >{popupConfig.message}</Popup>
        </>
    );
}