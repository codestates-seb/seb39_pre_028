package com.team_28.StackOverFlow.answer.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class AnswerRequestDto {
    @NotBlank
    private String content;

    @NotBlank
    private Long memberId;

    @NotBlank
    private Long questionId;

}
