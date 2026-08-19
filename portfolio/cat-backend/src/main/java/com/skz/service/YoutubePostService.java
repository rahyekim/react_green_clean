package com.skz.service;

import com.skz.entity.YoutubePost;
import com.skz.repository.YoutubePostRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
//@AllArgsConstructor
@Transactional(readOnly = true) //읽기전용으로 조회성능 최적화
public class YoutubePostService {

    private final YoutubePostRepository youtubePostRepository;


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

