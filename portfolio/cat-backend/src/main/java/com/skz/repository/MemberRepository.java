package com.skz.repository;

import com.skz.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {
//Member데이터를 다루고, PK(고유번호) 타입은 Long인 레파지토리의 인터페이스를 생성합니다.
    //1.회원가입 중복 체크용 메서드
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
    //프론트에서입력한 닉네임이 이미 DB에 존재하는지(truefalse) 확인

    //2.실제 로그인 처리를 위한 조회용 메서드
    //[일반로그인] 사용자가 입력한 이메일로 DB에서 회원정보 찾아옴
    Optional<Member> findByEmail(String email);

    //[카카오] 가입경로('kakao')와 카카오에서 넘겨준 "고유Id 번호" 를 조합해서
    //기존에 가입한 적이 있는 카카오 회원인지 찾아옴
    Optional<Member> findByProviderAndProviderId(String provider, String ProviderId);


}

