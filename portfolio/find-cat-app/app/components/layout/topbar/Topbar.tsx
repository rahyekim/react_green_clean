'use client'

//상태관리를 위해 useState와 useEffect를 추가로 불러옵니다
import React, {useState, useEffect} from "react";
import { useRouter } from 'next/navigation' //🌟

import { TopBarContainer,TopBarNavBar,TopBarSearch, TopbarProfile } from "./Topbar.styled"
// import { useNavigate } from "react-router-dom";

export const Topbar:React.FC = ()=>{
    //1.화면에 보여줄 사용자 이름 상태를 만듦(기본값:Guest)
    
    const [userName, setUserName]=useState('Guest');
    // const navigate = useNavigate();
    const router = useRouter();

    //
    const [isDropdownOpen, setIsDropdownOpen]=useState(false);



    //2.화면이 처음 켜질때 딱 한번만 실행
    useEffect(()=>{
        //로그인할때 저장해둔 'userName'을 브라우저저장소(localstorage)에서 꺼내옴
        const storeName = localStorage.getItem('userName')
        //만약 저장된 이름이 있다면. 상태를 그 이름으로 업데이트
        if (storeName){
            //🌟setTimeout으로 감싸서 리액트의 동기적 랜더링 감시망을 피한다.
            //비동기큐로 실행순서 밀림(잠깐 숨킴)=> 서버렌더링 다 끝나고 브라우저(localstorage이제가능)
            // 완전히 켜진타이밍에 실행해줘! 왜냐면
            // next.js는 서버에서 먼저 HTML을 싹 만들어서 보냄 -> 서버에는 localstorage개념없음
            setTimeout(()=>{
                setUserName(storeName); //🌟
            }, 0)
        }
    }, [])

    //로그아웃 버튼 눌렀을때 실행되는 함수
    const handleLogout = ()=>{

        //1.브라우저금고(localstorage)에서 'userName'데이터를 완전히 지움
        localStorage.removeItem('userName'); //토큰도필요...

        //2.로그인 페이지('/login')로 사용자를 이동시킴
        router.push('/admin/login') //🌟
        // navigate('/login');
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
            li 메뉴하나 > a 클릭영역 (span 유저이름, 프로필사진)*/}
         
                <li className="nav-item dropdown no-arrow d-flex align-items-center">
                    <a href="#"
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    id="userDropdown"
                    onClick={e=> {
                        e.preventDefault();
                        setIsDropdownOpen(!isDropdownOpen);
                    }}
                    >
{/* ⭐a태그의 기본 클릭이벤트(페이지최상단으로 올라가는 현상을) 막기위해⭐ */}
                        <span
                        className="mr-2 d-none d-lg-inline text-gray-600 small me-2">
                            {userName}
                        </span>
                        <TopbarProfile 
                        src='/img/cat.jpg' 
                        alt="프로필이미지"
                        className="rounded-circle"/>
                    </a>

                    {isDropdownOpen && (
                        <div className="dropdown-menu dropdown-menu-right animated--grow-in show"
                         aria-labelledby="userDropdown"
                        >
                            <a 
                            className="dropdown-item"
                            href="#"
                            onClick={e=>e.preventDefault()}
                            > <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"/>
                            </a>

                            <div className="dropdown-divider"></div>

                            <a
                            className="dropdown-item"
                            href="#"
                            onClick={e=> {
                                e.preventDefault();
                                handleLogout()}}
                            >
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                로그아웃
                            </a>
                        </div>

                    )}

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


// import {TopbarContainer, TopbarSearch, TopbarNavbar} from './Topbar.styled';

// export const Topbar:React.FC = () => {
// //페이지 이동 함수를 navigate라는 이름으로 사용할수있게 준비 ..
// // const navigate = useNavigate();
// const router = useRouter();

// //1.화면에 보여줄 사용자 이름 상태를 만듭니다.(기본값: Guest)
// const [userName, setUserName] = useState('Guest');

// //2.화면이 처름 켜질때 딱 한번만 실행
// useEffect(() => {
// //로그인 할때 저장해둔 'userName'을 브라우저 저장소에서 꺼내옵니다
// const storedName = localStorage.getItem('userName');

// //만약 저장된 이름이 있다면, 상태를 그이름으로 업데이트 합니다
// if(storedName){
//     //🌟setTimeout으로 감싸서 리액트의 동기적 랜더링 감시망을 피한다.
//     //비동기큐로 실행순서 밀림(잠깐 숨킴)=> 서버렌더링 다 끝나고 브라우저(localstorage이제가능)
//     // 완전히 켜진타이밍에 실행해줘! 왜냐면
//     // next.js는 서버에서 먼저 HTML을 싹 만들어서 보냄 -> 서버에는 localstorage개념없음
//     setTimeout(()=>{
//         setUserName(storedName); //🌟
//     }, 0)
// }
// },[]);

// //로그아웃 버튼을 눌렀을때 실행되는 함수를 만듭니다
// const handleLogout = () => {
//     //1.브라우저 금고(localStorage)에서 'userName'데이터를 완전히 지웁니다
//     localStorage.removeItem('userName');
//     //2.로그인 페이지('/login)로 사용자를 이동시킵니다
//     // window.location.href='/login';  // navigate('/login')
//     router.push('/login') //🌟
// }

//     return(
//         <>
//         <TopbarContainer 
//             className="navbar navbar-expand navbar-light topbar static-top">
//             {/*Sidebar Toggle(Mobile) */}
//             <button className="btn btn-link d-md-none rounded-circle mr-3">
//                 <i className="fa fa-bars"></i>
//             </button>

//         {/*Topbar Search */}
//         <TopbarSearch 
//         className="d-none d-sm-inline-block form-inline my-2 my-md-0 mw-100 navbar-search">
//         <div className="input-group">
//             <input type="text" 
//             className="form-control bg-light border-0 small"
//             placeholder="Search for.."
//             />
//             <div className="input-group-append">
//                 <button className="btn btn-primary">
//                     <i className="fas fa-search fa-sm"></i>Search
//                 </button>
//             </div>
//         </div>
//         </TopbarSearch>

//         {/*Topbar Navbar */}
//         <TopbarNavbar className="ml-auto">
//             {/*User Information */}
//             <li className="nav-item dropdown no-arrow d-flex align-items-center">
//                 <a href="#"
//                 className="nav-link dropdown-toggle"
//                 id="userDropdown"
//                 onClick={(e) => e.preventDefault()}
//                 > {/*a태그의 기본 클릭이벤트 (페이지 최상단으로 올라가는 현상을 )막기위해 */}
//             <span className="mr-2 d-none d-lg-inline text-gray-600 small"
//             >
//             {userName}
//             </span>
//             <img className="img-profile rounded-circle"
//             src="./img/cat.jpg"
//             alt="프로필이미지"
//             />        
//                 </a>
//                 {/*로그아웃 버튼 추가 */}
//                 <button 
//                 onClick={handleLogout}
//                 className="btn btn-sm btn-outline-secondary ml-2"
//                 >
//                 로그아웃
//                 </button>
//             </li>
//         </TopbarNavbar>
// </TopbarContainer>
//         </>
//     )
// }