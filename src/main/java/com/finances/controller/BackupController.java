package com.finances.controller;

import com.finances.advisor.Response;
import com.finances.request.CreateBackupRequest;
import com.finances.service.BackupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/backup")
public class BackupController {

    private final BackupService backupService;

    @PostMapping("/createDatabaseBackup")
    public @ResponseBody ResponseEntity<String> createDatabaseBackup(@RequestBody CreateBackupRequest request)
            throws IOException, MessagingException {
        String filePath = backupService.createBackupAndSendEmail(request);

        return new Response<String>().created(filePath);
    }
}