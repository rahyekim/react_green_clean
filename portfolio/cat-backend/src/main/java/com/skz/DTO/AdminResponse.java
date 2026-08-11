package com.skz.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor //생성자 자동생성
public class AdminResponse {

    //프론트엔드화면(Topbar)에 띄워줄 관리자의 이름
    private String name;
    //로그인 성공시 띄워줄 알림창(alert) 메세지 (예:관리자로그인성공!)
    private String message;
}
