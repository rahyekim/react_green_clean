import React,{useState,useEffect, useRef} from "react";
import axios from "axios";

//typeScript 전역kakao객체 선언

declare global{
    interface Window{
        kakao:any;
    }
}

const Footer = () => {
    
    //상태관리
    const [mapType, setMapType]=useState<'google'|'daum'>('google');
    const [mapValue, setMapValue]=useState('');
    
    //카카오지도를 담을 영역을 지정하는 참조
    const kakaoMapRef= useRef<HTMLDivElement>(null);

    useEffect(()=>{
        const fetchMapsetting = async()=>{
            try{
                const res= await axios.get('http://localhost:5000/api/settings/map');
                if(res.data){
                    
                    setMapType(res.data.mapType || 'google');
                    setMapValue(res.data.mapUrl || '');
                }
            }catch(err){
                console.error("footer 지도 설정 불러오기 에러", err)
            }
        }
        fetchMapsetting();
    },[])

    useEffect(()=>{
        //카카오맵이 선택되었고,스크립트가있으며, 좌표값이 존재할때만 실행
        if(mapType !=='daum' || !mapValue ) return; 
        
        const drawKakaoMap =()=> {
        if(window.kakao && window.kakao.maps && kakaoMapRef.current){

            const [lat, lng] = mapValue.split(',').map(Number);
            if(!isNaN(lat) && !isNaN(lng)){
                const container = kakaoMapRef.current;
                const options = {
                    center: new window.kakao.maps.LatLng(lat,lng),
                    level: 3 // 확대수준 
                }
                //지도생성
                const map = new window.kakao.maps.Map(container, options);
                //📍마커
                const markerPositon = new window.kakao.maps.LatLng(lat,lng);
                const marker = new window.kakao.maps.Marker({position: markerPositon})
                marker.setMap(map);
            }
        }}
        drawKakaoMap();
    },[mapType,mapValue]);

    //관리자가 아직 설정을 안했을경우 기본 광화문 주소
    const defaultgoogleUrl= 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.111677235935!2d126.97473421573828!3d37.575987879796195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2eaa19c763d%3A0xb28a32722d675764!2z6rSR7ZmU66y4KEd3YW5naHdhbXVuIEdhdGUp!5e0!3m2!1sko!2skr!4v1481946656451'

    return(
        <>
        <footer className="footer">
            {mapType === 'google' ? (
                <iframe 
                src={mapValue? mapValue : defaultgoogleUrl}
                frameBorder="0" 
                allowFullScreen
                width="100%"
                height={450}>
                </iframe>
            ) : (
                // 💡 높이를 명시해주어야 카카오맵이 정상적으로 보입니다!
                <div 
                ref={kakaoMapRef}
                style={{width:'100%', height:'450px'}}
                />
            )}
            <p className="copyrignt">
                INDIGO
            </p>
        </footer>
        
        </>
    )


}

export default Footer;