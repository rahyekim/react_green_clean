
import { useState, useTransition } from "react";



const SearchResults = ({query}) => {

    const items = [];

    if(query){
        for(let i=0 ; i < 100 ; i++){
            items.push( <li key={i}>
                Resul for {query} - {i}
            </li>)
        }
    }

    return <ul>{items}</ul>
    
}



const Trans = () => { //영상 생동감 있게... transition 효과....


    const [ input, setInput] = useState('');
    //입력하는 타이핑 그대로의 값을 저장할 공간
    const [query, setQuery] = useState('')
    //검색 결과 컴퓨터가 저장할 값을 저장할 공간
    const [isPending, startTransition] = useTransition();
    /*

    isPending : 지금 천천히 처리하라고 한 작업이 아직 계산중이니?
    startTransition : 이안에 있는 작업 급한거 아니니까 천천히
    
    */
   const handleChange = (e)=> { 

    setInput(e.target.value); //1쑨위

    startTransition(()=>{ ////2순위
        setQuery(e.taget.value); 
    
    })
   }
    
    
    return(
        <>

        <h1>React Transitions</h1>
        <h3>
        - 사용자 인터페이스가 멈출수 있는 느린작업
        - 당장 중요하지 않은 업데이트 
        - 검색 결과가 표시되는데 시간 걸림

        지루하지않게 재밌게 만들어쥼............ㅋ키ㅣ키키키
        </h3>
        <input 
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="type to search..."
             />
            {isPending && <p> Loading result...</p>}
            <SearchResults query={query}/>  {/*??????? */} 
        </>
    )
};

export default Trans;