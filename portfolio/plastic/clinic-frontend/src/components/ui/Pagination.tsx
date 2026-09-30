// src/components/common/Pagination.tsx
import React from "react";
import * as S from "@/assets/css/common/Pagination.style"; // 스타일을 공용 스타일로 빼거나 그대로 사용
import { FiChevronLeft, FiChevronsLeft, FiChevronsRight, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // 5개씩 그룹핑하는 로직을 컴포넌트 내부로 쏙 숨김 (캡슐화!)
    const maxPageBtns = 5;
    const currentGroup = Math.ceil(currentPage / maxPageBtns);
    const startPage = (currentGroup - 1) * maxPageBtns + 1;
    const endPage = Math.min(startPage + maxPageBtns - 1, Math.max(totalPages, 1));

    const pageNumbers = Array.from(
        { length: Math.max(endPage - startPage + 1, 0) }, 
        (_, i) => i + startPage
    );

    // 데이터가 아예 없어서 totalPages가 0이거나 할 때의 방어
    const safeTotalPages = Math.max(totalPages, 1);

    return (
        <S.PaginationContainer>
            {/* 맨 처음으로 */}
            <S.PageButton 
                onClick={() => onPageChange(1)}
                disabled={currentPage <= 1}
            >
                <FiChevronsLeft size={16}/>
            </S.PageButton>

            {/* 이전 페이지 */}
            <S.PageButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                <FiChevronLeft size={16}/>
            </S.PageButton>

            {/* 페이지 번호 목록 */}
            <S.PageNumberGroup>
                {pageNumbers.map(page => (
                    <S.PageNumberBtn 
                        key={page}
                        $active={currentPage === page}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </S.PageNumberBtn>
                ))}
            </S.PageNumberGroup>

            {/* 다음 페이지 */}
            <S.PageButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= safeTotalPages}
            >
                <FiChevronRight size={16}/>
            </S.PageButton>

            {/* 맨 끝으로 */}
            <S.PageButton
                onClick={() => onPageChange(safeTotalPages)}
                disabled={currentPage >= safeTotalPages}
            >
                <FiChevronsRight size={16}/>
            </S.PageButton>
        </S.PaginationContainer>
    );
}

/*

// 🌟 캡슐화된 페이지네이션 컴포넌트 사용 *
<Pagination 
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={(page) => setCurrentPage(page)}
/>

 */