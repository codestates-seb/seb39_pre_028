package com.team_28.StackOverFlow.question.controller;

import com.team_28.StackOverFlow.dto.BoardResponseDto;
import com.team_28.StackOverFlow.dto.QuestionPageDto;
import com.team_28.StackOverFlow.stub.StubData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QuestionController {
    @GetMapping("/questions")
    public ResponseEntity question(){
        return new ResponseEntity<>(new QuestionPageDto<>(StubData.question2,StubData.answerList), HttpStatus.OK);
    }
    @GetMapping("/board")
    public ResponseEntity board(){
        return new ResponseEntity<>(new BoardResponseDto<>(StubData.questionList), HttpStatus.OK);
    }
}
