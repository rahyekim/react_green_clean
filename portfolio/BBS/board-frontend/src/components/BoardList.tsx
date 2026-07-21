import { useEffect,useState } from "react";
//리액트의 핵심기능 상태관리 생명주기에 훅을 가져옴
import axios from "axios";  // ⭐서버와 통신하기 위한 배달원 역할을 하는 도구

//수정버튼 이동용
import { useNavigate } from "react-router-dom";
//css
import * as S from '../assets/css/Board.styles'


//데이터의 설계도 interface
interface Post {
    id:number;
    title: string;
    author: string;
    created_at: string;
}

//컴포넌트의 상태와 데이터 가져오기(logic)
export const BoardList = () => {
/*
[변수명, 변수를 바꾸는 함수] = useState<데이터모양>(초기값);
서버에서 받아올 게시글 목록을 저장할 바구니를 만든다
처음에는 빈배열
*/ const [posts, setPosts]=useState<Post[]>([]);

//🔥페이징을 위한 상태 추가 
const [currentPage, setCurrentPage]=useState(1);
const [totalPages, setTotalPages]=useState(1);

const navigate = useNavigate(); //이동함수 추가

const fetchPosts = (page: number)=> {

    axios.get(`http://localhost:5000/api/posts?page=${page}`)
    .then(res=> {
        setPosts(res.data.posts);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
    }).catch(err=> console.error(err))
}

useEffect(()=>{
    fetchPosts(currentPage);
},[currentPage]);  //page바뀔때마다 ... 현재page감시..

//추가된 부분 삭제기능 함수
const handleDelete = async(id:number)=>{
    //🌟
    if(window.confirm("정말삭제하시겠습니까?")){  
        try{
            await axios.delete(`http://localhost:5000/api/posts/${id}`);
            alert("삭제 됨...")
            fetchPosts(currentPage); //삭제후 새로고침..
        }catch(err){
            console.error(err);
            alert("삭제 도중 실패") ///?????
        }
    }
}

/*📌페이징을 안넣을 경우 
//화면에 나타났을때(컴포넌트렌더링후) 딱한번 실행되는 구역 
useEffect(()=>{
    axios.get('http://localhost:5000/api/posts') //서버5000번 포트에 게시글 주라...
    .then((res)=> setPosts(res.data)) //성공하면 받아온 데이터를 바구니에 담음
    .catch(err=> console.error(err));
}, []);// [] 빈배열:처음한번만실행하라는뜻..
*/
{/* 화면그리기(render)*/}
    return(
        <>
        <div className="d-flex justify-content-between mb-3">
            <h1>게시글 목록</h1>            
            <S.CustomButton to='/write'>글쓰기</S.CustomButton>
        </div>

        <table className="table table-hover table-bordered text-center">
            <colgroup>
                <col style={{width:"10%"}}/>
                <col style={{width:"40%"}}/>
                <col style={{width:"15%"}}/>
                <col style={{width:"15%"}}/>
                <col style={{width:"20%"}}/>
            </colgroup>
            <thead className="table-light">
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>관리</th>
                </tr>
            </thead>
            <tbody>
                {/* ✨화면에는 항상 연속된 번호표시(index+1 :1,2,3,4..) */}
                {posts.map((post,index)=>( //리액트가 각각의 줄을 구분할 수 있게 고유한 id를 줌
                    <tr key={post.id}>
                        <td>{index+1}</td> 
                        <td>{post.title}</td>
                        <td>{post.author}</td>
                        <td>{new Date(post.created_at).toLocaleDateString()}</td>
                        <td>
                            <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={()=>navigate(`/edit/${post.id}`)} 
                            >수정</button>
                            {/*navigate : 브라우저 주소를 /edit/7로 바꿔! => 
                             React Router가 주소보고  /edit/:id랑 맞네? 컴포넌트<BoardEdit />를 실행*/}
                            <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={()=>handleDelete(post.id)}
                            >삭제</button>
                        </td>
                    </tr>
                ) 
                )}
                {/* ✨만약 게시글이 없다면 보여줄 화면✨꼭! */}
                {posts.length === 0 && (
                    <tr>
                        <td colSpan={4}>게시글이 없습니다.</td>
                    </tr>
                )}
            </tbody>
        </table>

        {/* 🚀 페이징 */}
        <nav>
            <ul className="pagination justify-content-center mt-4">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link"
                    onClick={()=>setCurrentPage(currentPage-1)}>이전</button>
                </li>

                {Array.from({length: totalPages},(_,i)=> i+1).map(page=>
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button className="page-link" onClick={()=>setCurrentPage(page)}>
                        {page} 
                    </button>
                </li>
                )}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link"
                    onClick={()=>setCurrentPage(currentPage+1)}>다음</button>
                </li>

                
            </ul>
        </nav>
        
        
        </>
    )
};

