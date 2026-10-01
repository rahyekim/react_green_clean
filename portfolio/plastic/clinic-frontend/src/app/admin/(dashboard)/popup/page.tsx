"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "@/assets/css/admin/EventPop.style";
import { FiSave, FiPlus, FiTrash2, FiImage, FiClock } from "react-icons/fi";
import usePopup from "@/hooks/usePopup";
import Popup from "@/components/ui/Popup";

interface PopupData {
    id: number;
    title: string;
    link: string;
    startDate: string;
    endDate: string;
    useTodayClose: boolean;
    fileName?:string | null;
    tempUrl?:string | null;
}

export default function Pop() {
    const {popupConfig,closePopup,openPopup}=usePopup();
    
    // 팝업 개수 설정
    const [maxPopups, setMaxPopups] = useState<number>(1);
    
    //팝업 목록 데이터
    const [popups, setPopups] = useState<PopupData[]>([]);

    //새 팝업 등록 폼
    const [newPopup, setNewPopup] = useState<Partial<PopupData>>({
        title: "", link: "", startDate: "", endDate: "", useTodayClose: true
    });
    //이미지 파일 객체를 저장할 상태추가
    const [selectedFile, setSelectedFile] = useState<File|null>(null);
    const [fileName, setFileName] = useState("");
    const [previewUrl, setPreviewUrl]= useState<string|null>(null);

    const [currentTime, setCurrentTime] = useState(new Date().getTime());

    // 실시간 상태 업데이트를 위한 타이머(1분마다 시간 갱신)//10분으로,,
    useEffect(() => {
        fecthPopups();
        const timer = setInterval(() => setCurrentTime(new Date().getTime()), 600000);
        return () => clearInterval(timer);
    }, []);

    //🤫메모리 누수방지 컴포넌트가 사라지거나 이미지가 바뀔 때 브라우저 메모리(URL)를 깨끗하게 해제
    useEffect(()=>{
        return ()=>{
            if(previewUrl){
                URL.revokeObjectURL(previewUrl);
            }
        }
    }, [previewUrl]);

    //db에서 불러오기
    const fecthPopups = async()=>{
        try{
            const res= await axios.get('http://localhost:4000/api/admin/popup')
            if(res.data.success){
                setMaxPopups(res.data.maxPopups);
                const formattedPopup = res.data.popups.map((p:any)=>({
                    id: p.POPUP_IDX,
                    title: p.TITLE,
                    link: p.LINK, 
                    fileName: p.FILE_NAME,
                    startDate: p.START_DATE, 
                    endDate: p.END_DATE, 
                    useTodayClose: p.USE_TODAY_CLOSE === 'Y'
                }));
                setPopups(formattedPopup);
            }
        }catch(err){
            console.error('팝업 목록 로드 실패:', err);
            openPopup('알림', '팝업 목록 조회에 실패했습니다');
        }
    }

    // 🕒 날짜 비교 로직
    const getPopupStatus = (start: string, end: string) => {

        if (!start || !end) return { label: "기간 미설정", color: "#858796" };
        const startTime = new Date(start).getTime(); //.getTime():문자열이 new Date()상자에 넣어져서 숫자(밀리초)로 변환
        const endTime = new Date(end).getTime();

        // 💡 날짜 변환(숫자)에 실패 방어코드 not a number
        if (isNaN(startTime) || isNaN(endTime)) return { label: "형식 오류", color: "#858796" };
        
        if (currentTime < startTime) return { label: "대기중", color: "#f6c23e" };
        if (currentTime > endTime) return { label: "기간만료", color: "#e74a3b" };
        return { label: "노출중", color: "#1cc88a" };
    };

    const handleAddPopup = async() => {
      
        if (!newPopup.title || !newPopup.startDate || !newPopup.endDate || !selectedFile) {
            openPopup('입력 알림', "제목과 시작/종료 일시를 모두 입력해주세요.");
            return;
        }
        const formData = new FormData();
        formData.append('popupImg', selectedFile);
        formData.append('title', newPopup.title);
        formData.append('link', newPopup.link || '');
        formData.append('startDate', newPopup.startDate);
        formData.append('endDate', newPopup.endDate);
        formData.append('useTodayClose', String(newPopup.useTodayClose));

        try{
            const res = await axios.post('http://localhost:4000/api/admin/popup', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            if(res.data.success){
                openPopup('알림', '팝업 등록에 성공했습니다');
                setNewPopup({ title: "", link: "", startDate: "", endDate: "", useTodayClose: true });
                setFileName("");
                setSelectedFile(null);

                // 🤫 등록 완료 후 저장되어 있던 미리보기 URL을 초기화(메모리 해제)
                if(previewUrl){
                    URL.revokeObjectURL(previewUrl);
                    setPreviewUrl(null);
                }
                fecthPopups();
            }
        }catch(err){
            console.error('팝업 등록 실패:', err);
            openPopup('알림', '팝업 등록에 실패했습니다');
        }
    };

    const handleDelete = async(id: number) => {
        if (confirm("정말 이 팝업을 삭제하시겠습니까?")) {
            try{
                const res = await axios.delete(`http://localhost:4000/api/admin/popup/${id}`);
                if(res.data.success){
                    openPopup('알림', '팝업 삭제에 성공했습니다');
                    setPopups(popups.filter(p => p.id !== id)); //fecthPopups();
                }
            }catch(err){
            console.error('팝업 삭제 실패:', err);
            openPopup('알림', '팝업 삭제에 실패했습니다');
            }
        }
    };

    const handleSave = async() => {
        try{
            const res= await axios.put('http://localhost:4000/api/admin/popup/setting', {maxPopups})
              if(res.data.success){
                    openPopup('알림', '팝업 개수 설정에 성공했습니다');
                }
        }catch(err){
            console.error('팝업 개수 저장 실패:', err);
            openPopup('알림', '팝업 개수 저장에 실패했습니다');
        }
    };

    return (
        <>
        <S.PopContainer>
            <S.PopPageHeader>
                <S.PopPageTitle>메인 팝업 관리</S.PopPageTitle>
                <S.PopSaveButton onClick={handleSave}>
                    <FiSave size={18} /> 
                    <span>설정 저장하기</span>
                </S.PopSaveButton>
            </S.PopPageHeader>

            <S.PopGrid>
                <S.PopLeftColumn>
                    <S.PopCard style={{ marginBottom: '1.5rem' }}>
                        <S.PopCardHeader>
                            <S.PopCardTitle>기본 설정</S.PopCardTitle>
                        </S.PopCardHeader>
                        <S.PopCardBody>
                            <S.PopFormGroup>
                                <S.PopLabel>동시 노출 가능한 최대 팝업 갯수</S.PopLabel>
                                <S.PopInput 
                                    type="number" 
                                    min={1} max={5}
                                    value={maxPopups} 
                                    onChange={(e) => setMaxPopups(Number(e.target.value))} 
                                    style={{ width: '120px' }}
                                />
                                <small style={{ color: '#858796', marginTop: '0.5rem', display: 'block' }}>
                                    * &quot;노출중&quot; 상태인 팝업이 이 설정값을 초과하면, 최신 등록순으로 보여집니다.
                                </small>
                            </S.PopFormGroup>
                        </S.PopCardBody>
                    </S.PopCard>

                    <S.PopCard>
                        <S.PopCardHeader>
                            <S.PopCardTitle>새 팝업 등록</S.PopCardTitle>
                        </S.PopCardHeader>
                        <S.PopCardBody>
                            <S.PopFormGroup>
                                <S.PopLabel>팝업 제목 (관리용)</S.PopLabel>
                                <S.PopInput 
                                    type="text" 
                                    placeholder="예: 수능 할인 이벤트" 
                                    value={newPopup.title}
                                    onChange={(e) => setNewPopup({...newPopup, title: e.target.value})}
                                />
                            </S.PopFormGroup>

                            <S.PopFormGroup>
                                <S.PopLabel>이미지 등록</S.PopLabel>
                                <S.PopFileInputWrapper>
                                    <S.PopFileInput 
                                        type="file" 
                                        id="popup-img" 
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if(file){
                                                setSelectedFile(file);
                                                setFileName(file.name)

                                                //🤫파일을 선택하는 순간 기존에있던건지우고 브라우저내부메모리에 임시url저장
                                                if(previewUrl) URL.revokeObjectURL(previewUrl);
                                                setPreviewUrl(URL.createObjectURL(file));
                                            }else{
                                                // 파일을 선택하다가 취소했을 때의 예외 처리
                                                setSelectedFile(null);
                                                setFileName("");
                                            }
                                        }
                                        }
                                    />
                                    <S.PopFileLabel htmlFor="popup-img"><FiImage /> 이미지 선택</S.PopFileLabel>
                                    <span className="file-name">{fileName || "선택된 파일 없음"}</span>
                                </S.PopFileInputWrapper>

                                    {previewUrl && (
                                        <S.Preview>
                                            <img src={previewUrl} alt='미리보기' />
                                        </S.Preview>
                                    )}
                            </S.PopFormGroup>
                            
                            <S.PopFormGroup>
                                <S.PopLabel><FiClock /> 노출 기간 설정</S.PopLabel>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <S.PopInput 
                                        type="datetime-local" 
                                        value={newPopup.startDate}
                                        onChange={(e) => setNewPopup({...newPopup, startDate: e.target.value})}
                                    />
                                    <span>~</span>
                                    <S.PopInput 
                                        type="datetime-local" 
                                        value={newPopup.endDate}
                                        onChange={(e) => setNewPopup({...newPopup, endDate: e.target.value})}
                                    />
                                </div>
                            </S.PopFormGroup>

                            <S.PopFormGroup>
                                <S.PopLabel>클릭 시 이동할 링크 URL (선택)</S.PopLabel>
                                <S.PopInput 
                                    type="text" 
                                    placeholder="예: /event/1"
                                    value={newPopup.link}
                                    onChange={(e) => setNewPopup({...newPopup, link: e.target.value})}
                                />
                            </S.PopFormGroup>

                            <S.PopCheckboxLabel>
                                <input 
                                    type="checkbox" 
                                    checked={newPopup.useTodayClose}
                                    onChange={(e) => setNewPopup({...newPopup, useTodayClose: e.target.checked})}
                                /> 
                                <span>&quot;오늘 하루 보지 않음&quot; 버튼 사용하기</span>
                            </S.PopCheckboxLabel>

                            <S.PopAddButton onClick={handleAddPopup}>
                                <FiPlus size={18} /> 새 팝업 추가하기
                            </S.PopAddButton>
                        </S.PopCardBody>
                    </S.PopCard>
                </S.PopLeftColumn>

                <S.PopRightColumn>
                    <S.PopCard style={{ height: '100%' }}>
                        <S.PopCardHeader>
                            <S.PopCardTitle>등록된 팝업 목록 (총 {popups.length}건)</S.PopCardTitle>
                        </S.PopCardHeader>
                        <S.PopTableWrapper>
                            <S.PopTable>
                                <thead>
                                    <tr>
                                    <th style={{ width: 'auto' }}>미리보기</th>     
                                    <th style={{ width: 'auto' }}>제목 / 링크</th>     
                                    <th style={{ width: '220px' }}>노출 기간</th>       
                                    <th style={{ width: '130px' }}>옵션</th>            
                                    <th style={{ width: '100px' }}>상태</th>            
                                    <th style={{ width: '90px' }}>관리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {popups.map(popup => {
                                        const status = getPopupStatus(popup.startDate, popup.endDate);
                                        return (
                                            <tr key={popup.id}>
                                                <td>
                                                    {popup.fileName && (
                                                        <img src={`http://localhost:4000/images/${popup.fileName}`} alt="popup" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                                    )}
                                                </td>
                                                <td style={{ textAlign: 'left' }}>
                                                    <strong>{popup.title}</strong>
                                                    <div style={{ fontSize: '0.8rem', color: '#858796' }}>{popup.link || '링크 없음'}</div>
                                                </td>
                                                <td>
                                                    <div style={{ fontSize: '0.85rem' }}>{popup.startDate.replace("T", " ")}</div>
                                                    <div style={{ fontSize: '0.85rem', color: '#858796' }}>~ {popup.endDate.replace("T", " ")}</div>
                                                </td>
                                                <td>
                                                    {popup.useTodayClose ? <S.PopBadge $color="#36b9cc">하루안보기 O</S.PopBadge> : <S.PopBadge $color="#858796">하루안보기 X</S.PopBadge>}
                                                </td>
                                                <td>
                                                    <S.PopBadge $color={status.color}>{status.label}</S.PopBadge>
                                                </td>
                                                <td>
                                                    <S.PopDeleteBtn onClick={() => handleDelete(popup.id)}>
                                                        <FiTrash2 size={16} />
                                                    </S.PopDeleteBtn>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    {popups.length === 0 && (
                                        <tr><td colSpan={5} style={{ padding: '3rem 0' }}>등록된 팝업이 없습니다.</td></tr>
                                    )}
                                </tbody>
                            </S.PopTable>
                        </S.PopTableWrapper>
                    </S.PopCard>
                </S.PopRightColumn>
            </S.PopGrid>
        </S.PopContainer>

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