package com.skz.controller;

import com.skz.entity.YoutubePost;
import com.skz.repository.YoutubePostRepository;
import com.skz.service.YoutubePostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/youtube")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") //next.js만 허용

public class YoutubePostController {

    private final YoutubePostService youtubePostService;

    /*데이터 베이스와 통신할 Repository 객체를 담아둘 공간임 , 중간에 변경되지않도록 final 선언*/

    //생성자 주입하는이유:
    //자동으로 데이터베이스 통신 객체(Repository)를 주입(연결) 해주는 생성자
    public YoutubePostController(YoutubePostService youtubePostService) {
        this.youtubePostService = youtubePostService;
    }
    //유튜브 목록조회 API
    @GetMapping
    public List<YoutubePost> getYoutubePost(){
        return youtubePostService.getAllYoutubePosts();
    }


    //ResponseEntity<?> 그냥보내는것이 아니라 상태코드까지 같이 보냄 
    @PostMapping
    public ResponseEntity<?> registerYoutubePost(@RequestBody YoutubePost youtubePost){

        try {
            YoutubePost savedPost = youtubePostService.registerYoutubePost(youtubePost);
            return ResponseEntity.ok("유튜브영상이 성공적으로 등록");
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("유튜브 영상 등록 중 서버오류 발생");
        }
    }
//
}
