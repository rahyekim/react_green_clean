import { useState } from "react";
//데이터 상태를 저장하고 변경할때 사용하는 훅


 // 1.데이터 구조정의
    
export interface Todo{ //todo라는 형태를 만듬
    id:number;
    text:string;
    isCompleted: boolean; //true또는 false????
}

// 2. props 타입 정의
interface TodoItemProps{
    todo: Todo; //위에서 만든 todo값을 받음 
    onToggle: (id:number)=> void; //숫자 id 하나받고 아무것도 반환하지 않는다

}

// 3.자식 컴포넌트 Todoitem 이라는 컴포넌트를 만듬

const TodoItem = ({todo, onToggle}: TodoItemProps) => {
 
    //todo onToggle처럼 사용할 수있게 구조분해를 해줌
    return(
        <li>
        <span onClick={()=> onToggle(todo.id)} 
        style={{ textDecoration: todo.isCompleted ? "line-through" : "none",
                 color: todo.isCompleted ? "gray" : "black",
         }}>
            {!todo.isCompleted && "✔"}{todo.text}</span>
        </li>
    )

}
const Interface = () => {

    const [todos, setTodos] = useState<Todo[]>([
        {id:1, text: 'Typescript공부하기', isCompleted:false},
        {id:2, text: 'react예제 만들기', isCompleted:true},
    ])

    const handleToggle = (id:number)=> {
        setTodos(prev=>(
            prev.map(t => (t.id=== id? {...t, isCompleted: !t.isCompleted}: t))
        ))

        /*
        t.id===id 클릭한 Todo인지확인 맞으면? ...t 기존데이터 복사 완료여부만 반대로 바꿈... :아니면그대로 종료
        */


    }

    
    return(
        <>
        <h1>오늘의 할일</h1>
        <ul style={{listStyle: "none"}}>
            {todos.map(todo=> ( 
                <TodoItem key={todo.id} todo={todo} onToggle={handleToggle}/>
            ))}
        </ul>

        <hr />
        <h1>인터페이스를 사용하는 이유</h1>
        <p>
           인터페이스는 한마디로 코드간의 약속(계약,contract)
           - 일관성 유지 : 데이터의 형태나 클래스의 동작방식을 강제하여 협업시 누가 코드를 작성하든
                        정해진 규격대로 작업하게 만듭니다
           - 추상화(Abstraction): 내부구현(어떻게 동작하는지)은 숨키고 외부에 사용하는 방식(무엇을 하는지만)노출 
                        이를 통해 결합도를 낮출 수 있다 
                        👉결과만 쓰고 과정은 몰라도 되는 것 
                        👉React의 추상화 = “컴포넌트를 호출하면 내부 구현 없이 기능만 쓰게 만드는 구조”
           - 유지보수 용이 : 인터페이스를 구현하는 실제코드는 수정하더라도 인터페이스를 사용하는 쪽의 코드는
                        수정할 필요없음(변경의 유연성)
           - IDE지원: 타입스크립트 사용시 객체가 가져야할 속성을 미리 알 수있어 자동완성과 에러 검출이 매우 명확해짐
        </p>
        <h2>타입스크립트 인터페이스와 자바 인터페이스의 차이</h2>
        <p> 
            - 이름기반 구조기반 런타임 존재여부
                                자바                    타입스크립트
            ------------------------------------------------------------------------
            타이핑기반       Nominal(이름기반)          Structural(구조기반)
            상속/구현       implements키워드           명시적선언 불필요 
            존재시점        컴파일후에도 런타임존재       컴파일시에만 사용(런타임에서사라짐)
            주목적          런타임 다형성(polymorhism)  컴파일 타임 타입 검사(에러방지)
            

{/*
            onClick: () => void = “클릭하면 실행되는 함수 (입력/출력 없음)”
            () => void → 그냥 실행용 함수(return 없이 onclick={onclick})
 * */}           
            
        </p>
        </>
    )
};

export default Interface;