package com.skz.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

//등록 성공/실패 여부 메세지를 프론트엔드로 전달하기 위한 응답 객체
@Data
//@AllArgsConstructor //생성자 자동생성
public class AdoptionCampaignResponse {

    private String message;

    public AdoptionCampaignResponse(String message){
        this.message = message;
    }

}
