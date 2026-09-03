
import * as S from '@/assets/css/Style.style'
import { Metadata } from 'next'

export const metadata: Metadata = {title: "비밀번호 찾기"}

export default function ForgotPassword(){
    return(
        <>
        <S.Container>
            <S.Card>
                <S.ImgColumn/>
                <S.FormColumn>
                    <S.Title>비밀번호 찾기</S.Title>
                    <S.Description>
                        We get it, stuff happens. Just enter your email address below
                    </S.Description>
                    <S.Form>
                        <S.Input type='email' name='email' id='email' 
                        placeholder='이메일'
                        />
                        <S.Button type='submit'>
                            비밀번호 재설정
                        </S.Button>

                         <S.Divider/>

                    </S.Form>

                    <S.LinkWrapper>
                        <S.StyledLink href='/member'>회원가입</S.StyledLink>
                        <span>|</span>
                        <S.StyledLink href='/'>로그인</S.StyledLink>
                    </S.LinkWrapper>
                    
                </S.FormColumn>
            </S.Card>
        </S.Container>
        </>
    )
}