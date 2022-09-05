package com.team_28.StackOverFlow.jwt.dto;

import com.team_28.StackOverFlow.jwt.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class SignupDto {
    @NotNull
    private String username;
    @NotNull
    private String userid;
    @NotNull
    private String password;

    public Member toEntity() {
        return Member.builder()
                .username(username)
                .userid(userid)
                .password(password)
                .build();
    }

    public void encodePassword(String encodedPassword) {
        this.password = encodedPassword;
    }
}
