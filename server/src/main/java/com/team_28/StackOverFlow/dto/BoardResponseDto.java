package com.team_28.StackOverFlow.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class BoardResponseDto<T> {
    private List<T> question;
    private PageInfo pageInfo;

    public BoardResponseDto(List<T> question){
        this.question = question;
    }

    public BoardResponseDto(List<T> question, Page page){
        this.question = question;
        this.pageInfo = new PageInfo(page.getNumber()+1, page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
