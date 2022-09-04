package com.team_28.StackOverFlow.answer.entity;

import com.team_28.StackOverFlow.audit.Auditable;
import com.team_28.StackOverFlow.jwt.entity.Member;
import com.team_28.StackOverFlow.question.entity.Question;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Builder
@Getter
@Setter
@Entity
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;
    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "MEMBERID")
    private Member member;

    @Column(nullable = false)
    private String answerContent;


    public void setMember(Member member){
        this.member = member;
    }
    public void setQuestion(Question question){
        this.question = question;
    }
}
