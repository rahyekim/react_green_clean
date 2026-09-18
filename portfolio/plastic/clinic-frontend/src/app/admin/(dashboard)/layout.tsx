'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as S from '@/assets/css/admin/Admin.common';
import Popup from "@/components/ui/Popup";
import usePopup from "@/hooks/usePopup";

import { 
    FiMessageSquare, 
    FiFeather, 
    FiCompass, 
    FiLayers, 
    FiRadio, 
    FiCamera, 
    FiAward, 
    FiVideo, 
    FiShield, 
    FiLayout, 
    FiUsers, 
    FiClipboard, 
    FiLogOut,
    FiNavigation
} from "react-icons/fi"

export default function AdminLayout({children}:{children:React.ReactNode}){

    const router= useRouter();
    const {popupConfig, openPopup, closePopup}=usePopup();

    const [isCollapsed, setIsCollapsed]=useState(false);

    const handleLogout = ()=>{
        openPopup('알림','로그아웃 하시겠습니까?',()=>confirmLogout())
    }

    //팝업에서 확인을 눌렀을때 진짜 로그아웃 처리
    const confirmLogout = ()=>{
        //🍪 쿠키 삭제 🚀
        document.cookie = 'admin_token=; path=/; max-age=0;'
        router.push('/admin');
    }

    return(
        <>
        <S.Container>
            {/* 좌측 사이드바 */}
            <S.Sidebar $isCollapsed={isCollapsed}>
                <S.SidebarBrand 
                    $isCollapsed={isCollapsed}
                    onClick={() => router.push('/admin/root')}
                >
                    {isCollapsed ? 'ADMIN' : 'ADMIN PANEL'}
                </S.SidebarBrand>

                <S.NavItem 
                    $isCollapsed={isCollapsed}
                    onClick={() => router.push('/admin/dashboard')}
                >
                    <FiClipboard size={20} />
                    {!isCollapsed && <span className="text">대시보드</span>}
                </S.NavItem>

                <S.NavItem 
                    $isCollapsed={isCollapsed}
                    onClick={() => router.push('/admin/users')}
                >
                    <FiUsers size={20}/>
                    {!isCollapsed && <span className="text">회원관리</span>}
                </S.NavItem> 

                <S.NavItem 
                    $isCollapsed={isCollapsed}
                    onClick={() => router.push('/admin/boards')}
                >
                    <FiCompass size={20}/>
                    {!isCollapsed && <span className="text">게시판관리</span>}
                </S.NavItem>

                <S.NavItem 
                    $isCollapsed={isCollapsed}
                    onClick={() => router.push('/admin/consult')}
                >
                    <FiMessageSquare size={20} />
                    {!isCollapsed && <span className="text">상담신청관리</span>}
                </S.NavItem>

                <S.NavItem 
                    $isCollapsed={isCollapsed}
                    onClick={() => router.push('/admin/tone')}
                >
                    <FiFeather size={20} />
                    {!isCollapsed && <span className="text">톤앤매너관리</span>}
                </S.NavItem>

                <S.NavItem 
                    $isCollapsed={isCollapsed}
                    onClick={() => router.push('/admin/nav')}
                >
                    <FiNavigation size={20} />
                    {!isCollapsed && <span className="text">네비게이션관리</span>}
                </S.NavItem>

                <S.NavItem 
                    $isCollapsed={isCollapsed}
                    onClick={() => router.push('/admin/popup')}
                >
                     <FiLayers size={20} />
                    {!isCollapsed && <span className="text">팝업관리</span>}
                </S.NavItem>

                <S.NavItem 
                    $isCollapsed={isCollapsed}
                    onClick={() => router.push('/admin/new')}
                >
                   <FiRadio size={20} />
                    {!isCollapsed && <span className="text">뉴스티커관리</span>}
                </S.NavItem>

                <S.NavItem 
                    $isCollapsed={isCollapsed}
                    onClick={() => router.push('/admin/selfi')}
                >
                    <FiCamera size={20} />
                    {!isCollapsed && <span className="text">셀피관리</span>}
                </S.NavItem>

                <S.NavItem 
                    $isCollapsed={isCollapsed}
                    onClick={() => router.push('/admin/ranking')}
                >
                     <FiAward size={20} /> 
                    {!isCollapsed && <span className="text">이벤트랭킹관리</span>}
                </S.NavItem>

                <S.NavItem 
                    $isCollapsed={isCollapsed}
                    onClick={() => router.push('/admin/vlog')}
                >
                    <FiVideo size={20} />
                    {!isCollapsed && <span className="text">블로그관리</span>}
                </S.NavItem>

                <S.NavItem 
                    $isCollapsed={isCollapsed}
                    onClick={() => router.push('/admin/safety')}
                >
                    <FiShield size={20} />
                    {!isCollapsed && <span className="text">안전마취관리</span>}
                </S.NavItem>

                <S.NavItem 
                    $isCollapsed={isCollapsed} 
                    onClick={() => router.push('/admin/footer')}
                >
                    <FiLayout size={20} /> 
                    {!isCollapsed && <span>푸터관리</span>}    
                </S.NavItem>

                <S.ToggleWrapper>
                    <S.SidebarToggler
                    onClick={()=>setIsCollapsed(prev=>!prev)}
                    >
                        {isCollapsed ? '▶' : '◀'}
                    </S.SidebarToggler>
                </S.ToggleWrapper>

            </S.Sidebar>

            <S.ContentWrapper>
                <S.Topbar>
                    <S.TopbarBrand>
                        <span>성형외과 관리 시스템</span>
                    </S.TopbarBrand>

                    <S.TopbarRight>
                        <S.TopbarUser>최고관리자님</S.TopbarUser>
                        <S.LogoutButton
                        onClick={handleLogout}
                        >
                            <FiLogOut size={16}/>
                            로그아웃
                        </S.LogoutButton>
                    </S.TopbarRight>
                </S.Topbar>
                <S.Main>
                    {children}
                </S.Main>
            </S.ContentWrapper>
            
        </S.Container>

        <Popup
        isOpen={popupConfig.isOpen}
        onClose={closePopup}
        title={popupConfig.title}
        onConfirm={popupConfig.onConfirm}
        >{popupConfig.message}</Popup>
        </>
    )
}