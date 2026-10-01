'use client';

import { useState,useEffect } from 'react';
import axios from "axios";
import * as S from '@/assets/css/admin/Event.style'
import {
FiSave, FiPlus, FiTrash2, FiImage,FiArrowUp,FiArrowDown
}from 'react-icons/fi'
import Popup from '@/components/ui/Popup';
import usePopup from '@/hooks/usePopup';

//인터페이스:데이터 구조타입을 미리정의 => 개발자실수방지, 코드안정성, 자동완성
interface EventRankingData{
    id:number;
    title:string;
    price:string;
    imageUrl:string;
}
export default function  EventRanking() {
    
    const {popupConfig,closePopup,openPopup}=usePopup();

    //백엔드에서 불러온 이벤트 랭킹 목록
    const[events, setEvents]=useState<EventRankingData[]>([]);

    const [newEvent, setNewEvent]=useState({title:'', price:''})
    //서버 전송용 파일 상태
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    //화면에 보여줄 파일 이름
    const [fileName, setFileName]=useState(''); 
    //선택한 이미지 미리보기 가상 URL
    const [previewUrl, setPreviewUrl]= useState<string>('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/admin/events");
            if (response.data.success) {
                const formatted = response.data.data.map((item: any) => ({
                    id: item.EVENT_IDX,
                    title: item.TITLE,
                    price: item.PRICE,
                    imageUrl: `http://localhost:4000/images/${item.FILE_NAME}`
                }));
                setEvents(formatted);
            }
        } catch (error) {
            console.error("이벤트 목록 로드 실패:", error);
        }
    };
    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(file){
            setSelectedFile(file);
            setFileName(file.name); 
            setPreviewUrl(URL.createObjectURL(file));
        }
    }

    //이벤트작성후 서버로 전송 (FormData 활용)
    const handleAddEvent = async()=>{
        if(!newEvent.title || !newEvent.price || !selectedFile){
            openPopup('입력 오류', '이미지, 타이틀, 가격을 모두 입력해주세요');
            return;
        }
        const formData = new FormData();
        formData.append("eventImg", selectedFile);
        formData.append("title", newEvent.title);
        formData.append("price", newEvent.price);

        try {
            const response = await axios.post("http://localhost:4000/api/admin/events", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.data.success) {
                // [초기화] 등록 성공 시 입력 폼 초기화 및 목록 새로고침 🔄
                setNewEvent({title:"", price:""});
                setSelectedFile(null);
                setFileName("");
                setPreviewUrl("");
                fetchEvents(); 
            }
        } catch (error) {
            alert("이벤트 등록에 실패했습니다 ❌");
        }
    }
    //서버에 삭제 요청 🌐
    const handleDelete = (id:number)=>{
        openPopup(
            '삭제 알림', 
            '해당이벤트를 삭제하시겠습니까?',
            async()=>{
                   try {
                    const response = await axios.delete(`http://localhost:4000/api/admin/events/${id}`);
                    if (response.data.success) {
                        fetchEvents(); 
                        closePopup();  
                    }
                    } catch (error) {
                        console.error("이벤트 삭제 실패:", error);
                        openPopup('알림',"삭제 중 오류가 발생했습니다.");
                }
            }
        )
    }
    //랭킹 순서변경(위/아래)
    const moveEvent = (idx:number, direction:'UP'|'DOWN')=>{
        const newEvents = [...events];

        // 위로 올리기: 내 윗칸(index - 1)과 내 위치(index) 교환 🔄
        if(direction === 'UP' && idx > 0){
            [newEvents[idx-1], newEvents[idx]]=[newEvents[idx], newEvents[idx-1]]
        }else if(direction === 'DOWN' && idx < newEvents.length-1){
            [newEvents[idx], newEvents[idx+1]] = [newEvents[idx+1], newEvents[idx]]
        }
        // 아래로 내리기: 내 아랫칸(index + 1)과 내 위치(index) 교환 🔄
        setEvents(newEvents)
    }

    //변경된 랭킹 순서(ID 배열)를 서버로 전송
    const handleSave = async()=>{
        const orderedIds = events.map(e => e.id);
        try {
            const response = await axios.put("http://localhost:4000/api/admin/events/order", { orderedIds });
            if (response.data.success) {
                console.log('DB에저장될데이터',events)
                openPopup('저장 알림','이벤트 설정이 저장되었습니다')
            }
        } catch (error) {
            openPopup('알림',"순서 저장 중 오류가 발생했습니다.");
        }
    }

    return(
        <>
        <S.Container>
            <S.PageHeader>
                <S.PageTitle>이벤트 랭킹 관리</S.PageTitle>
                <S.SaveButton onClick={handleSave}>
                    <FiSave size={18} /> 설정 저장하기
                </S.SaveButton>
            </S.PageHeader>
            <S.Grid>
                {/* ⚙️ 1. 새 이벤트 랭킹 등록 폼 */}
                <S.LeftColumn>
                    <S.Card>
                        <S.CardHeader>
                            <S.CardTitle>새 이벤트 등록</S.CardTitle>
                        </S.CardHeader>
                        <S.CardBody>
                            <S.FormGroup>
                                <S.Label>대표 이미지 (정방형 또는 4:5 비율 권장)</S.Label>
                                <S.FileInputWrapper>
                                    <S.FileInput 
                                        type="file" 
                                        id="event-img" 
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <S.FileLabel htmlFor="event-img">
                                        <FiImage /> 이미지 선택
                                    </S.FileLabel>
                                    <span className="file-name">{fileName || "선택된 파일 없음"}</span>
                                </S.FileInputWrapper>
                                
                                {previewUrl && (
                                    <S.PreviewRect>
                                        <img src={previewUrl} alt="미리보기" />
                                    </S.PreviewRect>
                                )}
                            </S.FormGroup>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <S.FormGroup style={{ flex: 1 }}>
                                    <S.Label>타이틀 (예: 다다고성형)</S.Label>
                                    <S.Input 
                                        type="text" 
                                        value={newEvent.title}
                                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                    />
                                </S.FormGroup>

                                <S.FormGroup style={{ flex: 1 }}>
                                    <S.Label>가격 텍스트 (예: 149만원)</S.Label>
                                    <S.Input 
                                        type="text" 
                                        value={newEvent.price}
                                        onChange={(e) => setNewEvent({...newEvent, price: e.target.value})}
                                    />
                                </S.FormGroup>
                            </div>

                            <S.AddButton onClick={handleAddEvent}>
                                <FiPlus size={18} /> 
                                랭킹 리스트에 추가
                            </S.AddButton>
                        </S.CardBody>
                    </S.Card>
                </S.LeftColumn>

                {/* 📋 2. 등록된 이벤트 랭킹 리스트 */}
                <S.RightColumn>
                    <S.Card style={{ height: '100%' }}>
                        <S.CardHeader>
                            <S.CardTitle>현재 랭킹 순위 (총 {events.length}개)</S.CardTitle>
                        </S.CardHeader>
                        <S.TableWrapper>
                            <S.Table>
                                <thead>
                                    <tr>
                                        <th>순위/이동</th>
                                        <th>이미지</th>
                                        <th>타이틀 / 가격</th>
                                        <th>관리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((evt, index) => (
                                        <tr key={evt.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                                                    <S.RankBadge>{index + 1}</S.RankBadge>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                                        <S.ActionBtn onClick={() => moveEvent(index, 'UP')} disabled={index === 0}>
                                                            <FiArrowUp size={14} />
                                                        </S.ActionBtn>
                                                        <S.ActionBtn onClick={() => moveEvent(index, 'DOWN')} disabled={index === events.length - 1}>
                                                            <FiArrowDown size={14} />
                                                        </S.ActionBtn>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <S.Thumbnail>
                                                    {evt.imageUrl ? <img src={evt.imageUrl} alt={evt.title} /> : <span>No Img</span>}
                                                </S.Thumbnail>
                                            </td>
                                            <td style={{ textAlign: 'center' }}>
                                                <strong>{evt.title}</strong>
                                                <div style={{ fontSize: '0.9rem', color: '#e74a3b', fontWeight: 'bold', marginTop: '0.2rem' }}>
                                                    {evt.price}
                                                </div>
                                            </td>
                                            <td>
                                                <S.DeleteBtn onClick={() => handleDelete(evt.id)}>
                                                    <FiTrash2 size={16} />
                                                </S.DeleteBtn>
                                            </td>
                                        </tr>
                                    ))}
                                    {events.length === 0 && (
                                        <tr><td colSpan={4} style={{ padding: '3rem 0' }}>등록된 랭킹 이벤트가 없습니다.</td></tr>
                                    )}
                                </tbody>
                            </S.Table>
                        </S.TableWrapper>
                    </S.Card>
                </S.RightColumn>
            </S.Grid>
        </S.Container>
        
        <Popup
        isOpen={popupConfig.isOpen}
        title={popupConfig.title}
        onClose={closePopup}
        onConfirm={popupConfig.onConfirm}
        >{popupConfig.message}
        </Popup>
        </>
    )
}
