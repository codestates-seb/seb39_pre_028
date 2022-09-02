package com.team_28.StackOverFlow.advice;

import com.team_28.StackOverFlow.exception.CustomLogicException;
import com.team_28.StackOverFlow.jwt.exception.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;

//controller에서 발생하는 예외를 도맡아서 처리
@RestControllerAdvice
public class GlobalExceptionAdvice {
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e){
        final ErrorResponse response = ErrorResponse.of(e.getBindingResult());
        return response;
    }
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handConstraintViolationException(ConstraintViolationException e){
        final ErrorResponse response = ErrorResponse.of(e.getConstraintViolations());
        return response;
    }
    @ExceptionHandler
    public ResponseEntity handleCustomLogicException(CustomLogicException e){
        final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());
        return new ResponseEntity(response,HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponse handleHttpRequestMethodNotSupportedException(
            HttpRequestMethodNotSupportedException e) {

        final ErrorResponse response = ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);

        return response;
    }
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleHttpMessageNotReadableException(
            HttpMessageNotReadableException e) {

        final ErrorResponse response = ErrorResponse.of(HttpStatus.BAD_REQUEST,
                "Required request body is missing");

        return response;
    }

}
