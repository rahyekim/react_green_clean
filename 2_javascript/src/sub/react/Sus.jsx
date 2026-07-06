
import { Suspense, lazy } from "react";

// 코드분할 code splitting 과 지연로딩 lazy loading

const Cars = lazy(()=> import('./cars'))

// 컴퓨터 cars라는 부속을 지금 당장 가져오지말고 나중에 그릴때 가져와...
const Sus = () => {
    return(
        <>
        <h1>React Suspense</h1>
        <h3>코드나 데이터가 load 될 때까지 기다리는 동안 대체 html을
            표시 할 수 있다
        </h3>
        <h3>💡 지연로딩 lazy 로딩이라는 것을 사용하면 컴포넌트를 동적으로 가져올 수 있음</h3>

        <Suspense fallback={<div>loading...</div>}>
        <Cars/>
        </Suspense>
        
        
        
        </>
    )
};

export default Sus;