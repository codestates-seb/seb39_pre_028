package com.team_28.StackOverFlow.jwt.filter;

import com.team_28.StackOverFlow.jwt.entity.Member;
import com.team_28.StackOverFlow.jwt.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final MemberRepository memberRepository;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        System.out.println("시도필터 성공");
        String userid = request.getParameter("userid");
        String password = request.getParameter("password");
        System.out.println(userid + " + " + password);
        Member member = memberRepository.findByUserid(userid);
        System.out.println(member.getUsername() + " + " + member.getPassword());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(member.getUserid(),member.getPassword());
        System.out.println(authenticationToken.toString());

        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        System.out.println(authentication.getPrincipal().toString());

        return authentication;

    }


}

