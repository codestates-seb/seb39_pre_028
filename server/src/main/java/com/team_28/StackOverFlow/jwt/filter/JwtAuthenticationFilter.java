package com.team_28.StackOverFlow.jwt.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team_28.StackOverFlow.jwt.dto.SigninDto;
import com.team_28.StackOverFlow.jwt.model.Member;
import com.team_28.StackOverFlow.jwt.oauth.PrincipalDetails;
import com.team_28.StackOverFlow.jwt.repository.MemberRepository;
import com.team_28.StackOverFlow.jwt.service.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.team_28.StackOverFlow.jwt.filter.JwtConstants.*;
import static com.team_28.StackOverFlow.jwt.filter.JwtConstants.REFRESH_TOKEN_HEADER;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final MemberRepository memberRepository;
    private final AccountService accountService;

//    public void JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
//        super.setAuthenticationManager(authenticationManager);
//    }
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        try {
            System.out.println("시도필터 성공");
            ObjectMapper om = new ObjectMapper();
            SigninDto signinDto = om.readValue(request.getInputStream(), SigninDto.class);
            System.out.println(signinDto.getUserID() + " + " + signinDto.getPassword());
            Member member = memberRepository.findByUserid(signinDto.getUserID());
            System.out.println(member.getUsername() + " + " + member.getPassword());
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(member.getUserid(), signinDto.getPassword());
            System.out.println(authenticationToken.toString());

            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            System.out.println(authentication.getPrincipal().toString());
            //PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

            return authentication;

        } catch (IOException e) {
            System.out.println("시도 필터 에러");
            e.printStackTrace();
            ;
        }
        return null;
    }


//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
//
//        System.out.println("successfulAuthentication");
//        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
//
//        String accessToken = JWT.create()
//                .withSubject("access token")
//                .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXP))// 1min
//                .withClaim("id", principalDetails.getMember().getId())
//                .withClaim("userId", principalDetails.getMember().getUserid())
//                .sign(Algorithm.HMAC512(JWT_SECRET));
//        //response.addHeader("Authorization", "Bearer " + accessToken);
//
//        String refreshToken = JWT.create()
//                .withSubject("refresh token")
//                .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXP))// 10 min
//                .withClaim("id", principalDetails.getMember().getId())
//                .withClaim("userId", principalDetails.getMember().getUserid())
//                .sign(Algorithm.HMAC512(JWT_SECRET));
//        //refreshToken DB에 저장
//        accountService.updateRefreshToken(principalDetails.getUsername(),refreshToken);
//        //Access Token, Refresh Token 프론트 단에 response Header로 전달
//        response.setContentType(APPLICATION_JSON_VALUE);
//        response.setCharacterEncoding("utf-8");
//        response.setHeader(ACCESS_TOKEN_HEADER, accessToken);
//        response.setHeader(REFRESH_TOKEN_HEADER, refreshToken);
//
//        Map<String ,String> responsMap = new HashMap<>();
//        responsMap.put(ACCESS_TOKEN_HEADER,accessToken);
//        responsMap.put(REFRESH_TOKEN_HEADER,refreshToken);
//        new ObjectMapper().writeValue(response.getWriter(), responsMap);
//
//    }


}

