package com.team_28.StackOverFlow.question.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.team_28.StackOverFlow.answer.entity.Answer;
import com.team_28.StackOverFlow.audit.Auditable;
import com.team_28.StackOverFlow.jwt.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "question")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;
    @ManyToOne
    @JoinColumn(name = "MEMBERID")
    @JsonIgnore
    private Member member;
    @OneToMany(mappedBy = "question",fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Answer> answers = new ArrayList<>();
    @Column(nullable = false, columnDefinition = "TEXT" ,length = 100)
    private String questionTitle;
    @Column(nullable = false, columnDefinition = "LONGTEXT", length = 4000)
    private String questionContent;
    @Column
    private boolean isAnswered;
    @Column(name = "CREATED_AT", updatable = false)
    private String createdAt;
    @Column(name = "LAST_MODIFIED_AT")
    private String modifiedAt;

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
