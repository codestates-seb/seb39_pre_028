package com.team_28.StackOverFlow.answer.mapper;

import com.team_28.StackOverFlow.answer.dto.AnswerRequestDto;
import com.team_28.StackOverFlow.answer.dto.AnswerResponseDto;
import com.team_28.StackOverFlow.answer.entity.Answer;
import com.team_28.StackOverFlow.jwt.entity.Member;
import com.team_28.StackOverFlow.question.entity.Question;
import lombok.Builder;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnswerMapper {

    default Answer answerRequestDtoToAnswer(AnswerRequestDto requestDto){
        Member member = new Member();
        member.setMemberid(requestDto.getMemberId());
        Question question = new Question();
        question.setQuestionId(requestDto.getQuestionId());
        Answer answer = Answer.builder()
                .answerContent(requestDto.getContent())
                .member(member)
                .question(question)
                .build();
        return answer;
    }
    default AnswerResponseDto answerToAnswerResponseDto(Answer answer){
        AnswerResponseDto answerResponseDto = AnswerResponseDto.builder()
                .answerId(answer.getAnswerId())
                .questionId(answer.getQuestion().getQuestionId())
                .memberId(answer.getMember().getMemberid())
                .userId(answer.getMember().getUserid())
                .content(answer.getAnswerContent())
                .created_at(answer.getCreatedAt())
                .modified_at(answer.getModifiedAt())
                .build();
        return answerResponseDto;
    }
}
