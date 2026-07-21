import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import axios from "axios"
import * as S from '../assets/css/Board.styles'


export default function BoardEdit(){

    const [title,setTitle]=useState('');
    const [content,setContent]=useState('');
    const [author,setAuthor]=useState('');
    
    const navigate = useNavigate();

    const {id} = useParams<{id:string}>();  //예) 현재 URL /edit/7 이면 id = "7"를 반환
    // {id: "7"}    
       
    useEffect(()=>{
        axios.get( `http://localhost:5000/api/posts/${id}`)
        .then(res=> {
            setTitle(res.data.title)
            setContent(res.data.content)
            setAuthor(res.data.author)
        }).catch(err=> console.error(err))
    }, [id]);  //id바뀔때마다 

    //수정관련
    const handleSubmit = async(e:React.SubmitEvent)=>{
        e.preventDefault(); //새로고침금지
        //유효성검사
        if(!title.trim() || !author.trim() || !content.trim()){
            alert("모든 칸을 입력해주세요")
            return;
        }
        try{
            await axios.put(`http://localhost:5000/api/posts/${id}`, {title,content,author});
            alert("게시글 수정 되었습니다")
            navigate('/')
        }catch(err){
            alert("수정도중 오류 발생 ")
            console.error(err);
        }
    }
    return(
        <>
        <S.FormContainer>
            <h4>게시글 수정</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label className="form-label">제목</label>
                <input 
                type="text" 
                value={title} 
                className="form-control"
                onChange={e=>setTitle(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">작성자</label>
                <input 
                type="text" 
                value={author} 
                className="form-control"
                onChange={e=>setAuthor(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">내용</label>
                <textarea 
                value={content} 
                rows={5}
                className="form-control"
                onChange={e=>setContent(e.target.value)}
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
                >수정완료</button>
            </div>
            </form>
        </S.FormContainer>
        </>
    )
}