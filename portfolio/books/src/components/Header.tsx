import * as S from '../assets/css/styles'
import { Container,Navbar, Nav, FormControl } from 'react-bootstrap'

import {User, Menu} from 'lucide-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'

export const Header = ()=>{

    return(
        <>
         {/* 전역스타일 */}
            <S.GlobalStyle/> 
            <S.StyledHeader>
              <Container>
                <Navbar expand="lg">
        
                  <S.HeaderLogo href='/'> Green StudyBooks </S.HeaderLogo>
        
                  {/* 모바일에서 누르는 버튼 :햄버거버튼 */}
                  <Navbar.Toggle aria-controls="basic-navbar-nav"
                  style={{ border: "none", outline: "none", boxShadow: "none" }}
                  >
                    <FontAwesomeIcon icon={faBars}/>
                    {/* <Menu size={24} color="#333" /> */}
                  </Navbar.Toggle>  
                  <Navbar.Collapse id="basic-navbar-nav"
                    className="justify-content-center"
                    >
                    <Nav>
                      <Nav.Link href="">초등</Nav.Link>
                      <Nav.Link href="/middle">중등</Nav.Link>
                      <Nav.Link href="">고등</Nav.Link>
                      <Nav.Link href="">단행본</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
        
                  <div className="d-flex align-items-center gap-3 ms-auto mt-2 mt-lg-0">
                    <S.SearchForm className="d-none d-lg-block">
                      <FormControl type="text" placeholder="검색어 입력"/>
                      <S.SearchIcon size={20}/>
                    </S.SearchForm>
                    
                    <User size={24} style={{cursor: 'pointer'}}/>
                    <Menu size={24} style={{cursor: 'pointer'}}
                    className="d-lg-none"
                    /> 
                    {/* 모바일용 d-lg-none */}
                  </div>
        
                  {/* 모바일전용 검색바 */}
                  <S.SearchForm
                  className="d-lg-none w-100 mt-3">
                    <FormControl type="text" placeholder="검색어입력"/>
                    <S.SearchIcon size={29}/>
                  </S.SearchForm>
        
                </Navbar>
              </Container>
            </S.StyledHeader>
        </>
    )
}