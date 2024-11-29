package com.finances.controller;

import com.finances.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailService;

    @GetMapping("/sendEmail")
    public void sendEmail() {
        emailService.sendMail("miwansk1@stu.vistula.edu.pl", "subject", "test body");
    }
}