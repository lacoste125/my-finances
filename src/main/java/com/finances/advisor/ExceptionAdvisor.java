package com.finances.advisor;

import com.finances.exception.bad.BadRequestException;
import com.finances.exception.exist.AlreadyExistException;
import com.finances.exception.notfound.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
//TODO - to do refactoru bo się dużo kodu powtarza
public class ExceptionAdvisor {

    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<ExceptionResponse> notFoundExceptionHandler(NotFoundException exception) {
        return new Response<ExceptionResponse>()
                .notFound(
                        ExceptionResponse.builder()
                                .timestamp(LocalDateTime.now())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({AlreadyExistException.class})
    public ResponseEntity<ExceptionResponse> alreadyExistExceptionHandler(AlreadyExistException exception) {
        return new Response<ExceptionResponse>()
                .exist(
                        ExceptionResponse.builder()
                                .timestamp(LocalDateTime.now())
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<ExceptionResponse> badRequestExceptionHandler(BadRequestException exception) {
        return new Response<ExceptionResponse>()
                .badRequest(
                        ExceptionResponse.builder()
                                .timestamp(LocalDateTime.now())
                                .message(exception.getMessage())
                                .build()
                );
    }
}