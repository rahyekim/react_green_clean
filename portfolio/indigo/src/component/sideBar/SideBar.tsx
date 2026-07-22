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
                    <i className="fas fa-laugh-wink"></i> {/*fontawesome아이콘*/}
                </div>
                    {/* right 브랜드text자리 */}
                <div className="sidebar-brand-text mx-3">
                    Admin<sup>2</sup>
                </div>
            </SideBarBrand>

            <Divider className="my-0"/>

            <NavItem className="active">
                <NavLink href="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
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