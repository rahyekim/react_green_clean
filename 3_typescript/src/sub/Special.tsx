
const Special = () => {

    // 1.any ) 타입검사를 패스 예를 사용하지 않음 에러
    //🟢 타입검사안할래 
    let anyValue : any = "문현빈";
    anyValue=51;
    anyValue=[true, false];

    //2.unknown ) 무엇이든 될 수 있지만 사용전 검사 필수!
    let unknownValue: unknown = "류현진";    ////뭔지는 모르겠지만 일단 저장 
    let textLength = 0;
    if (typeof unknownValue === "string"){   // 🟢typeof로 안전하게 확인하고 쓰자
        textLength = unknownValue.length;
    }

    //3.never) 절대 반환되지 않거나 일어날 수 없는 사항
    // 무한 루프가 돌거나 실행 도중 에러를 던져서 함수가 끝날때 사용....
    //💀 절대로 값을 반환하지 않음
    const throwError = ( message: string) : never => {
        throw new Error(message); // 여기서 프로그램이 멈추기 때문에 아무것도 반환하지않음
    }
    //4.undefined null ) 값이 아직 준비되지 않거나(undefined) 의도적으로 비울때 (null)
    // 유니온(|) 으로 묶어서 사용
    
    let score: number | undefined = undefined; //// 📦 값이 아직 안 들어옴
    //아직 시험을 안봐서 점수가 할당이 안됨....
    let userProfile: string | null = null; //cf) 사진도 string이래 
    //회원 프로필 사진이 없음을 명시적으로 표시....🚫 "일부러 비워둠"

    const loadData = () => {
        score = 100; 
    }

    return(
        <>
        <h1>🚀 특수유형</h1>
        <h3>any : ⭐ 타입 검사 무시</h3>
        <p>
        가장 유형한 타입 기본적으로 컴파일러에게 타입 검사를 건너뛰도록 지시
        {JSON.stringify(anyValue)}
        -사용시점- <br />
        자바스크립트 코드를 타입스크립트로 마이그레이션(이동전달)할때 <br />
        데이터 유형을 알 수 없는 동적 컨텐츠를 다룰때 <br />
        특정 경우에 타입 검사를 제외해야 할 때 <br />
        </p>
       
        
        <h3> unknown  : ⭐⭐⭐ 검사 후 사용</h3>
        <p>
        무엇이든 될 수 있으므로 사용하기 전에 어떤 종류의 검사를 수행해야 한다 <br />
        -필수적-<br />
        사용전에 타입검사
        타입 어센셜 없이는 타입의 속성에 접근 할 수 없다
        해당 유형의 값을 호출하거나 생성할 수 없다 
        </p>
          {textLength}
        <h3>never : ⭐⭐ 절대 반환 안 함</h3>
        <p>
            -절대 반환하지 않는 함수 <br />
            -타입 검사를 절대 통과하지 못하는 타입가드
        </p>
        <button onClick={()=> throwError("강제로에러발생")}></button>

        <h3>undefined: ⭐⭐⭐⭐⭐ 아직 값 없음 
            null:⭐⭐⭐⭐ 의도적으로 비움 </h3>
        <p>
            -undefined: 선언되었지만 값이 할당되지않음
            -null: 값이나 객체를 나타내지 않는 명시적 할당
            유니온 타입(Union Type) 
            User | null 
            |  ➜ 또는 (OR)이다.
        </p>
        </>
    )
};

export default Special;