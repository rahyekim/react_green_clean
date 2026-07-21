/*
axios.get('/api/posts') //조회
axios.post('/api/posts', data) //등록
axios.put('/api/posts/1' ,data) //수정
axios.delete('/api/posts/1')

 */
import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import * as S from '../assets/css/Board.styles'


export const BoardWrite = ()=>{

    const [title,setTitle] =useState("");
     const [content,setContent]=useState('');
    const [author,setAuthor]=useState('');


    const navigate = useNavigate();

    const handleSubmit = async(e:SubmitEvent)=>{
        e.preventDefault()//새로고침방지
        
        if(!title.trim() || !content.trim() || !author.trim()){
            alert("모든 필드 입력해주세요")
            return;
        }

        try{
            const res = await axios.post(
                "http://localhost:5000/api/posts",
                {
                title,
                content,
                author,
                }
            )
            alert("등록 성공")
            navigate('/')
            console.log(res.data)
        }catch(err){
            console.error("", err)
            alert("d등록ㅈㅇ")
        }
    }


    return(
        <>
        <S.FormContainer>
            <h4 className="mb-4 ">
                게시글작성
            </h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">
                        제목
                    </label>
                    <input 
                    type="text" 
                    value={title}
                    className="form-control"
                    onChange={e=>setTitle(e.target.value)}
                    placeholder="제목입력"
                    />
                </div>
                <div>
                    <label className="form-label">내용</label>
                    <textarea
                    onChange={e=>setContent(e.target.value)}
                    value={content}
                    rows={5}
                    placeholder="입력해주세요"
                    />
                </div>
                <div>
                    <button 
                    type="button"
                    onClick={()=>navigate('/')}></button>
                    <button
                    type="submit"></button>
                </div>
                
            </form>
        </S.FormContainer>
        
        </>
    )
    
}