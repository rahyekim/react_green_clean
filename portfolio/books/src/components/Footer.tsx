import * as S from '../assets/css/styles'
import { Container, Row, Form, Col } from 'react-bootstrap'
import { BookOpen, MessageSquareText } from 'lucide-react'
import { FaInstagram, FaYoutube } from "react-icons/fa"

export const Footer = ()=>{

    return(
        <>
         {/* footer */}

        <S.StyledFooter>
        <Container>
            <S.FooterLinkList>
                <li>회사 소개</li>
                <li>이용 약관</li>
                <li>개인정보 처리방침</li>
                <li>고객 센터</li>
                <li>제휴 문의</li>
                <li>투고 문의</li>
                <li>사이트맵</li>
            </S.FooterLinkList>

            <Row className="align-items-start g-4">
                
            {/* 회사 정보 (왼쪽) */}
                <Col md={7} lg={8}>
                <S.FooterCompanyInfo>
                    <div className="footer-log">
                    📍 Green Study Books
                    </div>
                    그린스터디(주) | 대표자: 구레나이 | 개인정보관리책임자: 구레나이린 | 사업자등록번호: 123-45-67890 | 통신판매업신고번호: 2026-서울서초-0000<br/>
                    서울 서초구 그린로 304 (서초동) 그린타워 10층 | 팩스: 02-0000-0000 | 고객센터: 1661-0000<br/>
                </S.FooterCompanyInfo>
                </Col>
                
                {/* SNS & 패밀리 사이트 (오른쪽) */}
                <Col md={5} lg={4}
                className="text-end d-flex flex-column align-items-end gap-3 ">

                <S.FooterSnsIcons>
                    <FaInstagram/><FaYoutube/><MessageSquareText/>
                </S.FooterSnsIcons>
                
                <Form.Select
                size="sm" style={{width:"150px"}}>
                    <option>Family site</option>
                    <option>그린스터디</option>
                    <option>그린원격평생교육원</option>
                </Form.Select>
                </Col>
            </Row>
        </Container>
        </S.StyledFooter>

     {/* floating btn 위로점프버튼 */}
        <S.FloatingBtn>
            <BookOpen/>
            <span>맞춤도서</span>
        </S.FloatingBtn>
        </>
    )
}