package com.skz.service;


import com.skz.DTO.AdminResponse;
import com.skz.DTO.AnimalRequest;
import com.skz.DTO.AnimalResponse;
import com.skz.entity.Admin;
import com.skz.entity.RecommendedAnimal;
import com.skz.repository.AdminRepository;
import com.skz.repository.RecommendedAnimalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
//스프링부트에게 이 클래스는 핵심 비지니스 로직(요리)을 담당하는 주방장이야
//니가 관리해줘.. 라고 알려줌
@RequiredArgsConstructor
public class AnimalService {
    private final RecommendedAnimalRepository animalRepository;

    //동물을 등록(저장)하는 핵심 기능
    public void registerAnimal(AnimalRequest request){

        //1.텅빈 엔티티(테이블 데이터 한 줄)를 하나 새로 만듭니다
        RecommendedAnimal animal = new RecommendedAnimal();

        //2.프론트엔드에서 받아온 DTO의 데이터를 엔티티에 하나씩 옮겨 담습니다
        animal.setSourceType(request.getSourceType());
        animal.setSourceUrl(request.getSourceUrl());
        animal.setRegion(request.getRegion());
        animal.setNoticeNo(request.getNoticeNo());
        animal.setBirthYear(request.getBirthYear());
        animal.setGender(request.getGender());
        animal.setWeight(request.getWeight());
        animal.setImageUrl(request.getImageUrl());

        //Repository에 완성된 데이터를 저장(insert)함
        animalRepository.save(animal);
    }

}
