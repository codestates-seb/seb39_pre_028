package com.team_28.StackOverFlow.question.service;

import com.team_28.StackOverFlow.exception.CustomLogicException;
import com.team_28.StackOverFlow.exception.ExceptionCode;
import com.team_28.StackOverFlow.jwt.entity.Member;
import com.team_28.StackOverFlow.jwt.exception.ErrorResponse;
import com.team_28.StackOverFlow.jwt.repository.MemberRepository;
import com.team_28.StackOverFlow.question.entity.Question;
import com.team_28.StackOverFlow.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

import static com.team_28.StackOverFlow.exception.ExceptionCode.MEMBER_NOT_FOUND;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final MemberRepository memberRepository;

    public QuestionService(QuestionRepository questionRepository, MemberRepository memberRepository) {
        this.questionRepository = questionRepository;
        this.memberRepository = memberRepository;
    }

    public Question createQuestion(Question question){
        //존재하는 질문 이아디인지 검사
        //리퍼지토리에 저장 + 리턴
        System.out.println("createQuestionService 시작");
        verifyExistQuestion(question.getQuestionId());
        System.out.println(question.getMember().getMemberid());
        Member member = findMember(question.getMember().getMemberid()); //모든 저장소에서 찾음..;;;
        question.setMember(member);
        System.out.println("createQuestionService 저장");
        return questionRepository.save(question);
    }
    public Question updateQuestion(Question question){
        System.out.println("updateQuestionService 시작");
        Question findQuestion = findVerifiedQuestion(question.getQuestionId());
        Optional.ofNullable(question.getQuestionTitle())
                .ifPresent(questionTitle -> findQuestion.setQuestionTitle(questionTitle));
        Optional.ofNullable(question.getQuestionContent())
                .ifPresent(questionContent -> findQuestion.setQuestionContent(questionContent));
        if(question.isAnswered() != findQuestion.isAnswered()){
            findQuestion.setAnswered(question.isAnswered());
        }
        System.out.println("updateQuestionService 저장");
        return questionRepository.save(findQuestion);
    }
    public Question findQuestion(long questionId){

        return findVerifiedQuestion(questionId);
    }
    public Page<Question> findQuestionsPage(int page, int size){
        System.out.println("findQuestionsPageService 페이지 찾기");
        return questionRepository.findAll(PageRequest.of(page,size, Sort.by("questionId").descending())); //최신순부터 정렬
    }
    public List<Question> findQuestions(){
        System.out.println("모든 질문 찾기");
        return questionRepository.findAll();
    }

    public void deleteQuestion(long questionId){
        Question question = findVerifiedQuestion(questionId);
        Member member = question.getMember();
        if(member == null) {
            System.out.println("멤버 존재X");
        }
         member.getQuestions().removeIf(question1 -> question.getQuestionId().equals(questionId));
        questionRepository.delete(question);
        System.out.println("삭제 완료");
        if(question != null)    System.out.println(question.getQuestionId());
    }
    private void verifyExistQuestion(Long questionId){
        //리퍼지토리에 아이디 검색해서 존재하는지 확인
        //존재하면 에러 발생
        System.out.println("리파지토리에 존재하는 질문 id 인지 확인 : service method");
        Optional<Question> optionalQuestion = questionRepository.findByQuestionId(questionId);
        if(optionalQuestion.isPresent()){
            throw new CustomLogicException(ExceptionCode.QUESTION_EXISTS);
        }
    }
    private Question findVerifiedQuestion(long questionId){
        //질문 찾기
        System.out.println("questionId ("+questionId+")에 맞는 질문 찾아서 반환 : service method");
        Optional<Question> optionalQuestion = questionRepository.findByQuestionId(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(() -> new CustomLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return findQuestion;
    }
    private Member findMember(long memberId){
        System.out.println("memberId 로 멤버 찾기 : service method");
        Member member = memberRepository.findByMemberid(memberId);
        if(member == null) throw new CustomLogicException(MEMBER_NOT_FOUND);
        System.out.println(member.getMemberid()+" member 존재");
        return member;
    }

    //+작성자와 CRUD하는 사용자가 같은지 확인
}
