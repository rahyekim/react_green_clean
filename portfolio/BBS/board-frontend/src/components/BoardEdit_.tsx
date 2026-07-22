import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"

import axios from "axios"



export default function BoardEdit(){


    const [title,setTitle]=useState('');
    const [content,setContent]=useState('');
    const [author,setAuthor]=useState('');
        
    
    const {id} =useParams<{id:string}>();
    
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/posts/${id}`)
        .then(res=>{
            setTitle(res.data.title)
            setContent(res.data.content)
            setAuthor(res.data.author)
        }).catch(err=>
            console.error(err)
        )
    }, [id])

    const handleSubmit = async(e:React.SubmitEvent)=>{
        e.preventDefault();

        if(!title?.trim() || !content?.trim()){
            alert("모든칸 입력해주세요")
            return;
        }

        try{
            await axios.put(`http://localhost:5000/api/posts/${id}`)
            navigate('/')
            alert("게시글 수정됨")
        }catch(err){
            alert("수정중 오류")
            console.error(err)
        }
    }
    
}