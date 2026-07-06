import { useState } from "react"

//1.Generic & class
class DataManager<T> {   //👉데이터 목록에서 일부만 골라서 수정하는 관리자”
    // constructor(private data:T[]){}    
    private data: T[];

    constructor(data: T[]){
        this.data = data;
    }

    //utility Type: partial을 사용하여 업데이트용 데이터 정의
    updateItem(index:number, changes:Partial<T>){
        //배열의 데이터를 수정하는 함수 
        //Partial<T>T에 모든 속성을 선택사항(option)으로 바꿔주는 utility type
        // ㄴ “전체 다 안 써도 되고 일부만 써도 됨”
        this.data[index] = {
            ...this.data[index], 
            ...changes
        };
        
    }
    getData() {return this.data } //data가 private이라 ... data꺼내줘야함
}
  //2.Union Type
type Status = "pending" | "success" | "error";

    //아이템이라는 자료형 cf) interface 자바에서는 추상화
interface Item {
    id: number;
    name:  string;
    price: number;
}
    /*
    <T> 제네릭(generic) 어떤 자료형이든 들어올수있는 빈 타입
    constructor(private data:T[]){} 클래스가 만들어 질 때 실행되는 생성자
    data라는 배열을 전달 받습니다
    T[] T타입의 배열
    private 클래스 밖에서 접근불가
     */

export const ClassUnion = () => {


    //3.제네릭활용
    const [manager, setManager] =useState<DataManager<Item>>(new DataManager<Item>([
        {id:1, name:"럭셔리가방", price: 800000}
    ]))
    
    const [status, setStatus] = useState<Status>('pending');
    
    //4.function casting(as키워드)
    const handlelog = (e:React.MouseEvent) => {  //e.target : 뭘클릭햇는진 모름
        //버튼을 클릭하면 실행되는 함수
        const target = e.target as HTMLButtonElement; //캐스팅 (버튼이라고 확정)
        console.log(target.textContent); //버튼안 글자 출력
    }

    const toggleStatus = ()=>{
        setStatus(prev=> prev==='pending'? 'success':'pending') 
    }

    const handleUpdate = ()=> {
        manager.updateItem(0, { price: 850000 });

        setManager(new DataManager<Item>([...manager.getData()]));
        //완전히 새로운  DataManager객체를 세팅해줘야  React가 바뀜인지 리렌더링
    }
    return(
        <>
        <h1>Status:{status}</h1>
        <button onClick={handlelog}>로그출력</button>
        <button onClick={toggleStatus}>상태변경</button>
        <button onClick={handleUpdate}>가격수정</button>
        <pre>
            {JSON.stringify(manager.getData(), null, 2)} {/*2칸씩 들여 쓰기 옵션*/}
        </pre>


        <h1>핵심 개념 설명</h1>
        <p> ➡️ ⭐Union(|): or 하나의 변수가 여러 타입중 무조건 하나를 가질 수 있게 한다
            ➡️ Type Casting (as 키워드) : as 키워드를 사용하여 특정함수나 값을 강제로 다른 타입으로
            간주하게 함. <br /> as HTMLButtonElement 얘버튼이야! 확정지어줌
            Class : 객체 지향 프로그래밍에 타입스크립트에서 클래스에 타입을 엄격히 부여
            Generic(): 사용할때 타입을 지정 
            ➡️ ⭐ 제네릭 (Generic 꺽 T 쇠 ) : "비어있는 만능 상자"
            함수나 클래스 정의할떄 타입을 고정하지 않고 사용할 때 타입을 지정 재사용성극대화
            utility Type: 타입스크립트가 기본 제공하는 타입변환 도구...
            ➡️ ⭐ Utility Type : Partial 꺽T쇠 (일부만 수정하기 찬스)
            수정할 때 편하게 속성들을 '선택 사항'으로 바꿔주는 치트키
            {/* Partial<T> */} 모든속성을 선택적으로 만듦 
            {/* Pick<T,K> 특성 속성만 골라냄
                Readonly<T> : 모든속성을 읽기 전용으로 ...*/}
        </p>
        
        </>
    )
}