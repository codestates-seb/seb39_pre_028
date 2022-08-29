package com.team_28.StackOverFlow.jwt.dto;

import com.team_28.StackOverFlow.jwt.model.Member;
import lombok.Getter;

@Getter
public class SigninDto {
    private String userID;
    private String password;

    public Member toEntity() {
        return Member.builder()
                .userid(userID)
                .password(password)
                .build();
    }

    public void encodePassword(String encodedPassword) {
        this.password = encodedPassword;
    }
}
