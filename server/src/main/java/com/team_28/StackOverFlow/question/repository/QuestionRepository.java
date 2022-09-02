package com.team_28.StackOverFlow.question.repository;

import com.team_28.StackOverFlow.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    Optional<Question> findByQuestionId(Long questionId);

}
