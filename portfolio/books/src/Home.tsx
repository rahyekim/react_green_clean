import { useState} from "react"

import {Container, Row, Col, Carousel, Card, Nav} from 'react-bootstrap'

import * as S from './assets/css/styles'

import { MessageSquareText, BookOpen, 
  ChevronRight,ChevronLeft, BookOpenCheck, BookUser, Map, CircleQuestionMark
 } from "lucide-react"

// 단일 화살표(>), 이중 화살표(>>)

 //🌟유명한 아이콘들은 => 폰트어썸에서만...... 🌟npm install react-icons
import { FaInstagram, FaYoutube } from "react-icons/fa"


//--Data Mockups ---
const bestSellerData = [
  { id: 1, rank: 1, title: '용돈 잘 쓰는 법', image: 'https://placehold.co/150x200/9575cd/ffffff?text=BOOK+1' },
  { id: 2, rank: 2, title: '뭔말 과학 용어 200 1권', image: 'https://placehold.co/150x200/81d4fa/ffffff?text=BOOK+2' },
  { id: 3, rank: 3, title: '뭔말 과학 용어 200 2권', image: 'https://placehold.co/150x200/f48fb1/ffffff?text=BOOK+3' },
  { id: 4, rank: 4, title: '초등 수능 수학 KICK', image: 'https://placehold.co/150x200/81e6d9/ffffff?text=BOOK+4' },
]

const eventData = [
  { id: 1, type: '채널', title: '“선생님 스트레스 풀어영” 채택 EVENT', date: '2026.07.27 ~ 2026.08.31' },
  { id: 2, type: '해외', title: '그린스터디북스 글로벌 에디션', date: '2026.07.01 ~ 2026.12.31' },
  { id: 3, type: '라인업', title: '그린스터디북스 초중고 국어 참고서 라인업', date: '상시' },

];

const youtubeData = [
  { id: 1, category: '한능검', title: '한능검 끝판왕\n총 제작 기간 4년\n압도적 퀄리티', image: 'https://placehold.co/300x200/333333/ffffff?text=YT+1' },
  { id: 2, category: '초등 한국사', title: '하루 2장, 초등 한능검 30일 완성!\n능력검정시험 기본 완벽 대비', image: 'https://placehold.co/300x200/333333/ffffff?text=YT+2' },
  { id: 3, category: '집밥 백과', title: '평생 소장 클래식 집밥 백과\n박막례 할머니의 손맛 비법', image: 'https://placehold.co/300x200/333333/ffffff?text=YT+3' },

];



export default function Home() {

  const [greenPickTab, setGreenPickTab]=useState('전체');
  const [bestSellerTab, setBestSellerTab]=useState('전체');

  return (
    <>
   
     {/* Main Banner */}
     <Carousel
     prevIcon={<ChevronLeft size={30} color="#fff" />} 
     nextIcon={<ChevronRight size={30} color="#fff" />}>
        <Carousel.Item>
          <S.BannerSilde $bg="#81e6d9">
            <S.BannerContent>
              <S.BannerText>
                <span
                className="category-badge">
                  고등
                </span>
                <h1> 수능 수학 첫 개념 수업 <br/>  수능 수학 KICK ✨ </h1>
                <p> 🚀 수능 수학에 꼭 필요한 개념과 유형만 담았다 ! </p>
                <a href="#" className="view-more">
                  View more <ChevronRight size={14}/>
                </a>
              </S.BannerText>

              <S.BannerBookImg>
               <img src="https://placehold.co/100x140/fbc02d/ffffff?text=KICK" alt="Book 1" />
                <img src="https://placehold.co/100x140/ab47bc/ffffff?text=KICK" alt="Book 2" />
                <img src="https://placehold.co/100x140/66bb6a/ffffff?text=KICK" alt="Book 3" />
                <img src="https://placehold.co/100x140/ef5350/ffffff?text=KICK" alt="Book 4" />
              </S.BannerBookImg>

              <S.BannerPerson>
                <img src="https://placehold.co/250x350/dddddd/888888?text=PERSON" alt="Person" />
              </S.BannerPerson>
              
            </S.BannerContent>
          </S.BannerSilde>
        </Carousel.Item>

        <Carousel.Item>
          <S.BannerSilde $bg="#1a1a1a">
            <S.BannerContent className="justify-content-center">
              <div className=""
              style={{color:'#fff', textAlign:"center",fontWeight:800}}>
                <div style={{fontSize:'2rem'}}> 📚 그린 스터디 북스 </div>
                <p style={{fontSize:'1.2rem', color:"#ccc",marginTop:"10px"}}
                > 이제 스마트 하게 공부 하세요 ✏️ </p>
              </div>

            </S.BannerContent>
          </S.BannerSilde>
        </Carousel.Item>

     </Carousel>

     {/* Quick menu */}
     <S.QuickMenuSection>
      <Container>
        <Row className="justify-content-center">
          {[
            {icon:BookOpenCheck, text:'정답 및 해설'},
            {icon:MessageSquareText, text:'정오표'},
            {icon:FaYoutube, text:'듣기자료'},
            {icon:FaInstagram, text:'시각자료'},
            {icon:BookUser, text:'교사용 자료'},
            {icon:BookOpen, text:'교사용 이북'},
            {icon:Map, text:'총판 안내'},
            {icon:CircleQuestionMark, text:'FAQ'},
          ].map((item,idx)=> (
            <Col xs={4} md={3} lg={1} key={idx} className="mb-3">
              <S.QuickMenuMenu>
                <div className="icon-box">
                  <item.icon/>
                </div>
                <span>{item.text}</span>
              </S.QuickMenuMenu>
            </Col>
          ))}

        </Row>
      </Container>
     </S.QuickMenuSection>

     {/* green pick */}
     <section style={{padding:'40px 0'}}>
      <Container>
        <S.SectionTitle>✔️그린 PICK </S.SectionTitle>
        <S.HashTagList>
          {['# 해외 수출 도서', '# 백점백승', '# 초등공부시작부터끝까지', '# 탄탄한초등기기본', 
            '#학원쌤의선택', '# 2022개정교육과정' ].map(tag=> (
              <span key={tag}
              className="hashtag">{tag}</span>
            ))}
        </S.HashTagList>

        <S.TabNav 
        variant="pills"  //(둥근 버튼 형태)
        activeKey={greenPickTab}  //현재 선택된 탭을 관리(현재 탭 활성화)
        onSelect={(k: string | null)=> setGreenPickTab( k || '전체')}
        >
          {['전체','초등','중등', '고등','단행본'].map(tab=>(
            <Nav.Item key={tab}>
              <Nav.Link eventKey={tab}>{tab}</Nav.Link>
            </Nav.Item>
          ))}
        </S.TabNav>

        <Row>
          {bestSellerData.slice(0,3).map(book=>(
            <Col xs={12} md={4} key={book.id}>
              <S.BookCard>
                <S.BookImg $bg={book.image}/>
                <Card.Body>
                  <S.BookTitle>{book.title}</S.BookTitle>
                </Card.Body>
              </S.BookCard>
            </Col>
          ))}
        </Row>

      </Container>
     </section>

     {/* bestseller */}
     <section style={{padding: '60px 0', backgroundColor:"#fdfdfd"}}>
      <Container>
        <Row className="align-items-center mb-4">
          <Col>
            <S.SectionTitle>
              🔥 베스트 셀러
            </S.SectionTitle>
          </Col>
          <Col className="text-end">
            <S.TabNav variant="pills"
            activeKey={bestSellerTab}
            onSelect={(k: string|null)=> setBestSellerTab(k || '초등')}
            className="justify-content-end mb-0"
            >
              {['초등','중등','고등','단행본'].map(tab=>(
                <Nav.Item key={tab}>
                  <Nav.Link eventKey={tab}>{tab}</Nav.Link>
                </Nav.Item>
              ))}
            </S.TabNav>
          </Col>
        </Row>

        <Row>
          {bestSellerData.map((book, idx)=>(
            <Col lg={6} key={book.id}>
              <S.BestSellerItem>
                <Col xs={2}>
                  <S.BestSellerRank>
                    {idx+1}
                  </S.BestSellerRank>
                </Col>
                <Col xs={3}>
                  <img src={book.image} alt={book.title}
                  style={{width:"100%", borderRadius:"12px"}}
                  />
                </Col>
                <Col xs={7}>
                  <S.BestSellerBookTitle>
                    {book.title}
                  </S.BestSellerBookTitle>
                  <S.BestSellerTag className="mt-2">
                    <span>{bestSellerTab}</span>
                    <span>학습</span>
                  </S.BestSellerTag>
                </Col>
              </S.BestSellerItem>
            </Col>
          ))}
        </Row>
      </Container>
     </section>

     {/* Youbute & Event */}
    <section style={{padding:"60px 0"}}>
      <Container>
        <Row className="align-items-stretch gap-5">
          {/* 유튜브 오른쪽 col 7칸*/}
          <Col lg={7}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              
              <S.SectionTitle className="mb-0">
                <S.YoutubeSectionNav>

                  <ChevronLeft size={30}/>
                  <ChevronRight size={30}/>

                </S.YoutubeSectionNav>
              </S.SectionTitle>

            </div>
         
            <Row>
              {youtubeData.slice(0,3).map(data=>(
                <Col md={4} key={data.id}>
                  <S.YoutubeCard>
                    <S.YoutubeThumbnail $bg={data.image}/>
                    <S.YoutubeText>
                        <div className="yt-category">
                          {data.category}
                        </div>
                        <div className="yt-title">
                          {data.title}
                        </div>
                    </S.YoutubeText>
                  </S.YoutubeCard>
                </Col>
              ))}
            </Row>
          </Col>

        {/* 이벤트 오른쪽 col4칸 */}
          <Col lg={4}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <S.SectionTitle>이벤트</S.SectionTitle>
              <S.EventSectionNav>
                View more <ChevronRight size={18}/>
              </S.EventSectionNav>
            </div>
            {eventData.map(e=>(
              <S.EventItem key={e.id}>
                <Col>
                  <S.EventBadge $type={e.type}>
                    {e.type} EVENT
                  </S.EventBadge>
                  <S.EventTitle>{e.title}</S.EventTitle>
                  <S.EventTitle>{e.date}</S.EventTitle>
                </Col>
              </S.EventItem>
            ))}
          </Col>
        </Row>
      </Container>
    </section>


    {/* 커뮤니티 */}

    <section style={{padding:"60px 0", backgroundColor:"#fdfdfd"}}>
      <Container>
        <S.SectionTitle>
          Community
        </S.SectionTitle>
        <Row>
          {[
            {icon:FaInstagram, text:"그린스터디북스", sns:"instagram"},
            {icon:FaInstagram, text:"그린맘스", sns:"instagram"},
            {icon:FaInstagram, text:"그린책방", sns:"instagram"},
            {icon:FaYoutube, text:"그린스터디북스", sns:"youtube"},
            {icon:MessageSquareText, text:"그린맘스", sns:"band"},
            ].map((item, idx)=>(
              <Col  xs={12} sm={6} md={4} lg={4} key={idx}>
                <S.CommunityButton variant="light">
                  <div className="icon-text">
                    <item.icon 
                      color={
                        item.sns === 'instagram' 
                        ? "#e1306c" 
                        : item.sns === 'youtube' 
                        ? "#ff0000"
                        : "#4caf50"
                      }/>
                    <span>{item.text}</span>
                  </div>
                  <ChevronRight size={20} color="#aaa"/>
                  
                </S.CommunityButton>
              </Col>
            ))}
        </Row>
      </Container>
    </section>

   

    </>
  )
}

