import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import * as S from '../assets/css/Board.styles'

export default function BoardWrite(){

    const [title, setTitle] = useState("");
    const [content,setContent]=useState('');
    const [author,setAuthor]=useState('');

    const navigate = useNavigate();

    const handleSubmit = async(e: FormEvent) =>{
        e.preventDefault(); //새로고침방지

        if( !title.trim() || !content.trim() || !author.trim()){
            alert("모든 입력칸을 입력해주세요");
            return;
        }

        try{
            const response = await axios.post(
                'http://localhost:5000/api/posts',
                {
                    title, content, author
                } //ES6 객체 축약
            );
            alert('게시글이 등록되었습니다');
            console.log(response.data)
            navigate('/'); //홈으로 이동

        }catch(err){
            console.error(err);
            alert("등록 중 오류 발생")
        }
    }

    return(
        <>
        <S.FormContainer>
            <h4 className="mb-4 font-bold">게시글 작성</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">제목</label>
                    <input 
                    type="text" 
                    value={title}
                    className="form-control"
                    placeholder="제목을 입력해주세요"
                    onChange={e=>setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">내용</label>
                    <textarea
                    value={content}
                    rows={5}
                    className="form-control"
                    placeholder="내용을 입력해주세요"
                    onChange={e=>setContent(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">작성자</label>
                    <input 
                    type="text" 
                    value={author}
                    className="form-control"
                    placeholder="이름을 입력해주세요"
                    onChange={e=>setAuthor(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-end gap-2">
                    <button 
                    type="button"
                    className="btn btn-secondary rounded-3"
                    onClick={()=>navigate('/')} // 홈이동
                    >취소</button>
                     <button 
                     className="btn btn-primary rounded-3"
                     type="submit"
                    >제출</button>
                </div>
            </form>
        </S.FormContainer>
        </>
    )
}