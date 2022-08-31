package com.team_28.StackOverFlow.stub;

import com.team_28.StackOverFlow.answer.dto.AnswerResponseDto;
import com.team_28.StackOverFlow.answer.entity.Answer;
import com.team_28.StackOverFlow.jwt.entity.Member;
import com.team_28.StackOverFlow.question.dto.QuestionResponseDto;
import com.team_28.StackOverFlow.question.entity.Question;
import lombok.Getter;
import java.util.List;
@Getter
public class StubData {

    public static Member member1 = Member.builder()
                .memberid(1L)
                .userid("testID")
                .password("testPassword")
                .username("testName")
                .roles("ROLE_USER")
                .build();
    public static Member member2 = Member.builder()
                .memberid(2L)
                .userid("testID_2")
                .password("testPassword_2")
                .username("testName_2")
                .roles("ROLE_USER")
                .build();

    public static QuestionResponseDto question1 = QuestionResponseDto.builder()
            .questionId(1L)
            .memberId(member1.getMemberid())
            .userId(member1.getUserid())
            .questionTitle("testQuestionTitle_1")
            .questionContent("testQuestionContent_1")
            .isAnswered(false)
            .createdAt("22. 8. 29. 오후 10:08")
            .modifiedAt("22. 8. 29. 오후 10:08")
            .build();


    public static AnswerResponseDto answer1 = AnswerResponseDto.builder()
            .answerId(1L)
            .questionId(2L)
            .memberId(member1.getMemberid())
            .userId(member1.getUserid())
            .content("testAnswerContent_1")
            .created_at("22. 8. 29. 오후 10:08")
            .modified_at("22. 8. 29. 오후 10:08")
            .build();

    public static AnswerResponseDto answer2 = AnswerResponseDto.builder()
            .answerId(2L)
            .questionId(2L)
            .memberId(member2.getMemberid())
            .userId(member2.getUserid())
            .content("testAnswerContent_2")
            .created_at("22. 8. 29. 오후 10:08")
            .modified_at("22. 8. 29. 오후 10:08")
            .build();

    public static List<AnswerResponseDto> answerList = List.of(answer1,answer2);
    public static List<Long> answerIDList = List.of(answer1.getAnswerId(),answer2.getAnswerId());

    public static QuestionResponseDto question2 = QuestionResponseDto.builder()
            .questionId(2L)
            .memberId(member2.getMemberid())
            .userId(member2.getUserid())
            .questionTitle("testQuestionTitle_2")
            .questionContent("testQuestionContent_2")
            .isAnswered(true)
            .createdAt("22. 8. 29. 오후 10:08")
            .modifiedAt("22. 8. 29. 오후 10:08")
            .answerIds(answerIDList)
            .build();

    public static List<QuestionResponseDto> questionList = List.of(question1,question2);
}
