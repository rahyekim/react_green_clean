import React, { useState } from "react"

//13 데코레이터 @LogExecution 함수선언 
// 데코레이터 함수 : 함수를 실행하는 게 아니라, 🌱함수를 수정🌱함 
// ...가로채서기능을 추가/변경하는 함수
function LogExecution(
    originalMethod:any, 
    context: ClassMethodDecoratorContext) {

    const methodName = String(context.name);
    //원래 함수를 새로운 함수로 교체 
    return function replacementMethod(this:any, ...args:any[]){
        console.log(`[데코레이터 로그] ${methodName} 메서드실행됨`)
        return originalMethod.apply(this, args); //원래 함수 실행
    }

}

//9. 네임스페이스 : 대시보드 관련 타입을 묶음
namespace DashBoardApp{
    //8.리터럴 타입 정확히 4개의 문자열만 허용
    export type FetchStatus = 'idle' | 'loading' | 'success' | 'error';
    //10.Basic index signiture
    //어떤 문자열이 들어와도 값은 아무거나(any)를 허용하는 캐시 
    export interface DataCache{
        [key: string] : any;
    }
    //11.이름이 같은 인터페이스가 자동으로 하나로 합쳐짐
    interface UserConfig{theme: 'light'| 'dark'};
    interface UserConfig{language: string};

    //3.어드밴스 타입& 6. mapped types 모든키를 순회하며 읽기전용으로 변환
    type ReadonlyConfig = {
        readonly [ k in keyof UserConfig ] : UserConfig[k];
    }
    //5.컨디션 타입 t가문자열이면 yes아니면 or
    type IsString<T> = T extends string ? 'YES' : 'NO';

    //1.keyof 객체t와 그객체가 가진 키만 인자로 받도록 강제하는 유틸함수
    function getConfigValue<T, K extends keyof T> (obj:T, key:K): T[k] {
        return obj[key];
    }
    //커스텀 에러 클래스 정의
    class ApiError extends Error{   //기본Error클래스 상속
        //1.멤버 변수를 명시적으로 선언
        statusCode: number;
        
        constructor( statusCode: number, message: string){
            super(message); //부모클래스 생성자 호출
            this.statusCode = statusCode; //404 400 500
            this.name ='ApiError';
        }
    }
    //데이터 서비스 클래스
    class DataService {
        @LogExecution // 13데코레이터사용
        async fetchMockData () :Promise<string>{
            return new Promise((resolve,reject)=> 
                setTimeout(()=> {
                    if(Math.random()>0.6){
                        reject(new ApiError(500, "서버응답실패"));
                    }
                    resolve('서버에서 가져온 1급 기밀 데이터');
                },1000)
            )
        }
    }
}


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
(6).Mapped Types: 기존 객체 타입의 키들을 순회하면서 새로운 객체 타입을 찍어내는 기능
(7).Type Inference:타입추론: 개발자가 타입을 안적어도 알아서 값을 보고 눈치껏 때려 맞추는 기능
(8)🌟.Literal Types: 넓은 범위가 아니라 특정한 값을 정확한 값자체를 타입으로 지정
(9).Namespaces: 코드가 충돌하지 않도록 관련된 변수 함수를 하나의 고유한 이름공간으로 묶어주는 기능
(10).Basic Index Signatures: 객체의 키가 정확히 뭔지 모를때 키는 문자열이고
값은 숫자일꺼야 라고 동적으로 속성을 정의하는 방법
(11).Declation Merging: 같은 이름이 인터페이스를 여러번 선언하면 타입스크립트가 알아서 하나로
합쳐주는 기능
(12)🌟.Async Programming : async/await 나 Promise 사용하여 서버에서 데이터를 가져오는등
오래 걸리는 작업을 멈추지 않고 백그라운드에서 처리
(13)🌟.Decorators : 클래스나 매서드위에 @함수명 형태로 붙여서 기존 코드 건드리지 않고
기능을 덧붙이거나 수정하는 장식자
(14).🌟Error Handling: try...catch
        </p>

        </>
    )
}