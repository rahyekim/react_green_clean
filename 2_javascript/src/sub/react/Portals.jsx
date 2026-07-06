import { useState } from "react";
import { createPortal } from "react-dom";

/* 🧠 BOM > DOM

💡 BOM : 창문틀, 닫기버튼, 주소창, 뒤로가기 버튼 등 브라우저창 자체를 제어
- 다른 주소로 이동하기 window.location.href("url")
- 사용자 화면 크기 알아내기 window.screen

💡 DOM : 웹페이지 문서 내용물 전체를 제어하는 도구 
로그인 버튼을 눌렀을 때 경고창 띄우기
버튼 색상 빨간색으로 바꾸기
글자 내용 바꾸기 
*/
const Modal = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return createPortal(

        <div style={{position:"fixed", top:0, left:0, right:0, bottom:0,
            background: 'rgba(0,0,0,0.8)', display: "flex", alignItems:"center",
            justifyContent: "center"
            }}>
            <div style={{
                background: 'white', padding: "20px", borderRadius:"12px"
            }}>
            
            {children}

            <button onClick={onClose}>close</button>

            </div>
        </div>, 
        document.body
    )

}
const Portals = () => {

    //상태관리가 되려면...
    const [isOpen, setIsOpen] = useState(false);
    
    return(
        <>
        <h1>모달[🌱 popup 팝업, 모달창, modal, modallayer🌱]창 띄우기</h1>
        <h3> createPortal(모달, document.body) </h3>
        <p>👉 의미 : "React 구조 밖으로 빼서 body에 직접 붙여라"
            모달은 레이아웃 영향을 안 받게 하려고 body에 따로 붙인다
            Modal = 집 밖에서 떠있는 창문
        <h4>Portal이란 "레이아웃 영향 없이 화면 위에 떠있는 UI 만들기 위한 도구"
            ...그냥 이런것도있구나... Mui Modal 이런거씀 </h4>
        </p>

        <button onClick={()=> setIsOpen(true)}>Open Modal</button>
        <Modal isOpen={isOpen} onClose={()=> setIsOpen(false)}>

        <h2>모달창</h2>
        <p>예전에는 없던 기능 포털 children을 넘겨준다....</p>
        
        <h3>🚀 모달 구조
            1️⃣ 바깥 (검은 배경) 클릭하면 닫힘
            2️⃣ 안쪽 (흰 박스) 클릭하면 안닫힘
        </h3> 
        </Modal>
                
    
        </>
    )
};

export default Portals;