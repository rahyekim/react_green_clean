'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import * as S from './Header.styles'
import GlobeIcon from "../icons/GlobeIcon"
import UserIcon from "../icons/UserIcon"
interface MenuItem {
    id:number;
    name:string;
    url:string;
}
export default function Header (){

    const [logoType, setLogoType]=useState<'TEXT'|'IMAGE'>('TEXT');
    const [logoText, setLogoText]=useState<string>("Ahn's");
    const [logoFileName, setLogoFileName] = useState<string>('');
    const [menus, setMenus]=useState<MenuItem[]>([]); 

    useEffect(()=>{
         const fetchNavSettings = async()=>{
            try{
            const res = await axios.get('http://localhost:4000/api/admin/nav')
            if(res.data.success){
                const dbData = res.data.data;
                //로고 설정 적용
                if(dbData.LOGO_TYPE) setLogoType(dbData.LOGO_TYPE);
                if(dbData.LOGO_TEXT) setLogoText(dbData.LOGO_TEXT);
                if(dbData.LOGO_FILE) setLogoFileName(dbData.LOGO_FILE);
                if(dbData.MENUS && dbData.MENUS !== '[]'){
                    setMenus(JSON.parse(dbData.MENUS))
                }else{
                    //db에 메뉴가 비어있으면 초기 기본값 세팅
                    setMenus([
                        { id: 1, name: "병원소개", url: "/" },
                        { id: 2, name: "눈성형", url: "/" },
                        { id: 3, name: "코성형", url: "/" },
                        { id: 4, name: "동안성형", url: "/" },
                        { id: 5, name: "쁘띠시술", url: "/" },
                        { id: 6, name: "커뮤니티", url: "/" }
                    ])
                }
            }
            }catch(err){
            console.error('헤더 네비설정 로드실패:', err);
            }
        }
        fetchNavSettings();
    },[])
    return(
        <>
        <S.HeaderWrapper>
            <S.HeaderInner>
                {/* 로고영역 */}
                <S.LogoGroup>
                    <Link href='/'>
                    {logoType === 'TEXT' ? (
                        <S.Logo>{logoText}</S.Logo>
                    ): (
                        <S.LogoImg src={`http://localhost:4000/images/${logoFileName}`} alt="성형외과로고" />
                    )}
                    </Link>
                </S.LogoGroup>

                {/* 메인 네비게이션 영역 */}
                <S.NavGroup>
                {menus.map((menu,idx)=>(
                    <Link href={menu.url || '/'} key={menu.id}>
                        <S.NavItem $active={idx===1}>{menu.name}</S.NavItem>
                    </Link>
                ))}
                </S.NavGroup>

                {/* 유틸리티 영역 */}
                <S.UtilGroup>
                    <S.DesktopOnly>
                        <S.PhoneButton href="tel:02-932-2222">
                            TEL.<span>02.932.2222</span>
                        </S.PhoneButton>
                        <S.CtaButton>상담예약</S.CtaButton>

                        <S.IconButton aria-label="Language">
                            <GlobeIcon/>
                        </S.IconButton>

                        <S.IconButton aria-label="My page">
                            <Link href='/register/terms'>
                                <UserIcon/>
                            </Link>
                        </S.IconButton>
                    </S.DesktopOnly>

                    {/* 모바일 화면일때만 나타나는 요소들 */}
                    <S.MobilePillButton>Men's</S.MobilePillButton>
                    <S.MobilePillButton>breast</S.MobilePillButton>
                    
                    <S.HamburgerButton aria-label="Mobile Menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </S.HamburgerButton>

                </S.UtilGroup>
            </S.HeaderInner>
        </S.HeaderWrapper>
        </>
    )
}