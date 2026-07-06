import React , {useState, useEffect} from "react";

const Event = () => {

    const shoot = () => {
        alert('great shot!')
    }
    
    const [userId, setUserID] = useState("");
    const [isHovered, setIsHovered] = useState(false);

    
    //onsubmit 이벤트 핸들러

    const handleSubmit = (e)=>{
        e.preventDefault(); //⭐️⭐️ 브라우저 자동 새로고침 방지..
                             //🛑 브라우저야! 새로고침 멈춰!!
                         //요즘은 리액트가 직접처리 ⭕fetch, axios로 직접 API 호출⭕

        alert(`제출된아이디: ${userId}`)
    }

    const handleKeyDown = (e) => {
        //enter키는 form제출해야하니까 무사통과!
        if(e.key === "Enter"){
            console.log("enter키가 눌렸습니다")
        };

        if(e.key === ' '){
            e.preventDefault();// 스페이스바입력차단!
            console.log("스페이스바 입력할 수없습니다")
        }
        if(/[0-9]/.test(e.key)){
            e.preventDefault() // 숫자 입력차단!
            console.log("숫자 입력 차단")
        } 
    }
    //💡우회해서 값을 입력하려는 꼼수를 원천 차단할 때 필수!
    const handlePaste = (e)=> {
        //붙여넣으려는 텍스트 가져오기
        const pasteTxt = e.clipboardData.getData('text');
        //붙여넣으려는 글자에 숫자나 스페이스바가 포함되어 있다면?
        if(/[0-9]/.test(pasteTxt)|| pasteTxt.includes(' ')){
            e.preventDefault();
            alert("숫자나 공백이 포함된 글자는 붙여넣을 수 없습니다.")
        }

    }
    
    return(
        <>
        <form onSubmit={handleSubmit}>
        <input 
            type="text" 
            value={userId} 
            onChange={e => setUserID(e.target.value)} 
            onKeyDown={handleKeyDown} placeholder="아이디 입력하세요" 
            onPaste={handlePaste} //👈클립보드에서 붙여넣기 할 때 발생.
            />
            
        </form>

        <button onClick={shoot}>Take the shoot</button>

        <h1>🔥 리액트에서 잘 사용하는 이벤트 🔥</h1>

        <p> 🌟🌟🌟
            (1) onClick : 마우스 클릭
            (2) onChange : 입력값 변경  👉사용자가 입력창에 글자를 치거나 체크박스를 누를때 마다 실시간으로 발생
            (3) onSubmit : 폼 제출  👉 태그안에서 사용자가 제출submit 버튼을 누르거나 ✨enter키를 쳤을때 발생
            (4) onKeyDown : 키보드 입력 👉 사용자가 키보드를 눌렀을때 발생  ✨키 입력 자체 제어용
            (5) onKeyUp : 누르고 뗄 때 
            (6) onMouseEnter & onMouseLeave : 마우스 호버 👉 :hover
        </p>

        <div
            onMouseEnter={()=> setIsHovered(true)} // 마우스 올라갔을떄 스위치 on
            onMouseLeave={()=> setIsHovered(false)} //마우스 나가면 스위치 off
            style={{
                padding: "10px",
                background: isHovered ? "lightyellow" : "white", //호버되면 배경색변경
                cursor: "pointer"
            }}
        > 여기에 마우스 올려보세요 ! {isHovered && "✨짠✨"}</div>

        <button 
         onMouseEnter={()=>setIsHovered(true)}
         onMouseLeave={()=>setIsHovered(false)}
         style={{
            border: isHovered ? ' 2px solid pink' : '',
            cursor:'pointer'
         }}
        >호버버튼 {isHovered && "✨"}</button>
        
        
        
        </>
        
    )
};

export default Event;