type BasicProps = {
    title: string; //타이틀 타입이 문자열 //👉무조건잇어야함
    children?: React.ReactNode; // 👉?(존재여부)없어도됨 : 모든 값
};

/*
카드 컴포넌트가 부모에게서 받아올 데이터 props 의 
이름과 type(종류)을 미리 지정해 두는 일종의 설계도 

type 대문자로쓴다 (변수와 차별)
👍 콜론(:) 변수/매개변수/반환값 
👍 꺾쇠(< >) 제네릭 함수(useState, Promise, Array 등)

🟢 ? : prop이 있어도 되고 없어도 된다 선택사항 (존재 여부)
🔵 React.ReactNode : 리액트에서 화면에 그릴수있는 모든 값
(html태그 문자열 다른 리액트 컴포넌트등을 다 허용하겠다는 뜻)

🟡 undefined = 아직 안 받음 // 로그인 로그인전
price?: number
price: number | undefined 랑 비슷
실무에서는 있을 수도 있고 없을 수도 있는게 많음.
user.profileImage?.length 이런거 많이씀

🟡 null = 받았는데 없음 
"없다"를 명시적으로 표현할 때 사용=>  profileImage: string | null;
🟡 unknown (생각보다 자주 씀)
서버에서 응답이 왔을 때 뭐가 올지 모름... 
옛날엔 const data: any= await fetch(...) 
요즘추천 const data: unknown = await fetch(...) =>  그리고 검사 typeof 👉 반드시 체크


if (
  typeof data === "object" &&   
  data !== null
) {
  // 사용
}
*/



const Basic = ({title, children}: BasicProps) => {

    return(
        <>
        <div className="" title="공지사항">
            <p>{title}</p>
            {children}
        </div>
        </>
    )
};

type GreetingProps = {
    name: string ;
} //아래에 쓰는 함수 타입 지정 
function Greeting ({name} : GreetingProps) {
    
    return(
        <h3> hello {name} ! </h3>
    )
}

const Ext = () => {
    
    //타입추론 예시
    let username= "John";
    let score = 100;
    let flag = [true, false];

    function add (a:number, b:number){
        return a+b
    }
    //타입 추론 = 타입스크립트가 값을 보고 자동으로 타입을 정해주는 기능
    
    return(
        <>
        <h1> 📚 명시적 타입과 타입 추론</h1>
            <div>
                (1): 명시적 타입 지정: 변수의 타입을 명시적으로 선언 <br />
                - 함수 매개변수 및 반환 <br />
                - 객체 리터럴 <br />
                - 초기값이 최종 유형과 다를 수 있는 경우 <br />
                <code>
                    String 👉
                    greeting: string = "hello Typescript" <br />
                    Number 👉
                    userCount: number = 42; <br />
                    Boolean 👉
                    isLoading : boolean = true; <br />
                    Array of numbers 👉
                    scores: number[] = [100,99] ; <br />
                    string[] = [] 
                    🔴 혼합배열
                    const data: (number | string)[] = [1, "two", 3];
                    🔴 객체 배열
{/*  
                    type Item = {
                        id: number;
                        name: string;
                        };
                    const list: Item[] = [
                        { id: 1, name: "A" },
                        { id: 2, name: "B" }
                    ];
*/}
                </code> <br />
                <Greeting name={"hyunJin"}/>
               
                (2): 타입추론: typescript 는 할당된 값을 기반으로 타입을 자동 결정 <br />
                그럼 위에서 설명한 각 접근 방식은 언제 사용? <br />
                - 즉시 할당을 사용하는 간단한 변수 선언 <br />
                - 문맥상 타입이 명확한 경우  <br />
                - 타입스크립트는 변수의 초기값을 기반으로 변수의 타입을 자동으로 판단(추론)
            </div>
            <p>유저이름: {username}</p>
            <p>기본점수: {score}</p>
            <p></p>
        
        </>
    )
}


export default Ext;