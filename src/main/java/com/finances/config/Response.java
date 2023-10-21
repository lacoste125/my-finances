package com.finances.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Response<T> {

    public ResponseEntity<T> ok(T body) {
        return ResponseEntity
                .ok()
                .body(body);
    }

    public ResponseEntity<T> created(T body) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(body);
    }

    public ResponseEntity<T> notFound(T body) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(body);
    }
}