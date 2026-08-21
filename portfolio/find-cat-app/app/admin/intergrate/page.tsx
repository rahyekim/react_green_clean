'use client'
import { useState, useEffect } from "react"
import axios from "axios"

import {Row,Col,Card,Button, Form} from 'react-bootstrap'
import { Layout } from "@/app/components/layout/Layout"
import * as S from '../DashBoard.styled'

axios.defaults.withCredentials=true;

export default function Intergrate(){

    const [boardType, setBoardType]=useState('YOUTUBE');
    const [formData, setFormData]=useState({
        title:'',
        content:'',
        imageUrl:'',
        thumbnailUrl:'',
        youtubeUrl:'',
        videoUrl:'',
        attachmentUrl:'',
    });
    
    const extractYoutubeId = (url:string)=>{

        if(!url.trim()) return;
        //유튜브 쇼츠추가
        // const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        //return match ? match[1] : null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    const handleChange = (e:React.ChangeEvent<any>)=>{
        const {name, value} = e.target;
        setFormData( prev=> {

            const newData={
                ...prev, [name]:value
            }
            if(boardType ==='YOUTUBE' && name === 'youtubeUrl'){
                const videoId = extractYoutubeId(value);
                if(videoId){
                    newData.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }
            }
           return newData;
     })
    }

    const handleBoardTypeChange =(type:string)=>{
        setBoardType(type);
        setFormData({
            title:'',
            content:'',
            imageUrl:'',
            thumbnailUrl:'',
            youtubeUrl:'',
            videoUrl:'',
            attachmentUrl:'',
        });
    }

    const handleSubmit =async(e:React.FormEvent)=>{
        e.preventDefault();

        let endpoint ='';
        let payload= {};

        if(boardType === 'YOUTUBE'){
            endpoint = 'http://localhost:8080/api/youtube';
            payload ={
                title:formData.title,
                youtubeUrl: formData.youtubeUrl,
                thumbnailUrl:formData.thumbnailUrl,
            };
        }else if(boardType === 'FELLOW'){
            endpoint = 'http://localhost:8080/api/fellow-news';
            payload ={
                title:formData.title,
                content: formData.content,
                imageUrl:formData.imageUrl,
                videoUrl: formData.videoUrl,
                attachmentUrl: formData.attachmentUrl,
            };
        }else if(boardType === 'HELP'){
            endpoint = 'http://localhost:8080/api/need-help';
            payload ={
                title:formData.title,
                content: formData.content,
                imageUrl:formData.imageUrl,
                videoUrl: formData.videoUrl,
                attachmentUrl: formData.attachmentUrl,
            };
        }

        try{
            const res = await axios.post(endpoint,payload)
            alert(res.data || '성공적으로 등록되었습니다')
            //등록완료후 폼비우기
            setFormData({
            title:'',
            content:'',
            imageUrl:'',
            thumbnailUrl:'',
            youtubeUrl:'',
            videoUrl:'',
            attachmentUrl:'',
        });

        }catch(err:any){
            console.error("등록에러",err)
            alert('등록에러')
        }
    }

    return(
        <Layout>
            <S.PageHeader>
                <h1 className="h3 mb-0 text-gray-800">
                    통합 콘텐츠 등록관리
                </h1>
            </S.PageHeader>

            <S.GridRow>
                <Col lg={8}>
                <Card className="shadow mb-4 border-left-primary">
                    <Card.Header className="py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                            신규컨텐츠 등록
                        </h6>
                    </Card.Header>
                    <Card.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-4 p-3 bg-light rounded">
                                <label className="font-weight-bold text-gray-800">
                                    등록 카테고리 선택
                                </label>
                                <div className="d-flex gap-3 mt-2">
                                    <div className="custom-control custom-radio mr-3">
                                        <Form.Check
                                        type="radio"
                                        label='🎥 어서찾아주개냥 유튜브'
                                        name="borderType"
                                        checked={boardType==='YOUTUBE'}
                                        className="font-weight-bold text-secondary"
                                        onChange={()=>handleBoardTypeChange('YOUTUBE')}
                                        />
                                    </div>

                                      <div className="custom-control custom-radio mr-3">
                                        <Form.Check
                                        type="radio"
                                        label='📰 펠로우 소식'
                                        name="borderType"
                                        checked={boardType==='FELLOW'}
                                        className="font-weight-bold text-success"
                                        onChange={()=>handleBoardTypeChange('FELLOW')}
                                        />
                                    </div>

                                    <div className="custom-control custom-radio mr-3">
                                        <Form.Check
                                        type="radio"
                                        label='🚨 도움이 필요해요'
                                        name="borderType"
                                        checked={boardType==='HELP'}
                                        className="font-weight-bold text-danger"
                                        onChange={()=>handleBoardTypeChange('HELP')}
                                        />
                                    </div>
                                </div>
                            </div>
                        <hr />
                        {/* 공통입력:제목 */}
                        <div className="form-group mb-3">
                            <label className="font-weight-bold text-gray-800">제목</label>
                            <Form.Control
                            type="text"
                            name="title"
                            placeholder="게시물 제목을 입력하세요"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            />
                        </div>

                        {boardType === 'YOUTUBE' && (
                        <>
                            <div className="form-group mb-3">
                                <label className="font-weight-bold">
                                    유튜브영상주소(URL)</label>
                                <Form.Control
                                type="url"
                                name="youtubeUrl"
                                placeholder="유튜브주소를 복사 붙여넣기하세요"
                                value={formData.youtubeUrl}
                                onChange={handleChange}
                                required
                                />
                                <small className="font-text text-muted">
                                    <span style={{color:'red'}}>*</span>
                                    주소를 입력하면 아래 썸네일이 자동으로 채워집니다
                                </small>
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="" className="font-weight-bold">
                                    자동 추출된 썸네일 URL
                                </label>
                                <Form.Control
                                type="url"
                                name="thumbnailUrl"
                                value={formData.thumbnailUrl}
                                onChange={handleChange}
                                required
                                />
                            </div>
                            {
                                formData.thumbnailUrl && (
                                    <div className="mb-4 text-center">
                                        <img 
                                        src={formData.thumbnailUrl} alt="썸네일미리보기" 
                                        className="img-thumbnail" 
                                        />
                                    </div>
                                )
                            }
                        </>
                        )}
                         {( boardType === 'FELLOW' || boardType === 'HELP' ) && (
                            <>
                            <div className="form-group mb-3">
                                <label className="font-weight-bold">
                                    상세 내역 (본문글)
                                </label>
                                <Form.Control
                                as="textarea"
                                rows={6}
                                name="content"
                                value={formData.content}
                                placeholder="자세한 사연이나 소식을 적어주세요"
                                onChange={handleChange}
                                required
                                />
                            </div>
                                
                            <div className="form-group mb-3">
                                <label className="font-weight-bold text-primary">
                                    대표이미지 URL (필수)
                                </label>
                                    <Form.Control
                                    type="url"
                                    name="imageUrl"
                                    placeholder="http://..."
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    required
                                    />
                            </div>
                            {
                                formData.imageUrl && (
                                    <div className="mb-4 text-center">
                                        <img 
                                        src={formData.imageUrl} alt="썸네일미리보기" 
                                        className="img-thumbnail" 
                                        />
                                    </div>
                                )
                            }

                            <Row>
                                <Col md={6} className="form-group mb-4">
                                    <label>동영상 첨부 URL (선택)</label>
                                    <Form.Control 
                                    type="text"
                                    name="videoUrl"
                                    value={formData.videoUrl}
                                    placeholder="/uploads/video.mp4"
                                    onChange={handleChange}
                                    />
                                
                                </Col>
                                <Col md={6} className="form-group mb-4">
                                    <label>기타 첨부 파일 URL (선택)</label>
                                    <Form.Control 
                                    type="text"
                                    name="attachmentUrl"
                                    value={formData.attachmentUrl}
                                    placeholder="/uploads/file.pdf"
                                    onChange={handleChange}
                                    />
                                </Col>
                            </Row>
                            </>
                        )}

                        <Button 
                        type="submit"
                        variant="primary"
                        className="btn-block w-100 font-weight-bold p-2 mt-4"
                        >
                            {boardType === 'YOUTUBE' 
                            ? '유튜브영상 등록하기':
                            boardType === 'FELLOW' ? '펠로우 등록하기'
                            : '도움 요청글 등록하기' }</Button>
                        </form>
                    </Card.Body>
                </Card>
                </Col>
            {/* 안내가이드 패널 */}
            <Col lg={4}>
                    <Card className='shadow mb-4'>
                        <Card.Header className='py-3'>
                            <h6 className='m-0 font-weight-bold text-primary'>
                                💡 카테고리별 등록 안내
                            </h6>
                        </Card.Header>
                        <Card.Body className='text-gray-800'>
                            <p><strong>🎥 어서찾아주개 유튜브</strong><br />
                                유튜브 영상 주소만 붙여넣으면 메인 화면의 '2단 그리드' 영역에 썸네일과 함께 노출됩니다.
                            </p>
                            <hr />
                            <p><strong>📰 펠로우 소식</strong><br />
                                센터의 훈훈한 소식이나 근황을 올립니다. 메인 화면의 '3단 그리드'에 정방형으로 예쁘게 렌더링됩니다. 대표 이미지는 필수입니다!
                            </p>
                            <hr />
                            <p><strong>🚨 도움이 필요해요</strong><br />
                                긴급한 구조나 지원이 필요한 동물들의 사연을 올립니다. 메인 화면의 '4단 그리드'에 노출되어 가장 많은 이미지를 한눈에 보여줍니다.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </S.GridRow>
        </Layout>
    )
}