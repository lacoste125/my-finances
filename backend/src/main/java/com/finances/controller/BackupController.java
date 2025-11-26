package com.finances.controller;

import com.finances.request.CreateBackupRequest;
import com.finances.service.BackupService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/backup")
public class BackupController {

    private final BackupService backupService;

    @PostMapping("/create")
    @ResponseStatus(value = HttpStatus.CREATED)
    public String createDatabaseBackup(@RequestBody CreateBackupRequest request)
            throws IOException, MessagingException, InterruptedException
    {
        return backupService.createBackupAndSendEmail(request);
    }
}