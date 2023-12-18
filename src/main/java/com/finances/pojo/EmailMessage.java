package com.finances.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.File;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailMessage {
    private String to;
    private String subject;
    private String message;
    private File attachment;
}