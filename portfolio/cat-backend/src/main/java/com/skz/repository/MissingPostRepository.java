package com.skz.repository;

import com.skz.entity.Animal;
import com.skz.entity.MissingPost;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MissingPostRepository extends JpaRepository<MissingPost,Long> { //<table명,pk>

    /**
     * 무한 스크롤 구현을 위한 커서 기반 조회
     * - cursorId가 null이면 가장 최신 데이터부터 조회 (첫 페이지)
     * - cursorId가 있으면 해당 ID보다 작은 데이터(과거 글)를 지정된 개수만큼 조회
     */
    @Query("SELECT p FROM MissingPost p WHERE (:cursorId IS NULL OR p.id < :cursorId) ORDER BY p.id DESC")
    List<MissingPost> findAllByCursor(@Param("cursorId") Long cursorId, Pageable pageable);

    //ORDER BY p.id DESC : 무한 스크롤은 보통 최신 글이 위로 오도록(내림차순) 정렬
    //Pageable : LIMIT 효과(가져올 개수 제한)
}
