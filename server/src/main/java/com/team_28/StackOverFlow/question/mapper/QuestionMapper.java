package com.team_28.StackOverFlow.question.mapper;

import com.team_28.StackOverFlow.answer.entity.Answer;
import com.team_28.StackOverFlow.jwt.entity.Member;
import com.team_28.StackOverFlow.question.dto.QuestionRequestDto;
import com.team_28.StackOverFlow.question.dto.QuestionResponseDto;
import com.team_28.StackOverFlow.question.entity.Question;
import org.mapstruct.Mapper;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

    default QuestionResponseDto questionToQuestionResponseDto(Question question) {
        Member member = question.getMember();
        System.out.println(member.getMemberid());
        QuestionResponseDto questionResponseDto = QuestionResponseDto.builder()
                .questionId(question.getQuestionId())
                .memberId(member.getMemberid())
                .userId(member.getUserid())
                .questionTitle(question.getQuestionTitle())
                .questionContent(question.getQuestionContent())
                .isAnswered(question.isAnswered())
                .build();
        return questionResponseDto;
    }

    List<QuestionResponseDto> questionsToQuestionResponses(List<Question> questions);

    default Question questionRequestDtoToQuestion(QuestionRequestDto questionRequestDto) {
        Member member = new Member();
        member.setMemberid(questionRequestDto.getMemberId());
        Question question = Question.builder()
                .member(member)
                .questionTitle(questionRequestDto.getQuestionTitle())
                .questionContent(questionRequestDto.getQuestionContent())
                .isAnswered(questionRequestDto.isAnswered())
                .build();

        return question;
    }

    default Question questionRequestDtoToQuestionPatch(QuestionRequestDto questionRequestDto) {
        Member member = new Member();
        member.setMemberid(questionRequestDto.getMemberId());
        Question question = Question.builder()
                .questionId(questionRequestDto.getQuestionId())
                .member(member)
                .questionTitle(questionRequestDto.getQuestionTitle())
                .questionContent(questionRequestDto.getQuestionContent())
                .isAnswered(questionRequestDto.isAnswered())
                .build();

        return question;
    }
}
