import { useState,useEffect } from "react";
import axios from "axios";

import * as D from '../DashBoard.styled';
import * as S from '../css/sub.styled';
import { Layout } from "../../component/layout/Layout";
import { data } from "react-router-dom";

//메뉴 데이터 타입정의

interface MenuItem {
    id: number;
    title: string;
    link: string;
}


export const HeaderSetting = ()=>{

    //1.로고타입설정('text'또는 'img')
    const [logoType, setLogoType] = useState<'text'| 'img'>("text");
    const [logoText, setLogoText] = useState('INDIGO');
    const [logoImg, setLogoImg]= useState("/assets/images/header/logo.png")

    //서브메뉴 설정
    const [menus, setMenus] = useState<MenuItem[]>([
        {id:1 , title:'HOME', link: '/'},
        {id:2 , title:'WE ARE', link: '/weare'},
        {id:3 , title:'WORK', link: '/work'},
        {id:4 , title:'BLOG', link: '/blog'},
        {id:4 , title:'CONTACT US', link: '/contact'},
    ]);

    //함수 메뉴관리 로직  ????
    const handleAddmenu = (field: 'title' | 'link', value: string)=>{
        const newMenu:MenuItem = {
            id : Date.now(),
            title: value,
            link: value,
        };

        setMenus(prevMenus=>[
            ...prevMenus,
            newMenu
        ])
    }

    //특정 메뉴 삭제 
    const handleRemoveMenu = (id :number)=>{
        setMenus(prevMenus=> (
            prevMenus.filter(menu=>
                menu.id !== id )
        ));
    }
    //교체

    const handleChangeMenu = (id : number, field: 'title' | 'link', value:string)=>{
        setMenus(prevMenus=> (
            prevMenus.map(menu=>
                menu.id === id ? {...menu, [field]: value} : menu ))
        );
    }


    //설정 저장 함수 로직
    const handleSave = async()=>{

        const settingData ={
            logoType, logoText, logoImage: logoImg, menus
        }
        try{
            const res= await axios.post(
                "http://localhost:5000/api/settings/header",settingData);
            
            console.log("저장될 데이터: ", settingData);
            alert("header 설정이 성공적으로 저장 되었슴다");

        }catch(err){
            alert("header설정 저장중 에러 발생")
            console.error("header 설정 저장 실패: ", err);

        }
    }


   
    return(
    <>
    <Layout>
        <S.PageWrapper>
            
            <S.PageTitle>헤더(상단바) 환경 설정</S.PageTitle>

            {/* 로고 설정 섹션 */}
            <S.Card>
                <S.SectionTitle>1. 로고설정</S.SectionTitle>
                <S.FormGroup>
                    <label>로고 노출 방식</label>
                    <S.RadioGroup>
                        <label>
                            <input
                            type="radio"
                            name="logoType"
                            value="text"
                            onChange={()=> setLogoType('text')}
                            checked={logoType==='text'}
                            />
                            글씨(text)로고 사용
                        </label>
                        <label>
                            <input
                            type="radio"
                            name="logoType"
                            value="img"
                            onChange={()=> setLogoType('img')}
                            checked={logoType==='img'}
                            />
                            이미지(image)로고 사용
                        </label>
                    </S.RadioGroup>
                </S.FormGroup>

                {/* 선택한 라디오 타입에 따라 입력폼이 다르게 보임 */}
                {logoType === "text" && (
                    <S.FormGroup>
                        <label>글씨 로고 텍스트</label>
                        <S.Input
                        type="text"
                        value={logoText}
                        onChange={e=>setLogoText(e.target.value)}
                        placeholder="예) Indigo"
                        required
                        />
                    </S.FormGroup>
                )}
                {logoType === "img" && (
                    <S.FormGroup>
                        <label>이미지 로고 URL (또는 파일 경로)</label>
                        <S.Input
                            type="text"
                            value={logoImg}
                            onChange={e=>setLogoImg(e.target.value)}
                            placeholder="예) /assets/images/header/logo.png"
                            required
                            />
                     </S.FormGroup>
                )}
            </S.Card>

            <S.Card>
                <S.SectionTitle>2. 서브메뉴 설정 섹션</S.SectionTitle>
                    {menus.map(menu=>(
                        <S.MenuRow key={menu.id}>
                            <S.Input
                            type="text"
                            placeholder="메뉴명 예) we are"
                            value={menu.title}
                            name="title"
                            onChange={(e)=>handleChangeMenu(menu.id, 'title', e.target.value)}
                            />
                            <S.Input
                            type="text"
                            placeholder="메뉴명 예) /indigo"
                            value={menu.link}
                            name="link"
                            onChange={(e)=>handleChangeMenu(menu.id, 'link', e.target.value)}
                            />
                            <S.Button 
                            onClick={()=>handleRemoveMenu(menu.id)}
                            variant="danger">
                            삭제
                            </S.Button>
                        </S.MenuRow>
                    ))}

                    <S.MenuRow>
                     {/* <div style={{marginTop:"15px"}}>
                        <input type="text" onChange={} />
                        <input type="text" onChange={} />

                        <S.Button
                        variant="success"
                        onClick={()=>handleAddmenu(title,link)}
                        >+메뉴 항목 추가
                        </S.Button>
                    </div>  */}

                    </S.MenuRow>

                   
            </S.Card>
            
                {/* 최종저장버튼 */}
                <S.SaveBtnWrap>
                    {/* 메뉴항목추가 누르면 ->위에 input창이 열리게...하고싶다..*/}
                    <S.Button
                    variant="primary"
                    style={{padding:'10px 30px', fontSize:"16px"}}
                    onClick={handleSave}
                    >설정 저장 완료
                    </S.Button>
                </S.SaveBtnWrap>
            
            
            
        </S.PageWrapper>
     



    </Layout>
    </>
)};

/*


 //이미지 선택했을 때 보여줄 이미지 경로
    const logoImgUrl = '../../assets/images/header/logo.png';

    //우측 서브메뉴 데이터 배열
    const menuItems = [ 
        {id:1 , title:'HOME', link: '/'},
        {id:2 , title:'WE ARE', link: '/weare'},
        {id:3 , title:'WORK', link: '/work'},
        {id:4 , title:'BLOG', link: '/blog'},
        {id:4 , title:'CONTACT US', link: '/contact'},
    ]

   <S.HeaderWrapper>
            <S.LogoArea>
                <a href="/">
                {logoType === 'text' ? (
                    <S.TextLogo>Indigo</S.TextLogo>
                ): (
                    <S.ImgLogo src={logoImgUrl} alt="indigo logo"/>
                )}
                </a>
            </S.LogoArea>
        </S.HeaderWrapper>
            
*/

/*
CREATE TABLE header_setting (
id INT PRIMARY KEY DEFAULT 1,
logo_type VARCHAR(20) DEFAULT 'text',
logo_text VARCHAR(100) DEFAULT 'indigo',
logo_image VARCHAR(255) DEFAULT '/assets/images/header/logo.png' 
);

CREATE TABLE if NOT exists header_menus(
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(100) NOT NULL,
link VARCHAR(100) NOT NULL
);



 */