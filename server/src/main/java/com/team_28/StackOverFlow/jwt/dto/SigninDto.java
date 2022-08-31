package com.team_28.StackOverFlow.jwt.dto;

import com.team_28.StackOverFlow.jwt.entity.Member;
import lombok.Getter;

@Getter
public class SigninDto {
    private String userid;
    private String password;

    public Member toEntity() {
        return Member.builder()
                .userid(userid)
                .password(password)
                .build();
    }

    public void encodePassword(String encodedPassword) {
        this.password = encodedPassword;
    }
}
