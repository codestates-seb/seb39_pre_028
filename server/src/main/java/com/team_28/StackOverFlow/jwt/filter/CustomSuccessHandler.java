package com.team_28.StackOverFlow.jwt.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team_28.StackOverFlow.dto.LoginResponseDto;
import com.team_28.StackOverFlow.exception.CustomLogicException;
import com.team_28.StackOverFlow.exception.ExceptionCode;
import com.team_28.StackOverFlow.jwt.dto.ResponseDto;
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

    //private final AccountService accountService;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("successfulAuthentication");
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        if(authentication == null) {
            System.out.println("authentication == null + 프리플라이트 요청");
            throw new CustomLogicException(ExceptionCode.BAD_REQUEST_TOKEN);
        }
        System.out.println("accessToken 생성");
        String accessToken = JWT.create()
                .withSubject("access token")
                .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXP))// 1min
                .withClaim("id", principalDetails.getMember().getMemberid())
                .withClaim("userId", principalDetails.getMember().getUserid())
                .sign(Algorithm.HMAC512(JWT_SECRET));

//        String refreshToken = JWT.create()
//                .withSubject("refresh token")
//                .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXP))// 10 min
//                .withClaim("id", principalDetails.getMember().getId())
//                .withClaim("userId", principalDetails.getMember().getUserid())
//                .sign(Algorithm.HMAC512(JWT_SECRET));
        //refreshToken DB에 저장
//        accountService.updateRefreshToken(principalDetails.getUsername(),refreshToken);
        System.out.println(TOKEN_HEADER_PREFIX+accessToken);
        //Access Token, Refresh Token 프론트 단에 response Header로 전달
        postPreflight(response);
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("utf-8");
        response.setHeader(ACCESS_TOKEN_HEADER,TOKEN_HEADER_PREFIX + accessToken);

//        response.setHeader(REFRESH_TOKEN_HEADER, TOKEN_HEADER_PREFIX + refreshToken);
        //response로 토큰 보내기, 유저 정보 보내기
//        Map<String ,String> responsMap = new HashMap<>();
//        responsMap.put(ACCESS_TOKEN_HEADER,TOKEN_HEADER_PREFIX + accessToken);
//        responsMap.put(REFRESH_TOKEN_HEADER,TOKEN_HEADER_PREFIX + refreshToken);
        LoginResponseDto responseDto = new LoginResponseDto(new ResponseDto(principalDetails.getMember().getMemberid(),principalDetails.getMember().getUserid()),TOKEN_HEADER_PREFIX+accessToken);
        System.out.println(responseDto.getAccesstoken());
        new ObjectMapper().writeValue(response.getWriter(), responseDto);

    }
    private void postPreflight(HttpServletResponse response) {
        System.out.println("CORS 정책 헤더");
        response.setHeader("Access-Control-Allow-Origin", "http://team28-pre-bucket.s3-website.ap-northeast-2.amazonaws.com");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader(
                "Access-Control-Allow-Headers",
                "X-Requested-With, Content-Type, Authorization, X-XSRF-token"
        );
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setStatus(200);
    }
}
