'use client'

import { useState } from "react"

import { Layout } from "@/app/components/layout/Layout";
import * as S from "../DashBoard.styled";
import {Row,Col, Card,Form,Button} from 'react-bootstrap'
import axios from "axios";

//세션(쿠키)기반 관리자 인증을 위해
axios.defaults.withCredentials = true;

const HASHTAG_LIST=[
    '#제주입양', '#임시보호', '#치료지원', '#입양홍보', '#구조스토리'
   ]

export default function AdoptionCampaignAdmin(){

    
    const [formData, setFormData ]=useState({
        hashtag: '',
        title:'',
        content: '',
        thumbnailUrl:'',
        mediaType:'IMAGE',
        mediaUrl:'',
    });

    /*
    유튜브영상은 고유의 ID(11자리)만 뽑아내면, 
    유튜브 서버에서 제공하는 공식 썸네일 이미지 주소를 조합해서 자동으로 가져올 수 있습니다.
    유튜브 링크는 형태가 다양 (watch?v=..., youtu.be/..., embed/... 등) :
    모바일용 공유용 퍼가기용
    .* : 주소의 맨처음(^)부터 시작해서 아무글자(.*)나 있어도 일단 통과
    1️⃣첫 번째 괄호 (youtu.be\/|v\/...|watch\?v=...):[그룹 1]
    이 부분은 유튜브 주소의 앞부분 패턴(watch?v= 이나 youtu.be/ 등)을 찾기 위한 괄호입니다.
    즉, "여기서부터 주소가 시작된다!"는 걸 표시하는 용도
    (| 기호는 '또는(OR)'을 의미)
    2️⃣ 두 번째 괄호 [^#\&\?]* :[그룹2] 비디오 아이디가 담기는 곳 
    ^... 제외하고 라는 뜻
    , 해시태그(#)나 앰퍼샌드(&), 물음표(?)가 나오기 전까지의 모든 글자를 캡쳐해서
    그룹2에 저장하라는 뜻

    그 뒤의 .*: 쓸데없는 부가 주소들을 그냥 무시(.*)해버림
    유튜브 주소뒤에 &t=30s (시간재생)같은 꼬리표 붙을수잇는데 이걸 잘라내고 순수ID만 얻기위해서
     */
    
    // 유튜브 URL에서 영상 ID(11글자)를 추출하는 함수
    const extractYoutubeId= (url:string)=>{

        if (!url) return null;
        //유튜브 url의 다양한 패턴을 모두 잡아내는 정규식(규칙)
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        //입력받은 url을 방금만든 규칙에 맞춰서 검사
        const match = url.match(regExp)

        // 11자리 영상 ID가 정상적으로 추출되면 ID 반환, 아니면 null
        return (match && match[2].length === 11) ? match[2] : null;
    }

    //일반 입력값 변경 핸들러
    const handleChange = (e:React.ChangeEvent<any>)=>{

        const {name, value} = e.target;
        // setFormData(prev=> ({
        //     ...prev,
        //     [name]: value,
        //     // ...(name === 'mediaType' && { mediaUrl: '' })
        // }))

        setFormData(prev=> {
            const newData = {
            ...prev, [name]: value
            };
            //1. 미디어 타입 변경 시 mediaUrl 초기화
            if (name === 'mediaType') {
                newData.mediaUrl = '';
                // 필요하다면 여기서 thumbnailUrl도 같이 초기화할지 결정하세요
            }
            //2. 유튜브 URL 자동 썸네일 추출
            //만약 방금 입력한게 mediaurl영상주소 이고, 현재모드가 youtube라면?
            if(name ==='mediaUrl' && newData.mediaType === 'YOUTUBE'){
                const videoId =extractYoutubeId(value);
                //유튜브 id추출에 성공했다면 썸네일 주소를 자동으로 완성해줌
                if(videoId){
                    newData.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                }else if(value === ''){
                // 유튜브링크입력값이 비어있다면 썸네일도 비워줌
                    newData.thumbnailUrl = '';
                }
            }
            return newData;
        })
    }

    //미디어 타입(라디오버튼)변경 핸들러
    const handleMediaTypeChange = (type:string)=>{
        
        //타입이 바뀌면 기존 영상주소는 초기화하여 꼬임방지
        setFormData(prev=>({
            ...prev,
            mediaType: type,
            mediaUrl: '',   //바뀐타입입력값 반영후-> 초기화 순서중요
        }));
    }

    //폼 제출 핸들러
    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:8080/api/campaigns', formData)
            alert(res.data.message || '입양 캠페인이 성공적으로 등록 되었습니다')
            
            //등록성공후 폼 깨끗이 비우기
            setFormData({
                hashtag: '',
                title:'',
                content: '',
                thumbnailUrl:'',
                mediaType:'IMAGE',
                mediaUrl:'',
            });
        }catch(err:any){
            console.error("등록에러",err);
            if(err.response?.status=== 401){
                alert('등록 권한이 없습니다. 관리자로 로그인해주세요')
            }else{
                alert('서버오류가 발생했습니다. 잠시후 시도해주세요')
            }
        }
    }

  
    return(
        <>
        <Layout>
            <S.PageHeader>
                <h1 className="h3 mb-0 text-gray-800">입양 캠페인 관리</h1>
            </S.PageHeader>

            <S.GridRow>
                <Col lg={8}>
                    <Card className="shadow mb-4 border-left-primary">
                        <Card.Header className="py-3">
                            <h6 className="m-0 font-weight-bold text-primary">
                                신규 캠페인 등록</h6>
                        </Card.Header>
                        <Card.Body>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="font-weight-bold text-gray-800">
                                        미디어 타입 설정
                                    </label>
                                    <div className="d-flex gap-3 mt-2" >
                                    <div className="custom-control custom-radio mr-3">
                                        <Form.Check
                                        type="radio"
                                        name="mediaType"
                                        label='이미지형'
                                        value='IMAGE' 
                                        checked={formData.mediaType==='IMAGE'}
                                        onChange={()=>handleMediaTypeChange('IMAGE')}
                                        />
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <Form.Check
                                        type="radio"
                                        id="mediaYoutube"
                                        name="mediaType"
                                        label='유튜브 링크형'
                                        value='YOUTUBE'
                                        checked={formData.mediaType==='YOUTUBE'}
                                        onChange={()=>handleMediaTypeChange('YOUTUBE')}
                                        />
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <Form.Check
                                        type="radio"
                                        id="mediaDirect"
                                        name="mediaType"
                                        label='서버 직접 업로드형'
                                        value='DIRECT_VIDEO'
                                        checked={formData.mediaType==='DIRECT_VIDEO'}
                                        onChange={()=>handleMediaTypeChange('DIRECT_VIDEO')}
                                        />
                                    </div>
                                   </div>
                                </div>
                            <hr />
                                {/* 해시태그 및 제목 입력 구역 */}
                                <Row>
                                    <Col md={4} className="form-group mb-3">
                                        <p><label className="font-weight-bold">
                                            해시태그(말머리) </label></p>
                                        <Form.Select
                                        name="hashtag"
                                        value={formData.hashtag}
                                        onChange={handleChange}
                                        required
                                        >   
                                             <option value="">--필수 선택--</option>
                                             {HASHTAG_LIST.map((tag,idx)=>(
                                                <option key={idx} value={tag}>{tag}</option>
                                             ))}

                                             {/*🔹잘못된방법: 하드코딩
                                            <option value="#제주입양">#제주입양</option>
                                            <option value=">#임시보호">#임시보호</option>
                                            <option value=""></option> */} 
                                        </Form.Select>
                                    </Col>
                                    <Col md={8} className="form-group md-3">
                                    <label className="font-weight-bold">캠페인 제목</label>
                                    <Form.Control
                                    name="title"
                                    value={formData.title}
                                    placeholder="목록에 노출될 제목을 적어주세요"
                                    onChange={handleChange}
                                    required
                                    />
                                    </Col>
                                </Row>

                                {/* 상세 내용구역 */}
                                <div className="form-group mb-3">
                                    <label className="font-weight-bold">상세내용</label>
                                    <Form.Control
                                    as="textarea" //로서(as) 동작하게 해라
                                    rows={5}
                                    name="content"
                                    placeholder="캠페인의 자세한 사연이나 설명을 적어주세요"
                                    value={formData.content}
                                    onChange={handleChange}
                                    style={{resize:"none"}}
                                    required
                                    />
                                </div>

                                {/* 동영상 링크/경로 */}
                                {formData.mediaType !== 'IMAGE' && (
                                    <div className="form-group mb-3 p-3 bg-light ">
                                        <label className="font-weight-bold text-primary">
                                            {formData.mediaType === 'YOUTUBE' ? '유튜브 링크(url)' : '서버동영상 파일경로'}
                                        </label>
                                        <Form.Control
                                        type="text"
                                        name="mediaUrl"
                                        placeholder={formData.mediaType=== 'YOUTUBE' ? 'http://youtube.com/...': '/uploads/videos/campaign_'}
                                        value={formData.mediaUrl}
                                        onChange={handleChange}
                                        required={formData.mediaType !== 'IMAGE'}
                                        />
                                    </div>
                                )}

                                {/* 썸네일 구역 */}
                                <div className="form-group mb-4">
                                    <label className="font-weight-bold">
                                        썸네일 이미지 URL(최대 2MB)
                                    </label>
                                    <Form.Control 
                                    type="url"
                                    name="thumbnailUrl"
                                    placeholder="목록에 보여질 썸네일 주소를 입력하세요"
                                    value={formData.thumbnailUrl}
                                    onChange={handleChange}
                                    required
                                    />
                                </div>

                                {/* 썸네일 미리보기 */}
                                {formData.thumbnailUrl && (
                                    <div className="mb-4 text-center">
                                        <img 
                                        src={formData.thumbnailUrl}
                                        className="rounded border"
                                        style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                                        alt="썸네일 미리보기"/>
                                    </div>
                                )}
                                <Button type="submit" variant="primary"
                                className="btn-block font-weight-bold">캠페인 최종 등록</Button>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4}>
                <Card className="shadow mb-4">
                    <Card.Header className="py-3">
                        <h6 className="m-0 font-weight-bold text-primary">등록 안내 가이드</h6>
                    </Card.Header>
                    <Card.Body className="text-gray-800">
                        <p>
                            <strong>1.해시태그(말머리)필수: </strong> <br />
                                말머리를 정확히 선택해야 사용자 페이지에서 해당 카테고리로 묶여서
                                노출 됩니다.
                        </p>
                        <hr />
                         <p>
                            <strong>2.유튜브 링크 활용: </strong> <br />
                               서버트래픽 절감 및 원활한 스트리밍을 위해 가급적 유튜브 링크 연동을 권장
                               합니다. 상세페이지에서 Iframe으로 노출됩니다
                        </p>
                        <hr />
                         <p>
                            <strong>3. 직접 동영상 업로드 시 주의: </strong> <br />
                               외부통제가 불가능한 상황을 대비한 기능입니다.
                               트래픽 폭주를 막기위해 최대 2MB용량, 30초 이내의 ogg또는
                               mp4파일로 변환하여 업로드
                        </p>

                    </Card.Body>
                </Card>
                </Col>
            </S.GridRow>
        </Layout>
        
        </>
    )
}