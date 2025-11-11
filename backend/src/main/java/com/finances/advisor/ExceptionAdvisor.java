package com.finances.advisor;

import com.finances.exception.bad.BadRequestException;
import com.finances.exception.exist.AlreadyExistException;
import com.finances.exception.notfound.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionAdvisor {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ExceptionResponse> notFoundExceptionHandler(NotFoundException exception) {
        return Response.notFound(
                ExceptionResponse.of(exception.getMessage())
        );
    }

    @ExceptionHandler(AlreadyExistException.class)
    public ResponseEntity<ExceptionResponse> alreadyExistExceptionHandler(AlreadyExistException exception) {
        return Response.conflict(
                ExceptionResponse.of(exception.getMessage())
        );
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ExceptionResponse> badRequestExceptionHandler(BadRequestException exception) {
        return Response.badRequest(
                ExceptionResponse.of(exception.getMessage())
        );
    }
}