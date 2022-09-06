package com.team_28.StackOverFlow.jwt.oauth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team_28.StackOverFlow.jwt.dto.SignupDto;
import com.team_28.StackOverFlow.exception.ErrorResponse;
import com.team_28.StackOverFlow.jwt.entity.Member;
import com.team_28.StackOverFlow.jwt.repository.MemberRepository;
import com.team_28.StackOverFlow.jwt.service.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.concurrent.TimeUnit;

import static com.team_28.StackOverFlow.jwt.filter.JwtConstants.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class PrincipalDetailsService implements AccountService, UserDetailsService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final RedisTemplate redisTemplate;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        System.out.println("service 도착");
        Member memberEntity = memberRepository.findByUserid(userId);
        System.out.println(memberEntity.getUserid()+memberEntity.getPassword());
        System.out.println("memberEntity에 저장");
        ObjectMapper mapper = new ObjectMapper();
        try {
            mapper.writeValue(new File("memberEntity.json"),memberEntity);
            String jsonInString = mapper.writeValueAsString(memberEntity);
            System.out.println(jsonInString);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return new PrincipalDetails(memberEntity);
    }
    @Override
    public Long saveAccount(SignupDto dto) {
        validateDuplicateUsername(dto);
        dto.encodePassword(passwordEncoder.encode(dto.getPassword()));
        return memberRepository.save(dto.toEntity()).getMemberid();
    }
    private void validateDuplicateUsername(SignupDto dto){
        if(memberRepository.existsByUserid(dto.getUserid())){
            throw new RuntimeException("이미 존재하는 ID 입니다.");
        }
    }

    @Override
    public Long saveRole(String roleName) {
        return null;
    }

    @Override
    public Long addRoleToUser() {
        return null;
    }

//    @Override
//    public void updateRefreshToken(String userId, String refreshToken) {
//        Member member = memberRepository.findByUserid(userId);
//        if(member == null){
//            throw new RuntimeException("사용자를 찾을 수 없습니다.");
//        }
//        member.updateRefreshToken(refreshToken);
//    }

//    @Override
//    public Map<String, String> refresh(String refreshToken) {
//        //refreshToken 유효성 검사
//        JWTVerifier verifier = JWT.require(Algorithm.HMAC512(JWT_SECRET)).build();
//        DecodedJWT decodedJWT = verifier.verify(refreshToken);
//
//        //accessToken 재발급
//        long now = System.currentTimeMillis();
//        String userId = decodedJWT.getSubject();
//        Member member = memberRepository.findByUserid(userId);
//        if(member == null){
//            throw new RuntimeException("사용자를 찾을 수 없습니다.");
//        }
//        if(!member.getRefreshToken().equals(refreshToken)){
//            throw new JWTVerificationException("유효하지 않은 Refresh Token 입니다.");
//        }
//        String accessToken = JWT.create()
//                .withSubject("access token")
//                .withExpiresAt(new Date(now + ACCESS_TOKEN_EXP))
//                .withClaim("id", member.getId())
//                .withClaim("userId", member.getUserid())
//                .sign(Algorithm.HMAC512(JWT_SECRET));
//        Map<String , String > accessTokenResponseMap = new HashMap<>();
//
//        //현재 시간과 Refresh Token 만료날짜를 통해 남은 만료기간 계산
//        //Refresh Token 만료시간 계산해 5분 미만일 시 Refresh Token도 발급
//        long refreshExpireTime = decodedJWT.getClaim("exp").asLong() * 1000;
//        long diffDays = (refreshExpireTime - now)/1000 / (24*3600);
//        long diffMin = (refreshExpireTime - now) / 1000/60;
//
//        if(diffMin <= 5 ){
//            String newRefreshToken = JWT.create()
//                    .withSubject("refresh token")
//                    .withExpiresAt(new Date(now + REFRESH_TOKEN_EXP))
//                    .withClaim("id", member.getId())
//                    .withClaim("userId", member.getUserid())
//                    .sign(Algorithm.HMAC512(JWT_SECRET));
//            accessTokenResponseMap.put(REFRESH_TOKEN_HEADER, TOKEN_HEADER_PREFIX + newRefreshToken);
//            member.updateRefreshToken(newRefreshToken);
//        }
//        accessTokenResponseMap.put(ACCESS_TOKEN_HEADER,TOKEN_HEADER_PREFIX + accessToken);
//        return accessTokenResponseMap;
//    }
    public ResponseEntity logout(String accessToken) throws IOException {
            //Access Token 검증
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC512(JWT_SECRET)).build();
            DecodedJWT decodedJWT = verifier.verify(accessToken);

            //Access Token에서 userid가져오기
            String userId = decodedJWT.getClaim("userId").asString();
            //해당 Access Token 유효시간 가지고 와서 BlackList로 저장
            Long expiration = decodedJWT.getExpiresAt().getTime();
            redisTemplate.opsForValue()
                    .set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);
            log.info("PrincipalDetailsService : 로그아웃 성공했습니다.");
            return new ResponseEntity<>(userId, HttpStatus.OK);
        } catch (JWTVerificationException e){
            log.info("PrincipalDetailsService : access Token 검증에 실패했습니다.");
            ErrorResponse errorResponse = new ErrorResponse(401,"access Token 검증에 실패했습니다.");
            return new ResponseEntity<>(errorResponse,HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            log.info("PrincipalDetailsService : JWT 토큰이 잘못되었습니다. message : {}", e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(400,"잘못된 access Token 입니다.");
            return new ResponseEntity<>(errorResponse,HttpStatus.BAD_REQUEST);
        }



    }
}
