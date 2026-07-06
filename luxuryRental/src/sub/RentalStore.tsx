import * as R from '../css/RentalStore.styles';

//Mock Data 임시데이터
const products= [
    {id:1, brand:'샤넬', name:'클래식 플랙백', price: "₩50,000/일"},
    {id:2, brand:'에르메스', name:'버킨 25', price: "₩50,000/일"},
    {id:3, brand:'구찌', name:'홀스빗 1955', price: "₩50,000/일"},
    {id:4, brand:'디올', name:'레이디 디올', price: "₩50,000/일"},
]

export const RentalStore = () => {

    
    
    return(
        <>
        <R.Title>추천 렌탈 상품</R.Title>
        <R.ProductGrid>{products.map(p=>(
            <R.ProductCard key={p.id}>
                <R.ProductImage>IMG</R.ProductImage>
                <R.ProductInfo>
                <span className="brand">{p.brand}</span>
                <span className="name">{p.name}</span>
                <span className="price">{p.price}</span>
                </R.ProductInfo>
            </R.ProductCard>
        ))}</R.ProductGrid>
        
        </>
    )
};
