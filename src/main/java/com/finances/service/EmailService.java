package com.finances.service;

import com.finances.pojo.EmailMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service("emailService")
public class EmailService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendMail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    public void sendMailWithAttachment(EmailMessage emailMessage) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(emailMessage.getTo());
        helper.setSubject(emailMessage.getSubject());
        helper.setText(emailMessage.getMessage());

        FileSystemResource file = new FileSystemResource(emailMessage.getAttachment());
        helper.addAttachment(emailMessage.getAttachment().getName(), file);

        mailSender.send(message);
    }
}