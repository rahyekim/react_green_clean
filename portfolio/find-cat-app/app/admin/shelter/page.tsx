'use client';

import { useEffect, useState } from "react";
import { Layout } from "@/app/components/layout/Layout";
import * as S from '@/app/admin/DashBoard.styled'
import axios from 'axios';
import { Row,Col,Card,Button,Form } from "react-bootstrap";

axios.defaults.withCredentials =true;

export default function Shelter (){

    //
    const [imgInputType, setImgInputType]=useState('LINK')

    //보호 동물 데이터 상태관리
    const [formData, setFormData] = useState({
        status: 'ACTIVE', 
        gender: 'UNKNOWN', 
        breed:'',
        noticeNo:'',
        regDate: '',
        rescueLocation: '',
        imageUrl:'',
        imageFile: null as File | null,
        content:'',
    });

    //add
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files && e.target.files[0]){
            const file = e.target.files[0];

            setFormData(prev=> ({
                ...prev,
                imageFile: file, 
                imageUrl:'',
            }))
        }
    }

    const handleChange = (e:React.ChangeEvent<any>)=>{
        const {name, value} = e.target;
        setFormData(prev=> ({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();

        const submitData = new FormData();
        
        // 💡/// 핵심: 현재 선택된 방식에 따라 사용하지 않는 데이터는 확실히 지워줌!
    //     const currentData = { ...formData };
    //     if (imgInputType === 'LINK') {
    //         currentData.imageFile = null; // 링크로 보낼땐 파일 비우기
    //     } else {
    //         currentData.imageUrl = '';    // 파일로 보낼땐 링크 비우기
    //     // 객체를 2차원 배열로 바꿔서 폼데이터에 담기
    // Object.entries(currentData).forEach(([key, value]) => {
    //     // 값이 null이 아니고 빈 문자열도 아닐 때만 담기 (단, 파일은 null이 아닐 때)
    //     if (value !== null && value !== '') {
    //         submitData.append(key, value);
    //     }
    // });
    //👍🌟formData는 일반 객체 {} => Object.entries()로 배열 형태로 바꿔 [[],[]....]🌟
        Object.entries(formData).forEach(([key,value])=> {
            if(value !== null && value !== ''){
                submitData.append(key,value)
            }
        })
        try{
            const res= await axios.post('http://localhost:8080/api/shelter-animals', submitData,{
                headers:{
                  'Content-Type': 'multipart/form-data',
                },
            })
            alert('보호동물이 성공적으로 등록되었습니다')
        }catch(err){
            console.error('등록에러: ', err);
            alert('서버오류가 발생했습니다.잠시후 다시 실행해주세요')
        }
    };

    return(
    <Layout>
        <S.PageHeader>
            <h1 className="h3 mb-0 text-gray-800">보호소 데이터 관리</h1>
        </S.PageHeader>
        <S.GridRow>
            <Col lg={8}>
                <Card className="shadow mb-4 border-left-warning">
                    <Card.Header className="py-3">
                        <h6 className="m-0 font-weight-bold text-warning">
                            신규 보호 동물 등록
                        </h6>
                    </Card.Header>
                    <Card.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-4 p-3 bg-light rounded">
                                <Row>
                                    <Col md={6}>
                                    <label className="font-weight-bold text-gray-800">
                                        공고상태
                                    </label>
                                    <Form.Select name="status" value={formData.status} onChange={handleChange}>
                                        <option value="ACTIVE">공고중 (보호중)</option>
                                        <option value="COMPLETED">입양 완료 / 종료</option>
                                    </Form.Select>
                                    </Col>
                                
                                    <Col md={6}>
                                    <label className="font-weight-bold text-gray-800">
                                        성별
                                    </label>
                                    <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                                        <option value="UNKNOWN">성별 미상</option>
                                        <option value="FEMALE">공주</option>
                                        <option value="MALE">왕자</option>
                                    </Form.Select>
                                    </Col>
                                </Row>
                            </div>

                            {/* 기본정보입력 */}
                            <Row className="mb-3">
                                <Col md={6} className="form-group">
                                    <label className="font-weight-bold">
                                        품종
                                    </label>
                                    <Form.Control 
                                    name="breed"
                                    placeholder="예: [고양이] 코숏, [개] 말티즈"
                                    value={formData.breed}
                                    onChange={handleChange}
                                    required
                                    />
                                </Col>
                                <Col md={6} className="form-group">
                                    <label className="font-weight-bold">
                                        공고번호
                                    </label>
                                    <Form.Control
                                    type="text"
                                    name="noticeNo"
                                    placeholder="예: 충북 청주-2026-00001"
                                    value={formData.noticeNo}
                                    onChange={handleChange}
                                    required
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6} className="form-group">
                                    <label className="font-weight-bold">
                                        등록 날짜
                                    </label>
                                    <Form.Control
                                    type="date"
                                    name="regDate"
                                    value={formData.regDate}
                                    onChange={handleChange}
                                    required
                                    />
                                </Col>
                                <Col md={6} className="form-group">
                                    <label className="font-weight-bold">
                                        구조 장소
                                    </label>
                                    <Form.Control
                                    type="text"
                                    name="rescueLocation"
                                    placeholder="예: 용암삼일 무지개 아파트"
                                    value={formData.rescueLocation}
                                    onChange={handleChange}
                                    required
                                    />
                                </Col>
                            </Row>

                        <hr className="my-4"/>

                        {/* 이미지 및 상세 내용 */}
                        <div className="form-group mb-3">
                            <label className="font-weight-bold text-primary">
                                대표 사진 URL (필수)
                            </label>
                            <div className="mb-3 mt-2">
                                <Form.Check
                                inline
                                type="radio"
                                name="imgInputType"
                                label="URL(링크)로 입력"
                                checked={imgInputType==='LINK'}
                                onChange={()=>{
                                    setImgInputType('LINK')
                                    // 💡 링크로 바꿨을 때 업로드했던 파일(imageFile)을 null로 비워줌
                                    setFormData(prev=>({...prev, imageFile:null}) )

                                }}
                                style={{marginRight:'20px'}}
                                />
                                <Form.Check
                                inline
                                type="radio"
                                name="imgInputType"
                                label="직접 업로드"
                                checked={imgInputType==='UPLOAD'}
                                onChange={()=>{
                                    setImgInputType('UPLOAD');
                                    //💡 업로드로 바꿨을 때 입력했던 링크(imageUrl)를 빈 문자열로 비워줌
                                    setFormData(prev=> ({...prev, imageUrl:""}))
                                }}
                                />
                            </div>
                            {(formData.imageUrl || formData.imageFile) && (
                                <div className="mb-4 text-center">
                                    <img 
                                    src={formData.imageFile ? 
                                        URL.createObjectURL(formData.imageFile) : 
                                        formData.imageUrl} 
                                    className="img-thumbnail shadow-sm"
                                    alt="대표사진 미리보기" />
                                    
                                </div>
                            )}
                            {/* 조건부 입력창 렌더링 */}
                            {imgInputType === 'LINK' && (
                                 <Form.Control
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    placeholder="이미지 링크를 붙여넣어주세요"
                                    onChange={handleChange}
                                    required={imgInputType === 'LINK'}
                                    />
                            )}
                            {imgInputType === 'UPLOAD' && (
                                <Form.Control
                                type="file"
                                name="imageFile"
                                accept="image/*"
                                placeholder="이미지 파일을 올려주세요"
                                onChange={handleFileChange}
                                required={imgInputType==='UPLOAD'}
                                />
                            )}
                        </div>

                        <div className="form-group mb-4">
                            <label className="font-weight-bold">
                                특이사항 및 상세 설명
                            </label>
                            <Form.Control
                            as ="textarea"
                            rows={5}
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="동물의 건강상태, 성격, 발견 당시 상황을 적어주세요"
                            required
                            />
                        </div>
                        <Button type="submit" variant="warning"
                        className="btn-block w-100 font-weight-bold p-3 mt-4 text-dark">
                            보호 동물 등록하기
                        </Button>
                        </form>
                    </Card.Body>
                </Card>
            </Col>

            <Col lg={4}>
            <Card className="shadow mb-4">
                <Card.Header className="py-3">
                    <h6 className="m-0 font-weight-bold text-warning">
                        등록 및 관리안내
                    </h6>
                </Card.Header>
                <Card.Body className="text-gray-800">
                    <p><strong>공고상태관리</strong></p>
                    기본 값은 '공고중'입니다. 입양처가 정해지거나 보호가 종료되면 상태를 
                    <strong> '입양완료'</strong>로 변경해 주세요.
                    앱화면에서 회색'완료'뱃지로 자동 전환됩니다
                </Card.Body>
            </Card>
            </Col>
        </S.GridRow>
    </Layout>
    )
}
