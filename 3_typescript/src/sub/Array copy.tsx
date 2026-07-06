import { useState } from "react";

interface Todo {
    id: number;
    text: string;
    isCompleted: boolean;
}

const Array = () => {
    
    const [inputText, setInputText] = useState<string>("");
    const [todos, setTodos] = useState<Todo[]>([]);

    
    const handleAddtodo = () => {

        if(inputText.trim() === '') return;

        const newTodo: Todo ={
            id: Date.now(),
            text: inputText,
            isCompleted: false
        }
        setTodos(prev=>[...prev, newTodo]) ////추가할거

        setInputText("");
    }

    const handleDelete = (id:number) => {

        setTodos(prev=> prev.filter(todo=> todo.id !== id)); /////
    }

//⭐⭐⭐⭐⭐⭐⭐
   const handleToggle = (id:number) => {
        setTodos(prev=> 
            prev.map(todo=>
                todo.id === id ? {...todo, isCompleted : !todo.isCompleted}
                : todo
            )
        )
   }; 

    return(
        <>
        
        <h1>할일목록</h1>
        <div>
            <input 
            type="text" 
            value={inputText}
            onChange={e=>setInputText(e.target.value)}
            placeholder="할 일 입력하세요"
            />
            <button onClick={handleAddtodo}>등록</button>
        <h2>배열[] 데이터를 화면에 렌더링하기</h2>
        <ul>
            {todos.length===0 ? (<p>할 일이 없습니다</p>) : (
               
              todos.map(todo => (
                <li key={todo.id}
                onClick={()=>handleToggle(todo.id)}
                style={{
                listStyle:"none" ,display:"flex", gap: "20px", marginBottom:"8px"}} 
                >
                <span style={{color: todo.isCompleted? "gray": "black",
                    textDecoration: todo.isCompleted? "line-through" : "none"}}>
                    {todo.isCompleted? "👑 ":"✨ "}{todo.text}
                </span>
                <button onClick={()=>handleDelete(todo.id)}>
                    삭제
                </button>
                </li>
              ))      

            )
            }
        </ul>   

        </div>
        
        </>
    )
    
    
}

export default Array;