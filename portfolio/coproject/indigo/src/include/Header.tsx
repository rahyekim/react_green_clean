/**
    리액트 심장
    useState 는 컴포넌트가 자신만의 기억력(상태)를 갖게 해주는 도구
    리액트는 기본적으로 한번 화면을 그리고 나면 변수를 바꿔도 화면이 새로 안고쳐짐
 
 *  이 값이 바뀌면 화면을 다시 그려줘 
 *  라고 특별히 요청하는 도구가 훅...
 * 
 */

import {useState, useEffect} from 'react';  //상태관리  훅 선언 불러옴
import axios from 'axios';

//관리자에서 설정한 메뉴타입을 정의
interface MenuItem{
    id:number;
    title: string;
    link: string;
}

const Header = ()=> {

    const [isOpen, setIsOpen] = useState(false);  //메뉴가 열려있는지 확인하는상태(기본false)

    //-add
    const[logoType, setLogoType] = useState<'text'|"img">('text')
    const[logoText, setLogoText] = useState('indigo')
    const[logoImg, setLogoImg] = useState('')
    const[menus, setMenus] = useState<MenuItem[]>([]) //메뉴배열

    //버튼 클릭시 상태 반전... 이런걸 전부 함수로 사용함... 모든개발언어에서... 
    const toggleMenu = () => setIsOpen(!isOpen);
    
    //화면이 처음 그려질때 백엔드에서 헤더 설정값 불러오기 

    useEffect(()=>{

        const fetchHeaderSettings = async()=>{
            
            try{
                //아까만든 백엔드....
                const res = await axios.get('http://localhost:5000/api/settings/header');
                //성공적으로 ㄹ받아오면 상태 업데이트
    
                setLogoType(res.data.logoType);
                setLogoText(res.data.logoText);
                setLogoImg(res.data.logoImage);
                setMenus(res.data.menus);

            }catch(err){
                console.error('헤더설정을 불러오는 중 에러발생', err);


            }
        }
        fetchHeaderSettings();
    }, [])

    
    return(
        <>

        <header className="header"> 

            {/* <h1 className="logo">
                <a href="/"> indigo </a>
            </h1> */}

             <h1 className="logo">
                <a href="/"> 
                {logoType === 'text' && logoText}
                {logoType === 'img' && 
                <img src={logoImg} alt={logoText} style={{maxHeight:"40px"}}/>}
              </a>
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
