package com.team_28.StackOverFlow.answer.service;

import com.team_28.StackOverFlow.answer.entity.Answer;
import com.team_28.StackOverFlow.answer.repository.AnswerRepository;
import com.team_28.StackOverFlow.exception.CustomLogicException;
import com.team_28.StackOverFlow.exception.ExceptionCode;
import com.team_28.StackOverFlow.jwt.entity.Member;
import com.team_28.StackOverFlow.question.entity.Question;
import com.team_28.StackOverFlow.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {

    //같은 작성자가 단 답변인지 확인하고 수정 삭제 가능하게 하기
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;

    public Answer createAnswer(Answer answer){
        //존재하는 답변 id 인지 확인
        verifiedExistAnswer(answer.getAnswerId());
        //요청으로 들어온 답변객체에 있는 질문 아이디가 존재하는지 확인
        verifiedExistQuestion(answer.getQuestion().getQuestionId());
        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        //받아온 작성자 이름과 바꿀 답변의 작성자 이름이 같은 지 확인
        //받아온 질문 아이디와 바꾼 질문의 아이디가 같은지 확인
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());
        if(answer.getQuestion().isAnswered() != findAnswer.getQuestion().isAnswered()) {
            findAnswer.getQuestion().setAnswered(answer.getQuestion().isAnswered());
        } else if (!answer.getQuestion().isAnswered()) {
            throw new CustomLogicException(ExceptionCode.ANSWER_NOT_FOUND);
        } else if (findAnswer.getMember().getMemberid() != answer.getMember().getMemberid()) {
                throw new CustomLogicException(ExceptionCode.MEMBER_NOT_FOUND);
            } else if (findAnswer.getQuestion().getQuestionId() != answer.getQuestion().getQuestionId()) {
                throw new CustomLogicException(ExceptionCode.QUESTION_NOT_FOUND);
            }
            findAnswer.setAnswerContent(answer.getAnswerContent());
            return answerRepository.save(findAnswer);
    }

    public void deleteAnswer(long answerId){
        Answer answer = findVerifiedAnswer(answerId);
        Member member = answer.getMember();
        Question question = answer.getQuestion();
        if(member == null) System.out.println("멤버 존재 X");
        if(question == null) System.out.println("질문 존재 X");
        member.getAnswers().removeIf(answer1 -> answer.getAnswerId().equals(answerId));
        question.getAnswers().removeIf(answer1 -> answer.getAnswerId().equals(answerId));
        answerRepository.delete(answer);
        System.out.println("삭제 완료");
        if(answer != null)  System.out.println(answer.getAnswerId()+"번 답변 삭제 X");
    }


    private void verifiedExistAnswer(long answerId){
        System.out.println(answerId+" 에 해당하는 답변 확인");
        Optional<Answer> answer = answerRepository.findByAnswerId(answerId);
        if(answer.isPresent()){
            System.out.println("이미 있는 answerId 입니다.");
            throw new CustomLogicException(ExceptionCode.ANSWER_EXISTS);
        }
    }
        private void verifiedExistQuestion(long questionId){
        System.out.println(questionId+" 에 해당하는 질문 확인");
        Optional<Question> question = questionRepository.findByQuestionId(questionId);
        if(!question.isPresent()){
            throw new CustomLogicException(ExceptionCode.QUESTION_NOT_FOUND);
        }
    }
    private Answer findVerifiedAnswer(long answerId){
        Optional<Answer> answer = answerRepository.findByAnswerId(answerId);
        Answer findAnswer = answer.orElseThrow(()->new CustomLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }

}
