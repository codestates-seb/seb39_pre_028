package com.team_28.StackOverFlow.jwt.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team_28.StackOverFlow.jwt.exception.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import static com.team_28.StackOverFlow.jwt.filter.JwtConstants.JWT_SECRET;
import static com.team_28.StackOverFlow.jwt.filter.JwtConstants.TOKEN_HEADER_PREFIX;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
@Slf4j
@Component
public class CustomAuthorizationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String servletPath = request.getServletPath();
        String authorizationHeader = request.getHeader("accesstoken");

        //로그인, 리프레시 요청이라면 토큰 검사X
        if(servletPath.equals("/regi/signin")|| servletPath.equals("/regi/refresh") || servletPath.equals("/regi/signup")){
            filterChain.doFilter(request,response);
        } else if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")){
            //토큰값이 없거나 정상적이지 않다면 401 오류
            logger.info("CustomAuthorizationFilter : JWT Token이 존재하지 않습니다.");
            response.setStatus(401);
            response.setContentType(APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("utf-8");
            ErrorResponse errorResponse = new ErrorResponse(401, "JWT Token이 존재하지 않습니다.");
            new ObjectMapper().writeValue(response.getWriter(), errorResponse);
        } else {
            try{
                //Access Token만 꺼내옴
                String accessToken = authorizationHeader.substring(TOKEN_HEADER_PREFIX.length());

                //Access Token 검증
                JWTVerifier verifier = JWT.require(Algorithm.HMAC512(JWT_SECRET)).build();
                DecodedJWT decodedJWT = verifier.verify(accessToken);

                //Access Token 내 Claim에서 ___꺼내 Authentication 객체 생성 & SecurityContext에 저장
                String userId = decodedJWT.getClaim("userId").asString();
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userId,null,null);
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);

                filterChain.doFilter(request,response);
            } catch (TokenExpiredException e) {
                log.info("CustomAuthorizationfilter : Access Token이 만료되었습니다.");
                response.setStatus(401);
                response.setContentType(APPLICATION_JSON_VALUE);
                response.setCharacterEncoding("utf-8");
                ErrorResponse errorResponse = new ErrorResponse(401, "Access Token이 만료되었습니다.");
                new ObjectMapper().writeValue(response.getWriter(), errorResponse);
            } catch (Exception e) {
                log.info("CustomAuthorizationFilter : JWT 토큰이 잘못되었습니다. message : {}", e.getMessage());
                response.setStatus(400);
                response.setContentType(APPLICATION_JSON_VALUE);
                response.setCharacterEncoding("utf-8");
                ErrorResponse errorResponse = new ErrorResponse(400, "잘못된 JWT Token 입니다.");
                new ObjectMapper().writeValue(response.getWriter(), errorResponse);
            }

        }
    }
}
