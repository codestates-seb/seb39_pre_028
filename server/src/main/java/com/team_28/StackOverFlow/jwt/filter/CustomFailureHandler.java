package com.team_28.StackOverFlow.jwt.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team_28.StackOverFlow.exception.CustomLogicException;
import com.team_28.StackOverFlow.exception.ExceptionCode;
import com.team_28.StackOverFlow.jwt.exception.ErrorResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
@Component
public class CustomFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        System.out.println("로그인 실패");
        response.setStatus(401);
//        response.setContentType(APPLICATION_JSON_VALUE);
//        response.setCharacterEncoding("utf-8");
//        ErrorResponse errorResponse = new ErrorResponse(401, "ID 또는 비밀번호가 일치하지 않습니다.");
//        new ObjectMapper().writeValue(response.getWriter(), errorResponse);
        throw new CustomLogicException(ExceptionCode.SC_UNAUTHORIZED);
    }
}
