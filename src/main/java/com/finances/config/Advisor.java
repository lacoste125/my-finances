package com.finances.config;

import com.finances.exception.NotFoundException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class Advisor {

    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<String> notFoundExceptionHandler(NotFoundException exception) {
        return new Response<String>().notFound(exception.getMessage());
    }
}