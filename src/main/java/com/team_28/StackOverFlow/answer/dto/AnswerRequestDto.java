package com.team_28.StackOverFlow.answer.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class AnswerRequestDto {
    @NotBlank
    private String content;

    @NotBlank
    private Long memberId;

}
