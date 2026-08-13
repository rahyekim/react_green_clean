import { useState,useEffect } from "react";
import axios from "axios";

import * as S from '../DashBoard.styled';
import { Layout } from "../../components/layout/Layout";

//백엔드에서 받아올 데이터의 형태(타입)정의

interface Users{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    zipcode: string;
    address: string;
    detail_address:string;
}


export const UserList = ()=>{
    //회원목록 데이터 담을 바구니(상태)
    const [users, setUsers]= useState<Users[]>([]);
    //로딩상태를 관리 
    const [loading , setLoading]=useState<boolean>(true); 
    //로딩시작...로딩중....

    //💦 페이징처리를 위한 상태추가 현재화면에 보여줄 페이지번호
    const [currentPage, setCurrentPage]=useState<number>(1);
    //한 페이지에 보여줄 회원수 10명씩
    const [usersPerPage]=useState<number>(10);

    //컴포넌트가 처음화면에 켜질때 백엔드에 데이터요청
    useEffect(()=>{
        
        const fetchUsers = async()=>{
            
        try{
            const res = await axios.get('http://localhost:5000/api/users')
            
            //가져온데이터를 상태(바구니)에 저장
             setUsers(res.data);
    
        }catch(err){
            console.error("회원목록 데이터를 불러오는데 실패: ", err);
            alert("회원목록을 불러오는중 오류발생");

        }finally{
            //데이터 로딩 끝낫음..
            setLoading(false);
        }

        };

        fetchUsers();
    }, []); //[] 처음한번만 실행..

    {/*❄️ 프론트엔드(리액트)가 백엔드한테 회원 전체를 다 받아온 다음에
         화면에 보여줄 만큼만 자르기(Slice) ❄️*/}

    //💦 페이징 (저번에는 백엔드보고 몇 번째부터 몇 개 줘!시킨것(offset,limit))
    //1.현재 페이지의 마지막 회원 인덱스계산(예: 1페이지*10 = 10)
    const indexOfLastUser = currentPage* usersPerPage;
    //2.현재 페이지의 첫번째 회원 인덱스 계산 (10-10 = 0)
    const indexOfFristUser = indexOfLastUser - usersPerPage;
    //3. 전체 데이터에서 딱 현재 페이지에 보여줄 만큼만 잘라냄(slice 사용)
    const currentUsers =users.slice(indexOfFristUser, indexOfLastUser);
    //4. 총 페이지수 계산(회원23명 /10 = 2.3 =>3페이지)
    const totalPages = Math.ceil(users.length/usersPerPage);
    //5. 페이지번호를 클릭했을때 실행될 함수
    const paginate = (pageNumber: number)=> setCurrentPage(pageNumber); 

    return(
        <>
        <Layout>
        <S.PageWrapper>
            <S.PageTitle>Registered Users</S.PageTitle>
            <p className="mb-4">
                회원가입시 등록한 사용자들의 전체 리스트
            </p>
            <S.Card>
                <S.CardHeader>
                    <h6>회원 리스트(DataTables)</h6>
                </S.CardHeader>
                <S.CardBody className="d-flex flex-column">
                    {/*🌟 터치로 스크롤 🌟*/}
                    <div className="table-responsive">
                        <S.styledTable>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Zipcode</th>
                                    <th>Address</th>
                                    <th>Detail Address</th>
                                </tr>
                            </thead>
                            <tbody>
                {/* 로딩중일때 보여질 UI 
                🌟삼항 연산자 조건: 로딩중 -> 데이터 없음 -> 데이터 있음)*/}
                                {loading? (
                                    <tr>
                                        <td 
                                        className="text-center"
                                        colSpan={6}>
                                            🔄데이터를 불러 오는 중입니다...
                                        </td>
                                    </tr>
                                ): users.length === 0 ? (
                                    <tr>
                                        <td className="text-center" colSpan={6}>
                                            ⏳ 등록된 회원이 없습니다...
                                        </td>
                                    </tr>
                                ): (
                                    users.map((user,index)=>(
                                        <tr key={user.id}>
                                            <td>{index+1}</td>
                                            <td>{user.last_name}{user.first_name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.zipcode}</td>
                                            <td>{user.address}</td>
                                            <td>{user.detail_address}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </S.styledTable>
                    </div>
                    {/*🌟 하단 페이징 🌟 */}
                    {!loading && users.length > 0 && (
                        <nav aria-label="Page navigation">
                            <ul className="pagination justify-content-center mt-4">
                                <li
                                className={`page-item ${currentPage ===1 ? 'disabled': ""}`}>
                                    <button
                                    className="page-link"
                                    onClick={()=>setCurrentPage(prev=>Math.max(prev -1, 1))}
                                    disabled={currentPage ===1}
                                    >이전
                                    </button>
                                </li>

                                {Array.from({length:totalPages},(_,i)=>(
                                    <li key={i+1} className={`page-item ${currentPage=== i+1 ? 'active' :''}`}>
                                        <button className="page-link" onClick={()=>paginate(i+1)}>
                                            {i+1}
                                        </button>
                                    </li>
                                ))}

                                 <li
                                className={`page-item ${currentPage ===totalPages ? 'disabled': ""}`}>
                                    <button
                                    className="page-link"
                                    onClick={()=>setCurrentPage(prev=>Math.min(prev +1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    >다음
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </S.CardBody>
            </S.Card>

            
        </S.PageWrapper>
        </Layout>
        </>
    )
};