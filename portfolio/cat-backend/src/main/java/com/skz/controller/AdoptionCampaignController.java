package com.skz.controller;


import com.skz.DTO.AdoptionCampaignRequest;
import com.skz.DTO.AdoptionCampaignResponse;
import com.skz.entity.AdoptionCampaign;
import com.skz.service.AdoptionCampainService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AdoptionCampaignController {

    private final AdoptionCampainService adoptionCampainService;

    public AdoptionCampaignController(AdoptionCampainService adoptionCampainService) {
        this.adoptionCampainService = adoptionCampainService;
    }

    //프론트에서 데이터를 달라고하는 http get요청이 오면 이 메서드를 실행
    @GetMapping
    public List<AdoptionCampaign> getCampaigns(@RequestParam(name = "hashtag", required = false) String hashtag) {
        if (hashtag != null && !hashtag.trim().isEmpty()) {
            //hashtag값을 보냇고(null이아님) 빈칸만 보낸게 아니라면(글자가진짜로있다면)
            return adoptionCampainService.getCampaignByHashTag(hashtag);
            //이 해시태그를 넘겨주면서 이 태그가 달린 캠페인들만 골라서 가져와
        }
        return adoptionCampainService.getAllCampaigns();
        //해시태그없이 접근, 조건없이 DB에 있는 모든 캠페인 목록을 가져와서 반환
    }

    //💡 캠페인 등록(관리자 권한 세션 체크 필수)
    @PostMapping
    public ResponseEntity<?> registerCampaign(
            @RequestBody AdoptionCampaignRequest Request,
            HttpServletRequest httpRequest) {
//        //세션 검사( 신분확인단계)
//        HttpSession session = httpRequest.getSession(false);
//        //접속한사람이 세션(신분증)없으면 새로만들지말고(false) 그냥 없다고(null)해라
//        if (session == null || session.getAttribute("adminName") == null) {
//            //세션자체가 없거나, adminNAme이라는 관리자신분증이 없다면 실행되는 조건문
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
//                    new AdoptionCampaignResponse("관리자 로그인이 필요한 서비스입니다"));
//
//        }
        try {
            //서비스에 요청(request) 데이터를 넘겨서 DB에 저장하라고 시킴
            adoptionCampainService.registerCampaign(Request);
            //저장이 성공하면 200 ok 도장찍어보냄
            return ResponseEntity.ok(new AdoptionCampaignResponse("성공적으로 등록되었습니다"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AdoptionCampaignResponse("등록 중 서버오류 발생"));
        }

    }
}
