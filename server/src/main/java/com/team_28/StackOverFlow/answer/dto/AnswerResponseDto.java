package com.team_28.StackOverFlow.answer.dto;

import lombok.Getter;
import org.hibernate.validator.internal.util.privilegedactions.LoadClass;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class AnswerResponseDto {
    private long answerId;
    private long memberId;
    private String content;
    private LocalDateTime created_at;
    private LocalDateTime modified_at;
}
