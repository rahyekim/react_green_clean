import { useEffect, useState } from "react";
import axios from "axios";

import * as S from '../css/sub.styled'
import { Layout } from "../../component/layout/Layout";

interface CarouselItem{
    id: number;
    url: string;
}



export default function BannerSetting (){
    
    //--🌟 메인 베너 설정상태 (단일 이미지 vs 캐러셀)
    const [bannerType, setBannerType ]=useState<"single"|'carousel'>("single")
    const [singleBanner, setSingleBanner] = useState('/assets/p-images/slide01.jpg')
    const [carouselBanner, setCarouselBanner] = useState<CarouselItem[]>([
        {id: 1, url: '/assets/images/slide/banner1.jpg'},
        {id: 2, url: '/assets/images/slide/banner2.jpg'},
        {id: 3, url: '/assets/images/slide/banner3.jpg'},
    ])

    // --useEffect() 처음 화면 뜰때 서버에서 기존 설정값 불러오기
    useEffect(()=>{
        const fetchBannerSetting = async()=>{
            try{
            const res = await axios.get('http://localhost:5000/api/settings/banner');
            // 받아온 데이터가 있다면 state 업데이트
            if(res.data){
                setBannerType(res.data.bannerType||"single");
                setSingleBanner(res.data.singleBanner || "/assets/p-images/slide01.jpg");
                if(res.data.carouselBanner && res.data.carouselBanner.length > 0){
                    setCarouselBanner(res.data.carouselBanner);
                }
            }
            }catch(err){
                console.error("배너 설정 불러오기 실패:", err); 
            }
        }
        fetchBannerSetting();
    }, [])

    //---캐러셀 이미지 추가/삭제/수정 로직---

    const handleAddCarouselImg = () =>{

        const newImg: CarouselItem = {
            id: Date.now(),
            url: '',
        }

        setCarouselBanner(prev=>(
            [...prev, newImg]))
    }

    const handleRemoveCarouselImg = (id: number) =>{

        setCarouselBanner(prevImgs=> (
            prevImgs.filter(img=>img.id !== id)
        ));
    }

    const handleUpdateCarouselImg = 
    (id: number, url:string) => {

        setCarouselBanner(prevImgs=>(
            prevImgs.map(img=>(
                img.id === id ? {...img, url: url} : img
            ))
        ));
    }
    //--최종 설정 저장 함수 ---

    const handleSave = async() =>{
        //백엔드로 보낼 데이터 하나의 상자로 포장
        const settingData = {
            bannerType,
            singleBanner,
            carouselBanner
        };

        try{
            await axios.post("http://localhost:5000/api/setting/banner",settingData)
            console.log("저장 데이터: ", settingData)
            alert("배너설정이 성공적으로 저장")

        }catch(err){

            alert("배너 저장 실패")
            console.error("설정 저장중 실패" , err)
        }

    }
    
    return(
        <>
    <Layout>
        <S.PageWrapper>
            <S.PageTitle>메인 배너 환경설정</S.PageTitle>
            <S.Card>
                <S.SectionTitle>1.메인 배너 이미지 설정</S.SectionTitle>

                <S.FormGroup>
                    <label>배너 노출 방식</label>
                    <S.RadioGroup>
                        <label>
                            <S.Input
                            type="radio"
                            name="bannerType"
                            value={singleBanner}
                            checked={bannerType==="single"}
                            onChange={e=>setBannerType("single")}
                            /> 단일 이미지 (1장 고정)
                        </label>
                         <label>
                            <S.Input
                            type="radio"
                            name="bannerType"
                            value={singleBanner}
                            checked={bannerType==="carousel"}
                            onChange={e=>setBannerType("carousel")}
                            /> 슬라이드 캐러셀 (여러장)
                        </label>
                    </S.RadioGroup>
                </S.FormGroup>
                    {bannerType ==='single' && (
                        <S.FormGroup>
                            <label> 메인 이미지 경로</label>
                            <S.Input
                            type="text"
                            value={singleBanner}
                            placeholder="이미지를 url 넣어주세요"
                            onChange={e=>setSingleBanner(e.target.value)}
                            />
                            {/* 입력칸 밑에 띄우는 작은 안내글 */}
                            <small style={{
                                color: "#888", marginTop:"5px"}}>
                                <span style={{color:"red"}}>*</span>
                                메인 화면에 1장의 이미지만 고정으로 노출합니다
                            </small>
                        </S.FormGroup>
                    )}
                    {bannerType === 'carousel' && (
                    <>
                        <label style={{
                            fontWeight:"bold",
                            color: "#555",
                            marginBottom:"8px",
                            display:"block"
                        }}> 캐러셀 이미지 목록</label>
                        
                        {carouselBanner.map((img,index)=>(
                            <S.MenuRow key={img.id}>
                                <span>슬라이드 {index+1}</span>
                                <S.Input
                                type="text"
                                value={img.url}
                                placeholder="이미지 url(예: /assets/images//slide/banner0.jpg)"
                                onChange={e=>handleUpdateCarouselImg(img.id,e.target.value)}
                                />
                                {/* 이행을 지우는 빨간색 삭제 버튼 */}
                                <S.Button
                                variant="danger"
                                onClick={()=>handleRemoveCarouselImg(img.id)}
                                >삭제</S.Button>
                            </S.MenuRow>
                        ))}
                    {/*새로운 빈 입력칸을 한줄 추가 초록버튼 */}
                        <div>
                            <S.Button
                            variant="success"
                            onClick={handleAddCarouselImg}
                            >이미지 추가</S.Button>
                        </div>
                    </>
                        )}
            </S.Card>

            {/* 최종저장버튼 오른쪽정렬*/}
            <S.SaveBtnWrap>
                <S.Button
                variant="primary"
                style={{padding:"10px 30px",fontSize:"16px"}}
                onClick={handleSave}
                > 설정 저장
                </S.Button>
            </S.SaveBtnWrap>
        </S.PageWrapper>

    </Layout>
        </>
    )
}



/*
CREATE TABLE if NOT EXISTS banner_setting(
id INT PRIMARY KEY DEFAULT 1,
banner_type VARCHAR(20) DEFAULT 'single',
single_banner VARCHAR(255) DEFAULT '/assets/p-images/slide01.jpg' 
);

CREATE TABLE if NOT EXISTS carousel_images(
id INT AUTO_INCREMENT PRIMARY key,
url VARCHAR(255) NOT null
);

 */