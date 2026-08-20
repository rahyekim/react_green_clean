package com.skz.service;

import com.skz.entity.NeedHelp;
import com.skz.repository.NeedHelpRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
//@AllArgsConstructor
@Transactional(readOnly = true) //읽기전용으로 조회성능 최적화
public class NeedHelpService {

    private final NeedHelpRepository needHelpRepository;


    public NeedHelpService( NeedHelpRepository needHelpRepository) {
        this.needHelpRepository = needHelpRepository;
    }

    //1.NeedHelp 목록 조회(최신순)
    public List<NeedHelp> getAllNeedHelp() {

        return needHelpRepository.findAllByOrderByInsertDtDesc();
    }

    //2.NeedHelp 등록
    @Transactional
    public NeedHelp registerNeedHelp(NeedHelp needHelp) {

        return needHelpRepository.save(needHelp);
    }
}

