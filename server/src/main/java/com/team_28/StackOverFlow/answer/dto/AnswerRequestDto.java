package com.team_28.StackOverFlow.answer.dto;

import com.team_28.StackOverFlow.jwt.entity.Member;
import com.team_28.StackOverFlow.question.entity.Question;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Builder
public class AnswerRequestDto {
    @NotBlank
    private String content;


    private Long memberId;


    private Long questionId;

    public Member getMember(){
        Member member = new Member();
        member.setMemberid(memberId);
        return member;
    }
    public Question getQuestion(){
        Question question = new Question();
        question.setQuestionId(questionId);
        return question;
    }

}
