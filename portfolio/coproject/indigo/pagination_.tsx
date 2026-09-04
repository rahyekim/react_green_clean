import { useState } from "react"

const Pagination =() =>{

    const [currentPage, setCurrentPage]=useState(1);
    const totalItems = 75;
    const itemsPerPage =10;
    const pageLimit =5;

    //1 5/pageLimit  1-5 6-10 11-15
    const currentGroup = Math.floor((currentPage-1)/ pageLimit)
    const totalPages = Math.ceil(totalItems/itemsPerPage); //8
    const lastGroup = Math.floor((totalPages-1) / pageLimit )

    //현재그룹의 첫페이지 끝페이지 1,6,11
    const startPage = currentGroup * pageLimit +1 
    const endPage = Math.min( startPage+pageLimit -1,totalPages)

    //현재그룹에 보여줄 페이지 번호 배열생성
    const pageNum = Array.from(
        {length: endPage-startPage+1}, 
        (_,i)=> startPage+i //1,2,3,4,5
    );

    return(
        <div className="pagenationContainer">
            <button
            onClick={()=>setCurrentPage(Math.max(currentPage-pageLimit,1))}
            disabled={currentGroup===0}
            >&lt;&lt;
            </button>
            <button
            type="button"
            onClick={()=>setCurrentPage(Math.max(currentPage-1,1))}
            disabled={startPage===1}
            >&lt;</button>

            {/* 페이지 번호 버튼들 */}
            {pageNum.map(num=>(
                <li key={num}>
                   <button
                   $isActive={currentPage===num}
                   onClick={()=>setCurrentPage(num)}
                   >{num}</button> 
                </li>
            ))}

            <button
            onClick={()=>setCurrentPage(Math.min(currentPage+1,totalPages))}
            disabled={currentPage===totalPages}
            >&gt;
            </button>
              <button
            onClick={()=>setCurrentPage(Math.min(currentPage+pageLimit,totalPages))}
            disabled={currentGroup>=lastGroup}
            >&gt;&gt;
            </button>
            
            
            
        </div>
    )
    
}

/*
// =======================
// 스타일링 (Styled-Components)
// =======================

const PageButton = styled.button`
  min-width: 32px;
  height: 32px;
  padding: 0 6px;
  border: 1px solid #ddd;
  background-color: ${({ $isActive }) => ($isActive ? "#111" : "#fff")};
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#333")};
  font-size: 14px;
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  // 마우스 올렸을 때 
  &:hover {
    background-color: #f0f0f0;
  }
//비활성화 상태(:disabled)가 아닐 때만, 
// 마우스 오버(:hover) 효과를 적용

  &:hover:not(:disabled) {
    background-color: #eee;
    color: #111;
  }

  // 비활성화 상태일 때 
  &:disabled {
    background-color: #f5f5f5;
    color: #ccc;
    cursor: not-allowed;
  }
`;

}


데이터가 적고(보통 100개 미만) 자주 바뀌지 않는다->클라이언트 사이드
데이터가 많거나 계속 늘어난다->무조건 서버 사이드 페이지네이션 백엔드 개발자분께 
페이지 번호랑 한 페이지당 개수 보내드릴 테니, 
해당 페이지 데이터랑 전체 개수(totalCount) 같이 내려주세요!"
 */

