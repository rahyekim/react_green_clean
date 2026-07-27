import { useState, useEffect } from "react";
import axios from "axios";

import * as S from '../DashBoard.styled'
import { Layout } from "../../component/layout/Layout";


interface Users {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    zipcode: string;
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
                <S.Card>
                    <S.CardHeader>
                        <h6>회원 리스트</h6>
                    </S.CardHeader>
                    <S.CardBody>
                        <div className="table-responsive">
                            
                        </div>
                    </S.CardBody>

                </S.Card>
            </S.PageWrapper>
        </Layout>
        
        
        </>
    )
    
    
    
    
}