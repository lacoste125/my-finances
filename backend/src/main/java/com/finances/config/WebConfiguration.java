package com.finances.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration {

    @Value("${swagger.pattern}")
    private String mappingPattern;

    @Value("${swagger.allowed.origins}")
    private String[] allowedOrigins;

    @Value("${swagger.allowed.methods}")
    private String[] allowedMethods;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping(mappingPattern)
                        .allowedOrigins(allowedOrigins)
                        .allowedMethods(allowedMethods);
            }
        };
    }
}