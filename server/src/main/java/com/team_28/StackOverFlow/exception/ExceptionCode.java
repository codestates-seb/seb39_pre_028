package com.team_28.StackOverFlow.exception;

import lombok.Getter;

public enum ExceptionCode {

    BAD_REQUEST_TOKEN(400,"잘못된 JWT Token입니다."),
    UNAUTHORIZED_NO_TOKEN(401,"JWT Token이 존재하지 않습니다."),
    UNAUTHORIZED_EXPIRED_TOKEN(401,"Access Token이 만료되었습니다."),
    SC_UNAUTHORIZED(401,"ID 또는 비밀번호가 일치하지 않습니다."),
    SC_FORBIDDEN(403,"접근 권한이 없습니다."),
    MEMBER_NOT_FOUND(404,"Member not found"),
    QUESTION_EXISTS(409,"Question Exists"),
    QUESTION_NOT_FOUND(404,"Question not found"),
    ANSWER_NOT_FOUND(404,"Answer not found"),
    ANSWER_EXISTS(409, "Answer Exists");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message){
        this.status = code;
        this.message = message;
    }
}
