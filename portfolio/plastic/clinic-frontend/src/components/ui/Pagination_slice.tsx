import React from "react";
import { useState } from "react";
import * as S from "@/assets/css/admin/User.style";
import { 
    FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight 
} from "react-icons/fi";

interface PaginationProps{
    // currentPage:number;
    totalPages:number;
    onPageChange:(page:number)=>void;
}

export default function Pagination({
     totalPages, onPageChange  //currentPage,
}:PaginationProps){

    //💙 상태관리: 페이지네이션 (현재페이지번호, 총페이지수)
    const [currentPage, setCurrentPage]=useState<number>(1);
    // const totalPages = 16; //예시
    const maxPageBtns =5;

    //안전장치:totalPages가 0이면 최소1페이지로설정
    const safeTotalPages =
    totalPages === 0 ? 1 : totalPages;
    
    const currentGroup = Math.ceil(currentPage/maxPageBtns);
    let startPage = (currentGroup-1)* maxPageBtns+1;
    let endPage = Math.min(startPage + maxPageBtns -1 , safeTotalPages)

    return(
        <>
        <S.PaginationContainer>
            {/* 맨처음으로 */}
            <S.PageButton
            onClick={()=> onPageChange(1)}
            disabled={currentPage===1}
            >
                <FiChevronsLeft size={16}/>
            </S.PageButton>
        
            {/* 이전페이지 */}
            <S.PageButton
            onClick={()=> onPageChange(Math.max(currentPage-1,1))}
            disabled={currentPage===1}
            >
                <FiChevronLeft size={16}/>
            </S.PageButton>

            {/* 페이지번호목록 ...*/}
             <S.PageNumberGroup>
                {Array.from({length:(endPage-startPage+1)},(_,i)=>i+startPage).map(page=>(
                    <S.PageNumberBtn 
                    key={page}
                    $active={currentPage===page}
                    onClick={()=>setCurrentPage(page)}
                    >
                        {page}
                    </S.PageNumberBtn>
                ))}
            </S.PageNumberGroup>
                
            {/* 다음페이지 */}
            <S.PageButton
            onClick={()=> onPageChange(Math.min(currentPage+1,totalPages))}
            disabled={currentPage===endPage}
            >
                <FiChevronRight size={16}/>
            </S.PageButton>

            <S.PageButton
            onClick={()=> onPageChange(totalPages)}
            disabled={currentPage===endPage}
            >
                <FiChevronsRight size={16}/>
            </S.PageButton>


        </S.PaginationContainer>
        </>
    )
    
}

/*
<Pagination 
    currentPage={currentPage} 
    totalPages={totalPages} 
    onPageChange={(page) => setCurrentPage(page)} 
/>
 */