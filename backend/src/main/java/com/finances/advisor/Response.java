package com.finances.advisor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Response {

    private Response() {
    }

    public static <T> ResponseEntity<T> notFound(T body) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(body);
    }

    public static <T> ResponseEntity<T> conflict(T body) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(body);
    }

    public static <T> ResponseEntity<T> badRequest(T body) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(body);
    }
}