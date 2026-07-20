import { useEffect,useState } from "react";
//리액트의 핵심기능 상태관리 생명주기에 훅을 가져옴
import axios from "axios";  // ⭐서버와 통신하기 위한 배달원 역할을 하는 도구

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

//화면에 나타났을때(컴포넌트렌더링후) 딱한번 실행되는 구역
useEffect(()=>{
    axios.get('http://localhost:5000/api/posts') //서버5000번 포트에 게시글 주라...
    .then((res)=> setPosts(res.data)) //성공하면 받아온 데이터를 바구니에 담음
    .catch(err=> console.error(err));
}, []);// [] 빈배열:처음한번만실행하라는뜻..

//화면그리기(render)
    return(
        <>
        <div className="d-flex justify-content-between mb-3">
            <h1>게시글 목록</h1>            
            <S.CustomButton to='/write'>글쓰기</S.CustomButton>
        </div>

        <table className="table table-hover table-borderd text-center">
            <colgroup>
            <col style={{width:"10%"}}/>
            <col style={{width:"50%"}}/>
            <col style={{width:"20%"}}/>
            <col style={{width:"20%"}}/>
            </colgroup>
            <thead className="table-light">
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                </tr>
            </tbody>
        </table>
        </>
    )
};

