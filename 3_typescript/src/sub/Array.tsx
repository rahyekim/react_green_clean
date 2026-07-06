import { useState } from "react"; // 데이터를 저장하고 변경할 수 있는 기능(상태)

/* 1. 데이터의 타입(모양) 정의 */
interface Todo { 
    id: number; 
    text:string}

const Array = () => {

    // 2. 초기상태 및 타입 설정
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputText, setInputText] = useState<string>('')

/*
    타입 지정 🔵useState <타입[]>(초기값)🔵 형태의 구조로 엄격히 관리
    todos: 할일목록 저장하는 변수
    setTodos; 할일 목록을 변경하는 함수
    useState([]) :처음에는 빈배열로 시작
    <Todo[]> : Todo타입의 배열만 들어갈 수 있음
*/
    // 3. 배열에 항목 추가 ( 불변성 유지 )

    const handleAddTodo = () => {
        if (inputText.trim()=== '') return;  
/*
        🌱trim() : 앞 뒤 공백제거 🌱입력한 글자가 공백인지 확인
        return 만약 아무 글자도 없다면 함수종료

*/
        //새로운 할일 하나를 만든다 
        const newTodo: Todo = {
            id: Date.now(),  //🟢고유한 ID생성(pk) 현재시간을 숫자로: 구별하기위한 고유번호
            text : inputText // 입력창에 있는 글자 저장 
        }
        //기존 배열을 복사하고 맨뒤에 새 항목을 추가한 새로운 배열을 만든다..
        setTodos(prev=>[...prev, newTodo]) 
        
        //마지막으로 입력창에 쓴 건 데이터가 입력되고 입력창을 비움
        setInputText("");
    }
    /*삭제 버튼을 누르면 실행되는 함수-> 삭제할 ID를 매개변수로 전달받는다*/

    const handleDeleteTodo = (id:number) => {
        // const updateTodos = todos.filter(todo => todo.id !== id)
        // //아이디 2번을 삭제할때 2번을 제외한 다른 아이디들을 출력...
        // setTodos(updateTodos);
        setTodos(prev=> prev.filter(todo=> todo.id !== id)); 
    }

       
    return(
        <>
        <h1>할일 목록</h1>
        <div>
            <input 
                type="text"
                value={inputText}
                onChange={(e)=> setInputText(e.target.value)}
                placeholder="할 일을 입력 하세요"
             />
             <button onClick={handleAddTodo}> Todolist 등록 </button>
             <h1>배열 데이터를 화면에 렌더링 하기</h1>
             <ul>
                {todos.map( todo => (
                    <li key={todo.id}> 
                    {todo.text}
                    <button onClick={()=> handleDeleteTodo(todo.id)}>삭제</button>
                    </li>
                ))}
             </ul>
        </div>

        <h1>🌟 Array</h1>
        <h3>단일 변수에 여러값을 사용할때</h3>
        <h4>배열의 타입을 지정하는 법은 두가지</h4>
        <p>
            (1) 타입 [] 방식 : string[] , number[] <br/>
            (2) Array 방식 제네릭 : 꺽쇠 <br/>
            -리액트에서는 보통 문자열이나 숫자의 단순배열보다는 객체(objec)들의 배열을 다루는 경우가 많다 <br/>
            -이때는 interface나 type을 사용해 데이터의 형태를 먼저 정의 <br/>
            -useState로 초기값은 빈배열..
        </p>
        <p> 객체의 구조를 정의 → interface  
            ...선언 병합...가능... 상속(확장)..extends <br/>
            유니온(User | Admin), 튜플, 함수 타입, 타입 조합 (복잡한타입) → type

            interface {}, type = { } // 쉼표,세미콜론 상관없대...신기...

            👉 제네릭은 “함수를 만들 때”가 아니라 “함수를 사용할 때” 타입이 정해진다.
            (1) 선언할 때 (아직 모름)
            {/*
            🟢 function getData<T>(): Promise<T> {}     👉 T는 아직 비어있는 자리
           
            (2) 사용할 때 (이때 결정됨)
           
            getData<User>()  👉 이 순간 결정 T = User
           
            🟢 function identity<T>(value: T): T {}

            <T> = 타입 자리 만들기
            (value: T) = 실제 입력값 
            : T = 출력 타입
             */}
        </p>
        
      {/*
interface ButtonProps {
  text: string;
  color: string;
}

function Button({ text, color }: ButtonProps) {
  return <button style={{ color }}>{text}</button>;
}

<Button text="확인" color="red" />
       */}
        </>
    )
};

export default Array;