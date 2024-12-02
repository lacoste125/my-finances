package com.finances.exception.bad;

public class BadRequestException extends Exception {
    public BadRequestException(String message) {
        super(message);
    }
}