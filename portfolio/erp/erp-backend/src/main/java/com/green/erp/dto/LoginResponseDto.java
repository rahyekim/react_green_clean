package com.green.erp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {
    private String token;     // JWT 토큰
    private String firstName; // 유저 이름
    private String email;     // 이메일
}