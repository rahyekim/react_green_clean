package com.skz.DTO;


import lombok.Data;

@Data
public class LinkParseRequest {
    private String url;  //프론트엔드에서 보낸 sns주소
    private String type;  //Facebook 또는 instagram
}
