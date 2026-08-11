package com.skz.repository;

import com.skz.entity.Animal;
import com.skz.entity.RecommendedAnimal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendedAnimalRepository extends JpaRepository<RecommendedAnimal,Long> { //<table명,pk>

	//jpaRepository상속받으면 기본적인 저장 (save) 조회 (findAll) 기능이 자동으로 생긴다
}
