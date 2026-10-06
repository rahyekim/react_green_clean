package com.skz.controller;


import com.skz.DTO.AdoptionCampaignRequest;
import com.skz.DTO.AdoptionCampaignResponse;
import com.skz.DTO.MissingPostRequest;
import com.skz.DTO.MissingPostResponse;
import com.skz.entity.AdoptionCampaign;
import com.skz.entity.MissingPost;
import com.skz.service.AdoptionCampainService;
import com.skz.service.MissingPostService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/missing-posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class MissingPostController {

    private final MissingPostService service;
    // 1. 실종 신고글 작성 API POST /api/missing-posts
    // 2. 무한 스크롤 조회 API (GET /api/missing-posts?cursorId=10&size=10)
    // 3. 글 수정 API (PUT /api/missing-posts/{id})
    // 4. 글 삭제 API (DELETE /api/missing-posts/{id})
    // 5. 완료 처리 API (PATCH /api/missing-posts/{id}/complete)

    @PostMapping  //Principal principal (로그인한 사람의 신분증)
    public ResponseEntity<MissingPostResponse> createMissingPost(@RequestBody MissingPostRequest requestDto, Principal principal) {
        MissingPostResponse response = service.createPost(requestDto, principal.getName());
        return ResponseEntity.ok(response);
    }
    // 2. 무한 스크롤 조회 API (GET /api/missing-posts?cursorId=10&size=10)
    @GetMapping
    public ResponseEntity<List<MissingPostResponse>> getPostsByScroll(
            @RequestParam(required = false) Long cursorId,
            @RequestParam(defaultValue = "10") int size) {
           List<MissingPostResponse> posts =service.getPostByScroll(cursorId, size);
            return ResponseEntity.ok(posts);
    }
    // 3. 글 수정 API (PUT /api/missing-posts/{id})
    @PutMapping("/{id}")
    public ResponseEntity<MissingPostResponse> updatePost(
            @PathVariable Long id,
            @RequestBody MissingPostRequest requestDto,
            Principal principal){

        MissingPostResponse response = service.updatePost(id, requestDto, principal.getName());
        return ResponseEntity.ok(response);
    }

    // 4. 글 삭제 API (DELETE /api/missing-posts/{id})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(
            @PathVariable Long id,
            Principal principal) {

        service.deletePost(id, principal.getName());
        // 삭제는 데이터가 없으므로 200 OK 또는 204 No Content 리턴
        return ResponseEntity.ok().build();
    }

    // 5. 완료 처리 API (PATCH /api/missing-posts/{id}/complete)
    @PatchMapping("/{id}/complete")
    public ResponseEntity<Void> completePost(
            @PathVariable Long id,
            Principal principal) {

        service.completePost(id, principal.getName());
        return ResponseEntity.ok().build();
    }

}
