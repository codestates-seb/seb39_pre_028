package com.team_28.StackOverFlow.jwt.controller;

import com.team_28.StackOverFlow.jwt.model.Member;
import com.team_28.StackOverFlow.jwt.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RestApiController {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    // 추가
    @PostMapping("/signup")
    public String join(@RequestBody Member member) {
        System.out.println("회원가입 시도");
        member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
        member.setRoles("ROLE_USER");
        memberRepository.save(member);
        return "회원 가입 완료";
    }

    @GetMapping("/user")
    public String user(){
        return "user";
    }

    @PostMapping("/logout")
    public String logout(){
        return "logout";
    }
}
