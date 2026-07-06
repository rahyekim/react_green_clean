import styled from "styled-components";

export const ProductGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: 16px;

`;

export const ProductCard = styled.div`
display: flex;
flex-direction: column;
background-color: #fff;
border-radius: 8px;
overflow: hidden;
box-shadow: 0 2px 4px rgba(0,0,0,0.05);
//좌우 이동 (x축) - 아래로 얼마나 떨어짐 (y축) - 퍼짐 정도 (blur) -  색 (검정 + 투명도)
`;

export const ProductImage = styled.div`
height: 150px;
background-color: #e9ecef;
display: flex; ////정렬!!!
align-items: center;
color: #adb5bd;
`;

export const ProductInfo = styled.div`
display: flex; ///정렬!! -> gap 사용가능(요소 “사이”에만 적용됨) => 자동관리
flex-direction: column;
padding: 12px; 
gap:4px;

.brand{
    font-size:0.75rem; 
    color: #6c757d;
    font-weight: 600;
}
.name{
    font-size:0.9rem; 
    color: #212529;
    font-weight: bold;
}
.price{
    font-size:0.85rem; 
    color: #0d62fd;
    margin-top: 8px;
}
`;

export const Title = styled.h2`

    margin-bottom: 16px;
    font-size: 1.2rem ;
`;


