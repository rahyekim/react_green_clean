/**
    리액트 심장
    useState 는 컴포넌트가 자신만의 기억력(상태)를 갖게 해주는 도구
    리액트는 기본적으로 한번 화면을 그리고 나면 변수를 바꿔도 화면이 새로 안고쳐짐
 
 *  이 값이 바뀌면 화면을 다시 그려줘 
 *  라고 특별히 요청하는 도구가 훅...
 * 
 */

import {useState} from 'react';  //상태관리  훅 선언 불러옴



const Header = ()=> {

    const [isOpen, setIsOpen] = useState(false);  //메뉴가 열려있는지 확인하는상태(기본false)

    //버튼 클릭시 상태 반전... 이런걸 전부 함수로 사용함... 모든개발언어에서... 
    
    const toggleMenu = () => {
        
        setIsOpen(!isOpen);
    }

    
    return(
        <>

        <header className="header">

            <h1 className="logo">
                <a href="/"> indigo </a>
            </h1>
            <nav>
                <ul className={`gnb ${isOpen ? 'active' : ''}`}> 
                   <li><a href="/">HOME</a></li>
                   <li><a href="/introduce">WE ARE</a></li>
                   <li><a href="/work">WORK</a></li>
                   <li><a href="/blog">BLOG</a></li>
                   <li><a href="/contact">CONTACT US</a></li>
                </ul>
            </nav>

            <span className="menu-toggle-btn" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </span>
            
        </header>

        </>
    )


}

export default Header;
