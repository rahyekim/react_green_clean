"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "@/assets/css/admin/Vlog.style";
import { FiSave, FiPlus, FiTrash2, FiImage, FiArrowUp, FiArrowDown, FiVideo } from "react-icons/fi";
import Popup from "@/components/ui/Popup";
import usePopup from "@/hooks/usePopup";

// 관리자 화면에서 다룰 VLOG 데이터의 구조 정의
interface VlogData {
    id: number;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
}

export default function Vlog() {
    const {popupConfig,closePopup,openPopup}=usePopup();
    
    // 🎯 DB에서 불러온 VLOG 리스트 배열
    const [vlogList, setVlogList] = useState<VlogData[]>([]);

    // 🎯 상태 관리: 새 VLOG 등록 폼
    const [newVlog, setNewVlog] = useState({ title: "", videoUrl: "" });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string>("");

    useEffect(() => {
        fetchVlogs();
    }, []);

    // 🔍 백엔드 API로부터 VLOG 목록 조회 함수
    const fetchVlogs = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/admin/vlogs");
            if (response.data.success) {
                // 📦 백엔드 데이터 필드명을 프론트엔드 인터페이스 구조에 맞게 매핑
                const formatted = response.data.data.map((item: any) => ({
                    id: item.VLOG_IDX,
                    title: item.TITLE,
                    videoUrl: item.VIDEO_URL,
                    thumbnailUrl: `http://localhost:4000/images/${item.FILE_NAME}`
                }));
                setVlogList(formatted);
            }
        } catch (error) {
            console.error("VLOG 데이터 로드 실패:", error);
            openPopup('알림','VLOG 로드에 실패했습니다')
        }
    };
    // 📸 이미지 파일 첨부 및 썸네일 미리보기 
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
            setPreviewUrl(URL.createObjectURL(file)); 
        }
    };

    //새 VLOG 등록 기능 (FormData를 이용해 이미지와 텍스트를 백엔드로 전송)
    const handleAddVlog = async() => {
        if (!newVlog.title || !newVlog.videoUrl || !selectedFile) {
            openPopup('입력 오류', '썸네일 이미지, 제목, 영상 링크를 모두 입력해주세요.')
            return;
        }
        // multipart/form-data 전송을 위한 폼데이터 객체 생성 📦
        const formData = new FormData();
        formData.append("vlogImg", selectedFile);
        formData.append("title", newVlog.title);
        formData.append("videoUrl", newVlog.videoUrl);

        try {
            const response = await axios.post("http://localhost:4000/api/admin/vlogs", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.data.success) {
                setNewVlog({ title: "", videoUrl: "" }); 
                setSelectedFile(null);
                setFileName(""); 
                setPreviewUrl(""); 
                fetchVlogs(); // 🔄
            }
        } catch (error) {
            console.error("VLOG 데이터 등록 실패:", error);
            openPopup('알림','VLOG 등록에 실패했습니다')
        }
    };

    // 삭제 
    const handleDeleteVlog = (id: number) => { 
       openPopup(
        '삭제 확인', 
        '해당 영상을 노출 리스트에서 삭제하시겠습니까?',
        async()=>{
            try {
                const response = await axios.delete(`http://localhost:4000/api/admin/vlogs/${id}`);
                if (response.data.success) {
                    fetchVlogs(); // 삭제 후 목록 새로고침 🔄
                    closePopup();
                }
            } catch (error) {
                openPopup('알림','삭제 중 문제가 발생했습니다.')
            }
        }
    )
    };
   
    // VLOG 노출 순서 변경 기능 (화살표 클릭)
    const moveVlog = (index: number, direction: 'UP' | 'DOWN') => {
        const newVlogList = [...vlogList]; // 원본 복사
        
        // 위로 이동
        if (direction === 'UP' && index > 0) {
            [newVlogList[index-1], newVlogList[index]] = [newVlogList[index], newVlogList[index - 1]];
        } 
        // 아래로 이동
        else if (direction === 'DOWN' && index < newVlogList.length - 1) {
            [newVlogList[index], newVlogList[index+1]] = [newVlogList[index+1], newVlogList[index]];
        }
        setVlogList(newVlogList); // 순서가 바뀐 새 배열로 갱신
    };

    //💾 현재 정렬된 순서(ID 배열)를 백엔드로 일괄 저장 요청
    const handleSave = async() => {

        const orderedIds = vlogList.map(v => v.id); // 현재 순서대로 아이디만 추출
        try {
            const response = await axios.put("http://localhost:4000/api/admin/vlogs/order", { orderedIds });
            if (response.data.success) {
                openPopup('저장 완료', 'VLOG 설정이 성공적으로 저장되었습니다.');
            }
        } catch (error) {
            openPopup('알림','순서 저장 중 문제가 발생했습니다.')
        }
       
    };

    return (
        <>
        <S.VlogContainer>
            <S.VlogPageHeader>
                <S.VlogPageTitle>VLOG 영상 관리</S.VlogPageTitle>
                <S.VlogSaveButton onClick={handleSave}>
                    <FiSave size={18} /> 
                    <span>설정 저장하기</span>
                </S.VlogSaveButton>
            </S.VlogPageHeader>

            <S.VlogGrid>
                {/* ⚙️ 1. 새 VLOG 등록 폼 (좌측) */}
                <S.VlogLeftColumn>
                    <S.VlogCard>
                        <S.VlogCardHeader>
                            <S.VlogCardTitle>새 영상 등록</S.VlogCardTitle>
                        </S.VlogCardHeader>
                        <S.VlogCardBody>
                            <S.VlogFormGroup>
                                <S.VlogLabel>영상 썸네일 이미지 (권장 비율 16:9)</S.VlogLabel>
                                <S.VlogFileInputWrapper>
                                    <S.VlogFileInput 
                                        type="file" 
                                        id="vlog-img" 
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <S.VlogFileLabel htmlFor="vlog-img"><FiImage /> 이미지 선택</S.VlogFileLabel>
                                    <span className="file-name">{fileName || "선택된 파일 없음"}</span>
                                </S.VlogFileInputWrapper>
                                
                                {/* 16:9 비율의 미리보기 영역 */}
                                {previewUrl && (
                                    <S.VlogPreviewRect>
                                        <img src={previewUrl} alt="썸네일 미리보기" />
                                    </S.VlogPreviewRect>
                                )}
                            </S.VlogFormGroup>

                            <S.VlogFormGroup>
                                <S.VlogLabel>영상 제목 (노출될 텍스트)</S.VlogLabel>
                                <S.VlogInput 
                                    type="text" 
                                    placeholder="예: 광대·사각턱·이중턱 싹 지우고 온 후기"
                                    value={newVlog.title}
                                    onChange={(e) => setNewVlog({...newVlog, title: e.target.value})}
                                />
                            </S.VlogFormGroup>

                            <S.VlogFormGroup>
                                <S.VlogLabel>영상 링크 (유튜브 URL 등)</S.VlogLabel>
                                <S.VlogInput 
                                    type="text" 
                                    placeholder="예: https://youtube.com/watch?v=..."
                                    value={newVlog.videoUrl}
                                    onChange={(e) => setNewVlog({...newVlog, videoUrl: e.target.value})}
                                />
                            </S.VlogFormGroup>

                            <S.VlogAddButton onClick={handleAddVlog}>
                                <FiPlus size={18} /> 리스트에 추가
                            </S.VlogAddButton>
                        </S.VlogCardBody>
                    </S.VlogCard>
                </S.VlogLeftColumn>

                {/* 📋 2. 등록된 VLOG 리스트 (우측) */}
                <S.VlogRightColumn>
                    <S.VlogCard style={{ height: '100%' }}>
                        <S.VlogCardHeader>
                            <S.VlogCardTitle>현재 노출 순서 (총 {vlogList.length}개)</S.VlogCardTitle>
                        </S.VlogCardHeader>
                        <S.VlogTableWrapper>
                            <S.VlogTable>
                                <thead>
                                    <tr>
                                        <th style={{ width: '15%' }}>순위/이동</th>
                                        <th style={{ width: '25%' }}>썸네일</th>
                                        <th style={{ width: '45%' }}>제목 및 링크</th>
                                        <th style={{ width: '15%' }}>관리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vlogList.map((vlog, index) => (
                                        <tr key={vlog.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                                    <S.VlogRankBadge>{index + 1}</S.VlogRankBadge>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                                        <S.VlogActionBtn onClick={() => moveVlog(index, 'UP')} disabled={index === 0}>
                                                            <FiArrowUp size={14} />
                                                        </S.VlogActionBtn>
                                                        <S.VlogActionBtn onClick={() => moveVlog(index, 'DOWN')} disabled={index === vlogList.length - 1}>
                                                            <FiArrowDown size={14} />
                                                        </S.VlogActionBtn>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {/* 썸네일 이미지 표시 영역 */}
                                                <S.VlogThumbnail>
                                                    {vlog.thumbnailUrl ? <img src={vlog.thumbnailUrl} alt={vlog.title} /> : <span>No Img</span>}
                                                </S.VlogThumbnail>
                                            </td>
                                            <td style={{ textAlign: 'left' }}>
                                                <strong>{vlog.title}</strong>
                                                <div style={{ fontSize: '0.8rem', color: '#4e73df', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                    <FiVideo /> 
                                                    <a 
                                                    href={vlog.videoUrl} 
                                                    target="_blank" 
                                                    rel="noreferrer" 
                                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                                    >{vlog.videoUrl || "링크 없음"}</a>
                                                </div>
                                            </td>
                                            <td>
                                                <S.VlogDeleteBtn onClick={() => handleDeleteVlog(vlog.id)}>
                                                    <FiTrash2 size={16} />
                                                </S.VlogDeleteBtn>
                                            </td>
                                        </tr>
                                    ))}
                                    {vlogList.length === 0 && (
                                        <tr><td colSpan={4} style={{ padding: '3rem 0' }}>등록된 영상이 없습니다.</td></tr>
                                    )}
                                </tbody>
                            </S.VlogTable>
                        </S.VlogTableWrapper>
                    </S.VlogCard>
                </S.VlogRightColumn>
            </S.VlogGrid>
        </S.VlogContainer>
       
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