"use client";
import React, { useState } from "react";
import * as S from "@/assets/css/admin/Vlog.style";
import { FiSave, FiPlus, FiTrash2, FiArrowUp, FiArrowDown, FiVideo } from "react-icons/fi";
import Popup from "@/components/ui/Popup";
import usePopup from "@/hooks/usePopup";

// VLOG 데이터 인터페이스
interface VlogData {
    id: number;
    title: string;
    videoUrl: string;
    thumbnailUrl: string;
}

export default function Vlog() {
    const { popupConfig, closePopup, openPopup } = usePopup();
    
    // 🎯 상태 관리: 등록된 VLOG 목록
    const [vlogList, setVlogList] = useState<VlogData[]>([
        { id: 1, title: "답답했던 눈매·복코·얼굴살 완벽...", videoUrl: "https://youtube.com/...", thumbnailUrl: "" },
        { id: 2, title: "광대·사각턱·이중턱 싹 지우고...", videoUrl: "https://youtube.com/...", thumbnailUrl: "" }
    ]);

    // 🎯 상태 관리: 새 VLOG 등록 폼 (thumbnailUrl을 포함하도록 수정)
    const [newVlog, setNewVlog] = useState({ title: "", videoUrl: "", thumbnailUrl: "" });

    // ----------------------------------------------------
    // 0. 유튜브 URL에서 비디오 ID 추출 및 썸네일 자동 생성 기능
    // ----------------------------------------------------
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        const videoId = getYouTubeId(url);
        
        setNewVlog({
            ...newVlog,
            videoUrl: url,
            thumbnailUrl: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ""
        });
    };

    // ----------------------------------------------------
    // 1. VLOG 추가 기능
    // ----------------------------------------------------
    const handleAddVlog = () => {
        // [검증] 썸네일, 제목, 영상 링크 중 하나라도 비어있으면 경고 팝업
        if (!newVlog.title || !newVlog.videoUrl || !newVlog.thumbnailUrl) {
            openPopup('입력 오류', '올바른 유튜브 링크와 제목을 모두 입력해주세요. (썸네일 자동 추출 실패 시 링크를 확인해주세요)');
            return;
        }
        
        // [추가] 기존 목록 끝에 새로운 VLOG 데이터 추가하기
        setVlogList([
            ...vlogList, 
            { 
                id: Date.now(), 
                title: newVlog.title, 
                videoUrl: newVlog.videoUrl, 
                thumbnailUrl: newVlog.thumbnailUrl 
            } 
        ]);
        
        // [초기화] 입력 폼 비우기
        setNewVlog({ title: "", videoUrl: "", thumbnailUrl: "" }); 
    };

    // ----------------------------------------------------
    // 2. VLOG 삭제 기능
    // ----------------------------------------------------
    const handleDeleteVlog = (id: number) => { 
       openPopup(
        '삭제 확인', 
        '해당 영상을 노출 리스트에서 삭제하시겠습니까?',
        () => {
            setVlogList(prev => prev.filter(v => v.id !== id));
            closePopup();
        }
      )
    };
   
    // ----------------------------------------------------
    // 3. VLOG 노출 순서 변경 기능
    // ----------------------------------------------------
    const moveVlog = (index: number, direction: 'UP' | 'DOWN') => {
        const newVlogList = [...vlogList];
        
        if (direction === 'UP' && index > 0) {
            [newVlogList[index-1], newVlogList[index]] = [newVlogList[index], newVlogList[index - 1]];
        } else if (direction === 'DOWN' && index < newVlogList.length - 1) {
            [newVlogList[index], newVlogList[index+1]] = [newVlogList[index+1], newVlogList[index]];
        }
        setVlogList(newVlogList);
    };

    const handleSave = () => {
        console.log("DB에 저장될 VLOG 데이터:", vlogList);
        openPopup('저장 완료', 'VLOG 설정이 성공적으로 저장되었습니다.');
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
                                <S.VlogLabel>영상 링크 (유튜브 URL)</S.VlogLabel>
                                <S.VlogInput 
                                    type="text" 
                                    placeholder="예: https://youtube.com/watch?v=..."
                                    value={newVlog.videoUrl}
                                    onChange={handleVideoUrlChange}
                                />
                            </S.VlogFormGroup>

                            {/* 💡 유튜브 링크를 넣으면 자동으로 생성되는 16:9 썸네일 미리보기 영역 */}
                            {newVlog.thumbnailUrl && (
                                <S.VlogFormGroup>
                                    <S.VlogLabel>썸네일 자동 미리보기</S.VlogLabel>
                                    <S.VlogPreviewRect>
                                        <img src={newVlog.thumbnailUrl} alt="유튜브 썸네일 미리보기" />
                                    </S.VlogPreviewRect>
                                </S.VlogFormGroup>
                            )}

                            <S.VlogFormGroup>
                                <S.VlogLabel>영상 제목 (노출될 텍스트)</S.VlogLabel>
                                <S.VlogInput 
                                    type="text" 
                                    placeholder="예: 광대·사각턱·이중턱 싹 지우고 온 후기"
                                    value={newVlog.title}
                                    onChange={(e) => setNewVlog({...newVlog, title: e.target.value})}
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
                                        <th>순위/이동</th>
                                        <th>썸네일</th>
                                        <th>제목 및 링크</th>
                                        <th>관리</th>
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
                                                <S.VlogThumbnail>
                                                    {vlog.thumbnailUrl ? <img src={vlog.thumbnailUrl} alt={vlog.title} /> : <span>No Img</span>}
                                                </S.VlogThumbnail>
                                            </td>
                                            <td style={{ textAlign: 'left' }}>
                                                <strong>{vlog.title}</strong>
                                                <div style={{ fontSize: '0.8rem', color: '#4e73df', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                    <FiVideo /> {vlog.videoUrl || "링크 없음"}
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