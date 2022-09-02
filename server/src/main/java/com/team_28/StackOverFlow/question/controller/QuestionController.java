package com.team_28.StackOverFlow.question.controller;

import com.team_28.StackOverFlow.dto.BoardResponseDto;
import com.team_28.StackOverFlow.dto.QuestionPageDto;
import com.team_28.StackOverFlow.question.dto.QuestionRequestDto;
import com.team_28.StackOverFlow.question.entity.Question;
import com.team_28.StackOverFlow.question.mapper.QuestionMapper;
import com.team_28.StackOverFlow.question.service.QuestionService;
import com.team_28.StackOverFlow.stub.StubData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionRequestDto requestDto){
        System.out.println("/questions POST 시작");
        Question question = questionService.createQuestion(questionMapper.questionRequestDtoToQuestion(requestDto));
        System.out.println(question.getQuestionContent());
        if(!question.isAnswered()){
            return new ResponseEntity(
                    new QuestionPageDto<>(questionMapper.questionToQuestionResponseDto(question)),
                    HttpStatus.CREATED);
        }
        return new ResponseEntity<>(
                new QuestionPageDto<>(questionMapper.questionToQuestionResponseDto(question),question.getAnswers()),
                        HttpStatus.CREATED);
    }
    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive long questionId,
                                        @Valid @RequestBody QuestionRequestDto requestDto){
        System.out.println("/questions/{question-id} PATCH 시작");
        requestDto.setQuestionId(questionId);
        System.out.println(requestDto.getQuestionId());
        Question question = questionService.updateQuestion(questionMapper.questionRequestDtoToQuestionPatch(requestDto));
        if(!question.isAnswered()){
            return new ResponseEntity(
                    new QuestionPageDto<>(questionMapper.questionToQuestionResponseDto(question)),
                    HttpStatus.OK);
        }
        return new ResponseEntity<>(
                new QuestionPageDto<>(questionMapper.questionToQuestionResponseDto(question),question.getAnswers()),
                HttpStatus.OK);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") long questionId){
        System.out.println("/questions/{question-id} GET 시작");
        Question question = questionService.findQuestion(questionId);
        if(!question.isAnswered()){
            return new ResponseEntity(
                    new QuestionPageDto<>(questionMapper.questionToQuestionResponseDto(question)),
                    HttpStatus.OK);
        }
        return new ResponseEntity<>(
                new QuestionPageDto<>(questionMapper.questionToQuestionResponseDto(question),question.getAnswers()),
                HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") long questionId){
        System.out.println("/questions/{question-id} DELETE 시작");
        questionService.deleteQuestion(questionId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/edit/{question-id}")
    public ResponseEntity getEditPage(@PathVariable("question-id") @Positive long questionId){
        System.out.println("수정 페이지 질문 번호 : "+questionId);
        return new ResponseEntity(HttpStatus.OK);
    }

}
