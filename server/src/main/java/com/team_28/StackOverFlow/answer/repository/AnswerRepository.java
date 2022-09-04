package com.team_28.StackOverFlow.answer.repository;

import com.team_28.StackOverFlow.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    public Optional<Answer> findByAnswerId(long answerId);
}
