from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from model import ai_manager

app = FastAPI(title="모두의 인공지능 api", description="FastAPI로 구현한 인공지능")

@app.on_event("startup")
def startup():
    try:
        ai_manager.load_llm()
    except Exception as e:
        print(f"Model load skipped or failed:{e}")


#클라이언트가 LLM 요청시 보낼 데이터 구조(JSON형식) 정의
class PredictRequest(BaseModel):
    prompt: str  #사용자가 입력할 질문 또는 프롬프트 텍스트(문자열)
    max_tokens: int =128 #ai가 생성할 최대 답변 길이 최대128

class NumberPredictionRequest(BaseModel):
    pixel_data: list[float]

@app.get('/')
def read_root():
    return {"message": "모두의 인공지능 서버가 정상작동중"}

#LLM 텍스트 생성 기능을 제공하는 API 엔드포인트(POST)
@app.post("/api/llm/generate")
def generate_text(request: PredictRequest):
    try:
        answer = ai_manager.predict(request.prompt, request.max_tokens)
        return  {"prompt": request.prompt, "answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/deeplearning/predict_number")
def predict_number(request: NumberPredictionRequest):
    if len(request.pixel_data) != 784:
        raise HTTPException(status_code=400, detail="784개의 픽셀 데이터(28x28)가 필요합니다.")

    predict_number = 7

    return {"predict_number": predict_number}