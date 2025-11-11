package com.finances.advisor;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record ExceptionResponse(
        LocalDateTime timestamp,
        String message
) {

    public static ExceptionResponse of(String message) {
        return ExceptionResponse.builder()
                .timestamp(LocalDateTime.now())
                .message(message)
                .build();
    }
}