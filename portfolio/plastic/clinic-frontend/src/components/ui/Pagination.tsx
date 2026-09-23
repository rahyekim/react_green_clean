import React from "react";
import * as S from "@/assets/css/admin/User.style";
import { 
    FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight 
} from "react-icons/fi";

interface PaginationProps{
    currentPage:number;
    totalPages:number;
    onPageChange:(page:number)=>void;
}

export default function Pagination({
    currentPage, totalPages, onPageChange
}:PaginationProps){

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
            <S.PageButton
            onClick={()=> onPageChange(1)}
            disabled={currentPage===1}
            >
                <FiChevronsLeft size={16}/>
            </S.PageButton>

            <S.PageButton
            onClick={()=> onPageChange(Math.max(currentPage-1,1))}
            disabled={currentPage===1}
            >
                <FiChevronLeft size={16}/>
            </S.PageButton>

            {/* 페이지번호목록 ...*/}
 
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