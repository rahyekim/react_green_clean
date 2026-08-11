package com.skz.service;


import com.skz.DTO.AdminResponse;
import com.skz.entity.Admin;
import com.skz.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
//스프링부트에게 이 클래스는 핵심 비지니스 로직(요리)을 담당하는 주방장이야
//니가 관리해줘.. 라고 알려줌
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
//주방장(service)이 DB에서 데이터를 꺼낼때 사용할 냉장고 ... final이라 중간에 냉장고 바꿀수없음
    public AdminResponse authenticate(String email, String password){

        Admin admin = adminRepository.findAdminByMemberEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("관리자권한이 없거나 존재하지않습니다"));
        if(!admin.getMember().getPassword().equals(password)){
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다");

        }
        //모든검증을 통과하면..로그인
        return new AdminResponse(admin.getMember().getName(), "관리자 로그인 성공");
    }

}
