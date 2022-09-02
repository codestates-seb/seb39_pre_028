package com.team_28.StackOverFlow.exception;

import lombok.Getter;

//business Logic 과 security 에서 일어나는 오류 처리
public class CustomLogicException extends RuntimeException{

    @Getter
    private ExceptionCode exceptionCode;

    public CustomLogicException(ExceptionCode exceptionCode){
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }

}
