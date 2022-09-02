package com.team_28.StackOverFlow.question.controller;

import com.team_28.StackOverFlow.dto.BoardResponseDto;
import com.team_28.StackOverFlow.question.entity.Question;
import com.team_28.StackOverFlow.question.mapper.QuestionMapper;
import com.team_28.StackOverFlow.question.repository.QuestionRepository;
import com.team_28.StackOverFlow.question.service.QuestionService;
import com.team_28.StackOverFlow.stub.StubData;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;

    @GetMapping("/search")
    public ResponseEntity testBoard(){
        List<Question> questions = questionService.findQuestions();
        System.out.println("board controller 에서 서비스 성공");
        return new ResponseEntity<>(new BoardResponseDto<>(questionMapper.questionsToQuestionResponses(questions)),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getQuestionsPage(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size){
        Page<Question> pageQuestions = questionService.findQuestionsPage(page -1, size);
        System.out.println("board controller 에서 서비스 성공 / 페이지네이션");
        List<Question> questions = pageQuestions.getContent();
        System.out.println("리스트 생성 완료");
        return new ResponseEntity<>(new BoardResponseDto<>(questionMapper.questionsToQuestionResponses(questions),pageQuestions),
                HttpStatus.OK);
    }
}
