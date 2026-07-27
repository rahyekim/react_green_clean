import React, { useState, useEffect } from "react"
import { TopBarContainer,TopBarNavBar,TopBarSearch } from "./TopBar.styles"
import { useNavigate } from "react-router-dom";

import profileImage from '../../assets/images/joinBg.png'

export const TopBar:React.FC = ()=>{
    //1.화면에 보여줄 사용자 이름 상태를 만듦(기본값:Guest)
    
    const [userName, setUserName]=useState('Guest');
    const navigate = useNavigate();

    //2.화면이 처음 켜질때 딱 한번만 실행
    useEffect(()=>{
        //로그인할때 저장해둔 'userName'을 브라우저저장소(localstorage)에서 꺼내옴
        const storeName = localStorage.getItem('userName')
        //만약 저장된 이름이 있다면. 상태를 그 이름으로 업데이트
        if (storeName){
            setUserName(storeName);
        }
    }, [])

    //로그아웃 버튼 눌렀을때 실행되는 함수
    const handleLogout = ()=>{

        //1.브라우저금고(localstorage)에서 'userName'데이터를 완전히 지움
        localStorage.removeItem('userName'); //토큰도필요...

        //2.로그인 페이지('/login')로 사용자를 이동시킴
        navigate('/login');
    }
    

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
                <li className="nav-item dropdown no-arrow d-flex align-items-center">
                    <a href="#"
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    id="userDropdown"
                    onClick={e=> e.preventDefault()}
                    >
{/* ⭐a태그의 기본 클릭이벤트(페이지최상단으로 올라가는 현상을) 막기위해⭐ */}
                        <span
                        className="mr-2 d-none d-lg-inline text-gray-600 small">
                            {userName}
                        </span>
                        <img 
                        src={profileImage}
                        alt="프로필이미지"
                        className="img-profile rounded-circle"/>
                    </a>

                    {/* 로그아웃버튼 추가 */}
                    <button
                    className="btn btn-sm btn-outline-secondary ml-2"
                    onClick={handleLogout}>로그아웃</button>

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
