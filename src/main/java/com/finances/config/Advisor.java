package com.finances.config;

import com.finances.exception.bad.BadRequestException;
import com.finances.exception.exist.AlreadyExistException;
import com.finances.exception.notfound.NotFoundException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class Advisor {

    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<String> notFoundExceptionHandler(NotFoundException exception) {
        return new Response<String>().notFound(exception.getMessage());
    }

    @ExceptionHandler({AlreadyExistException.class})
    public ResponseEntity<String> alreadyExistExceptionHandler(AlreadyExistException exception) {
        return new Response<String>().exist(exception.getMessage());
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<String> badRequestExceptionHandler(BadRequestException exception) {
        return new Response<String>().badRequest(exception.getMessage());
    }
}