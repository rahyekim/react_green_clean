import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'

import { Layout } from "../../components/layout/Layout";
import * as S from "../css/sub.styled"

//🌟typescript에서 전역 kakao 객체를 인식하도록 선언
declare global{
    interface Window{
        kakao:any;
    }
}
export default function MapSetting (){

    //---1.상태관리 -----
    //어떤지도를 선택할지 선택하는 상태(기본값:google)
    const [mapType, setMapType]= useState<'daum'|'google'>('google');
    
    //관리자가 입력할 지도의 임베드(퍼가기) url주소
    // const [mapUrl, setMapUrl]=useState('');

    //🌟구글맵일 때는 url, 카카오맵일 때는 위도,경도 저장하는 용도
    const [mapValue,setMapValue]=useState('');

    const kakaoMapRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{

        const fetchMapData = async()=>{
            
            try{   
               const res= await axios.get('http://localhost:5000/api/settings/map') 

               if(res.data){
                setMapType(res.data.mapType || 'google');
                setMapValue(res.data.mapUrl || '');
                // setMapUrl(res.data.mapUrl || '')
               }
            }catch(err){
                console.error("지도데이터 불러오기 에러: ", err)
            }
        }
        fetchMapData();
    }, [])

    //🌟카카오맵을 랜더링하는 핵심 함수
    useEffect(()=>{
        //카카오맵이 선택되었고, 스크립트가 로드되었으며, 입력값이 있을 때만 실행
        if(mapType == 'daum' && window.kakao && window.kakao.maps 
            && kakaoMapRef.current){
                const [lat, lng] =mapValue.split(',').map(Number); //축약형 item=>Number(item)

            //위도 경도 값이 숫자로 잘 변환되었는지 체크
            if(!isNaN(lat) && !isNaN(lng)){
                //지도만들때 container,옵션(확대수준)필요...
                const container = kakaoMapRef.current;
                const options={
                    center: new window.kakao.maps.LatLng(lat,lng),
                    level:3 //확대수준
                };
                //지도생성
                const map = new window.kakao.maps.Map(container, options);
                //📍마커(동영상볼때 구간같은 개념)생성 표시
                const markerPosition = new window.kakao.maps.LatLng(lat,lng);
                const marker = new window.kakao.maps.Marker({position: markerPosition})
                marker.setMap(map);
            }
            }
    }, [mapType, mapValue])


    // ---3.조작함수들 -----
    // 지도 종류 ( 구글/다음) o 라디오 버튼 변경시 실행
    const handleMapTypeChange = (e:React.ChangeEvent<HTMLInputElement>)=>{

        // const selectedType = 
        // e.target.value as 'google' | 'daum';
        setMapType(e.target.value as 'daum'|'google');
        //🌟선택 서비스종류를 바꾸면 기존 url을 싹 지워주면 관리자가 안헷갈림
        // setMapUrl('');
        setMapValue('') // 타입변경시 입력창 초기화
    }

    //---4.설정 저장 합수-----
    const handleSave = async()=>{

        if(!mapValue.trim()){
            alert("지도 정보를 입력해주세요")
            return;
        }
            
        try{
            //이미지가 없으므로 formData대신 일반 JSON 편하게 보냄
            await axios.post('http://localhost:5000/api/settings/map',{
                mapType, mapUrl: mapValue
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
                                checked={mapType==='google'}
                                value='google'
                                onChange={handleMapTypeChange}
                                />
                                구글맵 (URL 퍼가기 방식)
                            </label>
                            <label>
                                <S.Input
                                type="radio"
                                checked={mapType==='daum'}
                                value='daum'
                                onChange={handleMapTypeChange}
                                />
                                다음 / 카카오맵 (KaKao Maps)
                            </label>
                        </S.RadioGroup>
                    </S.FormGroup>
                </S.Card>
            
                    {/* 2.지도 주소 입력 카드 */}
                <S.Card>
                    <S.SectionTitle>2. 지도 정보 입력 </S.SectionTitle>

                    {/* 친절한관리자용 안내문구 */}
                    <S.BottomInfo style={{flexDirection:"column", padding:"10px",marginBottom:"10px"}}>
                        <strong style={{marginBottom:"20px"}}>
                            <span style={{color:"red"}}>*</span>
                            지도 url 입력 방법</strong> 
                        {mapType === 'google' ? (
                            <span>구글 맵에서 
                                <strong>[지도퍼가기]</strong>
                                 탭 클릭 HTML 복사 후 
                                <strong> src=" " </strong>
                                안의 주소만 추출해서 넣어주세요
                            </span>
                        ): (
                            <span>카카오 맵은
                                <strong>[위도, 경도]</strong>
                                를 쉼표로 구분 하여 입력해 주세요<br/>
                                (노원 그린컴퓨터 아카데미 예시:
                                <strong>37.65651, 127.0631</strong>)
                            </span>
                        )}
                    </S.BottomInfo>

                    <S.Input
                    type="text"
                    value={mapValue}
                    onChange={e=>setMapValue(e.target.value)}
                    placeholder={mapType==='google' 
                        ? '예) https://www.google.com/maps/embed?pb=...'
                        : '예) 37.65651, 127.0631'}
                    // placeholder="예) https://www.google.com/maps/embed?pb=..."
                    />
                </S.Card>

                <S.Card>
                    <S.SectionTitle> 3. 지도 미리 보기</S.SectionTitle>
                    <S.MapPreview>
                        {mapType === 'google' && mapValue &&  (
                            <iframe
                            src={mapValue} 
                            width="100%"
                            height="100%"
                            style={{border:0}}
                            allowFullScreen={true}
                            loading="lazy"
                            >  
                            </iframe>
                        )}
                        {mapType === 'daum' && (
                            <div
                            ref={kakaoMapRef}
                            style={{
                            width:"100%", height: "100%",
                            display: mapValue? 'block' : 'none'}}
                            />
                        )}
                        {!mapValue && (
                            <div style={{ 
                                position: "absolute", 
                                top:"50%", left:'50%',
                                transform:'translate(-50%, -50%)',
                                color:"#888",
                                }}>
                                정보를 입력하면 지도가 나타납니다//?둥둥떠다녀
                            </div>
                        )}
                        
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
