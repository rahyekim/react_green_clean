package com.skz.service;

import com.skz.entity.FellowNews;
import com.skz.repository.FellowNewsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
//@AllArgsConstructor
@Transactional(readOnly = true) //읽기전용으로 조회성능 최적화
public class FellowNewsService {

    private final FellowNewsRepository fellowNewsRepository;


    public FellowNewsService(FellowNewsRepository fellowNewsRepository) {
        this.fellowNewsRepository = fellowNewsRepository;
    }

    //1.fellowNews 목록 조회(최신순)
    public List<FellowNews> getAllFellowNews() {

        return fellowNewsRepository.findAllByOrderByInsertDtDesc();
    }

    //2.fellowNews 등록
    @Transactional
    public FellowNews registerFellowNews(FellowNews fellowNews) {

        return fellowNewsRepository.save(fellowNews);
    }
}

