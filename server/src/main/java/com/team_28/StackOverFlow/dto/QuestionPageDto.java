package com.team_28.StackOverFlow.dto;

import com.team_28.StackOverFlow.answer.dto.AnswerResponseDto;
import com.team_28.StackOverFlow.question.dto.QuestionResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.List;


@Getter
@AllArgsConstructor
public class QuestionPageDto<T> {
    private QuestionResponseDto question;
    private T answer;

    }

