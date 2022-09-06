package com.team_28.StackOverFlow.question.dto;

import com.team_28.StackOverFlow.answer.dto.AnswerResponseDto;
import com.team_28.StackOverFlow.answer.entity.Answer;
import com.team_28.StackOverFlow.jwt.entity.Member;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class QuestionResponseDto {

    private Long questionId;

    private Long memberId;

    private String userId;

    private String questionTitle;

    private String questionContent;

    private boolean isAnswered;

    private String createdAt;

    private String modifiedAt;

    private List<Long> answerIds = new ArrayList<>();
}
