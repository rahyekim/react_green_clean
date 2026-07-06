import { useState } from "react";

//union Type
type OrderStatus= "배송준비" | "배송중" | "배송완료";

interface DeliveryBox<T>{ //모든종류받을수있는...
    boxId: number;
    status: OrderStatus;
    content: T; // T 자리에 가방이든 신발이든 아무거나
}

//가상의 상품타입들
interface Bag{ name: string; price: number;}
interface Shoes{brand: string; size: number;}

export const ClassUnion = () => {

    const[bagDelivery, setBagDelivery]= useState<DeliveryBox<Bag>>({
        boxId: 101,
        status: "배송준비", // 초기 상태는 Union 타입 중 하나
        content: { name: "럭셔리 가방", price: 850000 } // T 자리에 Bag이 들어옴
    });

    const changeStatus = (nextStatus: OrderStatus) =>{
        setBagDelivery(prev=>(
            {   ...prev, 
                status: nextStatus //배송상태 업데이트
            }
        ))
    }

    return(
        <>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', margin: '20px 0' }}>
            <h2>📦 택배 배송 상태 조회 (Union + Generic)</h2>

            <pre style={{ background: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
                {JSON.stringify(bagDelivery, null, 2)}
            </pre>

            <hr style={{margin:"20px 0"}}/>
            <h3>👇 버튼을 눌러 배송 상태(Union)를 변경해 보세요!</h3>
            
            {/* 버튼을 누를 때 정확한 Union 타입 글자만 넘겨줌 */}
            <button 
                onClick={()=>changeStatus("배송중")}
                style={{ marginRight: '10px', padding: '10px', cursor: 'pointer' }}
            >🚚 배송 시작 처리</button>

            <button 
                onClick={() => changeStatus("배송완료")}
                style={{ marginRight: '10px', padding: '10px', cursor: 'pointer' }}
            > ✅ 배송 완료 처리</button>
            <button 
                onClick={() => changeStatus("배송준비")}
                style={{ padding: '10px', cursor: 'pointer', background: '#eee' }}
            >↩️ 되돌리기 </button>
                
        </div>
        </>
    )
}