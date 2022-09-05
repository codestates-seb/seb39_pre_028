package com.team_28.StackOverFlow.answer.controller;

import com.team_28.StackOverFlow.answer.dto.AnswerRequestDto;
import com.team_28.StackOverFlow.answer.entity.Answer;
import com.team_28.StackOverFlow.answer.mapper.AnswerMapper;
import com.team_28.StackOverFlow.answer.repository.AnswerRepository;
import com.team_28.StackOverFlow.answer.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
@CrossOrigin(origins = "/*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/answers")
public class AnswerController {


    private final AnswerMapper mapper;
    private final AnswerRepository answerRepository;
    private final AnswerService answerService;

    @PostMapping("/{question-id}")
    public ResponseEntity postAnswer(@PathVariable("question-id") @Positive long questionId,
                                     @Valid @RequestBody AnswerRequestDto requestDto){
        Answer answer = answerService.createAnswer(mapper.answerRequestDtoToAnswer(requestDto));
        return new ResponseEntity(mapper.answerToAnswerResponseDto(answer), HttpStatus.CREATED);
    }

    @PatchMapping("/{question-id}/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("question-id") long questionId,
                                      @PathVariable("answer-id") long answerId,
                                      @Valid @RequestBody AnswerRequestDto requestDto){

        Answer answer = mapper.answerRequestDtoToAnswer(requestDto);
        answer.setAnswerId(answerId);
        Answer newAnswer = answerService.updateAnswer(answer);
        return new ResponseEntity(mapper.answerToAnswerResponseDto(newAnswer),HttpStatus.OK);
    }
    @DeleteMapping("/{question-id}/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("question-id") long questionId,
                                       @PathVariable("answer-id") long answerId){
        answerService.deleteAnswer(answerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
