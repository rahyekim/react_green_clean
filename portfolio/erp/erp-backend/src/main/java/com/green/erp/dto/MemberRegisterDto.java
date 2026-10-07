package com.green.erp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberRegisterDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String companyName;
    private String position;
    private String tel;
    private String address;
    private String detailAddress;
    private String gender;
}