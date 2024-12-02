package com.finances.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateBackupRequest {
    private String fileResource;
    private String fileName;
    private String databaseName;
    private String emailTo;
}