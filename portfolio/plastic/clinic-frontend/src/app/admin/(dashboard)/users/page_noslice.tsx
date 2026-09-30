"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "@/assets/css/admin/User.style";
import { FiTrash2, FiSearch, FiCheck, FiUserX, FiChevronLeft, FiChevronsLeft, FiChevronsRight, FiChevronRight } from "react-icons/fi";
import usePopup from "@/hooks/usePopup";
import Popup from "@/components/ui/Popup";

// 임시 회원 데이터 인터페이스
interface UserData {
    idx: number;
    name: string;
    userId: string;
    phone: string;
    joinDate: string;
    status: "정상" | "정지";
}

export default function Users() {
    const {popupConfig,closePopup,openPopup}=usePopup();
    
    //상태 관리: 회원 목록
    const [userList, setUserList] = useState<UserData[]>([]);
    //💙 페이지네이션 상태 관리 (한 페이지당 10명)
    const [currentPage, setCurrentPage]=useState<number>(1);
    const [totalPages, setTotalPages]=useState<number>(1); //서버가줌
    const [totalCount, setTotalCount]=useState<number>(0); //전체회원수
    // 🔍 검색어 
    const [searchKeyword, setSearchKeyword]=useState<string>(''); //실제로 검색에쓰이는값
    const [searchInput, setSearchInput]=useState<string>(''); //입력창에 적히는값
    
    //한 페이지당 개수
    const limit = 10;

    //화면로드시 데이터조회
    useEffect(()=>{
        fetchusers(currentPage, searchKeyword);
    },[currentPage, searchKeyword])

    const fetchusers = async(page:number, search:string )=>{
        try{
            // 백엔드가 만든 쿼리스트링 파라미터(page, limit, search) 전송
            const res= await axios.get('http://localhost:4000/api/admin/users',{
                params:{
                    page,  //page:currentPage
                    limit,   //limit:10
                    search  //search:searchKeyword
                }
            })
            if(res.data.success){
                const formattedUsers = res.data.data.map((user:any)=>({
                    idx:user.USER_IDX,
                    name:user.USER_NAME,
                    userId:user.USER_ID,
                    phone:user.PHONE,
                    status:user.STATUS || '정상',
                    joinDate:user.REG_DATE ? 
                    new Date(user.REG_DATE).toISOString().split('T')[0] 
                    : '2026-09-01',
                }));
                setUserList(formattedUsers);
                // 서버가 계산해 준 총 페이지 수/전체 회원 수
                setTotalCount(res.data.pagination.totalCount);
                setTotalPages(res.data.pagination.totalPages);
            }
        }catch(err){
            console.error('회원목록불러오기실패:', err)
        }
    }

    // 🔍 검색 버튼 클릭 시
    const handleSearch = ()=>{
        setSearchKeyword(searchInput);
        setCurrentPage(1); // 검색 시 무조건 1페이지로 초기화
    }

    // 엔터키로 검색할 때
    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            handleSearch();
        }
    }

    // 💙페이지 번호 그룹핑 계산 (최대 5개씩)
    const maxPageBtns = 5;
    const currentGroup = Math.ceil(currentPage / maxPageBtns);
    let startPage = (currentGroup - 1) * maxPageBtns + 1;
    let endPage = Math.min(startPage + maxPageBtns - 1, totalPages);
    // ----------------------------------------------------
    // 1. 회원 상태 변경 토글 (정상 <-> 정지)
    // ----------------------------------------------------
    //✨ 낙관적 업데이트 적용 코드 (먼저 바꾸고 서버 요청)
    const toggleStatus = async (idx: number) => {
    
    // 에러 났을 때 되돌리기 위한 백업
    const previousUserList = [...userList]; 

    // ⚡서버 응답을 기다리지 않고 화면을 당장 먼저 바꿈
    setUserList(userList.map(user => 
        user.idx === idx 
            ? { ...user, status: user.status === "정상" ? "정지" : "정상" } 
            : user
    ));

    try {
        // 2. 백그라운드에서 서버 요청 전송
        const res = await axios.put(`http://localhost:4000/api/admin/users/${idx}/status`);
        
        if (!res.data.success) {
            throw new Error("서버 처리 실패");
        }
    } catch (err) {
        console.error('상태 변경 실패:', err);
        //[롤백] 서버에서 에러가 나면 아까 백업해 둔 원래 상태로 원상복구
        setUserList(previousUserList);
        openPopup('알림', '상태 변경에 실패했습니다');
    }
};

    // ----------------------------------------------------
    // 2. 회원 삭제 기능 (팝업 열기 & 실제 삭제)
    // ----------------------------------------------------
    const handleDeleteClick = (idx: number) => {
        openPopup(
        '삭제 확인', 
        `해당 회원 정보를 정말 삭제하시겠습니까? (이 작업은 되돌릴 수 없습니다)`,
        async()=>{
            try{
                const res= await axios.delete(`http://localhost:4000/api/admin/users/${idx}`)
                if(res.data.success){
                     setUserList(userList.filter(
                        item => item.idx !== idx));
                }
                closePopup();
            }catch(err){
            console.error('회원삭제실패:', err)
            openPopup('알림','회원 삭제에 실패했습니다');
            }
        }
    )
    };

    return (
        <>
        <S.UserContainer>
            <S.UserPageHeader>
                <S.UserPageTitle>회원 관리</S.UserPageTitle>
            </S.UserPageHeader>

            {/* 🔍 검색 영역 */}
            <S.UserFilterCard>
                <S.UserInputGroup>
                    <S.UserInput
                    type="text" 
                    placeholder="이름, 아이디 또는 연락처 검색" 
                    value={searchInput}
                    onChange={e=>setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown} //e=>e.key ==='Enter' && handleSearch()
                    />
                    <S.UserSearchButton
                    onClick={handleSearch}
                    >
                        <FiSearch size={16} /> 검색
                    </S.UserSearchButton>
                </S.UserInputGroup>
            </S.UserFilterCard>

            {/* 🎯 회원 내역 데이터 테이블 */}
            <S.UserTableCard>
                <S.UserCardHeader>
                    <S.UserCardTitle>가입 회원 목록 (총 {userList.length}명)</S.UserCardTitle>
                </S.UserCardHeader>
                
                <S.UserTableWrapper>
                    <S.UserTable>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>이름</th>
                                <th>아이디(이메일)</th>
                                <th>연락처</th>
                                <th>가입일자</th>
                                <th>상태</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((item, index) => (
                                <tr key={item.idx}>
                                    <td>{totalCount-((currentPage-1)* limit + index) }</td>
                                    <td><strong>{item.name}</strong></td>
                                    <td>{item.userId}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.joinDate}</td>
                                    <td>
                                        <S.UserStatusBadge 
                                            $status={item.status} 
                                            onClick={() => toggleStatus(item.idx)}
                                        >
                                            {item.status === "정상" ? <FiCheck size={12} /> : <FiUserX size={12} />}
                                            {item.status}
                                        </S.UserStatusBadge>
                                    </td>
                                    <td>
                                        <S.UserDeleteActionBtn onClick={() => handleDeleteClick(item.idx)}>
                                            <FiTrash2 size={16} />
                                        </S.UserDeleteActionBtn>
                                    </td>
                                </tr>
                            ))}
                            {userList.length === 0 && (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center', padding: '3rem' }}>
                                        가입된 회원 내역이 없습니다.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </S.UserTable>
                </S.UserTableWrapper>

                {/*🌟페이지네이션 */}
                <S.PaginationContainer>
                    {/* 맨처음으로 */}
                    <S.PageButton 
                    onClick={()=>setCurrentPage(1)}
                    disabled={currentPage===1}
                    >
                        <FiChevronsLeft size={16}/>
                    </S.PageButton>

                    {/* 이전페이지 */}
                    <S.PageButton
                    onClick={()=>setCurrentPage(prev=> Math.max(prev-1,1))}
                    disabled={currentPage===1}
                    >
                        <FiChevronLeft size={16}/>
                    </S.PageButton>

                    {/* 페이지번호목록 5개씩만 노출*/}
                    <S.PageNumberGroup>
                        {Array.from({length:Math.max(endPage - startPage + 1, 0)},(_,i)=>i+startPage).map(page=>(
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
                    onClick={()=>setCurrentPage(prev=> Math.min(prev+1,totalPages))}
                    disabled={currentPage===totalPages}
                    >
                        <FiChevronRight size={16}/>
                    </S.PageButton>
                    <S.PageButton
                    onClick={()=>setCurrentPage(totalPages)}
                    disabled={currentPage===totalPages}
                    >
                        <FiChevronsRight size={16}/>
                    </S.PageButton>
                </S.PaginationContainer>
            </S.UserTableCard>
        </S.UserContainer>

        <Popup 
        isOpen={popupConfig.isOpen} 
        title={popupConfig.title}
        onClose={closePopup}
        onConfirm={popupConfig.onConfirm}
        >{popupConfig.message}
        </Popup>
        </>
    );
}