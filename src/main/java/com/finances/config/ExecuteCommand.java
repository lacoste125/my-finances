package com.finances.config;

import com.finances.service.BackupService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ExecuteCommand {

    @Bean
    public CommandLineRunner commandLineRunner(BackupService backupService) {
        return args -> {
            //tu logika do wykonania przy starcie apki
        };
    }
}