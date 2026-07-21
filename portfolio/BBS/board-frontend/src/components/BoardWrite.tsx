
import React, { useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";

import * as S from "../assets/css/Board.styles"

export default function BoardWrite  () {

    //사용자가 입력할 제목,작성자,내용을 각각 담을 바구니(상태)
    const [title,setTitle]=useState('');
    const [content,setContent]=useState('');
    const [author,setAuthor]=useState('');

    //페이지 이동 기능을 사용하기 위해 navigate함수를 준비
    const navigate = useNavigate(); 

    //등록 버튼을 누를때 실행되는 함수 
    const handleSubmit = async(e:React.SubmitEvent)=>{
        
        e.preventDefault(); //🔵버튼클릭시 새로고침되는 기본동작 방지
        //유효성검사:하나라도 입력 안된곳이 있는지 확인
        if(!title || !author || !content){
            alert("모든 필드를 입력해주세요");
            return;//🟥함수를 여기서 종료!
        }
        try{
            await axios.post('http://localhost:5000/api/posts',{
                title,content,author
            });
            alert("게시글이 등록되었습니다.")
            navigate('/'); //게시글작성이 성공 후 ⭐본래 창으로 돌아가기...
            //글 작성이 완료되면 홈으로 이동해라
        }catch(err){
            console.error(err); //개발자도구 콘솔에 에러내용 찍어줌..
            alert("🚨 등록 중 오류 발생 🚨")
        }
    }
  return(
    <>
    <S.FormContainer>
        <h4 className="mb-4 font-bold">게시글 작성</h4>
        {/*폼이 제출될때(submit) handlesubmit함수를 실행 */}
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">제목</label>
                <input 
                type="text" 
                value={title} 
                className="form-control"
                onChange={e=>setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">작성자</label>
                <input 
                type="text" 
                value={author} 
                className="form-control"
                onChange={e=>setAuthor(e.target.value)}
                placeholder="이름을 입력하세요"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">내용</label>
                <textarea 
                value={content} 
                rows={5}
                className="form-control"
                onChange={e=>setContent(e.target.value)}
                placeholder="내용을 입력하세요"
                />
            </div>
            <div className="d-flex justify-content-end gap-2">
                <button
                type="button" //⭐⭐
                className="btn btn-secondary rounded-3"
                onClick={()=>navigate('/')} //홈이동
                >취소</button>
                <button 
                type="submit"
                className="btn btn-primary rounded-3"
                >제출</button>
            </div>
        </form>
    </S.FormContainer>
    </>
  )
};

