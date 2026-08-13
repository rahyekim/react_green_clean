import React, { useState, useEffect } from "react"
import * as S from "./TopBar.styles"
import { useNavigate } from "react-router-dom";

import axios from 'axios'
import profileImage from '../../assets/images/joinBg.png';

export const TopBar:React.FC = ()=>{
    //1.화면에 보여줄 사용자 이름 상태를 만듦(기본값:Guest)
    
    //게으른 초기화(Lazy Initialization)
    const [userName, setUserName]=useState(()=>{
        const name =localStorage.getItem("userName");
        return name || "Guest";
    })
    // const [userName, setUserName]=useState('Guest');
    const navigate = useNavigate();

    //🔍검색어 상태
    const [searchTerm, setSearchTerm]=useState('');

    //검색 결과 상태
    const [result, setResult]=useState({users:[], blogs:[], contacts:[]});
    //검색을 한번이라도 했는지 체크하는 상태
    const [hasSearched, setHasSearched]=useState(false);
    /*
    사용자가 처음에 페이지를 켰을 때는 검색 결과를 안 보여주다가, 
    검색 결과 상자의 전원 스위치 //평상시: 전원 OFF (false) 결과창 숨김
    검색 버튼을 눌렀을 때만 밑에 결과창이 툭 튀어나와야 합니다.
     */

    //🔍검색 버튼을 눌렀을때 실행되는 함수
    const handleSearch = async()=>{

        if(!searchTerm.trim()) {
            alert("검색어를 입력해주세요");
            return;
        }

        //⭐ /search 페이지로 이동하면서 주소창에 ?q=검색어 를 붙여서 보냄(쿼리스트링) ⭕
        navigate(`/search?q=${searchTerm}`);
        // setSearchTerm('');

        // try{
        //     //백엔드의 /api/search 주소로 검색어(?q=검색어)를 보냄
        //     const res= await axios.get(`http://localhost:5000/api/search?q=${searchTerm}`); 

        //     setResult(res.data); //결과저장
        //     setHasSearched(true); //검색완료상태로 변경

        // }catch(err){
        //     alert("검색을 가져오는중 오류가 발생하였습니다")
        //     console.error("검색중에 오류발생: ", err);
        // }
    };

    //⌨️ 엔터키를 눌러도 검색이 되도록하는 함수
    const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            e.preventDefault(); //⭐⭐⭐ 이것도 폼제출(submit)처럼 엔터키누르면 브라우저가 새로고침 해줌 ㅋㅋ
            handleSearch();
        }
    }

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
                    <S.TopBarSearchInput 
                    type="text"
                    className="bg-light small"
                    placeholder="Search for..."
                    value={searchTerm}
                    onChange={e=> setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyPress}
                    />
                    <div className="input-group-append">
                        <button 
                        type="button" //⭐
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
                        className="mr-2 d-none d-lg-inline text-gray-600 small me-2">
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
                    onClick={handleLogout}>logout</button>

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


/*
💡 왜 굳이 hasSearched 스위치가 필요할까요?
만약 이 스위치(hasSearched) 없이 그냥 result.users.length 같은 데이터 유무만 믿고 화면에 띄우려고 하면, 
다음과 같은 문제가 생깁니다.

아무것도 검색 안 한 맨 처음 상태
아직 검색을 시작조차 안 했으니 result.users 배열은 텅 빈 상태(길이: 0)입니다.

이때 스위치가 없다면, 페이지가 켜지자마자 화면에 "검색된 회원이 없습니다"라는 
문구가 뜬금없이 떡하니 먼저 보이게 됩니다. (사용자 입장선: "아직 검색도 안 했는데 왜 결과가 없대?" 하고 당황스러움)

스위치의 진짜 역할

평소(false): "아직 검색 안 했으니까 결과 영역 자체를 숨겨두자."

검색 후(true): "이제 검색 끝났으니까 결과 영역을 보여줄게! 만약 데이터가 없으면 
'검색된 회원이 없습니다'라고 띄워줄게."

즉, '아직 검색을 안 한 상태'와 '검색을 했는데 결과가 0건인 상태'를 
명확하게 구분해서 화면에 이상한 문구가 먼저 뜨지 않게 막아주는 안전장치(스위치)라고 생각하시면 됩니다!

 */