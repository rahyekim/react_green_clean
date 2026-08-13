package com.skz.DTO;

import lombok.Data;

//등록 성공/실패 여부 메세지를 프론트엔드로 전달하기 위한 응답 객체
@Data
public class AdoptionCampaignResponse {

    private String message;

    public AdoptionCampaignResponse(String message){
        this.message = message;
    }

}
