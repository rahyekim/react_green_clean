package com.skz.service;

import com.skz.entity.YoutubePost;
import com.skz.repository.YoutubePostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service //서비스로직! 담당하는 클래스야
//@AllArgsConstructor
/*
 *읽기전용 트랜잭션 불필요한 변경감지 하지않도록 메모니낭비 줄이지않도록
 *  */

@Transactional(readOnly = true) //읽기전용으로 조회성능 최적화

public class YoutubePostService {

    private final YoutubePostRepository youtubePostRepository;
    //프로그램 실행 중 값이바뀌지않도록 불변성보장

    //클래스가 생성될때 리포지토리가 무조건(필수적으로) 들어오도록 강제할수있어서
    //nullPointerExcept을 예방
    public YoutubePostService(YoutubePostRepository youtubePostRepository) {
        this.youtubePostRepository = youtubePostRepository;
    }

    //1.유튜브 목록 조회(최신순)
    public List<YoutubePost> getAllYoutubePosts() {
        return youtubePostRepository.findAllByOrderByInsertDtDesc();
    }

    //2.유튜브 등록
    @Transactional
    public YoutubePost registerYoutubePost(YoutubePost youtubePost) {
        return youtubePostRepository.save(youtubePost);
    }
}

