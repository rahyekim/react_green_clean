import React, { useState } from "react";
import styled from "styled-components";

const Pagination = () => {
  // 예시 데이터 및 상태
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 37; // 전체 데이터 개수
  const itemsPerPage = 10; // 한 페이지당 보여줄 개수
  const pageLimit = 5; // 화면에 보여줄 최대 페이지 버튼 개수

  // 1. 그룹 및 전체 페이지 계산
  const currentGroup = Math.floor((currentPage - 1) / pageLimit);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 2. 현재 그룹의 시작 페이지와 끝 페이지 구하기
  const startPage = currentGroup * pageLimit + 1;
  const endPage = Math.min(startPage + pageLimit - 1, totalPages);

  // 3. 현재 그룹에 보여줄 페이지 번호 배열 생성 (startPage부터 i를 더해감)
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <PaginationContainer>
      {/* 이전 그룹으로 이동 버튼 (첫 그룹이면 비활성화) */}
      <PageBtn
        onClick={() => setCurrentPage(startPage - pageLimit)}
        disabled={startPage === 1}
      >
        &lt;
      </PageBtn>

      {/* 페이지 번호 버튼들 */}
      {pageNumbers.map((num) => (
        <PageBtn
          key={num}
          $isActive={currentPage === num}
          onClick={() => setCurrentPage(num)}
        >
          {num}
        </PageBtn>
      ))}

      {/* 다음 그룹으로 이동 버튼 (마지막 그룹이면 비활성화) */}
      <PageBtn
        onClick={() => setCurrentPage(startPage + pageLimit)}
        disabled={endPage === totalPages}
      >
        &gt;
      </PageBtn>
    </PaginationContainer>
  );
};

export default Pagination;

// =======================
// 스타일링 (Styled-Components)
// =======================
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 30px;
`;

const PageBtn = styled.button`
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

  &:hover:not(:disabled) {
    background-color: #eee;
    color: #111;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;