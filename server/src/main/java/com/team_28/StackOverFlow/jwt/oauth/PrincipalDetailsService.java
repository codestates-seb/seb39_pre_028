package com.team_28.StackOverFlow.jwt.oauth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.team_28.StackOverFlow.jwt.dto.SignupDto;
import com.team_28.StackOverFlow.jwt.model.Member;
import com.team_28.StackOverFlow.jwt.repository.MemberRepository;
import com.team_28.StackOverFlow.jwt.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.team_28.StackOverFlow.jwt.filter.JwtConstants.*;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements AccountService, UserDetailsService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        Member memberEntity = memberRepository.findByUserid(userId);
        return new PrincipalDetails(memberEntity);
    }

    @Override
    public Long saveAccount(SignupDto dto) {
        validateDuplicateUsername(dto);
        dto.encodePassword(passwordEncoder.encode(dto.getPassword()));
        return memberRepository.save(dto.toEntity()).getId();

    }

    private void validateDuplicateUsername(SignupDto dto){
        if(memberRepository.existsByUserid(dto.getUserID())){
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

    @Override
    public void updateRefreshToken(String userId, String refreshToken) {
        Member member = memberRepository.findByUserid(userId);
        if(member == null){
            throw new RuntimeException("사용자를 찾을 수 없습니다.");
        }
        member.updateRefreshToken(refreshToken);
    }

    @Override
    public Map<String, String> refresh(String refreshToken) {
        //refreshToken 유효성 검사
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256("refresh_token")).build();
        DecodedJWT decodedJWT = verifier.verify(refreshToken);

        //accessToken 재발급
        long now = System.currentTimeMillis();
        String userId = decodedJWT.getSubject();
        Member member = memberRepository.findByUserid(userId);
        if(member == null){
            throw new RuntimeException("사용자를 찾을 수 없습니다.");
        }
        if(!member.getRefreshToken().equals(refreshToken)){
            throw new JWTVerificationException("유효하지 않은 Refresh Token 입니다.");
        }
        String accessToken = JWT.create()
                .withSubject("access token")
                .withExpiresAt(new Date(now + ACCESS_TOKEN_EXP))
                .withClaim("id", member.getId())
                .withClaim("username", member.getUsername())
                .sign(Algorithm.HMAC512(JWT_SECRET));
        Map<String , String > accessTokenResponseMap = new HashMap<>();

        //현재 시간과 Refresh Token 만료날짜를 통해 남은 만료기간 계산
        //Refresh Token 만료시간 계산해 5분 미만일 시 Refresh Token도 발급
        long refreshExpireTime = decodedJWT.getClaim("exp").asLong() * 1000;
        long diffDays = (refreshExpireTime - now)/1000 / (24*3600);
        long diffMin = (refreshExpireTime - now) / 1000/60;
        if(diffMin <= 5 ){
            String newRefreshToken = JWT.create()
                    .withSubject("refresh token")
                    .withExpiresAt(new Date(now + REFRESH_TOKEN_EXP))
                    .withClaim("id", member.getId())
                    .withClaim("username", member.getUsername())
                    .sign(Algorithm.HMAC256(JWT_SECRET));
            accessTokenResponseMap.put(REFRESH_TOKEN_HEADER, newRefreshToken);
            member.updateRefreshToken(newRefreshToken);
        }
        accessTokenResponseMap.put(ACCESS_TOKEN_HEADER,accessToken);
        return accessTokenResponseMap;
    }
}
