package com.skz.controller;


import com.skz.DTO.AdminRequest;
import com.skz.DTO.AdminResponse;
import com.skz.service.AdminService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@CrossOrigin(origins= "http://localhost:3000", allowCredentials="true")
@RestController //html을 뱉는게 아니라 데이터json만 깔끔하게 뱉는 전문 서빙 점원이야!
@RequestMapping("/api/admin")
@RequiredArgsConstructor //서비스(AdminService)를 컨트롤러에서 갖다 쓰기 위해(주입받기 위해)
//private final이 붙은 필드만 쏙 골라서 생성자를 자동으로 만들어 줍니다.
public class AdminController {

    private final AdminService adminService;
    //점원(Controller)이 주방장(service)에게 일을 시켜야하므로 주방장객체를 불러옴..

    @PostMapping("/login")
    //프론트엔드 상태코드(200성공401실패등)와 함께 <?>데이터 아무 박스나 다 된다는 뜻
    public ResponseEntity<?> login(@RequestBody AdminRequest req, HttpServletRequest httpRequest) {
        try {
            //① authenticate()가 먼저 로그인 확인
            AdminResponse response = adminService.authenticate(
                    req.getEmail(), req.getPassword()
            );
            // 💡 [여기가 핵심입니다!] 이 두 줄이 무조건 있어야 합니다!!!
            //세션 생성 => 세션에 adminName(👤이름) 저장
            HttpSession session = httpRequest.getSession(true);
            session.setAttribute("adminName", response.getName());

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", e.getMessage()));

        }

    }
}


