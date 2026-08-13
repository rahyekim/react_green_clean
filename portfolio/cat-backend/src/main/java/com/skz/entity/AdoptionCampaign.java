package com.skz.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "adoption_campaign")
@Getter
@Setter
@NoArgsConstructor
public class AdoptionCampaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "campaign_id")
    private Long id;

    @Column(nullable = false, length = 50)
    private String hashtag;

    @Column(nullable = false, length = 256)
    private String title;

    //Lob: 동영상, 이미지, 긴텍스트 같은 대용량 데이터를 저장하기 우한 가변길이 데이터 타입
    @Lob
    @Column(name= "cont_bdy")
    private String content;

    @Column(name = "thumbnail_url", length = 1000)
    private String thumbnailUrl;

    @Column(name = "media_type", length = 20)
    private String mediaType;

    @Column(name = "media_url", length = 1000)
    private String mediaUrl;

    @CreationTimestamp
    @Column(name = "insert_dt", updatable = false) //한번 저장되면 끝, 업데이트시 변경금지
    private LocalDateTime insertDt;

    //insert_dt 최초생성시간-> 변경금지 //update_dt 마지막수정시간-> 수정할때마다 갱신











}

