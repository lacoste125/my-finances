package com.finances.controller;
import com.finances.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@ControllerAdvice
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/sendEmail")
    @ResponseBody
    public void sendEmail() {
    emailService.sendMail("miwansk1@stu.vistula.edu.pl", "subject", "test body");
    }
}