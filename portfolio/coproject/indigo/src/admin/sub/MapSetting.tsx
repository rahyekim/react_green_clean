import React, { useState, useEffect } from "react";
import axios from 'axios'

import { Layout } from "../../component/layout/Layout";
import * as S from "../css/sub.styled"


export default function MapSetting (){


    //---1.상태관리 -----
    //어떤지도를 선택할지 선택하는 상태(기본값:google)
    const [mapType, setMapType]= useState<'daum'|'google'>('google');
    
    //관리자가 입력할 지도의 임베드(퍼가기) url주소
    const [mapUrl, setMapUrl]=useState('');

    useEffect(()=>{

        const fetchMapData = async()=>{
            
            try{   
               const res= await axios.get('http://localhost:5000/api/settings/map') 

               if(res.data){
                setMapType(res.data.mapType || 'google');
                setMapUrl(res.data.mapUrl || '')
               }
            }catch(err){
                console.error("지도데이터 불러오기 에러: ", err)
            }
        }
        fetchMapData();
    }, [])
    // ---3.조작함수들 -----
    // 지도 종류 ( 구글/다음) o 라디오 버튼 변경시 실행
    const handleMapTypeChange = (e:React.ChangeEvent<HTMLInputElement>)=>{

        // const selectedType = 
        // e.target.value as 'google' | 'daum';
        setMapType(e.target.value as 'daum'|'google');
        //선택 서비스종류를 바꾸면 기존 url을 싹 지워준다
        setMapUrl('');
    }

    //---4.설정 저장 합수-----
    const handleSave = async()=>{

        if(!mapUrl.trim()){
            alert("지도퍼가기(임베드 Embed)url를 입력 하세요")
            return;
        }
            
        try{
            //이미지가 없으므로 formData대신 일반 JSON 편하게 보냄
            await axios.post('http://localhost:5000/api/settings/map',{
                mapType, mapUrl
            })
            alert("지도설정이 성공적으로 저장")
        }catch(err){
            console.error("지도설정 저장실패:", err)
            alert("설정 저장 중 오류 발생");
        }
    }

    return(
        <>
        <Layout>
            <S.PageWrapper>
                <S.PageTitle>  MAP 지도 환경 설정 </S.PageTitle>
                <S.Card>
                    <S.SectionTitle> 1. 지도 서비스 선택 </S.SectionTitle>
                    <S.FormGroup>
                        <S.RadioGroup>
                            <label>
                                <S.Input
                                type="radio"
                                checked={mapType==='daum'}
                                value='daum'
                                onChange={handleMapTypeChange}
                                />
                                다음 / 카카오맵 (KaKao Map)
                            </label>
                            <label>
                                <S.Input
                                type="radio"
                                checked={mapType==='google'}
                                value='google'
                                onChange={handleMapTypeChange}
                                />
                                구글맵 (Google Map)
                            </label>
                        </S.RadioGroup>
                    </S.FormGroup>
                </S.Card>
            
                    {/* 2.지도 주소 입력 카드 */}
                <S.Card>
                    <S.SectionTitle>2. 지도 퍼가기(Embed) URL 입력 </S.SectionTitle>

                    {/* 친절한관리자용 안내문구 */}
                    <S.BottomInfo style={{flexDirection:"column", padding:"20px",marginBottom:"20px"}}>
                        <strong style={{marginBottom:"20px"}}>
                            <span style={{color:"red"}}>*</span>
                            지도 url 입력 방법</strong> 
                        {mapType === 'google' ? (
                            <span>구글 맵에서 장소 검색 [공유] 클릭 
                                <strong>[지도퍼가기]</strong>
                                 탭 클릭 HTML 복사 후 
                                <strong> src=" " </strong>
                                안의 주소만 추출해서 넣어주세요
                            </span>
                        ): (
                            <span>카카오 맵에서 장소 검색 [ 공유 ] 클릭 
                                <strong>[HTML 태그 복사]</strong>
                                 탭 클릭 소스 코드 안의
                                <strong>src=" "</strong>
                                안의 주소만 추출해서 넣어주세요
                            </span>
                        )}
                    </S.BottomInfo>

                    <S.Input
                    type="text"
                    value={mapUrl}
                    onChange={e=>setMapUrl(e.target.value)}
                    placeholder="예) https://www.google.com/maps/embed?pb=..."
                    />
                </S.Card>

                <S.Card>
                    <S.SectionTitle> 3. 지도 미리 보기</S.SectionTitle>
                    <S.MapPreview>
                        {mapUrl ? (
                            <iframe
                            src={mapUrl} 
                            width="100%"
                            allowFullScreen
                            height="100%"
                            style={{}}
                            >  

                            </iframe>
                        ) : (
                        <>
                        <span style={{color:"#888"}}>
                            url을 입력하면 지도가 이곳에 나타납니다
                        </span>
                        </>)}
                    </S.MapPreview>
                </S.Card>

                <S.SaveBtnWrap>
                    <S.Button
                    variant="primary"
                    onClick={handleSave}
                    >
                        지도 설정하기
                    </S.Button>
                </S.SaveBtnWrap>
            </S.PageWrapper>
            
        </Layout>
        </>
    )
}
