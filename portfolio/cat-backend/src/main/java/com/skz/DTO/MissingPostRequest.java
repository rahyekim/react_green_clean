package com.skz.DTO;

import com.skz.domain.PostStatus;
import lombok.*;

import java.util.List;

//프론트엔드에서 캠페인을 등록할때 서버로 전송할 데이터 구조
@Data
@Getter
@Setter
public class MissingPostRequest {

    private String title, content, breed, gender, age, weight, color,
            rescueLocation;
    private List<String> mediaUrls;


}
