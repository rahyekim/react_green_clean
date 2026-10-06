package com.skz.DTO;

import com.skz.domain.PostStatus;
import com.skz.entity.MissingPost;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

//프론트엔드에서 캠페인을 등록할때 서버로 전송할 데이터 구조
@Data
@Getter
@Setter
public class MissingPostResponse {
    private Long id;
    private String title, content, breed, gender, authorName, rescueLocation;
    private PostStatus status;
    private List<String> mediaUrls;
    private LocalDateTime createdAt;

    //데이터베이스(엔티티)에 있는 걸 꺼내서 프론트엔드로 보내야 하니까
    // Entity=> DTO로 바꿔주는 생성자
    public MissingPostResponse(MissingPost post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.status = post.getStatus();
        this.content = post.getContent();
        this.breed = post.getBreed();
        this.gender = post.getGender();

        // author 객체가 null이 아닐 때만 이름을 안전하게 가져오기
//        if (post.getAuthor() != null) {
//            this.authorName = post.getAuthor().getName(); //
//        }
        this.authorName = post.getAuthor() != null
                ? post.getAuthor().getName() : " 알수 없음";

        this.rescueLocation = post.getRescueLocation();
        this.mediaUrls = post.getMediaUrls();
        this.createdAt = post.getCreatedAt();
    }
}
