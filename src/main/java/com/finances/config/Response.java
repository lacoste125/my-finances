package com.finances.config;

import org.springframework.http.ResponseEntity;

public class Response<T> {

    public ResponseEntity<T> ok(T body) {
        return ResponseEntity
                .ok()
                .body(body);
    }
}