package com.team_28.StackOverFlow.jwt.config;

import com.team_28.StackOverFlow.jwt.entity.Member;
import com.team_28.StackOverFlow.jwt.filter.CustomAuthorizationFilter;
import com.team_28.StackOverFlow.jwt.filter.JwtAuthenticationFilter;
import com.team_28.StackOverFlow.jwt.mapper.MemberMapper;
import com.team_28.StackOverFlow.jwt.repository.MemberRepository;
import com.team_28.StackOverFlow.jwt.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.RequestCacheConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsFilter corsFilter;
    private final MemberRepository memberRepository;
    private final AuthenticationFailureHandler authenticationFailureHandler;
    private final AuthenticationSuccessHandler authenticationSuccessHandler;
    private final AccessDeniedHandler accessDeniedHandler;
    private final RedisTemplate redisTemplate;
    private final MemberMapper mapper;


//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.ignoring().antMatchers("regi/**","board/**","questions/*","authcheck","h2/**");
//    }

    @Bean
    public SecurityFilterChain ignoring(HttpSecurity http) throws Exception {
        System.out.println("ignore 필터 체인 동작");
        return http.requestMatchers(matchers -> matchers
                        .antMatchers("regi/**", "board/**", "questions/*", "authcheck", "h2/**"))
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll())
                .securityContext(AbstractHttpConfigurer::disable)
                .sessionManagement(AbstractHttpConfigurer::disable)
                .build();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        System.out.println("시큐리티 필터 체인 동작");
        http.csrf().disable();
        http.headers().frameOptions().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new CustomDsl())
                .and()
                .authorizeRequests()
                .antMatchers("regi/**", "board/**", "questions/*", "authcheck", "h2/**").permitAll()
                .antMatchers("answers/**", "questions/edit/**").authenticated()
                .antMatchers(HttpMethod.POST, "/questions").authenticated()
                .antMatchers(HttpMethod.PATCH, "/questions/**").authenticated()
                .antMatchers(HttpMethod.DELETE, "/questions/**").authenticated();
        return http.build();
    }

    public class CustomDsl extends AbstractHttpConfigurer<CustomDsl, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, memberRepository, mapper);
            jwtAuthenticationFilter.setFilterProcessesUrl("/regi/signin-process");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(authenticationSuccessHandler);
            jwtAuthenticationFilter.setAuthenticationFailureHandler(authenticationFailureHandler);
            System.out.println("customDsl 동작");
            builder
                    .addFilter(corsFilter)
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterBefore(new CustomAuthorizationFilter(authenticationManager,redisTemplate,memberRepository), UsernamePasswordAuthenticationFilter.class)
                    .exceptionHandling().accessDeniedHandler(accessDeniedHandler);

        }

    }
}



