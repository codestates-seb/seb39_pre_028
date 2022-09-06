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
    //질문 엔티티 -> 응답 DTO
    default QuestionResponseDto questionToQuestionResponseDto(Question question) {
        Member member = question.getMember();
        System.out.println("question -> questionsResponseDto 변환 매퍼 시작");
        System.out.print("question 작성한 멤버의 memberid = ");
        System.out.println(member.getMemberid());
        QuestionResponseDto questionResponseDto = QuestionResponseDto.builder()
                .questionId(question.getQuestionId())
                .memberId(member.getMemberid())
                .userId(member.getUserid())
                .questionTitle(question.getQuestionTitle())
                .questionContent(question.getQuestionContent())
                .isAnswered(question.isAnswered())
                .createdAt(question.getCreatedAt())
                .modifiedAt(question.getModifiedAt())
                .build();
        System.out.println("question -> questionsResponseDto 매핑 완료");
        return questionResponseDto;
    }
    //질문들 엔티티 리스트 -> 응답 DTO 리스트
    List<QuestionResponseDto> questionsToQuestionResponses(List<Question> questions);
    //요청 DTO -> 질문 엔티티(post의 경우)
    default Question questionRequestDtoToQuestion(QuestionRequestDto questionRequestDto) {
        Member member = new Member();
        System.out.println("questionRequestDto-post -> question 변환 매퍼 시작");
        member.setMemberid(questionRequestDto.getMemberId());
        Question question = Question.builder()
                .member(member)
                .questionTitle(questionRequestDto.getQuestionTitle())
                .questionContent(questionRequestDto.getQuestionContent())
                .createdAt(questionRequestDto.getCreatedAt())
                .build();
        System.out.println("questionRequestDto-post -> question 매핑 완료");
        return question;
    }
    //요청 DTO -> 질문 엔티티(patch의 경우)
    default Question questionRequestDtoToQuestionPatch(QuestionRequestDto questionRequestDto) {
        Member member = new Member();
        System.out.println("questionRequestDto-patch -> question 변환 매퍼 시작");
        member.setMemberid(questionRequestDto.getMemberId());
        Question question = Question.builder()
                .questionId(questionRequestDto.getQuestionId())
                .member(member)
                .questionTitle(questionRequestDto.getQuestionTitle())
                .questionContent(questionRequestDto.getQuestionContent())
                .isAnswered(questionRequestDto.isAnswered())
                .modifiedAt(questionRequestDto.getModifiedAt())
                .build();
        System.out.println("questionRequestDto-patch -> question 매핑 완료");
        return question;
    }
}
