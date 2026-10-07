package com.skz.config;

import com.skz.security.JwtAuthenticationFilter;
import com.skz.security.JwtTokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;


//이 클래스는 서버설정(configuration)을위한 파일이야!
@Configuration
@EnableWebSecurity
// 스프링 시큐리티 설정 활성화
public class WebConfig implements WebMvcConfigurer {

    @Override
    //정적리소스(이미지,영상,html..)를 웹에서 어떻게 접근할지 연결해 주는 역할
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/uploads/**")
        .addResourceLocations("file:///"+ System.getProperty("user.dir")+"/uploads/");
    }

    //cors
    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE","PATCH", "OPTIONS" )
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtTokenProvider tokenProvider) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .addFilterBefore(new JwtAuthenticationFilter(tokenProvider),
                        org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // 현재는 모든 요청을 허용하도록 설정
                );
        return http.build();
    }

}
