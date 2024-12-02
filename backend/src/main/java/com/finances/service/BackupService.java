package com.finances.service;

import com.finances.pojo.EmailMessage;
import com.finances.request.CreateBackupRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
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

        String fileName = request.getFileName() + "_" + formatedDate;
        String filePath = request.getFileResource() + "\\" + fileName + ".sql";

        Runtime rt = Runtime.getRuntime();
        rt.exec("C:\\xampp\\mysql\\bin\\mysqldump " +
                "-u root " +
                "--default-character-set=utf8 " +
                "--result-file=" + filePath + " " +
                "--databases " + request.getDatabaseName());

        EmailMessage emailMessage = EmailMessage.builder()
                .attachment(new File(filePath))
                .to(request.getEmailTo())
                .subject("my-finances-app database dump: " + request.getDatabaseName())
                .message("Backup bazy danych '" + request.getDatabaseName() + "' ")
                .build();

        emailService.sendMailWithAttachment(emailMessage);

        return emailMessage.getAttachment().getAbsolutePath();
    }
}