package com.skz.repository;

import com.skz.entity.AdoptionCampaign;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdoptionCampainRepository extends JpaRepository<AdoptionCampaign,Long> { //<table명,pk>

	//jpaRepository상속받으면 기본적인 저장 (save) 조회 (findAll) 기능이 자동으로 생긴다

    List<AdoptionCampaign> findByHashtag(String hashtag);

}
