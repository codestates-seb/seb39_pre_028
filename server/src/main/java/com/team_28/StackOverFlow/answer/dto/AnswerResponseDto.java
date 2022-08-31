package com.team_28.StackOverFlow.answer.dto;

import lombok.Builder;
import lombok.Getter;
import org.hibernate.validator.internal.util.privilegedactions.LoadClass;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class AnswerResponseDto {
    private long answerId;
    private long questionId;
    private long memberId;
    private String userId;
    private String content;
    private String created_at;
    private String modified_at;
}
