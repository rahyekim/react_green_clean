import fastapi
import requests
import streamlit as st

st.set_page_config(
    page_title='나만의 AI 챗봇',
    page_icon="🤖",  # 파비콘
    layout="centered",
    initial_sidebar_state="expanded",
)

st.title("🤖 나만의 AI 어시스턴트")
st.caption("FastAPI 백엔드와 연동된 AI 챗봇입니다.")

# 1. 세션 상태 초기화 (처음에만 실행)
if "message" not in st.session_state:
    st.session_state["message"] = [
        {"role": "assistant", "content": "안녕하세요! 무엇이든 물어보세요. 오늘 어떤 도움이 필요하신가요?"}
    ]

# 기존 대화 기록 화면에 출력
for message in st.session_state["message"]:
    with st.chat_message(message["role"]):
        st.markdown(message["content"], unsafe_allow_html=True)

# 사용자 입력 받기
if user_input := st.chat_input("메세지를 입력하세요..."):
    # 사용자 메시지 세션에 추가 및 화면 출력
    st.session_state["message"].append({"role": "user", "content": user_input})
    with st.chat_message("user"):
        st.markdown(user_input, unsafe_allow_html=True)

    # 어시스턴트 답변 생성 및 API 통신
    with st.chat_message('assistant'):
        with st.spinner('생각하는 중...'):
            try:
                fastapi_url = "http://localhost:8000/api/chat"
                response = requests.post(fastapi_url, json={"message": user_input})
                if response.status_code == 200:
                    data = response.json()
                    ai_reply = data.get("reply", "응답을 받지 못했습니다.")
                else:
                    ai_reply = f"서버 에러가 발생했습니다(상태코드: {response.status_code})"
            except Exception as e:
                ai_reply = f"FastAPI 백엔드 서버와 연결할 수 없습니다.\n\n(에러: {e})"

            st.markdown(ai_reply)

        # 어시스턴트 답변 세션에 추가
        st.session_state["message"].append({"role": "assistant", "content": ai_reply})