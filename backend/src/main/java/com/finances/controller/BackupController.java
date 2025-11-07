package com.finances.controller;

import com.finances.advisor.Response;
import com.finances.request.CreateBackupRequest;
import com.finances.service.BackupService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/backup")
public class BackupController {

    private final BackupService backupService;

    @PostMapping("/createDatabaseBackup")
    public ResponseEntity<String> createDatabaseBackup(@RequestBody CreateBackupRequest request)
            throws IOException, MessagingException {
        String filePath = backupService.createBackupAndSendEmail(request);

        return new Response<String>().created(filePath);
    }
}