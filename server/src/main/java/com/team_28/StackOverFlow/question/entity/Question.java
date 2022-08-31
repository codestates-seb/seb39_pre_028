package com.team_28.StackOverFlow.question.entity;

import com.team_28.StackOverFlow.answer.entity.Answer;
import com.team_28.StackOverFlow.audit.Auditable;
import com.team_28.StackOverFlow.jwt.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;
    @ManyToOne
    private Member member;
    @OneToMany
    private List<Answer> answers = new ArrayList<>();
    @Column(nullable = false)
    private String questionTitle;
    @Column(nullable = false)
    private String questionContent;
    @Column
    private boolean isAnswered;

    public void setMember(Member member){
        this.member = member;
    }

    public void setAnswer(Answer answer){
        answers.add(answer);
        if(answer.getQuestion() != this){
            answer.setQuestion(this);
        }
    }
}
