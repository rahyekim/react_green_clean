package com.skz.service;

import com.skz.DTO.AdoptionCampaignRequest;
import com.skz.entity.AdoptionCampaign;
import com.skz.repository.AdoptionCampainRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
/*
 * 클래스 전체에 트랜잭션을 적용
 * readOnly=true 옵션을 주면 데이터 조회(select)할때
 * 불필요한 성능 부하를 줄이고 최적화를 극대화
 * */
public class AdoptionCampainService {
    //의존성 주입(Dependency Injection)
    //직접 소통하는 레파지토리 객체 선언, final을 붙여 중간에 값이 바뀌지않도록 안전고정
    private final AdoptionCampainRepository adoptionCampainRepository;


    public AdoptionCampainService(AdoptionCampainRepository adoptionCampainRepository) {
        this.adoptionCampainRepository = adoptionCampainRepository;
    } //전달받은 레파지토리 객체를 클래스 ??????

    //전체 캠페인 목록조회
    public List<AdoptionCampaign> getAllCampaigns() {
        return adoptionCampainRepository.findAll();
    }

    //해시태그별 캠페인 목록 조회 메서드
    public List<AdoptionCampaign> getCampaignByHashTag(String hashTag) {
        return adoptionCampainRepository.findByHashtag(hashTag);
        //레파지토리에 미리 만들어 놓은 규칙 메서드 findByhashtag를 실행시켜
        //조건에 맞는 데이터만 쏙 뽑아옴
    }

    /*
     * 클래스 단위로 readonly=true읽기전용을 걸어두었기 때문에
     * 데이터를 추가수정삭제 하는 이 메서드에서는 읽기 전용을 해제하고
     * 쓰기권한을 열어주기위해 필수로 붙여야하는 어노테이션 @transactional
     * */
    @Transactional
    public void registerCampaign(AdoptionCampaignRequest request) {
        AdoptionCampaign campaign = new AdoptionCampaign();
        campaign.setHashtag(request.getHashtag());
        campaign.setTitle(request.getTitle());
        campaign.setContent(request.getContent());
        campaign.setThumbnailUrl(request.getThumbnailUrl());
        campaign.setMediaType(request.getMediaType());
        campaign.setMediaUrl(request.getMediaUrl());

        adoptionCampainRepository.save(campaign);
    }
}

