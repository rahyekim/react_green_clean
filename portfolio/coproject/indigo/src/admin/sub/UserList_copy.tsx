import { useState, useEffect } from "react";
import axios from "axios";

import * as S from '../DashBoard.styled'
import { Layout } from "../../components/layout/Layout";

//백엔드 에서 받아올 데이터 : res.status(200).json(result) 
//의 타입정의...

interface Users {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    zip_code: string;
    address: string;
    detail_address:string;
}


export const UserList = ()=>{
    
    const [users, setUsers] = useState<Users[]>([]);
    const [loading, setLoading] =useState(true);

    const [currentPage, setCurrentPage] =useState(1);
    const usersPerPage: number = 10;

    //컴포넌트가 처음화면 켜지면 백엔드에 데이터요청..
    useEffect(()=>{

        const fetchUsers = async()=> {

            try{
                const result = await axios.get("http://localhost:5000/api/users")
                setUsers(result.data)

            }catch(err){
                console.error("회원목록 데이터 불러오는데 실패:",err)
                alert("회원목록 불러오는 도중 오류발생")

            }finally{
                setLoading(false);
            }
        }
        fetchUsers();

    }, [])

    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFristUSer = indexOfLastUser - usersPerPage
    const currentUsers = users.slice(indexOfFristUSer, indexOfLastUser)
    const totalPages = Math.ceil(users.length / usersPerPage);
    const paginate = (pageNum:number)=> setCurrentPage(pageNum);

    return(
        <>
        <Layout>
            <S.PageWrapper>
                <S.PageTitle>Registered Users</S.PageTitle>
                <p className="mb-4">
                    회원가입한 사용자들의 전체 리스트
                </p>
                <S.Card className="w-100">
                    <S.CardHeader>
                        <h6>회원 리스트</h6>
                    </S.CardHeader>
                    <S.CardBody className="d-flex flex-column w-100">
                        <div className="table-responsive w-100">
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
                                    {/* 로딩중일때 */}
                                   {loading && 
                                   <tr>
                                    <td 
                                    className="text-center"
                                    colSpan={6}
                                    >🔄 데이터를 불러오는 중입니다 </td>
                                   </tr>}

                                   {/* 로딩끝났는데 데이터가없을 때 */}
                                   {!loading && users.length ===0 && (
                                    <tr>
                                        <td
                                        className="text-center"
                                        colSpan={6}
                                        >⏳ 등록된 회원이 없습니다..</td>
                                    </tr>
                                   )}
                                  {/* 로딩끝나고 데이터가 있을때 */}
                                  {!loading && users.length>0 &&
                                  users.map((user,index)=>(
                                    <tr key={user.id}>
                                        <td>{index+1}</td>
                                        <td>{user.last_name}{user.first_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.zip_code}</td>
                                        <td>{user.address}</td>
                                        <td>{user.detail_address}</td>
                                    </tr>
                                  ))}
                                </tbody>
                            </S.styledTable>
                        </div>

                        {/* 하단페이징 aria-label은 시각장애인위함*/}
                        { !loading && users.length>0 && (
                            <nav aria-label= "Page navigation"> 
                                <ul className="pagination justify-content-center mt-4">
                                    <li
                                    className={`page-item ${currentPage===1? 'disabled': ''}`}
                                    > 
                                    {/* 부트스트랩 디자인 차단 */}
                                        <button
                                        className="page-link"
                                        onClick={()=>setCurrentPage(prev=> Math.max(prev-1, 1))}
                                        disabled={currentPage===1}
                                        >이전</button>
                                    </li>
                                {/* length:3  => 길이가 3인 가짜배열 틀 만들어줘 [undefined, undefined, undefined]
                                총 totalPages 개짜리 빈 칸을 가진 배열 틀을 만들어줘 */}
                                { Array.from({length:totalPages}, (_,i)=>(
                                    <li key={i+1}
                                     className={`page-item ${currentPage===i+1 ? 'active':''}`}>
                                        <button
                                        className="page-link"
                                        onClick={()=>paginate(i+1)}
                                        >
                                            {i+1}
                                        </button>
                                    </li>
                                ))
                                 }
                                    <li
                                    className={`page-item ${currentPage===totalPages? 'disabled': ''}`}>
                                        <button
                                        className="page-link"
                                        disabled={currentPage===totalPages}
                                        onClick={()=>setCurrentPage(prev=> Math.min(prev+1,totalPages))}
                                        >다음</button>
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
    
    
    
    
}