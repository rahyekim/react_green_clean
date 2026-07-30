"use client"; 
/*🌟use client
Next.js 13버전 이상에서 이파일이 클라이언트(브라우저)측에서 실행되는 컴포넌트임을 명시
React의 useState, useEffect같은 훅을 사용하려면 필요....
 */

//리액트 라이브러리에서 기본기능과 상태관리(useState), 참조(useRef), 생명주기(useEffect) 훅 가져오기
import React, {useState, useEffect, useRef } from "react"

import {   //Meterial design for bootstrap 
  MDBContainer,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";

//메세지 타입정의( 타입스크립트를 사용하여 Message라는 데이터 형태 정의,,, 코드작성 실수 방지... 오타...)

interface Message {
  id: number;
  text: string;
  sender: "ai" | "user";
}

export default function Home(){
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false); //로딩상태 추가
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "안녕하세요! 노원구 맛집 AI 에이전트 입니다. 어떤 맛집을 찾고 계신가여? (예: 주차 가능한 고기집 찾아줘) ",
      sender: "ai"
    }
  ]);

  /*
  채팅이 길어질때 가장최신메세지(맨 아래 div) 자동 스크롤(부드럽게) 하기위해 html 요소를 가리키는 참조(useRef) 사용... 
  */
  const msgEndRef = useRef<HTMLDivElement>(null); 

  /*
  특정상황에서 자동으로 실행되는 함수 useEffect [] 의존성배열...감시...
  여기서 메세지 배열이 변경될 때 마다 (즉, 새 메세지가 추가될 때 마다) 실행
   */

  useEffect(()=>{

    msgEndRef.current?.scrollIntoView({behavior: "smooth"})
    //ref가 가리키는 화면요소(맨아래 빈 div)로 부드럽게(smooth)스크롤 이동 ☑️
    
  }, [messages])

  //사용자가 전송 버튼을 누르거나 엔터키를 쳣을 때 실행되는 비동기 함수(async await)
  const handleSend = async()=>{

    /* 빈메세지 방지 함수종료 */
    if(!inputText.trim()) return;

    //사용자메세지추가
    const newMessage: Message ={
      id: Date.now(), //현재 시간을 밀리초로 가져와 고유한 ID로 사용
      text: inputText,
      sender: "user"
    };

    setMessages(prevMsg=> [    //기존메세지 배열(prev)의 끝에 방금 만든 사용자메세지 추가 하여 화면 업데이트....
      ...prevMsg,
      newMessage
    ]);
    setInputText("");  //입력창비워두기..

    //💻백앤드 api🔥
    setIsLoading(true); //ai 응답대기상태로 변경 

    /*
    파이썬 백엔드 서버(Fast API)를 데이터를 보냄(POST요청)// get은 정도노출됨..
    fetch 함수는 네트워크 통신을 담당 await를 써서 응답이 올때까지 기다림..
     */
    try{
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST", //데이터를 서버로 보내는 방식 
        headers: {
          "Content-Type": "application/json"
        },
        //자바스트립트 객체({message:...})을 문자열로 반환하여 보냄
        body: JSON.stringify({message: newMessage.text}),
      }
    );
    //서버에서 온 응답(res)상태가 정상(200번대)이 아니면 에러를 발생시킴 
    if(!res.ok){
      throw new Error("서버에러가 발생했습니다...")
    }
    //서버가 정상적으로 보내준 JSON데이터를 자바스크립트 객체로 변환(파싱)

    const data = await res.json();

    //백엔드에서 보내준 답변(data.reply)을 이용해 AI 메세지 객체를 만들고 화면에 추가 
    setMessages(prevMsg => [
      ...prevMsg,
      {
        id: Date.now(),
        text: data.reply,
        sender: "ai"
      }   //????
    ])
    }catch(err){ //통신중 에러(서버꺼짐, 인터넷끊킴 등 )발생하면 콘솔에 에러 출력

      console.error("통신에러: ", err)
      setMessages(prevMsg=> [  //사용자에게 서버연결할수없다는 메세지를 AI가 말하는것처럼 화면에 띄워줌
        ...prevMsg,
        { id: Date.now(),
          text: "백엔드 서버와 연결할 수 없음 파이썬 서버(port8000) 확인 요망",
          sender: "ai"
        }
      ]);

    }finally{
      setIsLoading(false); // AI로딩 끝..
    };
  }

  //   //임시 ai응답 ( 나중에 백앤드 연동후 삭제)

  //   setTimeout(()=>{
  //     setMessages(prevMsg => [
  //       ...prevMsg,
  //       {id: Date.now() , text: "백앤드 연결 전입니다.조금만 기다려 주세요" , sender: "ai"}
  //     ])
  //   }, 3000);
  // };

  //사용자가 입력창에 키보드를 누를때 마다 실행되는 함수
  const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if( e.key ==="Enter" && !isLoading)
      { handleSend()} // 누른키가 enter고 현재 로딩이 아닐때만 전송(handleSend)
  };

  return(
    <>
  <MDBContainer className="py-5" style={{maxWidth:"800px"}}>
    <MDBCard>
      {/* 헤더영역 */}
      <MDBCardHeader
      className="d-flex justify-content-between align-items-center p-3 text-white bg-primary"
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
              style={{width:"41px", height:"100%"}}>
                  <MDBIcon fas icon="robot" size="2x" style={{color:"#3f51b5"}}/>
              </div>
             )}
            <div
            style={{borderRadius: "20px", 
              maxWidth: "65%",
              padding: "10px",
              color: msg.sender==="ai"? "black" : "white" ,
              backgroundColor: msg.sender==="user"?"#3f51b5":"#e0e0e0"}}
             className="p-3 m-3"
             >
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
               style={{color: "#3f51b5"}}/>
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
        className="ms-2 border-2 d-flex justify-content-centr align-items-center"
        onClick={handleSend}
        disabled={isLoading}
        style={{minWidth:"30px"}}
        >
          <MDBIcon fas icon="paper-plane"  style={{ fontSize: "20px"}} />
          
        </MDBBtn>

      </MDBCardFooter>


    </MDBCard>
    
  </MDBContainer>

    
    </>
  )

}



