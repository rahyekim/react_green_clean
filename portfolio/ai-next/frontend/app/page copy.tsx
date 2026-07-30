"use client"; //🌟

import { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBBtn,
  MDBFooter,
} from 'mdb-react-ui-kit'

interface Message{
  id: number;
  text: string;
  sender: "user" | "ai";
}

export default function Home(){
  
  const [inputText, setInputText]=useState("");
  const [messages, setMessages]= useState<Message[]>([

    {
      id:1, 
      text: "안녕하세요! 노원구 맛집 AI 에이전트 입니다. 어떤 맞집을 찾고 계신가요? (예: 주차 가능한 고기집 찾아줘)",
      sender: "ai"
    },

  ]);

  const handleSend = ()=>{

    if(!inputText.trim()) return;

    //사용자 메세지 추가
    const newUserMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: "user",
    };

    setMessages(prev=> [...prev, newUserMessage]);
    setInputText("");

    //여기에 추후 파이썬 백엔드 API가 들어갈 예정

    //임시 ai응답 나중에 백엔드 연동후 삭제

    setTimeout(()=>{
      setMessages(prev=> [
        ...prev, {
          id: Date.now(),
          text: "백엔드 연결 전입니다 조금만 기다려주세요",
          sender: "ai"
        }
      ])
    }, 2000)
    
  };

  const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>)=> {
    if(e.key === "Enter") handleSend()
  }

  return(
    <MDBContainer
    className="py-5"
    >
      <MDBCard>
        {/* 헤더영역 */}
        <MDBCardHeader 
        className="d-flex justify-content-between align-items-center p-3 text-white"
        > 
        
          <div className="d-flex justify-content-between align-items-center">
            <MDBIcon fas icon="robot" size="lg" className="me-2"/>
            <h5 className="mb-0 fw-bold">✨ 노원구 맛집 AI ✨</h5>
          </div>

          <MDBIcon fas icon="utensils" size="lg"/>
        </MDBCardHeader>

        <MDBCardBody style={{overflowY: "auto", flex:1, backgroundColor:"3f9fbfd"}}>
          {messages.map(msg=> (
            <div key={msg.id}
              className={`d-flex flex-row justify-content-${msg.sender=== "user"? "end" : "start"}`}>
              {msg.sender === "ai" && (
              <div style={{width:"45px", height: "100%"}}
                className="me-2 text-center"
                >
                  <MDBIcon fas icon="robot" size="2x" style={{color: "#3f5b"}} />
                </div>
              )}
              <div className="p-3" 
              style={{
              borderRadius:"15px", 
              backgroundColor: msg.sender=== "user" ? "white" : "blue",
              maxWidth: "70%"}}>
                <p className="small mb-0"
                style={{lineHeight:"1.5"}}
                >{msg.text}</p>
              </div>
            </div>
          ))}
        </MDBCardBody>

        {/* 입력영역 */}
        <MDBFooter className="text-muted d-flex justify-content-start align-items-center">
          <input
          type="text"
          className="form-control form-control-lg"
          placeholder="메세지를 입력하세요..."
          value={inputText}
          onChange={e=> setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{borderRadius:"10px"}}
          />
          <MDBBtn
          className="ms-3"
          style={{borderRadius:"10px"}}
          onClick={handleSend}
          >
             <MDBIcon fas icon="paper-plane"/>전송 
          </MDBBtn>

        </MDBFooter>
      </MDBCard>

    </MDBContainer>
  )



  
  
  
  

}