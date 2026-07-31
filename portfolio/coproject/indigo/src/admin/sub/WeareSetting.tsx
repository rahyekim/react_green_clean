import { useState, useEffect } from "react";
import axios from 'axios'

import { Layout } from "../../component/layout/Layout";
import * as S from "../css/sub.styled"

interface FeatureItem{
    id: number;
    icon:string;
    title: string;
    description: string;
}
export default function WeareSetting (){
    
    //상단: 큰제목, 설명글
    const [mainTitle, setMainTitle] =useState('WE ARE')
    const [mainDescription, setMainDescription] =useState('')
    //하단: 4개의 아이콘 박스들을 담아둘 [배열] 상태
    const [feature, setFeature]=useState<FeatureItem[]>([]);

    /*
    관리자가 선택할 수 있는 아이콘 목록을 미리 만들어 둠
     */

    const iconOptions = [
        {value: 'fas fa-home', label: '집(Home)'},
        {value: 'fas fa-users', label: '사람들(Users/Team)'},
        {value: 'fas fa-th-large', label: '그리드(Work)'},
        {value: 'fas fa-pen', label: '펜(Blog)'},
        {value: 'fas fa-envelope', label: '편지봉투(Contact)'},
        {value: 'fas fa-check', label: '체크마크(Check)'},
    ]

    useEffect(()=>{

        const fetchWeareData = async()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/settings/weare');
                
                setMainTitle(res.data.mainTitle);
                setMainDescription(res.data.mainDescription);
                setFeature(res.data.feature);

            }catch(err){
                console.error("우리는 설정 데이터 불러오기 실패: ",err)
            }
        }
        fetchWeareData();
    },[])
    
    //새로운특징박스 추가하는 함수
    const handleAddFeature = () => {

        const newFeature: FeatureItem = {
            id: Date.now(),
            icon: "fas fa-home",
            title: "",
            description: "",
        }

        setFeature(prev=> ([
            ...prev,
            newFeature
        ]))
    }
    
    //특정 특징 박스 삭제 
    const handleRemoveFeature = (id:number) => {
        setFeature(prevFt => (
            prevFt.filter(ft=> ft.id !== id)
        ))
    };

    const hadnleUpdateFeature = (id:number, field:'icon'|'title'|'description', value:string) => {
        setFeature(prevfts=>(
            prevfts.map(ft=>(
                ft.id === id ? {...ft, [field]:value} : ft
            ))
        ))
    };

    const handleSave = async()=>{

        const settingsData = {
            mainTitle, mainDescription, feature
        }
        try{
            await axios.post('http://localhost:5000/api/settings/weare',settingsData)
            console.log("저장된 데이터", settingsData)
            alert("we are 설정이 성공적으로 저장")
        }catch(err){
            console.error("설정 저장 실패: ", err)
            alert("we are 설정 저장 실패")
        }
    }
    
    return(
        <>
        <Layout>
        <S.PageWrapper>
            <S.PageTitle>WE ARE Section 환경 설정</S.PageTitle>
            <S.Card>
                <S.SectionTitle>1.메인 타이틀 및 설명 관리</S.SectionTitle>
                <S.FormGroup>
                    <label>메인 큰 제목 </label>
                        <S.Input
                        type="text"
                        value={mainTitle}
                        onChange={e=>setMainTitle(e.target.value)}
                        placeholder="예) WE ARE"
                        />
                </S.FormGroup>
                <S.FormGroup>
                    <label>우측 메인 설명글</label>
                        <S.Input
                        type="text"
                        value={mainDescription}
                        onChange={e=>setMainDescription(e.target.value)}
                        placeholder="예)skz hyunjin awesome!"
                        />
                </S.FormGroup>
            </S.Card>

             <S.Card>
                <S.SectionTitle>2.하단 아이콘 항목 관리</S.SectionTitle>

                {feature.map((item,idx)=>(
                    <div key={item.id}
                    style={{
                        borderBottom:'2px dashed #eee',
                        paddingBottom:'15px', marginBottom:"15px"
                        }}>
                        <div className="mx-3"
                         style={{fontWeight:'bold', color:"#888", minWidth:"70px"}}>
                            <span>항목{idx+1}</span>
                            {/* 🌟 아이콘 셀렉트(드롭다운) 박스 */}
                            <select 
                            className="mx-3"
                            value={item.icon}
                            onChange={e=>hadnleUpdateFeature(item.id, 'icon', e.target.value)}
                            style={{
                                padding:'8px', border:'1px solid #ccc',
                                borderRadius:'15px'}}
                            >
                                {iconOptions.map(opt=> (
                                    <option key={opt.value}
                                    value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                             
                             <S.Input
                             style={{width:"200px", marginRight:"20px"}}
                                type="text"
                                value={item.title}
                                onChange={e=>hadnleUpdateFeature(item.id, 'title', e.target.value)}
                                placeholder="타이틀 입력해주세요"
                                />
                            <S.Button
                            variant="danger"
                            onClick={()=> handleRemoveFeature(item.id)}
                            >삭제</S.Button>

                        </div>
                        <div>
                            <S.Input
                            type="text"
                            value={item.description}
                            onChange={e=>hadnleUpdateFeature(item.id, 'description', e.target.value)}
                            placeholder="설명 입력해주세요"
                            />
                        </div>
                 </div>
                ))}

                {/* 새로운항목 추가버튼 */}
                <div className="">
                    <S.Button
                    variant="success"
                    onClick={handleAddFeature}
                    >+ 아이콘 항목 추가</S.Button>
                </div>
            </S.Card>
            <S.SaveBtnWrap>
                <S.Button
                variant="primary"
                onClick={handleSave}
                >설정 저장</S.Button>
            </S.SaveBtnWrap>
        </S.PageWrapper>
        </Layout>
        </>
    )
}



/*
CREATE TABLE if NOT EXISTS weare_main(
id INT PRIMARY KEY DEFAULT 1,
main_title VARCHAR(100) DEFAULT 'WE ARE',
main_description text  
);

CREATE TABLE if NOT EXISTS weare_feature(
id INT AUTO_INCREMENT PRIMARY key,
icon_class VARCHAR(50) NOT NULL,
title VARCHAR(100) NOT NULL,
DESCRIPTION text
);

 */