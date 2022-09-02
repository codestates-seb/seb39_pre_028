package com.team_28.StackOverFlow.jwt.exception;

import com.team_28.StackOverFlow.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
public class ErrorResponse {

    private int error_code;
    private String error_message;

    public ErrorResponse(final int error_code, final String error_message){
        this.error_code = error_code;
        this.error_message = error_message;
    }

    private List<FieldError> fieldErrorList; //DTO 멤버 변수 필드의 유효성 검증 실패
    private List<ConstraintViolationError> violationErrors; // URI 변수 값 유효성 검증 실패

    private ErrorResponse(final List<FieldError> fieldErrorList,
                          final List<ConstraintViolationError> violationErrors) {
        this.fieldErrorList = fieldErrorList;
        this.violationErrors = violationErrors;
    }



    public static ErrorResponse of(BindingResult bindingResult){
        return new ErrorResponse(FieldError.of(bindingResult),null);
    }

    public static ErrorResponse of(Set<ConstraintViolation<?>> violations){
        return new ErrorResponse(null,ConstraintViolationError.of(violations));
    }

    public static ErrorResponse of(ExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getMessage());
    }

    public static ErrorResponse of(HttpStatus httpStatus) {
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
    }

    public static ErrorResponse of(HttpStatus httpStatus, String message) {
        return new ErrorResponse(httpStatus.value(), message);
    }
    @Getter
    @AllArgsConstructor
    public static class FieldError{
        private String field;
        private Object rejectedValue;
        private String reason;

        public static List<FieldError> of(BindingResult bindingResult){
            final List<org.springframework.validation.FieldError> fieldErrors = bindingResult.getFieldErrors();
            return fieldErrors.stream()
                    .map(error -> new FieldError(error.getField(),error.getRejectedValue() == null?"":error.getRejectedValue().toString(),error.getDefaultMessage()))
                    .collect(Collectors.toList());
        }
    }

    @Getter
    @AllArgsConstructor
    public static class ConstraintViolationError{
        private String propertyPath;
        private Object rejectedValue;
        private String reason;

        public static List<ConstraintViolationError> of(Set<ConstraintViolation<?>> constraintViolations){
            return constraintViolations.stream()
                    .map(constraintViolation -> new ConstraintViolationError(
                            constraintViolation.getPropertyPath().toString(),
                            constraintViolation.getInvalidValue().toString(),
                            constraintViolation.getMessage()
                    )).collect(Collectors.toList());
        }

    }

}
