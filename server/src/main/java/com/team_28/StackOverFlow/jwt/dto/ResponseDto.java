package com.team_28.StackOverFlow.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseDto {
    private Long memberid;
    private String userid;
    private String accesstoken;
}
