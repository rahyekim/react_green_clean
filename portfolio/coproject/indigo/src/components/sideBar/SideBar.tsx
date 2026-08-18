import React, { useState } from "react"
import {
    SideBarContainer,
    SideBarBrand,
    NavLink,NavItem,
    Divider, 
    SidebarWrapper,
    ToggleButton} from "./SideBar.styles"



export const SideBar:React.FC = ()=>{

    const [isOpen, setIsOpen]=useState(true);

    //버튼 클릭시 상태를 반대로 바꾸는 함수

    const ToggleSidebar = ()=>{
        setIsOpen(!isOpen);
    }

    return(
        <>
    <SidebarWrapper $isOpen={isOpen}>
        <SideBarContainer $isOpen={isOpen} className="sidebar sidebar-dark accordion">
            {/*메뉴 접기/펴기 동작 연결용 */}
            <SideBarBrand href="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    {/*left 아이콘자리, 아이콘 -15도 회전 */}
                    <i className="fas fa-bell"></i> {/*fontawesome아이콘*/}
                </div>
                    {/* right 브랜드text자리 */}
                <div className="sidebar-brand-text mx-3">
                    Admin<sup>2</sup>
                </div>
            </SideBarBrand>

            <Divider className="my-0"/>

            <NavItem className="active">
                <NavLink href="/admin">
                {/* <i className="fas fa-fw fa-tachometer-alt"></i> */}
                    <i className="fas fa-fw fa-home me-2"></i>
                    <span>DashBoard</span>
                </NavLink>
            </NavItem>

            <Divider className="my-0 mb-2"/>

            {/* 2.회원리스트링크추가 */}
             <NavItem className="active">
                <NavLink href="/userlist">
                    <i className="fas fa-fw fa-users me-2"></i>
                    <span>User List</span>
                </NavLink>
            </NavItem>

            {/* 3.헤더 세팅(로고 ,메뉴) 변경 페이지 */}
            <NavItem className="active">
                <NavLink href="/hdsetting">
                    <i className="fas fa-fw fa-bars me-2"></i>
                    <span>Header 설정</span>
                </NavLink>
            </NavItem>
             <NavItem className="active">
                <NavLink href="/bnsetting">
                    <i className="fas fa-fw fa-cog me-2"></i>
                    <span>Banner 설정</span>
                </NavLink>
            </NavItem>

             <NavItem className="active">
                <NavLink href="/wesetting">
                    <i className="fas fa-fw fa-person me-2"></i>
                    <span>WeAre 설정</span>
                </NavLink>
            </NavItem>
           
             <NavItem className="active">
                <NavLink href="/wksetting">
                    <i className="fas fa-fw fa-briefcase me-2"></i>
                    <span>Work 설정</span>
                </NavLink>
            </NavItem>

             <NavItem className="active">
                <NavLink href="/blogsetting">
                    <i className="fas fa-fw fa-edit me-2"></i>
                    <span>Blog 설정</span>
                </NavLink>
            </NavItem>

             <NavItem className="active">
                <NavLink href="/contsetting">
                    <i className="fas fa-fw fa-phone me-2"></i>
                    <span>Contact 설정</span>
                </NavLink>
            </NavItem>

              <NavItem className="active">
                <NavLink href="/mapsetting">
                    <i className="fas fa-fw fa-map me-2"></i>
                    <span>Map 설정</span>
                </NavLink>
            </NavItem>

            <Divider className="mt-2"/>
        </SideBarContainer>
        
        <ToggleButton onClick={ToggleSidebar}>
            <i className={isOpen ? 'fas fa-chevron-left': 'fas fa-chevron-right'}></i>
        </ToggleButton>
    </SidebarWrapper>
        </>
    )
}



/*
sidebarContainer : d-flex flex-direction:col height100%
├ sidebarbarnd> i, span z-index:1 height:70px
├ navitem(li)>navlink(a)>i 
└ divider hr

 */