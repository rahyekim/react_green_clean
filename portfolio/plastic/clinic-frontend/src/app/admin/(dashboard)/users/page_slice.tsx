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
    
    // 🎯 상태 관리: 회원 목록
    const [userList, setUserList] = useState<UserData[]>([]);

    //화면로드시 데이터조회
    useEffect(()=>{
        fetchusers();
    },[])

    const fetchusers = async()=>{
        try{
            const res= await axios.get('http://localhost:4000/api/admin/users')
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
            }
        }catch(err){
            console.error('회원목록불러오기실패:', err)
        }
    }

    //💙 페이지네이션 상태 관리 (한 페이지당 10명)
    const [currentPage, setCurrentPage]=useState<number>(1);
    const itemsPerPage = 10;

    //1️⃣ 전체 데이터 개수 기반으로 총 페이지 수 동적 계산 (데이터가 없으면 최소 1페이지)
    const totalPages = Math.ceil(userList.length / itemsPerPage) || 1;

    // 2️⃣ 현재 페이지에 보여줄 데이터 자르기 (slice) (0,10)(10,20)
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFistItem = indexOfLastItem - itemsPerPage;
    const currentItems= userList.slice(indexOfFistItem, indexOfLastItem);

    // 3️⃣ 페이지 번호 그룹핑 (최대 5개씩 노출)
    const maxPageBtns =5;  
    const currentGroup = Math.ceil(currentPage/maxPageBtns);
    //현재 그룹의 시작페이지와 끝 페이지 계산 (1~5, 6~10)
    let startPage = (currentGroup -1) * maxPageBtns +1 ;
    let endPage = Math.min(startPage+ maxPageBtns -1, totalPages);
    
    // 데이터가 줄어들어 현재 페이지가 총 페이지 수보다 커질 경우 방어 코드
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    // if(totalPages === 0) endPage =1; //데이터가없을시 방어코드
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

            {/* 🎯 검색 및 필터 영역 */}
            <S.UserFilterCard>
                <S.UserInputGroup>
                    <S.UserInput type="text" placeholder="이름, 아이디 또는 연락처 검색" />
                    <S.UserSearchButton>
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
                                    <td>{userList.length - index}</td>
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