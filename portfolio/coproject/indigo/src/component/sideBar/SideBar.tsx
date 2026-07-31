import React from "react"
import { SideBarContainer,SideBarBrand,NavLink,NavItem,Divider } from "./SideBar.styles"
export const SideBar:React.FC = ()=>{


    return(
        <>
        <SideBarContainer className="sidebar sidebar-dark accordion">
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

            <Divider className="my-0"/>

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
                    <span>헤더nav설정</span>
                </NavLink>
            </NavItem>
             <NavItem className="active">
                <NavLink href="/bnsetting">
                    <i className="fas fa-fw fa-cog me-2"></i>
                    <span>배너 설정</span>
                </NavLink>
            </NavItem>

             <NavItem className="active">
                <NavLink href="/wesetting">
                    <i className="fas fa-fw fa-person me-2"></i>
                    <span>WeAre 설정</span>
                </NavLink>
            </NavItem>

            <Divider/>
        
        </SideBarContainer>
    
        </>
    )
}



/*
sidebarContainer : d-flex flex-direction:col height100%
├ sidebarbarnd> i, span z-index:1 height:70px
├ navitem(li)>navlink(a)>i 
└ divider hr

 */