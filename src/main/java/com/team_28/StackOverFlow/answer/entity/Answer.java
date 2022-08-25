package com.team_28.StackOverFlow.answer.entity;

import com.team_28.StackOverFlow.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column
    private String content;
    @Column
    private boolean is_adopted;

    private int like_count;

    private int dislike_count;


}
