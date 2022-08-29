package com.team_28.StackOverFlow.jwt.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team_28.StackOverFlow.jwt.oauth.PrincipalDetails;
import com.team_28.StackOverFlow.jwt.repository.MemberRepository;
import com.team_28.StackOverFlow.jwt.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.team_28.StackOverFlow.jwt.filter.JwtConstants.*;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Component
@RequiredArgsConstructor
public class CustomSuccessHandler implements AuthenticationSuccessHandler {

    private final AccountService accountService;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("successfulAuthentication");
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        String accessToken = JWT.create()
                .withSubject("access token")
                .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXP))// 1min
                .withClaim("id", principalDetails.getMember().getId())
                .withClaim("userId", principalDetails.getMember().getUserid())
                .sign(Algorithm.HMAC512(JWT_SECRET));
        //response.addHeader("Authorization", "Bearer " + accessToken);

        String refreshToken = JWT.create()
                .withSubject("refresh token")
                .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXP))// 10 min
                .withClaim("id", principalDetails.getMember().getId())
                .withClaim("userId", principalDetails.getMember().getUserid())
                .sign(Algorithm.HMAC512(JWT_SECRET));
        //refreshToken DB에 저장
        accountService.updateRefreshToken(principalDetails.getUsername(),refreshToken);
        //Access Token, Refresh Token 프론트 단에 response Header로 전달
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("utf-8");
        response.setHeader(ACCESS_TOKEN_HEADER, accessToken);
        response.setHeader(REFRESH_TOKEN_HEADER, refreshToken);

        Map<String ,String> responsMap = new HashMap<>();
        responsMap.put(ACCESS_TOKEN_HEADER,accessToken);
        responsMap.put(REFRESH_TOKEN_HEADER,refreshToken);
        new ObjectMapper().writeValue(response.getWriter(), responsMap);

    }
}
