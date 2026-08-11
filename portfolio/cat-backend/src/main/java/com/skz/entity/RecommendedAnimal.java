package com.skz.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "recommended_animals")
@NoArgsConstructor
public class RecommendedAnimal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //direct, facebook, insta 중에 하나 저장
    @Column(nullable = false, length = 20)
    private String sourceType;

    //직접등록일경우 비어있을수 있으므로 nullable = true
    @Column(length = 500)
    private String sourceUrl;

    @Column(nullable = false, length = 20)
    private String region;

    @Column(nullable = false, length = 100)
    private String noticeNo;

    @Column(nullable = false, length = 10)
    private String birthYear;

    @Column(nullable = false, length = 5)
    private String gender;

    @Column(nullable = false, length = 20)
    private Double weight;

    @Column(nullable = false, length = 1000)
    private String imageUrl;




}


