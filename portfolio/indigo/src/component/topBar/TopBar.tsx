import React from "react"
import { TopBarContainer,TopBarNavBar,TopBarSearch } from "./TopBar.styles"

export const TopBar:React.FC = ()=>{

    return(
        <>
        <TopBarContainer 
        className="navbar navbar-expand navbar-light topbar static-top">
            
            {/*사이드바 토글(mobile) */}
            <button className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
            </button>
        
        {/*탑바검색창🔍 d-none모바일엔 안보이다가 태블릿부터(sm 크기(576px 이상)부터) 보임 
        form 내부요소들을 가로배치(inline)
        
        my-2 작은 화면에서는 검색창이 줄바꿈될 수 있어서 위아래 여백을 주고,
        my-md-0 큰 화면에서는 navbar 높이에 맞춰서 딱 맞추는 겁니다.
        mw-100 (max-width: 100%)  부모보다 커지지 마
        */}
            <TopBarSearch
            className="d-none d-sm-inline-block form-inline my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <input type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary">
                            <i className="fas fa-search fa-sm"></i>
                        </button>
                    </div>
                </div>
            </TopBarSearch>
             {/*탑바 navbar */}
            <TopBarNavBar className="ml-auto">
            {/* 유저 정보
            li 메뉴하나 > a 클릭영역 (span 유저이름, 프로필사진)
         */}
                <li className="nav-item dropdown no-arrow">
                    <a href="#"
                    className="nav-link dropdown-toggle"
                    id="userDropdown">
                        <span
                        className="mr-2 d-none d-lg-inline text-gray-600 small">
                            Douglas McGee
                        </span>
                        <img 
                        src="/img/undraw_profile.svg"
                        className="img-profile rounded-circle"/>
                    </a>
                </li>
            </TopBarNavBar>
        </TopBarContainer>
        </>
    )
}

/* 

topbarcontainer
├ 토글button
├ search창(input,버튼)
└ nav li>a>img,span


*/
