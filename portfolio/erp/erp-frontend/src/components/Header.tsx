'use client'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

import * as S from '@/assets/css/HeaderFooter.style';
// import { Button } from '@/assets/css/Common.style';
import Button from '@/ui/Button';

const NAV_MENUS = [
  { href: '/production', label: '생산관리' },
  { href: '/material', label: '자재관리' },
  { href: '/quality', label: '품질관리' },
  { href: '/equipment', label: '설비관리' },
]

export default function Header() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState('');

  const router = useRouter();

  // 🌟 브라우저가 렌더링을 마친 후에 안전하게 localStorage 접근
  useEffect(() => {
    const firstName = localStorage.getItem('name');
    if (firstName) setUsername(firstName);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen( prev => !prev);
  };
  
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem("name");

    //axios요청시 헤더에 토큰이 들어가지 않도록 기본헤더제거
    delete axios.defaults.headers.common['Authorization'];

    alert('로그아웃되었습니다');
    router.push('/');
  }

  return (
    <S.HeaderContainer>
      <S.Logo>Smart MES</S.Logo>

      {/* 데스크탑 네비게이션 */}
      <S.DesktopNav>
        {NAV_MENUS.map(menu=>(
          <S.NavLink key={menu.href} href={menu.href}
          >{menu.label}</S.NavLink>
        ))}
      </S.DesktopNav>

      {/* 데스크탑 유저 섹션 */}
      <S.UserSection>
        {username && <span>{username}님 환영합니다</span>}
    
        <Button
        variant='danger'
        size='sm'
        onClick={handleLogout}
        >로그아웃</Button>
      </S.UserSection>

      {/* 모바일 햄버거 버튼 */}
      <S.MobileMenuToggle onClick={toggleMenu}>
        {isMobileMenuOpen ? "✕" : "☰"}
      </S.MobileMenuToggle>

      {/* 모바일 드롭다운 메뉴 */}
      <S.MobileNav $isOpen={isMobileMenuOpen}>
        {NAV_MENUS.map(menu=>(
          <Link 
          key={menu.href}
          href={menu.href}
          onClick={()=>setIsMobileMenuOpen(false)}
          >{menu.label}</Link>
        ))}
        <Link 
        href="/mypage" 
        onClick={()=>setIsMobileMenuOpen(false)}
        style={{ color: "#93c5fd" }}
        >내 정보</Link>
        <span 
        onClick={()=>{
          setIsMobileMenuOpen(false);
          handleLogout();
        }} 
        style={{ color: "#fca5a5" }}
        >로그아웃</span>
      </S.MobileNav>
    </S.HeaderContainer>
  );
};
