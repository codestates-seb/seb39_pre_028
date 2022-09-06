package com.team_28.StackOverFlow.dto;

import com.team_28.StackOverFlow.answer.dto.AnswerResponseDto;
import com.team_28.StackOverFlow.question.dto.QuestionResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.List;


@Getter
public class QuestionPageDto<T> {
    private QuestionResponseDto question;
    private List<T> answerResponseDto;

    public QuestionPageDto(QuestionResponseDto question) {
        this.question = question;
    }

    public QuestionPageDto(QuestionResponseDto question, List<T> answer) {
        this.question = question;
        this.answerResponseDto = answer;
    }
}

