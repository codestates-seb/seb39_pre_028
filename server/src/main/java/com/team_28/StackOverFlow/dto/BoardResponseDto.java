package com.team_28.StackOverFlow.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class BoardResponseDto<T> {
    private T question;
}
