package com.skz.service;


import com.skz.DTO.AdminResponse;
import com.skz.DTO.MissingPostRequest;
import com.skz.DTO.MissingPostResponse;
import com.skz.domain.PostStatus;
import com.skz.entity.Admin;
import com.skz.entity.Member;
import com.skz.entity.MissingPost;
import com.skz.repository.AdminRepository;
import com.skz.repository.MemberRepository;
import com.skz.repository.MissingPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/*스프링에서 콩이란?
Spring Bean: 스프링 컨테이너가 직접 만들고 관리하는 자바 객체
자바에서 객체를 만들때 new 키워드로 직접 객체를 생성 하고 소멸시키는 것과 달리
스프링이(Ioc컨테이너)가 그 객체들의 생명주기(생성,의존성 연결,소멸)을 대신관리
* */
@Service //스프링 빈으로 등록하여 비지니스로직을 담당하는 클래스지정
@RequiredArgsConstructor //private final이 붙은 필드들을 모아서 자동으로 생성자를 만들어줌
@Transactional(readOnly = true) //기본적으로 데이터 전용 트랜잭션설정
public class MissingPostService {
    // 👇 2. 스프링이 관리하는 '콩(Bean)'을 가져와서 담을 그릇
    private final MissingPostRepository missingPostRepository;
    private final MemberRepository memberRepository;

    //주방장(service)이 DB에서 데이터를 꺼낼때 사용할 냉장고 ... final이라 중간에 냉장고 바꿀수없음
    //실종 신고글 작성(로그인 유저 정보반영)
    @Transactional
    public MissingPostResponse createPost(MissingPostRequest requestDto, String name) {
        //현재 로그인한 유저의 아이디 기반으로 DB에서 유저 정보를 조회
        Member member = memberRepository.findByName(name)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다"));

        //Request DTO를 Entity로 변환하면서 author(작성자) 정보 쏙 넣어주기
        MissingPost post = new MissingPost();
        post.setTitle(requestDto.getTitle());
        post.setContent(requestDto.getContent());
        post.setBreed(requestDto.getBreed());
        post.setWeight(requestDto.getWeight());
        post.setColor(requestDto.getColor());
        post.setAge(requestDto.getAge());
        post.setGender(requestDto.getGender());
        post.setRescueLocation(requestDto.getRescueLocation());
        post.setMediaUrls(requestDto.getMediaUrls());
        post.setStatus(PostStatus.MISSING);
        post.setCreatedAt(LocalDateTime.now());
        post.setAuthor(member); // 👈 작성자 연결은 Member 객체 통째로!

        MissingPost savedPost = missingPostRepository.save(post);
        return new MissingPostResponse(savedPost); //DB에 저장
    }

    // 실종 신고글 수정
    @Transactional
    public MissingPostResponse updatePost(Long id, MissingPostRequest requestDto, String username) {
        MissingPost post = missingPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다.id= " + id));
        if(!post.getAuthor().getName().equals(username)) {
            throw new SecurityException("수정권한이 없습니다.");
        }
        post.setTitle(requestDto.getTitle());
        post.setContent(requestDto.getContent());
        post.setBreed(requestDto.getBreed());
        post.setWeight(requestDto.getWeight());
        post.setColor(requestDto.getColor());
        post.setAge(requestDto.getAge());
        post.setGender(requestDto.getGender());
        post.setRescueLocation(requestDto.getRescueLocation());
        post.setMediaUrls(requestDto.getMediaUrls());
        post.setUpdatedAt(LocalDateTime.now());
        // 수정된 결과를 Response DTO로 리턴
        return new MissingPostResponse(post);
    };

    //무한 스크롤 조회
    public List<MissingPostResponse> getPostByScroll(Long cursorId, int size) {
        Pageable pageable = PageRequest.of(0, size, Sort.by("createdAt").descending());
        List<MissingPost> posts = missingPostRepository.findAllByCursor(cursorId, pageable);

        //stream().map: DB에서 꺼낸 엔티티(Raw 데이터)들을 프론트엔드가 쓸 수 있는
        //응답용 포장지(MissingPostResponse DTO)로 싹 변환해서 리스트로 묶어 리턴!
        return posts.stream().map(MissingPostResponse::new)
                .collect(Collectors.toList());
    }

    //글삭제 본인확인
    @Transactional
    public void deletePost(Long id, String name) {
        MissingPost post = missingPostRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("해당 게시글이 없습니다 id=" +id));
        // 작성자 본인인지 확인
        if(!post.getAuthor().getName().equals(name)) {
            throw new SecurityException("삭제 권한이 없습니다.");
        }
        missingPostRepository.delete(post);
    }

    //반려동물 찾았을 경우 상태변경
    @Transactional
    public void completePost(Long id, String name) {
        MissingPost post = missingPostRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다 id=" + id));

        if(!post.getAuthor().getName().equals(name)) {
            throw new SecurityException("상태 변경 권한이 없습니다.");
        }
        post.setStatus(PostStatus.COMPLETED);

    }




}

/*
삭제 (void): 글 삭제는 데이터를 지우는 것이 끝입니다.
프론트엔드 입장에서는 게시글이 지워졌다는 사실(HTTP 상태 코드 200 OK 등)만 알면 되기 때문에,
서버가 굳이 데이터를 다시 객체로 포장해서 보낼 필요가 없습니다.
따라서 결과값을 돌려줄 필요가 없다는 의미로 void를 사용하는 것입니다.
*/

/*
* 무한 스크롤은 "한 번에 수만 개의 데이터를 다 불러오면 서버가 터지니까,
* 사용자가 스크롤을 내릴 때마다 10개씩 끊어서 가져오게 만드는 똑똑한 배달 시스템"**
* */

/*
 * =====================================================================
 * [Spring Bean & IoC/DI 핵심 정리 노트]
 * =====================================================================
 *
 * 1. 스프링 빈 (Spring Bean)
 *    - 스프링 컨테이너가 직접 생성하고 의존성을 연결하고, 소멸까지 관리하는 자바 객체
 *    - 객체의 생명주기(생성, 연결, 소멸)를 스프링이 대신 관리함
 *
 * 2. 3대 핵심 특징
 *    - 제어의 역전 (IoC): 객체 제어권이 개발자가 아닌 스프링 컨테이너에 있음
 *    - 싱글톤 (Singleton): 빈을 단 하나만 생성하여 재사용 (메모리 절약)
 *    - 의존성 주입 (DI): 빈과 빈 사이의 의존 관계를 자동으로 연결해 줌
 *
 * 3. 자동 등록 (@Component) vs 수동 등록 (@Bean)
 *    - 자동 등록 (@Component)
 *      * 위치: 클래스 선언부 위 (@Service, @Controller, @Repository 등)
 *      * 대상: 내가 직접 작성한 비즈니스 로직 클래스
 *      * 특징: 컴포넌트 스캔으로 자동 검색 (기본으로 사용, 생산성 높음)
 *
 *    - 수동 등록 (@Bean)
 *      * 위치: 메서드 레벨 (@Configuration 클래스 내부)
 *      * 대상: 외부 라이브러리 객체, 소스 코드를 수정할 수 없는 클래스
 *      * 특징: 개발자가 직접 객체를 생성하여 반환하도록 명시
 * =====================================================================
 */
