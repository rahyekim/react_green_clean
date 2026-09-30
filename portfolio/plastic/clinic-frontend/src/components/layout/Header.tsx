'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import * as S from './Header.styles'
import GlobeIcon from "../icons/GlobeIcon"
import UserIcon from "../icons/UserIcon"

interface MenuItem {
    id: number;
    name: string;
    url: string;
}

export default function Header() {
    const [logoType, setLogoType] = useState<'TEXT' | 'IMAGE'>('TEXT');
    const [logoText, setLogoText] = useState<string>("Ahn's");
    const [logoFileName, setLogoFileName] = useState<string>('');
    const [menus, setMenus] = useState<MenuItem[]>([]); 

    // 톤앤매너 상태
    const [themeColor, setThemeColor] = useState<string>('#fecbec');
    const [isDark, setIsDark] = useState<boolean>(false);

    useEffect(() => {
        const fetchNavSettings = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/admin/nav')
                if (res.data.success) {
                    const dbData = res.data.data;
                    if (dbData.LOGO_TYPE) setLogoType(dbData.LOGO_TYPE);
                    if (dbData.LOGO_TEXT) setLogoText(dbData.LOGO_TEXT);
                    if (dbData.LOGO_FILE) setLogoFileName(dbData.LOGO_FILE);
                    if (dbData.MENUS && dbData.MENUS !== '[]') {
                        setMenus(JSON.parse(dbData.MENUS))
                    } else {
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
            } catch (err) {
                console.error('헤더 네비설정 로드실패:', err);
            }
        }
        fetchNavSettings();
        fetchThemeSetting();
    }, [])

    const fetchThemeSetting = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/admin/tone')
            if (res.data.success) {
                const dbData = res.data.data;
                // 관리자 설정에 따른 메인 컬러 및 다크모드 지정
                setThemeColor(dbData.PRIMARY_TONE === 'PINK' ? '#e83e8c' : '#4e73df');
                setIsDark(dbData.IS_DARK_MODE === 'Y');
            }
        } catch (err) {
            console.error('테마설정 로드실패:', err);
        }
    }

    // 💡 다크모드에 따른 배경색과 글자색 변수 (일관성 유지)
    const bgColor = isDark ? "#121212" : "#ffffff";
    const textColor = isDark ? "#f1f1f1" : "#222222";
    const borderColor = isDark ? "#333333" : "#eaeaea";

    return (
        <S.HeaderWrapper style={{ backgroundColor: bgColor, color: textColor, borderBottom: `1px solid ${borderColor}` }}>
            <S.HeaderInner>
                {/* 로고 영역 */}
                <S.LogoGroup>
                    <Link href='/'>
                        {logoType === 'TEXT' ? (
                            <S.Logo style={{ color: themeColor }}>{logoText}</S.Logo>
                        ) : (
                            <S.LogoImg src={`http://localhost:4000/images/${logoFileName}`} alt="성형외과로고" />
                        )}
                    </Link>
                </S.LogoGroup>

                {/* 메인 네비게이션 영역 */}
                <S.NavGroup>
                    {menus.map((menu, idx) => (
                        <Link href={menu.url || '/'} key={menu.id}>
                            <S.NavItem 
                            $active={idx === 1}
                            $themeColor={themeColor}      
                            $isDark={isDark}             
                            >
                                {menu.name}
                            </S.NavItem>
                        </Link>
                    ))}
                </S.NavGroup>

                {/* 유틸리티 영역 */}
                <S.UtilGroup>
                    <S.DesktopOnly>
                        <S.PhoneButton 
                            href="tel:02-932-2222" 
                            style={{
                                backgroundColor: isDark ? '#1e1e1e' : '#f8f9fa',
                                borderColor: borderColor,
                                color: textColor
                            }}
                        >
                            TEL.<span style={{ color: themeColor }}>02.932.2222</span>
                        </S.PhoneButton>

                        <S.CtaButton 
                            style={{ backgroundColor: themeColor, color: '#fff', border: 'none' }}
                        >
                            상담예약
                        </S.CtaButton>

                        <S.IconButton 
                            style={{
                                backgroundColor: isDark ? '#1e1e1e' : '#f8f9fa',
                                borderColor: borderColor,
                                color: textColor
                            }} 
                            aria-label="Language"
                        >
                            <GlobeIcon />
                        </S.IconButton>

                        {/* Link 컴포넌트 위치를 아이콘 밖이거나 올바르게 정돈 */}
                        <Link href='/register/terms'>
                            <S.IconButton 
                                aria-label="My page" 
                                style={{
                                    backgroundColor: isDark ? '#1e1e1e' : '#f8f9fa',
                                    borderColor: borderColor,
                                    color: textColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <UserIcon />
                            </S.IconButton>
                        </Link>
                    </S.DesktopOnly>

                    {/* 모바일 버튼: 하드코딩된 핑크(#fecbec) 제거하고 themeColor나 다크모드 테두리로 통일 */}
                    <S.MobilePillButton style={{ backgroundColor: themeColor, color: '#fff', borderColor: themeColor }}>
                        Men's
                    </S.MobilePillButton>
                    <S.MobilePillButton style={{ backgroundColor: themeColor, color: '#fff', borderColor: themeColor }}>
                        breast
                    </S.MobilePillButton>
                    
                    <S.HamburgerButton aria-label="Mobile Menu">
                        <span style={{ backgroundColor: textColor }}></span>
                        <span style={{ backgroundColor: textColor }}></span>
                        <span style={{ backgroundColor: textColor }}></span>
                    </S.HamburgerButton>
                </S.UtilGroup>
            </S.HeaderInner>
        </S.HeaderWrapper>
    )
}