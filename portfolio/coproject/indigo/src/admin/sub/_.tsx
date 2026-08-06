import React, { useState, useEffect } from "react";
import axios from 'axios'

import { Layout } from "../../component/layout/Layout";
import * as S from "../css/sub.styled"


interface WorkImg{
    id: number,
    previewUrl: string;
    file: File | null;
}

export default function WorkSetting (){


    const [rowCount, setRowCount] =useState(1);
    const [imgs, setImgs]=useState<WorkImg[]>(
        Array.from({length:6}).map((_,idx)=>(
            {
                id:idx,
                previewUrl:"",
                file: null
            }
        ))
    )

    const handleRowCount = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setRowCount(Number(e.target.value) as 1 | 2);
    }

    const handleFileChange = (idx:number, e:React.ChangeEvent<HTMLInputElement>)=>{

        const selectedFile = e.target.files?.[0];

        if(!selectedFile) return;

        if(selectedFile){

            const tempUrl = URL.createObjectURL(selectedFile);

            const newImgs = [...imgs]; //배열복사=>내가 클릭한 칸(idx)만 덮어씌움

            if(newImgs[idx].previewUrl){
                URL.revokeObjectURL(newImgs[idx].previewUrl);
            }
            newImgs[idx]={     
                ...newImgs[idx],
                previewUrl: tempUrl, //브라우저에 띄울수잇도록..가짜url
                file: selectedFile 
            }
            setImgs(newImgs); //상태저장...

            // ?????동일한 파일 재선택 가능하도록 초기화
            e.target.value = ""; 
        }
    }

    const handleRemoveFile = (idx:number)=>{

        const newImgs = [...imgs];

        //기존 메모리 url해제
        if(newImgs[idx].previewUrl){
            URL.revokeObjectURL(newImgs[idx].previewUrl)
        }
        newImgs[idx]={
            id: idx,
            previewUrl:"",
            file: null
        }
        setImgs(newImgs); //상태저장
    }

    const handleSave = async()=>{

        const formData = new FormData();
        
        formData.append('rowCount', String(rowCount))
        
        const ImgsTosave = rowCount===1 ? imgs.slice(0,4) : imgs;
        
        ImgsTosave.forEach((img,idx)=>{
            if(img.file){
                formData.append('workImgs', img.file)
            }
        })
        try{
            await axios.post("http://", formData)
            console.log("저장할데이터",rowCount)
            console.log("저장할데이터", formData.getAll('workImgs'));

        }catch(err){
            console.error("실패", err)
            alert("저장실패")
        }
        
    }
    //
    const visibleImgs= rowCount===1 ? imgs.slice(0,4) :imgs
    

    return(
        <>
    

        </>
    )
    
}

interface BlogItem {
    id:number;
    previewUrl:string;
    file: File | null;
    date: string;
    text: string;
}
export const BlogSetting = () => {

    const [rowCount]=useState<1|2>(1);
    const [blogs, setBlogs]=useState<BlogItem[]>(
        Array(8).fill(null).map((_,idx)=>({
            id: idx,
            previewUrl: "",
            file: null,
            date: '',
            text: ''
        }))
    )

}

useEffect

const dbBlogs =res.data.blogs;

const initialBlogs= [...Array(6)].map((_,idx)=>{

    if(dbBlogs[idx]){
        return{
            id: idx,
            previewUrl: `http://loaclhost:5000${dbBlogs[idx].image_url}`
            file:null,
            date: dbBlogs[idx].date_str || '',
            text: dbBlogs[idx].text_content || ''
        }
    }return{}
}) ;
setBlogs(initialBlogs)

const getTodayDate= ()=>{
    const today= new Date();

    const options :Intl.DateTimeFormatOptions={
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    } 
    return today.toLocaleDateString('en-US',options).toUpperCase
};

const formdata= new FormData();

formdata.append('rowCount', String(rowCount));

const blogsTosave =rowCount ===1? blogs.slice(0,3) : BlogSetting;

blogsTosave.forEach((blog,idx) => {
    if(blog.file){
        formdata.append('blogimage', blog.file)
    }
    formdata.append('date', blog.date)
    formdata.append('blogTExt', blog.text)
    
});