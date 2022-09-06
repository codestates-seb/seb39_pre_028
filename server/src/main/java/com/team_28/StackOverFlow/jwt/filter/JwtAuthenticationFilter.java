package com.team_28.StackOverFlow.jwt.filter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.team_28.StackOverFlow.exception.CustomLogicException;
import com.team_28.StackOverFlow.exception.ExceptionCode;
import com.team_28.StackOverFlow.jwt.dto.SigninDto;
import com.team_28.StackOverFlow.jwt.entity.Member;
import com.team_28.StackOverFlow.jwt.mapper.MemberMapper;
import com.team_28.StackOverFlow.jwt.oauth.PrincipalDetails;
import com.team_28.StackOverFlow.jwt.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.buf.StringUtils;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.annotation.W3CDomHandler;
import java.io.IOException;
import java.util.stream.Collectors;

import static com.team_28.StackOverFlow.exception.ExceptionCode.SC_UNAUTHORIZED;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        Authentication authentication = null;
        System.out.println("시도필터 성공");
        if (request.getMethod().equals("OPTIONS")) {
            postPreflight(response);
            System.out.println("프리플라이트 설정 완료");

        } else {
            ObjectMapper om = new ObjectMapper();
            try {
                //postPreflight(response);
                SigninDto signinDto = om.readValue(request.getInputStream(), SigninDto.class);
                String userid = signinDto.getUserid();
                String password = signinDto.getPassword();
                System.out.println(userid + " + " + password);
                Member member = memberRepository.findByUserid(userid);
                System.out.println(member.getUserid() + " + " + member.getPassword());
                if(!password.equals(member.getPassword())){
                    System.out.println("입력된 비밀번호가 다릅니다.");
                    throw new CustomLogicException(SC_UNAUTHORIZED);
                }
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(member.getUserid(), member.getPassword());
                System.out.println(authenticationToken.toString());
                authentication = authenticationManager.authenticate(authenticationToken);

                return authentication;
            } catch (StreamReadException e) {
                log.info(e.getMessage() + "+ getInputStream 실패");
                throw new RuntimeException(e);
            } catch (DatabindException e) {
                log.info(e.getMessage() + "+ 아마 getReader 실패");
                throw new CustomLogicException(ExceptionCode.CORS_ERROR);
            } catch (IOException e) {
                log.info(e.getMessage() + " + IOException");
                throw new RuntimeException(e);
            }

        } return authentication;
    }

    private void postPreflight(HttpServletResponse response) {
        System.out.println("preflight 요청");
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




