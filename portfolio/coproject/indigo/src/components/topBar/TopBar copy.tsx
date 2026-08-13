import React, { useState, useEffect } from "react"
import * as S from "./TopBar.styles"
import { useNavigate } from "react-router-dom";

import profileImage from '../../assets/images/joinBg.png'

export const TopBar:React.FC = ()=>{

    //게으른 초기화(Lazy Initialization)
    const [userName, setUserName]=useState(()=>{
        const name =localStorage.getItem("userName");
        return name || "Guest";
    })
    // const [userName, setUserName] =useState('Guest');
    const navigate = useNavigate();

    //'Guest'로 떴다가 이름이 바뀌는 깜빡임 발생->게으른초기화 추천
    // useEffect(()=>{
    //     const name = localStorage.getItem('userName');
    //     if(name){
    //         setUserName(name);
    //     }
    // },[])
    //🔍검색어 상태
    const [searchTerm, setSearchTerm]=useState("");

    //🔍검색 버튼을 눌렀을때 실행되는 함수

    const handleSearch = async()=>{
        if(!searchTerm.trim()){
            alert('검색어를 입력해주세요')
            return;
        }

        navigate(`/search?q=${searchTerm}`)
    }
    
    const handlekeyPress = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            e.preventDefault(); //⭐브라우저새로고침 방지
            handleSearch();
        }
    }
    //로그아웃
    const handleLogout = ()=>{
        localStorage.removeItem('uerName')
        navigate('/login')
    }

    return(
        <>
        <S.TopBarContainer 
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
            <S.TopBarSearch
            className="d-none d-sm-inline-block form-inline my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <input type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    value={searchTerm}
                    onChange={e=>setSearchTerm(e.target.value)}
                    onKeyDown={handlekeyPress}
                    />
                    <div className="input-group-append">
                        <button 
                        type="button"//⭐
                        className="btn btn-primary"
                        onClick={handleSearch}>
                            <i className="fas fa-search fa-sm"></i>
                        </button>
                    </div>
                </div>
            </S.TopBarSearch>
             {/*탑바 navbar */}
            <S.TopBarNavBar className="ml-auto">
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
            </S.TopBarNavBar>
        </S.TopBarContainer>
        </>
    )
}

/* 

topbarcontainer
├ 토글button
├ search창(input,버튼)
└ nav li>a>img,span


*/
