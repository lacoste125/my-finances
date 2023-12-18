package com.finances.service;

import com.finances.pojo.EmailMessage;
import com.finances.request.CreateBackupRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class BackupService {

    private final EmailService emailService;

    @Autowired
    public BackupService(EmailService emailService) {
        this.emailService = emailService;
    }

    public void createBackupAndSendEmail(CreateBackupRequest request) throws IOException, MessagingException {
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

        EmailMessage emailMessage = new EmailMessage();
        emailMessage.setAttachment(new File(filePath));
        emailMessage.setTo(request.getEmailTo());
        emailMessage.setSubject("my-finances-app database dump: " + request.getDatabaseName());
        emailMessage.setMessage("Backup bazy danych '" + request.getDatabaseName() + "' ");

        emailService.sendMailWithAttachment(emailMessage);
    }
}