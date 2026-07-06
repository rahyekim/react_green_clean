import { forwardRef, useRef } from "react";

//보통 리액트에서는 부모가 자식의 알맹이 html태그를 직접 건드릴수없음
//그러나 forward Ref 를 사용하면 통로가 열린다
//레퍼런스(참조)를 앞으로 전달하기
//부모가 보낸 리모컨(ref)를 자식이 받아서 쓸수있도록 배달(전달)해주는 포장지역할

const MyInput = forwardRef((props,ref)=> (
    <input type="text" ref={ref} {...props} />
))
const Fref = () => {
    const inputRef = useRef(null);
    const focusInput = ()=>{
        
        //?????????????????//
        inputRef.current.focus();
    }

    return(
        <>
        <h1>Forward Ref</h1>
        <h3>
            컴포넌트가 자식요소중 하나에 대한 참조를 전달
        </h3>
        <h4>
            -입력 요소에 집중
            -애니메이션 트리거링
            -dom 요소 측정
            -타사라이브러리와 통합
        </h4>

        <MyInput ref={inputRef} placeholder="type here..."/>
        <button onClick={focusInput}>검색</button>
        </>
    )
};

export default Fref;