import { useState } from "react";

interface Todo{
    id: number;
    text: string;
    isCompleted: boolean;
    updatedAt: string;
}

export const ClassUnion= () => {

    const[todos, setTodos] = useState<Todo[]>([
        { id: 1, text: "TypeScript 공부하기", isCompleted: false, updatedAt: "2026-07-01" },
        { id: 2, text: "맛있는 저녁 먹기", isCompleted: false, updatedAt: "2026-07-01" }
    ])

    //🌟 특정 Todo의 일부 속성만 수정하는 만능 함수 partial
    const updateTodoItem = (id:number, changes: Partial<Todo>) =>{
        setTodos(prev=>
            prev.map(todo=> //id가 일치하는 할 일 찾으면 기존 내용에 change(수정내용)이 덮어씀
                todo.id === id ? {...todo, ...changes} : todo
            )
        )        
    }

    return(
        <>
        <div>
            {todos.map(todo=>(
                <div key={todo.id}>
                    <span 
                    style={{textDecoration: todo.isCompleted? "line-through" : "none"}}
                    > {todo.isCompleted? "💬 " : "📍 "}{todo.text}</span>
                    <button onClick={()=>
                        updateTodoItem(todo.id,{isCompleted: !todo.isCompleted} )}>
                    {todo.isCompleted ? "완료":"not yet" }</button>
                </div>
            ))}
        </div>
        </>
    )
}