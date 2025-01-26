package com.finances.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfiguration {

    @Bean
    public OpenAPI springOpenAPI() {
        return new OpenAPI()
                .info(
                        new Info()
                                .title("Micro service")
                                .description("APIs for Test Console service")
                                .version("1.0")
                                .license(
                                        new License()
                                                .name("Dev Team")
                                                .url("https://github.com")
                                )
                )
                .externalDocs(
                        new ExternalDocumentation()
                                .description("Test Documentation")
                                .url("https://github.com")
                );
    }
}