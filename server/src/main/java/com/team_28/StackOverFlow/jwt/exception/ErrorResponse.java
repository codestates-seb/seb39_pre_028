package com.team_28.StackOverFlow.jwt.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorResponse {
    private final int error_code;
    private final String error_message;
}
