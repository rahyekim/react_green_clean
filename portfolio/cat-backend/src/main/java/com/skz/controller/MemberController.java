package com.skz.controller;

import com.skz.entity.Member;
import com.skz.repository.MemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@RestController //@Controller와 @ResposeBody가 합쳐진 형태 //API전용창구
// 이 클래스 내의 모든 API주소는 기본적으로 "/api/members"로 시작하도록설정
@RequestMapping("/api/members") //모든 API주소의 공통 접두사 를 설정
@CrossOrigin(origins = "http://localhost:3000", allowCredentials="true") //교차출처자원공유 보안 에러 방지
public class MemberController { //외부에서 접근 가능한 컨트롤러 클래스 작성

    private final MemberRepository memberRepository; //불변성 설정
    //DB와 소통하는 레파지토리를 담을 불변(final)객체

    //스프링부트가 실행될때 자동으로 레파지토리를 연결(의존성주입)해주는 생성자
    public MemberController(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
        //객체를 메모리에 생성해 두었다가 이 컨트롤러가 생성될때 쏙 집어넣음(의존성주입)
    }

    //1.중복체크 API
    // /api/members/check-email?email=
    @GetMapping("/check-email")
    /*
     * url뒤에 쿼리스트링으로 넘어온값(?email=skz@jin.com)을 뽑아내어 자바의
     * String email변수에 담음
     * */
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        return ResponseEntity.ok(memberRepository.existsByEmail(email));
    }
    @GetMapping("/check-nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(memberRepository.existsByNickname(nickname));
    }

    @PostMapping("/signup")
    public ResponseEntity<Member> signup(@RequestBody Member member) {
        //이 앱은 가입시 카카오와 일반을 선택하는데 그에 대한 문제를 먼저 클리어
        if (member.getProvider() == null || member.getProvider().isEmpty()) {
            member.setProvider("local");
            //Oauth 이게 아닌 프론트엔드에서 provider(가입경로)데이터를 넘기지 않앗거나 비어있다면
            //일반 회원가입으로 간주 local 이라는 값을 강제 세팅
            //데이터베이스 에러를 막기위한 방어 로직
        }
        Member savedMember = memberRepository.save(member);
        //스프링레거시는 insert into sql쿼리문 날림
        // 부트는 .save로 알아서 쿼리만들어서 DB에 저장하고 저장된 결과를 savedMember에 담아줌
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMember);
        //저장이 성공적으로 완료되었으면..
        // 200 단순성공 대신 더 명확한 201(새로운리소스가 생성됨)
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Member loginData) {
/*
사용자가 로그인창에 입력한 이메일(loginData.getMail())로 DB를 검색
만약 정보가 없을시 에러가 터지지 않도록 Optinal이라는 상자에 결과를 담는다
* */
        Optional<Member> memberOptional = memberRepository.findByEmail(loginData.getEmail());
        if(memberOptional.isPresent()) { //상자(Optional)안에 회원데이터 존재하니?
            Member member = memberOptional.get(); //데이터가있으면 상자에서 Member객체 꺼냄

            if(member.getPassword().equals(loginData.getPassword())) {
                return  ResponseEntity.ok(member);
                //비밀번호가 맞다면 로그인성공 회원정보를 프론트에 넘겨줌
            }
        }
        return  ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body("이메일 또는 비밀번호가 일치하지않는다");
        //회원이 없거나 비밀번호가 틀리면 401 인증실패 에러 메세지 보내줌
    }

    @PostMapping("/upload-profile")
    public ResponseEntity<String> uploadProfile(@RequestParam("file") MultipartFile file) {

        try {
            //파일이름이 겹치치 않도록 현재시간(밀리초) 앞에 붙여줌
            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            //2.프로젝트 폴더안의 uploads 폴더에 저장할 경로잡기
            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            Path path = Paths.get(uploadDir + filename);
            //폴더가 없으면 만들고 파일 복사해서 씀
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            //저장된 이미지에 접근할 수 있는 가짜url을 프론트로 반환
            //실무에서는 aws s3 url 들어가는 자리
            String imageUrl = "http://localhost:8080/uploads/" + filename;
            return ResponseEntity.ok(imageUrl);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("이미지 업로드 실패");
        }
    }
}






//로그인 성공 시 비밀번호가 포함된 원본 객체를 통째로 주는 것은 보안상 좋지 않으니,
// 나중에는 필요한 정보만 추려서(DTO) 주거나 토큰을 줘야함
