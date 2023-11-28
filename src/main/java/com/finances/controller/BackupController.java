package com.finances.controller;

import com.finances.dto.backup.DatabaseBackupDto;
import com.finances.service.BackupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.SQLException;

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
    public DatabaseBackupDto createDatabaseBackup() throws SQLException, IOException, ClassNotFoundException {
        return backupService.createBackupAndSendEmail();
    }
}