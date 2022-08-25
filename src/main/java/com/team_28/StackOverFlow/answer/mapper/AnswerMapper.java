package com.team_28.StackOverFlow.answer.mapper;

import com.team_28.StackOverFlow.answer.dto.AnswerRequestDto;
import com.team_28.StackOverFlow.answer.dto.AnswerResponseDto;
import com.team_28.StackOverFlow.answer.entity.Answer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnswerMapper {

    Answer answerRequestDtoToAnswer(AnswerRequestDto requestDto);
    AnswerResponseDto answerToAnswerResponseDto(Answer answer);
}
