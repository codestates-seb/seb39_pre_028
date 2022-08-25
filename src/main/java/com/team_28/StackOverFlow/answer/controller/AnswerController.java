package com.team_28.StackOverFlow.answer.controller;

import com.team_28.StackOverFlow.answer.dto.AnswerRequestDto;
import com.team_28.StackOverFlow.answer.entity.Answer;
import com.team_28.StackOverFlow.answer.mapper.AnswerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/answers")
public class AnswerController {

    @Autowired
    private AnswerMapper mapper;

    @PostMapping("/{question-id}")
    public ResponseEntity postAnswer(@PathVariable("question-id") @Positive long questionId,
                                     @Valid @RequestBody AnswerRequestDto requestDto){
        Answer answer = mapper.answerRequestDtoToAnswer(requestDto);
        return new ResponseEntity(mapper.answerToAnswerResponseDto(answer), HttpStatus.CREATED);
    }

}
