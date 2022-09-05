package com.team_28.StackOverFlow.jwt.entity;

import com.team_28.StackOverFlow.answer.entity.Answer;
import com.team_28.StackOverFlow.audit.Auditable;
import com.team_28.StackOverFlow.question.entity.Question;
import lombok.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberid;
    @Column(nullable = false, unique = true)
    private String userid;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
    private String roles;

    public List<String> getRoleList() {
        if(this.roles.length() > 0){
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }
    //private String refreshToken;
    //public void updateRefreshToken(String newToken){
        //this.refreshToken = newToken;
    //}
    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    private List<Question> questions = new ArrayList<>();
    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    private List<Answer> answers = new ArrayList<>();

    public void setQuestion(Question question){
        questions.add(question);
        if(question.getMember() != this){
            question.setMember(this);
        }
    }

    public void setAnswer(Answer answer){
        answers.add(answer);
        if(answer.getMember() != this){
            answer.setMember(this);
        }
    }
}
