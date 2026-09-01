package com.skz.repository;

import com.skz.domain.ShelterStatus;
import com.skz.entity.Admin;
import com.skz.entity.ShelterAnimal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ShelterAnimalRepository extends JpaRepository<ShelterAnimal, Long> {

    List<ShelterAnimal> findByStatus(ShelterStatus status);

    /*
    Admin 엔티티안에 있는 member 객체로 들어가서, 그안의 email이 일치하는 녀석을 찾아라
    sql: select * from admins a
    Join member m
    ON a.memeber_id = m.id
    where m.email=?
    * */


}
