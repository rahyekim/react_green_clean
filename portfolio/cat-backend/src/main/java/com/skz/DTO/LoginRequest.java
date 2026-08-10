package com.skz.DTO;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}

/*
* PMO(project magnagement Office)가 DTO를 강조하는 이유
* 1.치명적인 리스크 사전차단
* 버그나 보안사고를 미연에 방지
* 권한탈취 데이터변조 같은 보안취약점은 시스템 인수에 치명적인 결격 사유
* 2.코드 품질 표준화 Standardization
* 3.향후 유지보수 비용 절감(TCO 관리)
* */

