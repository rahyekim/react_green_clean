import type { Metadata } from "next";
import * as S from '@/assets/css/Style.style'

export const metadata : Metadata = {
  title: '로그인'
};

export default function Home() {
  return (
    <S.Container>
      <S.Card>
        <S.ImgColumn/>
        <S.FormColumn>
          <S.Title>Welcome Back</S.Title>
          <S.Form>
            <S.Input type="email" id="email" name="email"
            placeholder="이메일"
            />
            <S.Input type="password" id="password" name="password"
            placeholder="비밀번호"
            />
            <S.CheckboxWrapper>
              <input type="checkbox"  />
              <S.CheckboxLabel htmlFor='customCheck'>
               아이디 저장
              </S.CheckboxLabel>
            </S.CheckboxWrapper>

            <S.Button type="submit">
              로그인
            </S.Button>

            <S.Divider $margin="0.5rem"/>
            <S.SocialButton type="button" $provider="google">
              <i className="fab fa-google fa-fw"/>
              Google로 로그인
            </S.SocialButton>
             <S.SocialButton type="button" $provider="insta">
              <i className="fab fa-facebook fa-fw"/>
              Instagram로 로그인
            </S.SocialButton>

          <S.Divider/>
          </S.Form>

          <S.LinkWrapper>
            <S.StyledLink href='/forgot'>
              비밀번호 찾기
            </S.StyledLink>
            <span>|</span>
            <S.StyledLink href='/member'>
              회원가입
            </S.StyledLink>
          </S.LinkWrapper>

        </S.FormColumn>
      </S.Card>
    </S.Container>
  );
}
