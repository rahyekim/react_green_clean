'use client'

//📍https://www.catcare.or.kr/main
import { useState } from "react"
import {Layout} from '../../components/layout/Layout'

import * as S from '../DashBoard.styled'

import axios from "axios"
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"

axios.defaults.withCredentials=true;

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

    // 💡파싱(불러오기)중인지 확인하는 로딩상태
    const [isParsing,setIsParsing]=useState(false);

    //URL 파싱(데이터 불러오기)핸들러

    const handleParseUrl = async()=>{
        if(!formData.sourceUrl){
            alert("sns 주소를 먼저입력해주세요!")
            return;
        }
        setIsParsing(true);

        try{
            const res = await axios.post('/api/animals/parse-link',{ //http://localhost:8080
                url: formData.sourceUrl,
                type: sourceType
            }, {withCredentials: true});
            //백엔드가 추출해온 데이터를 폼에 자동으로 덮어씌움!
            const parsedData = res.data
            setFormData(prev=> ({
                ...prev,
                region: parsedData.region || prev.region,
                noticeNo: parsedData.noticeNo || prev.noticeNo,
                birthYear : parsedData.birthYear || prev.birthYear,
                weight: parsedData.weight || prev.weight,
                gender: parsedData.gender|| prev.gender,
                imageUrl: parsedData.imageUrl || prev.imageUrl
            }));
            alert('데이터를 성공적으로 불러왔습니다 빈칸이나 틀린 부분을 수정해 주세요')

        }catch(err){
            console.error("파싱 에러",err)
            setFormData(prev => ({
                ...prev,
                region: '서울시 마포구',
                noticeNo: '마포-2026-001',
                birthYear: '2023',
                gender: 'M',
                weight: '5.5',
                imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=300'
                }));
        }finally{
            setIsParsing(false);
        }
    }

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
    //setSourceType 변경 시 초기화 추가
    const handleSourceTypeChange = (type:'DIRECT'|'FACEBOOK'|'INSTAGRAM')=>{
        setSourceType(type);
        setFormData({
            sourceUrl: '',
            region: '',
            noticeNo: '',
            birthYear: '',
            gender: 'M',
            weight: '',
            imageUrl: ''
        })
    };


    //폼 제출 핸들러

    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
            //스프링 부트 백엔드로 데이터전송(post)
            const res = await axios.post('/api/animals/recommended',{ //http://localhost:8080
                sourceType,
                ...formData
            })
            alert("추천동물이 성공적으로 등록되었습니다.")
            //초기화
            setFormData({
                sourceUrl: '',
                region: '',
                noticeNo: '',
                birthYear: '',
                gender: 'M',
                weight: '',
                imageUrl: ''
            });
            setSourceType('DIRECT');
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
                                            onChange={()=>handleSourceTypeChange('DIRECT')}
                                            label="자체 직접 등록"
                                            />
                                            {/* <label 
                                            htmlFor="sourceDirect"
                                            className="">
                                                자체 직접 등록
                                            </label> */}
                                        </div>

                                        <div className="custom-control custom-radio mr-3">
                                            <Form.Check
                                            type="radio"
                                            id="sourceFacebook"
                                            name="sourceType"
                                            checked={sourceType === 'FACEBOOK'}
                                            onChange={()=>handleSourceTypeChange('FACEBOOK')}
                                            label="페이스북 링크"
                                            />
                                        </div>

                                        <div className="custom-control custom-radio mr-3">
                                            <Form.Check
                                            type="radio"
                                            id="sourceInstagram"
                                            name="sourceType"
                                            checked={sourceType === 'INSTAGRAM'}
                                            onChange={()=>handleSourceTypeChange('INSTAGRAM')}
                                            label="인스타 링크"
                                            />
                                        </div>
                                    </div>
                                </div>
                        <hr />
                        {/*✨ sns주소 입력창과 '데이터 불러오기'버튼 연동 */}
                        {sourceType !== 'DIRECT' && (
                            <div className="form-group mb-3">
                                <label className="font-weight-bold text-primary">SNS 포스팅 URL 주소</label>
                                <div className="input-group">
                                    <Form.Control
                                    type="url"
                                    name="sourceUrl"
                                    placeholder={`${sourceType=='FACEBOOK' ? '페이스북' : '인스타그램'} 주소를 입력하세요`}
                                    value={formData.sourceUrl}
                                    onChange={handleChange}
                                    required
                                    />
                                    <div className="input-group-append">
                                        <Button
                                        onClick={handleParseUrl}
                                        variant="outline-primary"
                                        disabled={isParsing}
                                        >{isParsing? '분석중...': '데이터 자동 불러오기⚡️'}</Button>
                                    </div>
                                </div>
                                <small className="form-text text-muted">
                                    <span style={{color:"red"}}>*</span>주소를 입력하고 불러오기 버튼을 눌르면 정보가 자동으로 채워집니다.
                                </small>
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
                                    <label>출생년도 (예: 2016)</label>
                                    <Form.Control
                                    name="birthYear"
                                    value={formData.birthYear}
                                    onChange={handleChange}
                                    required
                                    />
                            </Col>
                            <Col md={4} className="form-group mb-3">
                                    <label> 성별 </label>
                                    <Form.Select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                    >
                                        <option value="M">수컷(M)</option>
                                        <option value="F">암컷(F)</option>
                                    </Form.Select>
                            </Col>
                            <Col md={4} className="form-group mb-3">
                                    <label> 체중(kg)</label>
                                    <Form.Control
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    required
                                    />
                            </Col>
                        </Row>

                        <div className="form-group mb-4">
                            <label htmlFor="">동물사진 URL</label>
                            <Form.Control
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            placeholder="https://..."
                            onChange={handleChange}
                            required
                            />
                        </div>
                        {/* 이미지 URL이 있으면 미리보기 제공 */}
                        {formData.imageUrl && (
                        <div className="mb-4 text-center">
                            <img src={formData.imageUrl} alt="미리보기" className="img-thumbnail" style={{ maxHeight: '200px' }} />
                        </div>
                        )}

                        {/* ✨ 잃어버린 '최종 등록하기' 버튼이 들어갈 자리입니다! ✨ */}
                        <button type="submit" className="btn btn-primary btn-block w-100 font-weight-bold p-3 mt-4">
                            최종 등록하기
                        </button>

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