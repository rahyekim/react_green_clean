'use client';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {X} from 'lucide-react'

import * as S from '@/css/common/Modal.style'
import { useRouter } from 'next/navigation';

export interface FormData{
    title: string;
    content: string;
    breed: string;
    gender: string;
    age: string;
    weight: string;
    color: string;
    rescueLocation: string;
}
interface ModalProps{
    isOpen: boolean;
    onClose: ()=>void;
    onSuccess: ()=>void;
    titleText: string;
    submitText:string;
}

const initialFormState: FormData = {
    title: '',
    content: '',
    breed: '',
    gender: '왕자',
    age: '',
    weight: '',
    color: '',
    rescueLocation: '',
};
export const MissingModal = (props:ModalProps)=>{

    const { isOpen, onClose, titleText, submitText, onSuccess } = props;
    
    if(!isOpen) return null;
    const router = useRouter();

    const [formData, setFormData]=useState<FormData>(initialFormState)
    const [selectedFile, setSelectedFile] =useState<File|null>(null);

    // 모달이 열릴 때마다 폼과 파일 상태를 깨끗하게 초기화
    useEffect(() => {
        if (isOpen) {
            setFormData(initialFormState);
            setSelectedFile(null);
        }
    }, [isOpen]);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement | HTMLSelectElement>)=>{
        const {name, value}= e.target;
        setFormData(prev=> ({
            ...prev,
            [name]:value
        }));
    }

    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files && e.target.files[0]){
            setSelectedFile(e.target.files[0]);
        }
    }

    const handleSubmit = async(e:React.FormEvent)=>{
            e.preventDefault();

            const token = localStorage.getItem('token');
            if(!token){
                alert('로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.');
                onClose();  //모달닫고
                router.push('/login'); //로그인페이지이동
                return;
            }

            try{
                const data = new FormData();
                data.append('dto', new Blob([JSON.stringify(formData)], {
                    type:'application/json'
                }))
                //파일있으면 추가
                if(selectedFile){
                    data.append('file', selectedFile)
                }
                const res= await axios.post('http://localhost:8080/api/missing-posts', data,{
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials:true
                })
                alert('실종신고가 등록되었습니다');
                onSuccess();
                onClose();

            }catch(err:any){
                console.error('등록 실패',err)
                if(err.response && err.response.status === 401 || err.response.status === 403){
                  alert('로그인이 만료되었거나 권한이없습니다.다시 로그인 해주세요')   
                }else{
                  alert('글 등록에 실패했습니다'); 
                }
            }
        }

    return(
        <>
        <S.ModalOverlay> 
            <S.ModalContent onClick={e=>e.stopPropagation()}>
                <S.Header>
                    <h2>{titleText}</h2>
                    <S.CloseBtn onClick={onClose}>
                        <X size={20}/>
                    </S.CloseBtn>
                </S.Header>

                <S.Form onSubmit={handleSubmit}>
                    <S.Input 
                    type='text'
                    name='title'
                    placeholder='제목을 입력하세요'
                    value={formData.title}
                    onChange={handleChange}
                    required
                    />

                    <S.RowGroup>
                        <S.Input 
                        type='text'
                        name='breed'
                        placeholder='품종(예: 말티즈, 코숏)'
                        value={formData.breed}
                        onChange={handleChange}
                        required
                        />
                        <S.Select 
                            name='gender'
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value='' disabled hidden>성별 선택</option>
                            <option value='왕자'>왕자</option>
                            <option value='공주'>공주</option>
                            <option value='미상'>미상</option>
                        </S.Select>
                    </S.RowGroup>

                    <S.RowGroup>
                        <S.Input 
                            type='text'
                            name='age'
                            placeholder='나이 (예: 2살 추정)'
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                        <S.Input 
                            type='text'
                            name='weight'
                            placeholder='몸무게 (예: 3.5kg)'
                            value={formData.weight}
                            onChange={handleChange}
                            required
                        />
                    </S.RowGroup>

                    <S.Input 
                        type='text'
                        name='color'
                        placeholder='색상 (예: 하얗고 갈색 점 있음)'
                        value={formData.color}
                        onChange={handleChange}
                        required
                    />

                    <S.Input 
                        type='text'
                        name='rescueLocation'
                        placeholder='실종/목격 장소(예: 서울시 강남구)'
                        value={formData.rescueLocation}
                        onChange={handleChange}
                        required
                    />

                    <S.FileInputWrapper>
                        <label>
                            <input
                            type='file'
                            accept='image/*,video/*'
                            onChange={handleFileChange}
                            />
                            사진/동영상 첨부하기
                            {selectedFile && 
                            <span className='file-name'>{selectedFile.name || '선택된파일없음'} </span>}
                        </label>
                    </S.FileInputWrapper>

                    <S.TextArea 
                        name='content'
                        placeholder='상세 내용 및 특징을 입력하세요'
                        value={formData.content}
                        onChange={handleChange}
                        rows={4}
                        required
                    />

                    <S.SubmitBtn
                    type='submit'
                    >{submitText}</S.SubmitBtn>
                </S.Form>
            </S.ModalContent>
        </S.ModalOverlay>
        </>
    )
}