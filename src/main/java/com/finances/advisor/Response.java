package com.finances.advisor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Response<T> {

    public ResponseEntity<T> ok(T body) {
        return ResponseEntity
                .ok()
                .body(body);
    }

    public ResponseEntity<Void> ok() {
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    public ResponseEntity<T> created(T body) {
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    public ResponseEntity<Void> created() {
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    public ResponseEntity<T> notFound(T body) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(body);
    }

    public ResponseEntity<T> exist(T body) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(body);
    }

    public ResponseEntity<T> badRequest(T body) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(body);
    }
}