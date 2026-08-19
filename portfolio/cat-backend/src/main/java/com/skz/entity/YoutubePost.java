package com.skz.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Entity
@Table(name = "youtube_post")
@Getter
@Setter
@NoArgsConstructor
public class YoutubePost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 256)
    private String title;

    @Column(name = "youtube_url",nullable = false, length = 1000)
    private String youtubeUrl;

    @Column(name = "thumbnail_url", length = 1000)
    private String thumbnailUrl;

    @CreationTimestamp
    @Column(name = "insert_dt", updatable = false)
    private LocalDateTime insertDt;





}
