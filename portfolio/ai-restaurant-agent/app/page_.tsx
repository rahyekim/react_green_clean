"use client";

import React, {useState} from "react"

import {
  MDBContainer,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

//메세지 타입정의

interface Message {
  id: number;
  text: string;
  sender: "ai" | "user";
}

export default function Home(){
  const [inputText, setInputText] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "안녕하세요! 노원구 맛집 AI 에이전트 입니다. 어떤 맛집을 찾고 계신가여? (예: 주차 가능한 고기집 찾아줘) ",
      sender: "ai"
    }
  ]);

  const handleSend = ()=>{
    if(!inputText.trim()) return;

    //사용자메세지추가

    const newMessage: Message ={
      id: Date.now(),
      text: inputText,
      sender: "user"
    };

    setMessages(prevMsg=> [
      ...prevMsg,
      newMessage
    ]);
    setInputText("");

    //여기 추후 파이선 백앤드 api가 들어감

    //임시 ai응답 ( 나중에 백앤드 연동후 삭제)

    setTimeout(()=>{
      setMessages(prevMsg => [
        ...prevMsg,
        {id: Date.now() , text: "백앤드 연결 전입니다.조금만 기다려 주세요" , sender: "ai"}
      ])
    }, 3000);
  };

  const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if( e.key ==="Enter"){ handleSend()}
  };

  return(
    <>
  <MDBContainer className="py-5">
    <MDBCard>
      {/* 헤더영역 */}
      <MDBCardHeader
      className="d-flex justify-content-between align-items-center p-3 text-white"
      >
        <div className="d-flex align-items-center">
         <MDBIcon fas icon="robot" size="lg" className="me-2"/>
         <h5 className="mb-0 fw-bold"> 노원구 맛집 AI ❤️</h5>
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
              style={{width:"45px", height:"100%"}}>
                  <MDBIcon fas icon="robot" size="2x" style={{color:"#3f51b5"}}/>
              </div>
             )}
            <div
            style={{borderRadius: "20px", 
              maxWidth: "65%",
              padding: "10px",
              color: msg.sender==="ai"? "black" : "white" ,
              backgroundColor: msg.sender==="user"?"#3f51b5":"#e0e0e0"}}
             className="p-3"
             >
              <p className="small mb-0" style={{lineHeight:"1.5"}}>
                {msg.text}
              </p>
            </div>
            
          </div>
        ))}
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
        />
        <MDBBtn color="primary"
        className="ms-2 border-2"
        onClick={handleSend}
        >
          <MDBIcon fas icon="paper-plane"  style={{ fontSize: "22px" }} />
          
        </MDBBtn>

      </MDBCardFooter>


    </MDBCard>
    
  </MDBContainer>

    
    </>
  )

}



