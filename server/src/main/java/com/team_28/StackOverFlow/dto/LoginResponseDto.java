package com.team_28.StackOverFlow.dto;

import com.team_28.StackOverFlow.jwt.dto.ResponseDto;
import com.team_28.StackOverFlow.question.dto.QuestionResponseDto;
import lombok.Getter;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
@Getter
public class LoginResponseDto<T> {

    private ResponseDto responseDto;
    private String accesstoken;

    public LoginResponseDto(ResponseDto responseDto, String accesstoken){
        this.responseDto = responseDto;
        this.accesstoken = accesstoken;
    }

}
