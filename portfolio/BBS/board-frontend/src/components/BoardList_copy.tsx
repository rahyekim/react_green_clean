import { useState, useEffect } from "react";
import axios from 'axios' //서버와 통신하기위한 배달원역할

import * as S from '../assets/css/Board.styles'


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
export const BoardList = ()=>{

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(()=>{  //⭐axios.get<Post[]>자동추론
        axios.get<Post[]>('http://localhost:5000/api/posts')
        .then((res)=>setPosts(res.data))
        //.then(({data})=>setPosts(data)) 구조분해할당가능
        .catch(err=> console.error("게시글 로딩실패",err));
    },[])
    
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
            <col style={{width:"15%"}}/>
            <col style={{width:"15%"}}/>
            </colgroup>
            <thead className="table-light">
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post, index)=>(
                    <tr key={post.id}>
                        <td>{index+1}</td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>
                        <td>{post.author}</td>
                        <td>{new Date(post.created_at).toLocaleDateString()}</td>
                    </tr>
                )
                )}
                {
                    posts.length===0 && 
                    <tr>
                        <td colSpan={5}>
                            게시글이 없습니다...
                        </td>
                    </tr>
                }
            </tbody>
        </table>
        </>
    )
}