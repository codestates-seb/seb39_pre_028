package com.team_28.StackOverFlow.jwt.dto;

import com.team_28.StackOverFlow.jwt.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
@Setter
public class SignupDto {
    @NotBlank
    @Pattern(regexp = "^[ㄱ-ㅎ가-힣A-Za-z]{1,}$", message = "username은 1글자 이상이여야 합니다. 특수문자, 숫자는 입력 불가능합니다.")
    private String username;
    @NotBlank
    @Pattern(regexp = "^[ㄱ-ㅎ가-힣A-Za-z\\d]{3,19}$", message = "아이디는 3-19 글자여야 합니다. 한글, 영어, 숫자만 입력 가능합니다.")
    private String userid;
    @NotBlank
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&*]{4,16}$", message = "비밀번호는 4~16자리수여야 합니다. 영문 대소문자, 숫자를 1개 이상 포함해야 합니다.(특수문자 입력 가능)")
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
