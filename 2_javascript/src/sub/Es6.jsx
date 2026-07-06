
const Es6 = () => {

    //1.변수 (let, const)
    const title = "es6 학습페이지" ; 
    let count= 0;
    //2.화살표 함수
    const sayHello = () => console.log("안녀엉")
    //3.템플릿 문자열
    const greeting = `${title}에 오신것을 환영합니다.`
    //4. 배열 맵(map)
    const list = ["class", "화살표함수", "구조분해"]
    //5.구조분해
    const user = { name : "Jin", age: "99"}
    const {name, age} = user;
    //6. 스프레드 연산자 [...]
    const oldList = [1,2]
    const newList = [...oldList, 100, 101, 102]


    return(

        <>
        <div className="">
            <h1>{greeting}</h1>
            <p> 구조 분해된 이름: {name}, 나이:{age} </p>
            <ul>
                {list.map((item,index) => 
                    <li key={index}> 
                     {item}
                    </li> 
                )}
            </ul>
        </div>
        
        </>
    )
}

export default Es6;