package com.finances.pojo;

import lombok.Builder;

import java.io.File;

@Builder
public record EmailMessage(
        String to,
        String subject,
        String message,
        File attachment
) {
}