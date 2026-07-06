import { useState } from "react";

//1.원본데이터 모든값이 필수 입력사항
interface UserProfile {
    id: string;
    name: string;
    email: string;
    bio: string;//자기소개
    theme: 'light'|'dark'; //화면모드
}

//2가상의 유저 데이터
export const ClassUnion = () => {

const [user, setUser] = useState<UserProfile>({
    id: "user_!23",
    name: "황현진",
    email: "skz@idol.com",
    bio: "스키즈 메덴",
    theme: "light"
});

// 3. 🌟 Partial을 사용한 수정 함수
//Partial<UserProfile> 덕분에 
// id, username 등을 다 안 보내고 "바꾸고 싶은 것만" 보낼 수 있어!
const updateUserProfile = (changes: Partial<UserProfile>) =>{
    setUser( prev=>({
            ...prev, //기존데이터 펼치기 
            ...changes //✨기존 유저 정보에 바뀐 부분만 덮어쓰기!!
    }));
};

return(
    <>
    <div style={{padding:"20px", border:"1px solid #ccc", 
        borderRadius:"10px", margin:"20px 0"
    }}>
        <h2>👤 내 프로필(Partial test)</h2>
        <pre style={{background:"#f4f4f4", padding:"15px",
                    borderRadius:"5px" }}>
        {JSON.stringify(user, null, 2)}
        </pre>

        <hr style={{margin:"20px 0"}}/>

        <h3>👇 버튼을 눌러 프로필의 "일부"만 수정해 보세요!</h3>

        <button onClick={()=>updateUserProfile({
                                theme: "dark",
                                bio: "🚀 스키즈 "
        })}
        style={{marginRight: "10px", padding: "10px", cursor:"pointer"}}
        > update </button>

        <button 
        onClick={()=>updateUserProfile({name: "디올왕자"})}
        style={{marginRight: "10px", padding: "10px",  cursor:"pointer"}}
        > 디올왕자버튼 </button>
        <button
        onClick={()=>setUser({
            id: "user_!23",
            name: "황현진",
            email: "skz@idol.com",
            bio: "스키즈 메덴",
            theme: "light"
        })}
        style={{ border: '1px solid #ccc', padding: '10px', cursor: 'pointer', background: '#eee' }}
        >초기화</button>
    </div>
    </>
)
};
