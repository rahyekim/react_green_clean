/*
🥊 try...catch가 잡는 것 vs !res.ok가 잡는 것

🔸catch가 실행되는 상황 (네트워크 에러)
백엔드 서버(Node.js)가 꺼져 있어서 아예 연결을 못 할 때 (ERR_CONNECTION_REFUSED)

인터넷 선이 뽑혀 있거나 도메인을 아예 못 찾을 때

즉, 서버랑 말 한마디도 못 섞어보고 통신 자체가 실패했을 때만 catch로 빠집니다.

🔹!res.ok가 필요한 상황 (서버는 응답을 줬는데, 내용이 에러일 때)

서버랑은 연결이 잘 되었고 통신도 성공했습니다. (예: 400 Bad Request, 401 Unauthorized, 500 Internal Server Error 등)

이때 fetch는 "통신(요청과 응답) 자체는 성공했다"고 판단하기 때문에, catch문으로 가지 않고 코드가 정상적으로 아래로 흘러갑니다.

하지만 서버가 보낸 상태 코드는 에러(ok: false)이기 때문에, 우리가 if (!res.ok)로 걸러줘야 하는 것

💯 100점 만점에 100점

서버가 아예 안 켜져 있거나 인터넷이 끊김 ➡️ 네트워크 통신 불가 ➡️ catch로 직행 (서버 목소리도 못 들음)

서버는 잘 켜져 있어서 응답(400번대, 500번대 에러 코드 등)을 줌 ➡️ 통신은 성공 ➡️ try 안으로 들어옴 (서버가 "나 에러 났어!" 하고 알려줌)

서버가 준 에러 코드는 통신 자체는 성공한 것이기 때문에 try {} 안으로 무조건 골인
 */



/*
🛠️ Step 1: 에러 상태(state) 만들기
🛠️ Step 2: handleSumbit (회원가입 버튼 클릭 시) 검증 로직 바꾸기
alert을 띄우는 대신, setErrors를 이용해 각 항목별 에러 상태를 채워줍니다.
🛠️ Step 3: 스타일 컴포넌트(Styles)에 에러 텍스트 추가하기
Terms.styles.ts 파일에 에러 메시지를 띄울 빨간 글씨 스타일을 하나 만들어줍니다.
🛠️ Step 4: JSX 코드에서 인풋창 밑에 에러 텍스트 배치하기
이제 step2 폼 안에서 인풋창 바로 밑에 errors.항목명이 있을 때만
 빨간 글씨가 나타나도록 조건부 렌더링(&&)을 걸어줍니다. 그리고 value와 onChange={handleChange}도 연결해 줘야 폼 데이터가 정상적으로 수집되겠죠?
 */
// 각 입력값의 에러 메시지를 관리할 상태
const [errors, setErrors] = useState({
    userName: '',
    userId: '',
    userPW: '',
    userPWconfirm: '',
    email: '',
    phone: ''
});



const handleSumbit = async () => {
    // 임시로 에러 객체 생성
    let newErrors = { userName: '', userId: '', userPW: '', userPWconfirm: '', email: '', phone: '' };
    let isValid = true;

    if (!formData.userName) {
        newErrors.userName = '이름을 입력해주세요.';
        isValid = false;
    }
    if (!formData.userId) {
        newErrors.userId = '아이디를 입력해주세요.';
        isValid = false;
    }
    if (!formData.userPW) {
        newErrors.userPW = '비밀번호를 입력해주세요.';
        isValid = false;
    }
    if (formData.userPW !== formData.userPWconfirm) {
        newErrors.userPWconfirm = '비밀번호가 일치하지 않습니다.';
        isValid = false;
    }

    // 에러 상태 업데이트
    setErrors(newErrors);

    // 하나라도 틀렸으면 여기서 중단!
    if (!isValid) return;

    // TODO: 여기서 백엔드(Node.js)로 fetch 요청 보내기!
    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (data.succee) {
            alert('회원가입 성공!'); // 또는 성공 팝업/페이지 이동
            router.push('/login');
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
    }
};

// 예시 (Terms.styles.ts)
export const ErrorText = styled.span`
    color: #ff4d4f; /* 빨간색 */
    font-size: 12px;
    margin-top: 4px;
    display: block;
`;



<S.FormGroup>
    <S.Label>이름(필수)</S.Label>
    <S.Input 
        type="text" 
        name="userName" 
        value={formData.userName} 
        onChange={handleChange} 
        placeholder="이름을 입력해주세요"
    />
    {/* 에러가 있을 때만 빨간 글씨 띄우기! */}
    {errors.userName && <S.ErrorText>{errors.userName}</S.ErrorText>}
</S.FormGroup>

const hidePopupRoutes = ['/register', '/login', '/mypage'];

const isHide = hidePopupRoutes.some(route=> Pathnamame.include(route))