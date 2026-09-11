'use client'

import React, { useEffect, useState } from "react";
import { Layout } from "@/app/components/layout/Layout";
import * as S from '@/app/admin/DashBoard.styled'
import axios from 'axios';
import { Row,Col,Card,Button,Form } from "react-bootstrap"

axios.defaults.withCredentials=true;


export default function Shelter (){

    const [imgInputType, setImgInputType]=useState('LINK');

    const [formData, setFormData]=useState({
        status: 'ACTIVE',
        gender: 'UNKNOWN',
        breed:'',
        noticeNo:'',
        regDate: '',
        rescueLocation: '',
        imageUrl:'',
        imgFile: null as File | null,
        content:'',
    });

    const handleFileChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files?.[0]){
            const file = e.target.files[0];

            setFormData(prev=> ({
                ...prev,
                imgFile:file,
                imgUrl:'',
            }))
        }
    }

    const handleChange = (e:React.ChangeEvent<any>)=>{
        const {name, value} = e.target;
        setFormData(prev=>({
            ...prev,
            [name]: value,
        }))
    }   

    const handleSubmit = async(e:React.FormEvent)=>{
       e.preventDefault();

       const submitData= new FormData();
       Object.entries(formData).forEach(([key,value])=>{
        if(value !==null && value !== ''){
            submitData.append(key,value);
        }
    })
        try{
            const res= await axios.post('/api/shelter-animals', submitData,{
                headers: {'Content-Type':'multipart/form-data'}
            })
        }catch(err){
            alert('서버오류가 발생했습니다.잠시후 다시 실행해주세요')
        }
    }

    return(
        <Layout>
           <Form.Check
           type="radio"
           name="imgInputType"
           label="URL링크로 입력"
           checked={imgInputType==='LINK'}
           onChange={()=>{
            setImgInputType('LINK');
            setFormData(prev=> ({...prev, imgFile:null}))
           }}
           />

           <Form.Check
           type="radio"
           name="imgInputType"
           label='직접업로드'
           checked={imgInputType=='UPLOAD'}
           onChange={()=>{
            setImgInputType('UPLODAD');
            setFormData(prev=> ({...prev, imageUrl:''}))
           }}
           />
           {(formData.imageUrl || formData.imgFile) && (
            <img src={formData.imgFile ? URL.createObjectURL(formData.imgFile) : formData.imageUrl}/>
           )}

           {imgInputType === 'LINK' && (
            <Form.Control
            type="url"
            name="imgUrl"
            value={formData.imageUrl}
            placeholder=""
            onChange={handleChange}
            required={imgInputType==='LINK'}
            />
           )}

           {imgInputType === 'UPLOAD' && (
            <Form.Control
            type="file"
            name="imageFile"
            accept="image/*"
            placeholder=""
            onChange={handleFileChange}
            required={imgInputType==='UPLOAD'}
            />
           )}
        </Layout>
    )
    
    
}