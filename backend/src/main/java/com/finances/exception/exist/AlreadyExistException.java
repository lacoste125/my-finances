package com.finances.exception.exist;

public class AlreadyExistException extends Exception {
    public AlreadyExistException(String message) {
        super(message);
    }
}