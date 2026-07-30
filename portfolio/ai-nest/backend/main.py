'''
설치 : pip install
fastAPI: 빠르고 간편한 파이썬 프레임워크
uvicorn 서버를 실행시켜주는 도구
pydantic: 프론트엔드에서 넘어온 메세지 형식이 맞는지 검사

🌟 fastAPI
파이썬으로 api서버를 빠르게 만들수있게 해주는 도구

⭐CORS Cross origin resource sharing 미들웨어를 가져옴
미들웨어란 요청과 응답사이에서 중간처리를 담당하는 기능
다른 주소(포트)에서 오는 요청을 허용할지 말지 결정하는 보안정책

✨pydantic 프론트에서 넘어온 데이터(메세지)의 형식이 맞는지 검사
pydantic 라이브러리에서 BaseModel 클래스 가져옴...
'''
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()  #FastAPI 앱(서버) 인스턴스 생성 => 모든설정과 API는 이 app에 등록

#app에 cors미들웨어를 추가
app.add_middleware(
    CORSMiddleware, #사용할 미들웨어 종류를 지정
    allow_origins=["http://localhost:3000"],  #요청을 허용할 주소 목록 "*":모든
    #쿠키나 인증번호(credential) 요청에 포함하는 것을 허용
    allow_credentials=True,
    #허용할 http메소드를 지정
    allow_methods=["*"],
    #허용할 http 헤더지정
    allow_headers=["*"],
)
'''
#프론트엔드에서 서버로 보내는 요청(Request) 데이터 구조 정의
BaseModel을 상속받아 pydantic이 데이터 타입을 자동으로 검증
'''
class ChatRequest(BaseModel):
    message: str #사용자가 입력한 채팅메세지를 받는 필드 (str 문자열 텍스트 타입)

class ChatResponse(BaseModel):
    reply: str

'''/api/chat 경로로 POST요청이 들어왔을때 실행될 함수를 등록'''
@app.post("/api/chat", response_model = ChatResponse) #이 함수가 반환하는 데이터 형식을 ChatResponse로 강제 전환
    #실제로 요청을 처리하는 비동기 함수 여러 요청을 도시에 효율적으로 처리
async def chat_endpoint(request: ChatRequest):
    #request객체에서 사용자갖 보낸 메세지 텍스트만 꺼내 변수에 저장
    user_message= request.message

    #open ai 를 여기에...

    temp_reply = f"사용자님이 `{user_message}`라고 말씀 하셨군요! 파이썬 백엔드가 메세지를 잘 받앗습니다.."

    #ChatResponse 객체를 생성해서 전환
    return ChatResponse(reply=temp_reply)

#구동명령어 uvicorn main:app --reload










