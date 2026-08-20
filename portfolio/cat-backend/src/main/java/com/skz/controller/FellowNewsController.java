package com.skz.controller;

import com.skz.entity.FellowNews;
import com.skz.service.FellowNewsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/fellow-news")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") //next.js만 허용

public class FellowNewsController {

    //    private final YoutubePostRepository youtubePostRepository;
    private final FellowNewsService fellowNewsService;

    /*데이터 베이스와 통신할 Repository 객체를 담아둘 공간임 , 중간에 변경되지않도록 final 선언*/

    //자동으로 데이터베이스 통신 객체(Repository)를 주입(연결) 해주는 생성자
    public FellowNewsController(FellowNewsService fellowNewsService) {
        this.fellowNewsService = fellowNewsService;
    }

    //fellow-news 목록조회 API
    @GetMapping
    public List<FellowNews> getFellowNews() {

        return fellowNewsService.getAllFellowNews();
    }

    @PostMapping
    public ResponseEntity<?> registerFellowNews(@RequestBody FellowNews fellowNews) {

        try {
            FellowNews savedNews = fellowNewsService.registerFellowNews(fellowNews);
            return ResponseEntity.ok("fellownews펠로우소식이 성공적으로 등록");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("fellownews펠로우소식 등록 중 서버오류 발생");
        }
    }
//
}
