
 {/**
         1. type Alias (오브젝트 타입) 을 사용한 데이터 구조정의
         union type을 활용하여 롤 제한...
*/}

type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER'; // object타입

/* 튜플: 정확히 두개의 숫자(문자)만 들어갈 수 있는 고정 길이 배열 */

type Coordinate = [number, number]; 
type AccessLog = [string, string];

type UserProfile = {
    id:number;
    name: string;
    email:string;
    role:UserRole;
    phoneNumber?:string;
    coordinate:Coordinate;
    lastLogin: AccessLog;
}


// 2. 컴포넌트 props를 위한 Type정의
type ProfileCardProps = {
    user: UserProfile;
    onLogout?: ()=> void;

}

const ProfileCard = ({user, onLogout}: ProfileCardProps)=> {
    return(
        <>
        <div style={{border: "1px solid #dfaaaa", borderRadius:"12px" , textAlign:"center", padding:"10px"}}>
        <h3>✨ {user.name} ✨</h3>
        <p>Email:{user.email}</p>
        <p>Role: {user.role}</p>
        <p>
            좌표(Tuple): 위도: {user.coordinate[0]}, 경도: {user.coordinate[1]}
        </p>
            {user.phoneNumber && <p>{user.phoneNumber}</p>}
        {onLogout && (
            <button onClick={onLogout}>로그아웃</button>
        )}
        </div>
        </>
    )

}

const Tuple = () => {

    const sampleUser: UserProfile = {
        id:1, name: '문현빈', email: "dolmang2@eagles.com", role: "ADMIN", phoneNumber:"01051511004",
        coordinate:[51.5, 99.9], lastLogin: ["2026-05-01","01:01" ]
    }
    
    

    return(
        <>
        <ProfileCard user={sampleUser} onLogout={()=> alert('로그아웃')}/>

        <h1>🌱Tuple 👉 tuple = “순서 + 타입이 고정된 배열” </h1>
        <p>
            - 파이썬:(1,2,3) 수정할 수 없는 시퀸스 : 한 번 생성하면 값을 추가삭제 할 수 없음 👉 데이터무결성보장
            
            - 타입스크립트에서 튜플은:[1,2,3] 
             배열의 특별한 형태 특정위치에 특정타입의 데이터가 와야함을 강제합니다. 👉 수정가능
             🌱 타입 엄격성이 핵심
             
             ✅ let user: [string, number] = ["kim", 20];  순서바뀌면 에러 👉 의미가 있는 자리 임

             일반 배열
             - let arr: number[] = [1, 2, 3]; 👉 숫자만 들어가면 됨, 순서중요X,몇개든 가능 
             
             
        </p>
       
        </>
    )
};

export default Tuple;