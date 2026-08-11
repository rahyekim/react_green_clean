package com.skz.repository;

import com.skz.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findAdminByMemberEmail(String email);
    /*
    Admin 엔티티안에 있는 member 객체로 들어가서, 그안의 email이 일치하는 녀석을 찾아라
    sql: select * from admins a Join member m ON a.memeber_id = m.id where m.email=?
    * */


}
