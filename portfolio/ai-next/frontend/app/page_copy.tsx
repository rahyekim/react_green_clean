"use client"; //🌟

import { useState, useRef, useEffect} from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBBtn,
  MDBFooter,
  MDBSpinner
} from 'mdb-react-ui-kit'

interface Message{
  id: number;
  text: string;
  sender: "user" | "ai";
}

export default function Home(){
  
  const [inputText, setInputText]=useState("");
  const [isLoading, setIsLoading]=useState(false)
  const [messages, setMessages]= useState<Message[]>([

    {
      id:1, 
      text: "안녕하세요! 노원구 맛집 AI 에이전트 입니다. 어떤 맞집을 찾고 계신가요? (예: 주차 가능한 고기집 찾아줘)",
      sender: "ai"
    },

  ]);

  //HTML이 그려지기 전까지는 실제로 참조할 DOM이 없기 때문에 null
  const msgEndRef = useRef<HTMLDivElement>(null); 

  //메세지들 추가될때마다 ref div 가 scroll해서view보이게하라..
  useEffect(()=>{
    msgEndRef.current?.scrollIntoView({behavior:"smooth"})
  }, [messages])

  const handleSend = async()=>{

    if(!inputText.trim()) return;

    //사용자 메세지 추가
    const newUserMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: "user",
    };

    setMessages(prev=> [...prev, newUserMessage]);
    setInputText("");

    //💻백앤드 api🔥
    setIsLoading(true); //ai 응답대기상태..

    // fetch의 유일한 단점은 
    // await res.json()과 (axios는 res.data로 JSON자동변환)
    // res.ok 에러 처리를 해줘야함..
    
    try{
      const res = await fetch("http://localhost:8000/api/chat", {
        method:"POST",  //① axios.post 에서 'post' 역할
        headers: {"Content-Type": "application/json"}, 
         // ② axios가 자동으로 붙여주던 헤더
         //③ axios가 알아서 변환해주던 JSON 스트링화
        body: JSON.stringify({message: newUserMessage.text})
      })

      //🔴 400, 500번대 에러 발생 시 여기서 throw를 던짐!
      // (안던지면 400500다 정상인줄알아)
      if(!res.ok){  
        throw new Error("서버에러가 발생..")
      }

      //axios는자동으로해줬지만 fetch는 객체로 변환 파싱 해줘야함
      const data = await res.json();  //파싱 기다려...

      setMessages(prevMsg=>[
        ...prevMsg,
        { 
          id: Date.now(),
          text: data.reply,
          sender: "ai"
        }
      ])

    }catch(err){
      //🟢if (!res.ok)에서 던진 에러나, 
      // 인터넷 끊김 에러가 이쪽 catch로 다 잡혀 들어옴!
      console.error("에러 발생:",err)

      setMessages(prevMsg => [
        ...prevMsg,
        {
          id: Date.now(),
          text: "백엔드 서버와 연결 할수없음 파이썬 서버(port8000) 확인 요망 ",
          sender: "ai"
        }
      ]);

    }finally{
      setIsLoading(false); //로딩끝 
    }
  }
  const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>)=> {
    if(e.key === "Enter") handleSend()
  }

 return (
  <>
<MDBContainer className="py-5" style={{maxWidth:"800px"}}>
    <MDBCard 
    style={{
      height:"80vh", 
      borderTopLeftRadius: "25px", 
      borderTopRightRadius: "25px",
      // borderRadius: "25px",
      display:"flex",
      flexDirection:"column"}}

     >
    {/* 헤더영역 */}
    <MDBCardHeader
    className="d-flex justify-content-between align-items-center p-4 text-white "
    style={{
      overflow: "hidden",      // 👈모서리 밖으로 삐져나온 픽셀 잘라내기
      border: "none",   // 👈MDB 내장 회색 테두리 선 삭제
      borderTopLeftRadius:"25px",
      borderTopRightRadius:"25px",
      backgroundColor:"#3f51b5"}}
    >
      <div className="d-flex align-items-center">
       <MDBIcon fas icon="robot" size="lg" className="me-2"/>
       <h5 className="mb-0 fw-bold"> 노원구 맛집 AI ✨</h5>
      </div>

      <MDBIcon fas icon="utensils" size="lg"/>

    </MDBCardHeader>

    {/* 채팅내용영역 */}

    <MDBCardBody 
      style={{ overflowY:"auto", flex:1, backgroundColor:"#f9fbfd"}}
    >
      {messages.map(msg=>(
        <div key={msg.id}
        className={`d-flex justify-content-${ msg.sender === "user"? "end": "start"}`}
        >
          {msg.sender === "ai" && (
          <div className="me-2 text-center"
            style={{width:"40px", height:"100%"}}>
                <MDBIcon fas icon="robot" size="2x" style={{color:"#3f51b5"}}/>
            </div>
           )}
          <div
          style={{
            borderRadius: "17px", 
            maxWidth: "65%",
            padding: "10px",
            color: msg.sender==="ai"? "black" : "white" ,
            backgroundColor: msg.sender==="user"?"#3f51b5":"#e0e0e0"}}
           className="p-3 m-2"
           >
            {/* whiteSpace: 엔터와 띄어쓰기를 그대로 살리면서 예쁘게 줄바꿈 */}
            <p className="small mb-0" style={{lineHeight:"1.5", whiteSpace: "pre-wrap"}}>
              {msg.text}
            </p>
          </div>
          
        </div>
      ))}

      {/* 로딩상태(isLoading)일때 화면에 보여주는 "생각하는중..."애니메이션*/}
      {isLoading && (
        <div className="d-flex flex-row justify-content-start mb-4">
          <div style={{width:"45px", height:"100%"}}
          className="me-2 text-center"
          >
            <MDBIcon fas icon="robot" size="2x" 
             style={{color: "#a4a5a0"}}/>
          </div>

          <div className="p-3 d-flex justify-content-center"
            style={{borderRadius:"15px", backgroundColor:"#e0e0e0"}}
            >
              <MDBSpinner size="sm" role="status" tag="span"/> 
              <span className="ms-2 small">생각하는 중🔄</span>
          </div>

          </div>

      
      )}

      {/* 사용자가 새메세지를 쓸때마다 화면을 이 위치로 끌어내리는 기준점  */}
      <div ref={msgEndRef}/>

    </MDBCardBody>

    {/* 입력 영역 */}

    <MDBCardFooter
    className="d-flex align-items-center p-4 "
    >
      <input
      type="text"
      className="form-control form-control-lg"
      placeholder="메세지를 입력하세요"
      value={inputText}
      onKeyDown={handleKeyPress}
      onChange={e=> setInputText(e.target.value)}
      style={{borderRadius:"15px"}}
      />
      <MDBBtn color="primary"
      className="ms-2 border-2 d-flex justify-content-center align-items-center"
      onClick={handleSend}
      disabled={isLoading}
      style={{minWidth:"50px", height:"48px",borderRadius:"14px"}}
      >
        {/**/}
        <MDBIcon fas icon="paper-plane" className="me-2"  style={{ fontSize: "20px"}} />
         
      </MDBBtn>

    </MDBCardFooter>


  </MDBCard>
  
</MDBContainer>

  
  </>
)

}

