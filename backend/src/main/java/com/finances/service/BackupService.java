package com.finances.service;

import com.finances.pojo.EmailMessage;
import com.finances.request.CreateBackupRequest;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class BackupService {

    private final EmailService emailService;

    public String createBackupAndSendEmail(CreateBackupRequest request) throws IOException, MessagingException {
        LocalDateTime date = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss");
        String formatedDate = date.format(formatter);

        String fileName = request.fileName() + "_" + formatedDate;
        String filePath = request.fileResource() + "\\" + fileName + ".sql";

        Runtime rt = Runtime.getRuntime();
        rt.exec("C:\\xampp\\mysql\\bin\\mysqldump " +
                "-u root " +
                "--default-character-set=utf8 " +
                "--result-file=" + filePath + " " +
                "--databases " + request.databaseName());

        EmailMessage emailMessage = EmailMessage.builder()
                .attachment(new File(filePath))
                .to(request.emailTo())
                .subject("my-finances-app database dump: " + request.databaseName())
                .message("Backup bazy danych '" + request.databaseName() + "' ")
                .build();

        emailService.sendMailWithAttachment(emailMessage);

        return emailMessage.attachment().getAbsolutePath();
    }
}