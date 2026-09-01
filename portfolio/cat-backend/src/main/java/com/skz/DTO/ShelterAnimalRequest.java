package com.skz.DTO;

import com.skz.domain.Gender;
import com.skz.domain.ShelterStatus;
import com.skz.entity.ShelterAnimal;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
public class ShelterAnimalRequest {
    private ShelterStatus status;
    private Gender gender;
    private String breed;
    private String noticeNo;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate regDate;

    private String rescueLocation;
    private String content;

    private String imageUrl;
    private MultipartFile imageFile;

}

