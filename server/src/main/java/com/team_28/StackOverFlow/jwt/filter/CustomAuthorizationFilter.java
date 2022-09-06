package com.team_28.StackOverFlow.jwt.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team_28.StackOverFlow.exception.CustomLogicException;
import com.team_28.StackOverFlow.exception.ExceptionCode;
import com.team_28.StackOverFlow.jwt.exception.ErrorResponse;
import com.team_28.StackOverFlow.jwt.entity.Member;
import com.team_28.StackOverFlow.jwt.oauth.PrincipalDetails;
import com.team_28.StackOverFlow.jwt.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.team_28.StackOverFlow.exception.ExceptionCode.UNAUTHORIZED_NO_TOKEN;
import static com.team_28.StackOverFlow.jwt.filter.JwtConstants.*;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
@Slf4j
public class CustomAuthorizationFilter extends BasicAuthenticationFilter {
    private final RedisTemplate redisTemplate;
    private final MemberRepository memberRepository;

    public CustomAuthorizationFilter(AuthenticationManager authenticationManager, RedisTemplate redisTemplate, MemberRepository memberRepository) {
        super(authenticationManager);
        this.redisTemplate = redisTemplate;
        this.memberRepository = memberRepository;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("권한 필요한 페이지");
        String servletPath = request.getServletPath();
        String authorizationHeader = request.getHeader(ACCESS_TOKEN_HEADER);
        //로그인, 리프레시 요청이라면 토큰 검사X
//        if(servletPath.equals("/h2")
//                || servletPath.equals("/regi/signin")|| servletPath.equals("/regi/signin-process")|| servletPath.equals("/regi/refresh") || servletPath.equals("/regi/signup") || servletPath.equals("/regi/signout")
//                ||servletPath.equals("/board") || servletPath.equals("/board/search") || servletPath.equals("/questions")){
//            filterChain.doFilter(request,response);
//            return;
//        }
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            //토큰값이 없거나 정상적이지 않다면 401 오류
            System.out.println("토큰이 없거나 잘못된 경우");
            filterChain.doFilter(request, response);
        } else {
            try {
                //Access Token만 꺼내옴
                System.out.println("토큰 검증 시작");
                String accessToken = authorizationHeader.substring(TOKEN_HEADER_PREFIX.length());
                //Access Token 검증
                String userId = JWT.require(Algorithm.HMAC512(JWT_SECRET)).build().verify(accessToken).getClaim("userId").asString();
                if (userId != null) {
                    System.out.println("유저 아이디가 null이 아닐 경우..");
                    Member member = memberRepository.findByUserid(userId);
                    System.out.println("멤버 아이디 : "+member.getMemberid());
                    PrincipalDetails principalDetails = new PrincipalDetails(member);
                    System.out.println("member 의 비밀번호 : "+member.getPassword()+" , principalDetails의 비밀번호 : "+principalDetails.getPassword());
                    //(추가) Redis 에 해당 accessToken logout 여부 확인
                    String isLogout = (String) redisTemplate.opsForValue().get(accessToken);
                    if (ObjectUtils.isEmpty(isLogout)) {
                        //Access Token 내 Claim에서 userId꺼내 Authentication 객체 생성 & SecurityContext에 저장

                        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }
                    System.out.println("인가 성공");
                    filterChain.doFilter(request, response);
                    System.out.println("필터 다음");
                }
            } catch (TokenExpiredException e) {
                log.info("CustomAuthorizationfilter : Access Token이 만료되었습니다.");
                response.setStatus(401);
//                response.setContentType(APPLICATION_JSON_VALUE);
//                response.setCharacterEncoding("utf-8");
//                ErrorResponse errorResponse = new ErrorResponse(401, "Access Token이 만료되었습니다.");
//                new ObjectMapper().writeValue(response.getWriter(), errorResponse);
                throw new CustomLogicException(ExceptionCode.UNAUTHORIZED_EXPIRED_TOKEN);
            } catch (Exception e) {
                log.info("CustomAuthorizationFilter : JWT 토큰이 잘못되었습니다. message : {}", e.getMessage());
                response.setStatus(400);
//                response.setContentType(APPLICATION_JSON_VALUE);
//                response.setCharacterEncoding("utf-8");
//                ErrorResponse errorResponse = new ErrorResponse(400, "잘못된 JWT Token 입니다.");
//                new ObjectMapper().writeValue(response.getWriter(), errorResponse);
                throw new CustomLogicException(ExceptionCode.BAD_REQUEST_TOKEN);
            }
        }
    }}
