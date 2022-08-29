package com.team_28.StackOverFlow.jwt.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.team_28.StackOverFlow.jwt.dto.SigninDto;
import com.team_28.StackOverFlow.jwt.dto.SignupDto;
import com.team_28.StackOverFlow.jwt.model.Member;
import com.team_28.StackOverFlow.jwt.oauth.PrincipalDetails;
import com.team_28.StackOverFlow.jwt.repository.MemberRepository;
import com.team_28.StackOverFlow.jwt.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.Map;

import static com.team_28.StackOverFlow.jwt.filter.JwtConstants.*;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequiredArgsConstructor
public class RestApiController {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AccountService accountService;


    // 추가
    @PostMapping("regi/signup")
    public ResponseEntity signup(@RequestBody Member member) {
        System.out.println("회원가입 시도");
        member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
        member.setRoles("ROLE_USER");
        memberRepository.save(member);
        return new ResponseEntity<>(member, HttpStatus.CREATED);
    }
//    @PostMapping("regi/signin")
//    public ResponseEntity signin(@RequestBody SigninDto dto){
//        System.out.println("로그인 시도");
//        Member member = memberRepository.findByUserId(dto.getUserID());
//        return new ResponseEntity<>(member,HttpStatus.OK);
//    }

//    @PostMapping("regi/signin")
//    public ResponseEntity signin(@RequestBody SigninDto signinDto){
//        try{
//            System.out.println("로그인 시도");
//            Member member = memberRepository.findByUsername(signinDto.getUsername());
//            Authentication authenticate = authenticationManager
//                    .authenticate(
//                            new UsernamePasswordAuthenticationToken(
//                                    signinDto.getUsername(), signinDto.getPassword()
//                            )
//                    );
//            PrincipalDetails principalDetails = (PrincipalDetails) authenticate.getPrincipal();
//            return ResponseEntity.ok()
//                    .header(
//                            AUTHORIZATION,
//                            JWT.create()
//                                    .withSubject("access token")
//                                    .withExpiresAt(new Date(System.currentTimeMillis() + (60 * 1000 * 30)))
//                                    .withClaim("id", principalDetails.getMember().getId())
//                                    .withClaim("username", principalDetails.getMember().getUsername())
//                                    .sign(Algorithm.HMAC512("access_token"))
//                    )
//                    .body(member);
//        }
//        catch (BadCredentialsException ex) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//    }
    @PostMapping("/regi/refresh")
    public ResponseEntity<Map<String, String>> refresh(HttpServletRequest request, HttpServletResponse response) {
        String authorizationHeader = request.getHeader(AUTHORIZATION);

        if (authorizationHeader == null || !authorizationHeader.startsWith(TOKEN_HEADER_PREFIX)) {
            throw new RuntimeException("JWT Token이 존재하지 않습니다.");
        }
        String refreshToken = authorizationHeader.substring(TOKEN_HEADER_PREFIX.length());
        Map<String, String> tokens = accountService.refresh(refreshToken);
        response.setHeader(ACCESS_TOKEN_HEADER, tokens.get(ACCESS_TOKEN_HEADER));
        if (tokens.get(REFRESH_TOKEN_HEADER) != null) {
            response.setHeader(REFRESH_TOKEN_HEADER, tokens.get(REFRESH_TOKEN_HEADER));
        }
        return ResponseEntity.ok(tokens);
    }

    @PostMapping("regi/logout")
    public String logout(){
        return "logout";
    }


}
