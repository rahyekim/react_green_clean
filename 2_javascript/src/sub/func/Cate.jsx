import { useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";

/* */
/* 1. 데이터구조 (재귀적 데이터) */ 
              

const categoryData = [
    {
        name: "IT기기",
            children:[
                {name:"노트북", children: [{ name: "맥북"}, { name: "gram"}]},
                {name:"스마트폰", children: [{ name: "iphone"}, { name: "galaxy"}]},

            ]
    },
    {
        name: "의류",
            children:
                [{name:"상의"},{name:"하의"}],
    }
];

/* 핵심 자기가 폴더인지 파일인지 스스로판단해서 화면에 나타내는 컨포넌트 */ 
const CategoryItem = ({item})=> {

    //현재 폴더가 열려있는지(true)닫혀있는지(false) 기억하는 스위치
    const [isOpen, setIsOpen] = useState(false); 
    return(
        <>
        <Container>
            <Row>
                <Col>
                <div className="">
                {/* 클릭하면 열림/닫힘 토글 : 스위치를 반대로 바꿈, 열려있으면 닫고 닫혀잇으면 열고
                
                //setIsOpen(prev => !prev) 
                자식이있나요?
                네(폴더임) 지금열려있나요? 열려있으면 ▼ 닫혀있으면 ▶
                아니오(파일임) => 동그라미표시•
                */}
                    <div onClick={()=> setIsOpen(!isOpen)}>
                        {item.children ? (isOpen ? '▼ ' : '▶ ') : '• '}
                        {item.name} {/*그리고 그옆에 이름적어줌 */}
                    </div>
                </div>
                {/*3.재귀호출 하위항목이 있다면 자기 자신을 다시 렌더링
                재귀 호출: 하위 항목이 있고, 열려있다면 자기 자신을 다시 렌더링   
                
                */}
                 
                {isOpen && item.children && (
                    <div className="">
                        {item.children.map((child,i)=>
                            <CategoryItem key={i} item={child}/>
                        )} {/*핵심재귀호출 자식들을 하나씩 꺼내서 다시 자기자신에게 넘겨줒ㅁ*/}
                    </div>
                )}
                </Col>
            </Row>
        </Container>
        </>
    )
};
{/* 재귀호출 하위항목이 있다면 자기 자신을 다시 랜더링
    만약 폴더가 열려있고, */}

//메인페이지 컴포넌트  위의사항들을 화면에 보여주는 실행파일
const Cate =()=> {
    return(
        <div className="">
            <h2>재귀적 카테고리 메뉴</h2>
            {categoryData.map((item,i)=> 
                <CategoryItem key={i} item={item}/>

            )}
        </div>
    )
}
export default Cate;


/*                
<CategoryItem key={i} item={item}/>
Categoryitem

*/