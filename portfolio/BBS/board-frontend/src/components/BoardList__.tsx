import { useState, useEffect } from "react";
import axios from 'axios' //서버와 통신하기위한 배달원역할

import * as S from '../assets/css/Board.styles'

import { useNavigate } from "react-router-dom";

interface Post{
    id: number;
    title: string;
    content: string;
    author: string;
    created_at: string;
}

/* Axios가 통신 성공 후 전달해주는 실제 응답(res) 객체 구조
{ 약속...
  data: [ { id: 1, title: '안녕' }, { id: 2, title: '반가워' } ], // ★ 서버가 보낸 실제 데이터
  status: 200,                                                  // HTTP 상태 코드
  statusText: 'OK',                                             // 상태 메시지
  headers: { ... },                                             // 응답 헤더 정보
  config: { ... },                                              // 요청 당시 설정 정보
  request: { ... }                                              // 요청 객체
}
*/
export default function BoardList (){

    const [posts, setPosts] = useState<Post[]>([]);
    //🔥페이징을 위한 상태 추가 
    const [currentPage, setCurrentPage]=useState(1);
    const [totalPages, setTotalPages]=useState(1);

    const navigate = useNavigate();

    const fetchPosts = async(page:number)=>{
        try{
            const res = await axios.get(`http://localhost:5000/api/posts?page=${page}`)
            
            //보정
            if(page> res.data.totalPages){
            setCurrentPage(Math.max(res.data.totalPages,1));//Math.max(값, 최소값)
            } //페이지 번호는 최소 1부터 시작해야 한다라는 안전장치 👍

            setPosts(res.data.posts);
            setTotalPages(res.data.totalPages);

           
        }catch(err){
            console.error(err);
        }
       
    }

    useEffect(()=>{
        fetchPosts(currentPage);
    },[currentPage]);

    const handleDelete = async(id:number)=>{
        try{
            if(window.confirm("정말 삭제하겠습니까?")){
                await axios.delete(`http://localhost:5000/api/posts/${id}`)
                alert('삭제됨..');
                fetchPosts(currentPage); //새로고침
            }   
        }catch(err){
            alert("삭제 실패");
            console.error(err);
        }
            
    }

    // useEffect(()=>{  //⭐axios.get<Post[]>자동추론
    //     axios.get<Post[]>('http://localhost:5000/api/posts')
    //     .then((res)=>setPosts(res.data))
    //     //.then(({data})=>setPosts(data)) 구조분해할당가능
    //     .catch(err=> console.error("게시글 로딩실패",err));
    // },[])
    return(
        <>
        <div className="d-flex justify-content-between mb-3">
            <h1>게시글목록</h1>
            <S.CustomButton to='/write'>글쓰기</S.CustomButton>
        </div>

        <table className="table table-hover table-bordered text-center">
            <colgroup>
            <col style={{width:"10%"}}/>
            <col style={{width:"30%"}}/>
            <col style={{width:"30%"}}/>
            <col style={{width:"10%"}}/>
            <col style={{width:"10%"}}/>
            <col style={{width:"10%"}}/>
            </colgroup>
            <thead className="table-light">
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>관리</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post,index)=>(
                    <tr key={post.id}>
                        <td>{(currentPage-1)*6+index+1}</td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td>{post.author}</td>
                        <td>{new Date(post.created_at).toLocaleDateString()}</td>
                        <td>
                            <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={()=>navigate(`/edit/${post.id}`)}
                            >수정</button>
                            <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={()=>handleDelete(post.id)}
                            >삭제</button>
                        </td>
                    </tr>
                )
                )}
                {
                    posts.length===0 && 
                    <tr>
                        <td colSpan={6}>
                            게시글이 없습니다...
                        </td>
                    </tr>
                }
            </tbody>
        </table>
        
        {/* 🚀 페이징 */}
        <nav>
            <ul className="pagination justify-content-center mt-4">

                {/* 이전 버튼 */}
                <li className={`page-item ${currentPage ===1 ? 'disabled': ""}`}>
                    <button className="page-link"
                    onClick={()=>setCurrentPage(currentPage-1)}
                    >이전</button>
                </li>
                {/* 페이지 번호 목록 */}
                {Array.from({length: totalPages},(_,i)=> i+1).map(page=>(
                    <li key={page} className={`page-item ${currentPage === page? 'active': ''}`}>
                        <button
                        className="page-link"
                        onClick={()=>setCurrentPage(page)}
                        >{page}</button>
                    </li>
                ))}
                
                {/* 다음 버튼 */}
                <li className={`page-item ${currentPage ===totalPages ? 'disabled': ""}`}>
                    <button className="page-link"
                    onClick={()=>setCurrentPage(currentPage+1)}
                    >다음</button>
                </li>

            </ul>
        </nav>

        </>
    )
}


/*Array.from(배열모양, 채우는함수)

Array.from({length:5}) => 5칸짜리 배열 만들어줘[undefined,undefined... ]
배열이 아닌 것을 배열로 만들어주는 함수

(_, i) => i+1  => [1,2,3,4,5] : 버튼생성...
*/