'use client'

import { useState } from "react"
import {Layout} from '../../components/layout/Layout'

import * as S from '../DashBoard.styled'

import axios from "axios"
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"

export default function RecommendedAnimalAdmin (){

    //등록출처상태(기본값: 직접등록)
    const [sourceType, setSourceType]=useState<'DIRECT'|'FACEBOOK'|'INSTAGRAM'>('DIRECT');
    //동물정보입력상태
    const [formData, setFormData]=useState({
        sourceUrl: '',  //SNS주소 (페이스북/인스타선택시)
        region: '',     //지역 (예:대전시)
        noticeNo: '',   //공고번호
        birthYear:'',   //출생년도
        gender:'M',     //성별 M/F
        weight:'',      //체중
        imageUrl:''     //이미지주소
    });


    const handleChange =(e:React.ChangeEvent<any>)=>{

        const {name, value, type, checked} = e.target;
        // 💡 checked를 쓸 때만 as HTMLInputElement를 붙여서 에러를 방지합니다.

        setFormData(prev=> ({
            ...prev,
            [name]: type === "checkbox"
            ? checked
            : value
        }))
        
    }

    //폼 제출 핸들러

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
            //스프링 부트 백엔드로 데이터전송(post)
            const res = await axios.post('http://localhost:8080/api/animals/recommended',{
                sourceType,
                ...formData
            })
            alert("추천동물이 성공적으로 등록되었습니다.")
        }catch(err){
            console.error("등록 중 에러발생", err);
            alert("등록에 실패했습니다. 다시 시도해주세요")
        }
    }

    return(
        <>
        <Layout>
            <S.PageHeader>
                <h1 className="h3 mb-0 text-gray-800">추천 입양 동물 관리</h1>
            </S.PageHeader>

            <S.GridRow>
                <Col lg={8}>
                    <Card className="shadow mb-4 border-left-primary">
                        <Card.Header className="py-3">
                            <h6 className="m-0 font-weight-bold text-primary">
                                신규 추천 동물 등록
                            </h6>
                        </Card.Header>

                        <Card.Body>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-4">
                                    <label className="font-weight-bold text-gray-800">
                                        등록 출처 선택
                                    </label>
                                    <div className="d-flex gap-3 mt-2">
                                        <div className="custom-control custom-radio mr-3">
                                            <Form.Check
                                            type="radio"
                                            id="sourceDirect"
                                            name="sourceType"
                                            checked={sourceType === 'DIRECT'}
                                            onChange={()=>setSourceType('DIRECT')}
                                            />
                                            <label 
                                            htmlFor="sourceDirect"
                                            className="">
                                                자체 직접 등록
                                            </label>
                                        </div>

                                        <div className="custom-control custom-radio mr-3">
                                            <Form.Check
                                            type="radio"
                                            id="sourceFacebook"
                                            name="sourceType"
                                            checked={sourceType === 'FACEBOOK'}
                                            onChange={()=>setSourceType('FACEBOOK')}
                                            />
                                            <label 
                                            htmlFor="sourceFacebook"
                                            className="">
                                                페이스북 링크
                                            </label>
                                        </div>

                                        <div className="custom-control custom-radio mr-3">
                                            <Form.Check
                                            type="radio"
                                            id="sourceInstagram"
                                            name="sourceType"
                                            checked={sourceType === 'INSTAGRAM'}
                                            onChange={()=>setSourceType('INSTAGRAM')}
                                            />
                                            <label 
                                            htmlFor="sourceInstagram"
                                            className="">
                                                인스타 링크
                                            </label>
                                        </div>
                                    </div>
                                </div>
                        <hr />
                        {sourceType !== 'DIRECT' && (
                            <div className="form-group mb-3">
                                <label>SNS 포스팅 URL 주소</label>
                                <Form.Control
                                type="text"
                                name="sourceUrl"
                                placeholder={`${sourceType=='FACEBOOK' ? '페이스북' : '인스타그램'} 주소를 입력하세요`}
                                value={formData.sourceUrl}
                                onChange={handleChange}
                                required
                                />
                            </div>
                        )} 

                        {/* 공통 동물 정보 입력 */}
                        <Row>
                            <Col md={6} className="form-group mb-3">
                                <label>지역 (예: 대전시)</label>
                                <Form.Control
                                name="region"
                                value={formData.region}
                                onChange={handleChange}
                                required
                                />
                            </Col>
                            <Col md={6} className="form-group mb-3">
                                <label>공고 번호 / 이름 </label>
                                <Form.Control
                                name="noticeNo"
                                value={formData.noticeNo}
                                onChange={handleChange}
                                required
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4} className="form-group mb-3">
                            
                            </Col>
                        </Row>


                            </form>

                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4}>
                    <Card className="shadow mb-4">
                        <Card.Header className="py-3">
                            <h6 className="m-0 font-weight-bold text-primary">
                                등록안내
                            </h6>
                        </Card.Header>
                        <Card.Body className="text-gray-800">
                          <p><strong>직접등록 : </strong>
                            센터에서보호중인 동물을 직접 등록합니다
                            </p>
                             <p><strong> 페이스북 / 인스타 : </strong>
                            외부 SNS에서 화제가 된 입양 홍보글을 연동할 때 사용합니다
                            추후 사용자 화면에서 해당 동물을 클릭하면 입력하신 SNS주소로 이동하도록
                            개발할 수 있습니다
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </S.GridRow>
            
            
        </Layout>
        
        </>
    )
    
    
    
}