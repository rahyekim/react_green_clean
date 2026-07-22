import React from "react"
import { SideBarContainer,SideBarBrand,NavLink,NavItem,Divider } from "./SideBar.styles"
export const SideBar:React.FC = ()=>{


    return(
        <>
        <SideBarContainer className="sidebar sidebar-dark accordion">
            <SideBarBrand href="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i> {/*fontawesome아이콘*/}
                </div>
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