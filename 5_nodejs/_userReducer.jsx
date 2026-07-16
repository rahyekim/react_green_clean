import { useReducer, useState } from "react";

const reducer = (action, state)=>{
    switch (action.type){
        case "plus": return {count : state.count +1}
        case "minus" : return {count: state.count-1}
        default: return state;
    }
}

export default function App(){

    const [state, dispatch] = useReducer(reducer, {count:0})

    return(
        <>
        <h2>count</h2>
        <button onClick={()=>dispatch({type: "plus"})}>
            +
        </button>
        <button onClick={()=>dispatch({type: "minus"})}>
            -
        </button>
        </>
    )
}

const initialSate ={
    count:0,
    name: "Jin",
    isLogin: false
};

function reducer(state, action) {
  switch(action.type) {

    case "LOGIN":
      return {
        ...state,
        isLogin: true
      };

    case "LOGOUT":
      return {
        ...state,
        isLogin: false
      };

    default:
      return state;
  }
}

//reducer(현재상태,전달받은액션)

const reducer = (state, action)=>{
    switch (action.type){
        case "plus": return {count : state.count + action.payload}
        case "minus" : return {count: state.count- action.payload}
        default: return state;
    }
}

export default function App(){

    const [state, dispatch] = useReducer(reducer, {count:0})

    return(
        <>
        <h2>{state.count}</h2>
        <button onClick={()=>dispatch({type: "plus", payload:5})}>
            +5
        </button>
        <button onClick={()=>dispatch({type: "minus", payload:10})}>
            -10
        </button>
        </>
    )
}

const reducer = (state, action)=>{
    switch (action.type){
        case "Add": 
            return [
                ...state,
                {
                    id:Date.now(),
                    text: action.payload,
                    done:false
                }
            ];
        case "Delete":
            return state.filter(todo=> todo.id !== action.payload);
        
        case "Toggle":
            return state.map(prev=>(
                prev.id == action.payload 
                ? {...prev, done: !prev.done}
                : prev
            ));
        default: return state;
    }
}

export default function App(){
    const [state, dispatch] = useReducer(reducer, []);
    const [input, setInput]= useState("");

    const addTodo = () =>{
        dispatch({
            type: "Add",
            payload: input
        });
        setInput("");
    };

    return(
        <>
        <div>
            <input
            value={input}
            onChange={e=>setInput(e.target.value)}
            />
            <button onClick={addTodo}>추가</button>
        </div>

        {state.map(todo=>
        <>
            <div key={todo.id}>
                <span onClick={()=>
                    dispatch({type:"Toggle", payload:todo.id})
                }
                style={{textDecoration: todo.done? "line-through": "none"}}
                >{todo.text}</span>
            <button
            onClick={()=>dispatch({
                type: "Delete",
                payload: todo.id
            })}
            >삭제</button>
            </div>
        </>
        )}
    </>
    )
}

const reducer = (state, action)=>{
    switch(action.type){
        case "Add":
            return[
                ...state,
                {
                    id: Date.now,
                    text: action.payload,
                    toggle: false
                }
            ];
        case "Delete":
            return(
                state.filter(todo=> todo.id !== action.payload)
            );
        case "Toggle":
            return(
                state.map(todo=> 
                    todo.id === action.payload ?
                    {...todo, done: !todo.done }
                    : todo
                )
            )
        default: return state;
    }
}

export default function App(){

    const [state, dispatch] = useReducer(reducer, [])
    const [input , setInput] = useState("");

    const reduce=(state, action)=>{
        switch(action.type){
            case "Add":
                return[
                    ...state,
                    {
                        id: Date.now(),
                        text: action.payload,
                        isDone: false
                    }
                ];
            case "Delete":
                return (
                state.filter(todo=> (
                    todo.id !== action.payload
                )))
            
            case "Toggle":
                return(
                    state.map(todo=>
                        todo.id === action.payload ?
                        {...todo, isDone: !todo.isDone} :
                        todo
                    )
                )
            default:
                return state;
        }

    }
}