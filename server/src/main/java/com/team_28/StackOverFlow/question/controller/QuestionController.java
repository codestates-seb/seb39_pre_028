package com.team_28.StackOverFlow.question.controller;

import com.team_28.StackOverFlow.dto.BoardResponseDto;
import com.team_28.StackOverFlow.dto.QuestionPageDto;
import com.team_28.StackOverFlow.stub.StubData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@Slf4j
public class QuestionController {

        @GetMapping("/questions/{question-id}")
        public ResponseEntity question(@PathVariable("question-id") long questionId) {
            System.out.println("path로 아이디값 받기");
            if (questionId == 1) {
                System.out.println("path로 아이디값 받기 / id == 1");
                return new ResponseEntity<>(new QuestionPageDto<>(StubData.question1), HttpStatus.OK);
            } else  {
                System.out.println("path로 아이디값 받기 / id == 2");
                ResponseEntity response = new ResponseEntity<>(new QuestionPageDto<>(StubData.question2, StubData.answerList), HttpStatus.OK);
                return response;
            }
        }

    @GetMapping("/board")
    public ResponseEntity board(){
        return new ResponseEntity<>(new BoardResponseDto<>(StubData.questionList), HttpStatus.OK);
    }
}
