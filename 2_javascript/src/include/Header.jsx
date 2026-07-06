import { Link } from "react-router-dom";

import { Button, Container, Form , Nav, Navbar, NavDropdown} from 'react-bootstrap'

const Header = ( ) => {

    return (
        <>
    <Navbar expand='lg' className="bg-body-tertiary">
       <Container fluid>
            {/*로고 */}
            <Navbar.Brand href="/">React</Navbar.Brand>
            {/*햄버거 메뉴*/}
            <Navbar.Toggle aria-controls="navbarScroll"/>
            {/*드롭다운 메뉴 */}
            <Navbar.Collapse id="navbarScroll">
               <Nav className="me-auto my-2 my-lg-0"
               navbarScroll
               >
                 <NavDropdown 
                    title="UI/UX" 
                    id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/flex">flex</NavDropdown.Item>
                    <NavDropdown.Item href="/flexweb">flexweb</NavDropdown.Item>
                    <NavDropdown.Item href="/grid">grid</NavDropdown.Item>
                    <NavDropdown.Item href="/layout">layout</NavDropdown.Item>
                    <NavDropdown.Item href="/gridweb">gridweb</NavDropdown.Item>
                    <NavDropdown.Item href="/girdtest">gridtest</NavDropdown.Item>

                    <NavDropdown.Item href="/intro">jquery-intro</NavDropdown.Item>
                    <NavDropdown.Divider/>

                </NavDropdown>

                
                <Nav.Link href="/jsx">JSX</Nav.Link>
                <Nav.Link href="/components">Components</Nav.Link>
                <Nav.Link href="/class">Class</Nav.Link>
                <Nav.Link href="/props">Props</Nav.Link>
                <Nav.Link href="/event">Event</Nav.Link>
                <Nav.Link href="/forms">Forms</Nav.Link>
                <Nav.Link href="/forms2">Forms2</Nav.Link>
                <Nav.Link href="/router">Router</Nav.Link>
                <Nav.Link href="/hoc">HOC</Nav.Link>
                <Nav.Link href="/fref">Fref</Nav.Link>
                <Nav.Link href="/trans">Trans</Nav.Link>
                <Nav.Link href="/portals">Portals</Nav.Link>
                <Nav.Link href="/sus">Sus</Nav.Link>
                <Nav.Link href="/hooks">HOOKS</Nav.Link>

                <NavDropdown 
                    title="es6" 
                    id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/es6">es6소개</NavDropdown.Item>
                    <NavDropdown.Item href="/async">비동기</NavDropdown.Item>
                    <NavDropdown.Item href="/fx">함수</NavDropdown.Item>
                    <NavDropdown.Item href="/re">재귀함수</NavDropdown.Item>
                    <NavDropdown.Item href="/cate">재귀함수 실무</NavDropdown.Item>
                    <NavDropdown.Item href="/date">date</NavDropdown.Item>
                    <NavDropdown.Item href="/temp">temporal</NavDropdown.Item>
                    <NavDropdown.Item href="/datevstemp">datevstemporal</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="/geo">위치기반</NavDropdown.Item>
                    <NavDropdown.Item href="/practice">My 회원가입</NavDropdown.Item>
                    <NavDropdown.Item href="/practice2">My 회원등록 </NavDropdown.Item>

                </NavDropdown>
                <Nav.Link href="" disabled>사용하지않을때</Nav.Link>
               </Nav>
               <Form className="d-flex">
                <Form.Control 
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    className="me-2"/>
                    <Button variant="outline-success">Search</Button>
               </Form>
            </Navbar.Collapse>
       </Container>
    </Navbar>
        </>
    )
}

export default Header;


/**
 <nav>
           <Link to='/'>Home</Link> |
           <Link to='/flex'> float vs flex vs grid</Link> |
           <Link to='/es6'>Es6 인트로</Link>
        </nav>



Navbar        = 전체 nav 바
Container     = 가운데 정렬 박스
Navbar.Brand  = 로고
Navbar.Toggle = 햄버거 버튼 (모바일)
Navbar.Collapse = 펼쳐지는 메뉴
Nav           = 메뉴 그룹
Nav.Link      = 메뉴 하나

Navbar = 구조 + Collapse(써야 메뉴열림) + Toggle 조합으로 반응형 nav 자동 완성
 */