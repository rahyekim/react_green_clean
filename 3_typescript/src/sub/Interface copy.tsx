import { useState } from "react"; 

interface Todo{ 
    id:number;
    text: string;
    isCompleted: boolean;
}

interface TodoItemProps{ //TodoItem 컴포넌트가 어떤 값을 props로 받을지 미리 정의해둔 설계도
    todo: Todo;
    onToggle: (id:number)=> void;
    onDelete: (id:number)=> void;
}
//자식 컴포넌트 Todoitem 이라는 컴포넌트를 만듬
const TodoItem = ({todo, onToggle, onDelete}:TodoItemProps)=>{

    return(
        <>
        <li style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
            <span onClick={()=>onToggle(todo.id)}
                style={{textDecoration: todo.isCompleted? "line-through" : "none"
                    , color: todo.isCompleted? "gray" : "black",  cursor: "pointer"
                }}>
                {todo.isCompleted ? "📌 " : "✅"}{todo.text}
            </span>
            <button onClick={()=>onDelete(todo.id)}>삭제</button>

        </li>
        
        
        </>
    )
}
const Interface= ()=>{

    const [text, setText] = useState("");
    const [todos, setTodos] = useState<Todo[]>([
        {id:1, text: "typescript 공부하기", isCompleted:false},
        {id:2, text: "react 예제만들기", isCompleted:false},
    ] )

    const handelToggle = (id:number) => {
        setTodos(prev=> (
            prev.map(todo=> 
                (todo.id===id 
                ? {...todo, isCompleted: !todo.isCompleted} 
                : todo
            ))
        ))

    }

    /*
    input onChange 👉 React.ChangeEvent<HTMLInputElement> 
    form onsubmint 👉 React.SubmitEvent<HTMLFormElement>
    button onClick 👉 React.MouseEvent<HTMLButtonElement>  

    input  → ChangeEvent (+textarea)
    form   → FormEvent
    click  → MouseEvent (+div)
     */
    
    const handleAddTodo = (e:React.FormEvent<HTMLFormElement>)=>{ //👉 React + TypeScript에서 e는 반드시 이벤트 타입을 지정

        e.preventDefault()
        if(text.trim() === '') return; //⭐⭐⭐
        
        setTodos(prev=> [
            ...prev, 
            { id: Date.now(), text: text, isCompleted: false}
        ]);
        setText("");  //⭐⭐⭐

    }

    const handleDelete = (id:number)=>{
        setTodos(prev=> (
            prev.filter(todo=>(
                todo.id !== id  
            ))
        ))
    }

    return(
        <>
        <h1>오늘의 할일</h1>
        <form onSubmit={handleAddTodo}> {/* submit에서 preventDefault */}
            <input type="text"   //input은 form 안
                value={text}
                placeholder=" 할일을 입력하세요" 
                onChange={(e)=>setText(e.target.value)} />
            <button type="submit">추가</button>
        </form>
        
        <ul style={{listStyle:"none", padding:0}}>
            
            {todos.length ===0 ? (<p>할일을 추가해주세요</p>) : (
            todos.map(todo=> (
                <TodoItem 
                    key={todo.id}
                    todo={todo}
                    onDelete={handleDelete}
                    onToggle={handelToggle}/>
            )
            ))}
        </ul>
        </>
    )
}

export default Interface;