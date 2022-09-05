package com.team_28.StackOverFlow.jwt.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("http://team28-pre-bucket.s3-website.ap-northeast-2.amazonaws.com")
                .allowedMethods("GET","POST","PATCH","OPTIONS","DELETE");
    }
}
