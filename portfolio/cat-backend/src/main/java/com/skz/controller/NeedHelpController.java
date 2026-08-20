package com.skz.controller;

import com.skz.entity.FellowNews;
import com.skz.entity.NeedHelp;
import com.skz.service.FellowNewsService;
import com.skz.service.NeedHelpService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/need-help")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") //next.js만 허용

public class NeedHelpController {

    //    private final YoutubePostRepository youtubePostRepository;
    private final NeedHelpService needHelpService;

    public NeedHelpController(NeedHelpService needHelpService) {
        this.needHelpService = needHelpService;
    }

    //need-help 목록조회 API
    @GetMapping
    public List<NeedHelp> getNeedHelp() {

        return needHelpService.getAllNeedHelp();
    }

    @PostMapping
    public ResponseEntity<?> registerNeedHelp(@RequestBody NeedHelp needHelp) {

        try {
            NeedHelp savedHelps = needHelpService.registerNeedHelp(needHelp);
            return ResponseEntity.ok("도움요청글이 성공적으로 등록");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("도움요청글 등록 중 서버오류 발생");
        }
    }
//
}
