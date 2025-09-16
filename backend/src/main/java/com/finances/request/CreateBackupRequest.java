package com.finances.request;

public record CreateBackupRequest(
        String fileResource,
        String fileName,
        String databaseName,
        String emailTo
) {
}