package com.finances.service;

import com.finances.pojo.EmailMessage;
import com.finances.request.CreateBackupRequest;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BackupService {

    private final EmailService emailService;

    public String createBackupAndSendEmail(CreateBackupRequest request) throws IOException, MessagingException, InterruptedException {
        LocalDateTime date = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss");
        String formatedDate = date.format(formatter);

        String fileName = request.fileName() + "_" + formatedDate;
        String filePath = Paths.get(request.fileResource(), fileName + ".sql").toString();

        int exitCode = getExitCode(request, filePath);
        if (exitCode != 0) {
            throw new IOException("mysqldump zakończył się błędem, exit code: " + exitCode);
        }

        EmailMessage emailMessage = EmailMessage.builder()
                .attachment(new File(filePath))
                .to(request.emailTo())
                .subject("my-finances-app database dump: " + request.databaseName())
                .message("Backup bazy danych '" + request.databaseName() + "' ")
                .build();

        emailService.sendMailWithAttachment(emailMessage);

        return emailMessage.attachment().getAbsolutePath();
    }

    private static int getExitCode(CreateBackupRequest request, String filePath) throws IOException, InterruptedException {
        List<String> command = new ArrayList<>();
        command.add("C:\\xampp\\mysql\\bin\\mysqldump");
        command.add("-u");
        command.add("root");
        command.add("--default-character-set=utf8");
        command.add("--result-file=" + filePath);
        command.add("--databases");
        command.add(request.databaseName());

        ProcessBuilder pb = new ProcessBuilder(command);
        pb.redirectErrorStream(true);
        Process process = pb.start();

        return process.waitFor();
    }
}