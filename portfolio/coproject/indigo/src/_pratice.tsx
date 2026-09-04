import { useState, useEffect } from "react";

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    
    // 백엔드에서 받아온다고 가정하는 상태값들
    const [totalItems, setTotalItems] = useState(0); // 서버가 알려주는 총 데이터 개수
    const [itemsPerPage] = useState(10); // 한 페이지당 보여줄 개수
    const pageLimit = 5; // 화면에 보여줄 페이지 번호 개수 (1~5, 6~10 등)

    // 백엔드 데이터 fetching 시뮬레이션
    useEffect(() => {
        // 실제로는 이 안에서 API를 호출합니다!
        // 예: fetch(`/api/items?page=${currentPage}&limit=${itemsPerPage}`)
        //   .then(res => res.json())
        //   .then(data => {
        //       setTotalItems(data.totalCount); // 서버가 준 전체 아이템 개수
        //       setItems(data.items);           // 현재 페이지의 데이터 목록
        //   });

        // (테스트용 가상 데이터 설정)
        setTotalItems(75); 
    }, [currentPage, itemsPerPage]); // 페이지가 바뀔 때마다 서버에 데이터를 다시 요청!

    // --- 그룹 및 페이지 계산 로직 (서버 사이드에서도 동일하게 사용) ---
    const currentGroup = Math.floor((currentPage - 1) / pageLimit);
    const totalPages = Math.ceil(totalItems / itemsPerPage); 
    const lastGroup = Math.floor((totalPages - 1) / pageLimit);

    const startPage = currentGroup * pageLimit + 1; 
    const endPage = Math.min(startPage + pageLimit - 1, totalPages);

    const pageNum = Array.from(
        { length: Math.max(0, endPage - startPage + 1) }, 
        (_, i) => startPage + i
    );

    return (
        <div className="pagenationContainer">
            {/* 첫 그룹으로 이동 */}
            <button
                onClick={() => setCurrentPage(Math.max(currentPage - pageLimit, 1))}
                disabled={currentGroup === 0}
            >
                &lt;&lt;
            </button>

            {/* 이전 페이지로 이동 */}
            <button
                type="button"
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {/* 페이지 번호 버튼들 */}
            {pageNum.map(num => (
                <li key={num} style={{ listStyle: 'none', display: 'inline-block' }}>
                    <button
                        $isActive={currentPage === num}
                        onClick={() => setCurrentPage(num)}
                    >
                        {num}
                    </button> 
                </li>
            ))}

            {/* 다음 페이지로 이동 */}
            <button
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
            >
                &gt;
            </button>

            {/* 다음 그룹으로 이동 */}
            <button
                onClick={() => setCurrentPage(Math.min(currentPage + pageLimit, totalPages))}
                disabled={currentGroup >= lastGroup}
            >
                &gt;&gt;
            </button>
        </div>
    );
};

export default Pagination;