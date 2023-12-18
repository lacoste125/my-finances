package com.finances.controller;

import com.finances.request.CreateBackupRequest;
import com.finances.service.BackupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;

@RestController
@ControllerAdvice
@RequestMapping("/backup")
public class BackupController {

    private final BackupService backupService;

    @Autowired
    public BackupController(BackupService backupService) {
        this.backupService = backupService;
    }

    @PostMapping("/createDatabaseBackup")
    @ResponseBody
    public void createDatabaseBackup(@RequestBody CreateBackupRequest request) throws IOException, MessagingException {
        backupService.createBackupAndSendEmail(request);
    }
}