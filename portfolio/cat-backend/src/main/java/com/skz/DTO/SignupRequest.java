package com.skz.DTO;

import lombok.Data;


@Data
public class SignupRequest {
    private String email, name, nickname, phone, password,
            provider, providerId, profileImageUrl, address, userType;

    private boolean marketingAgreed;

}
