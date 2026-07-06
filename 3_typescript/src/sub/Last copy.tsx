
//4. instanceof 타입가드

class ApiError extends Error{
    statusCode: number;

        constructor(statusCode: number, message: string){
            super(message); //부모 Error클래스 message 전달
            this.statusCode = statusCode;
            this.name = "ApiError";
        }
}

function loginToServer(username:string) :string{
    if(username !== "Admin"){
        throw new ApiError(401, "아이디나 비밀번호가 틀렸습니다");
    }
    return "로그인성공! 토큰발급"; //⭕ 문자열 리턴! 
}
//순수한데이터만 리턴하는 이유? UI(토스트Alert..)까지 넣으면 나중에 재사용 어려워짐...

function handleLoginSubmit(){
    try{
        console.log("🔓 로그인을 시도합니다...")

        loginToServer("wrong_uer"); //일부러 에러유발
    }catch(error){
        
        if(error instanceof ApiError){  //타입좁히기
            console.error(`서버에러발생 코드:${error.statusCode}`);
            console.error(`에러메세지: ${error.message}`);
            if(error.statusCode=== 401){
                alert("비밀번호를 다시 확인해주세요");
            } else if (error instanceof Error){ //일반적인 자바스크립트 런타임 에러(예: 오타 등)인 경우
                console.error("자바스크립트 자체에러:", error.message)
            }else{
                console.error("알 수 없는 에러 형태")
            }
        }
    }
}
//readonly  Mapped Types(맵드 타입)
interface User {
    name: string;
    age:number;
}

type ReadonlyUser={ // readonly 자동생성 ㅋㅋ
    readonly [k in keyof User]: User[k]
};

//리터럴 타입: type Theme ="light"|"dark";
//넓은 범위가 아니라, "특정 값" 그 자체를 타입으로 지정해 버리는 아주 깐깐한 문법
// index Signature

export const Last = () => {


//(1) key of
interface UserAddress{
    city: string;
    zipcode: string;
    street: string;
}

let myAddress: UserAddress ={
    city: "Seoul",
    zipcode: "12345",
    street: "nowon-ro"
}

function updateAddressField(key: keyof UserAddress, value:string){
    //key자리에는 city | zipcode | street 중 하나만 들어올수있음
    myAddress[key] = value; //한줄로 수정가능!!! key 값만 가져올수잇어서...
}
updateAddressField("city", "Daejun");

interface User{
    name: string;
    age: number;
}
//인덱스시그니쳐
interface Users {
    [key: string] : User;
}
//요즘대세Record방식
type Users = Record<User,string>;

//✨ 리터럴 타입 (특정 단어 그 자체가 타입!)
type Brand = "Nike" | "Adidas" | "NB" ;

type BrandInventory = Record<Brand, number>;

const myStore :BrandInventory = {
    Nike: 100,
    Adidas: 50,
    NB: 30,
}

interface Form{
    email: string;
    password: string;
}
//Partial<> ?: 모든 속성을 optional로 만들어줌

const erros: Partial<Record<keyof Form,string>>={}


interface User{
    id:number;
    name: string;
    email: string;
    password: string;
}
type Props= Pick<User, "name"|"email">;

function UserCard(user:Props){};

//Pick을 만든 코드 (구현)
type Pick<T, K extends keyof T> ={
    [P in K]: T[P];
}
//K는 T의key만가능!!! (extends) 
//T는 객체타입
    return(
        <>
        <h1>마지막으로 중요한 14가지</h1>
        <p>
(1)🌟.keyof 객체 타입이 가진 '키(Key)값'들만 뽑아서 유니온 타입(|)으로 만들어주는 연산자
(2).null: 값이 의도적으로 비어있음 
(3).Advanced Types: 기존의 기본타입(string,number등)을 조작하고 결합하여 만드는 복잡한 타입들을 통칭
    (교차 타입, 유니온 타입 등이 포함됩니다).
(4)🌟.instanceof Type Guards: 특정 클래스로부터 생성되었는지 확인하면서 타입 좁혀주는 문법
(5).Conditinal Types: 조건에 따라 타입결정
(6)🌟.Mapped Types: 기존 객체 타입의 키들을 순회하면서 새로운 객체 타입을 찍어내는 기능
(7).Type Inference:타입추론: 개발자가 타입을 안적어도 알아서 값을 보고 눈치껏 때려 맞추는 기능
(8)🌟.Literal Types: 넓은 범위가 아니라 특정한 값을 정확한 값자체를 타입으로 지정
(9).Namespaces: 코드가 충돌하지 않도록 관련된 변수 함수를 하나의 고유한 이름공간으로 묶어주는 기능
    ㄴ import / export 파일 분리 방식 권장 : import로 가져올떄 as로 이름 바꿔버리면 됨..ㅋㅋ
(10).Basic Index Signatures: 객체의 키가 정확히 뭔지 모를때 키는 문자열이고
값은 숫자일꺼야 라고 동적으로 속성을 정의하는 방법
(11).Declation Merging: 같은 이름이 인터페이스를 여러번 선언하면 타입스크립트가 알아서 하나로
합쳐주는 기능
(12)🌟.Async Programming : async/await 나 Promise 사용하여 서버에서 데이터를 가져오는등
오래 걸리는 작업을 멈추지 않고 백그라운드에서 처리
(13)🌟.Decorators : 클래스나 매서드위에 @함수명 형태로 붙여서 기존 코드 건드리지 않고
기능을 덧붙이거나 수정하는 장식자
(14).🌟Error Handling: try...catch
⭐ Pick 꺽쇠: 기존 타입을 재사용해서 필요한 속성만 가져오고, 중복 타입 선언을 줄이는 것 ...반대가 Omit 이거빼고다
⭐ Partial 꺽쇠 ?: 만들어줌
⭐ 제네릭에서의 extends(제한) 이타입만사용할수있어.. (class상속개념x)
Record 꺽쇠:👉 키와 값의 타입을 이용해서 새로운 객체 타입 "만들기"
        </p>
        

        </>
    )
}