package com.finances.exception;

public class YearNotFoundException extends NotFoundException {
    public YearNotFoundException(Integer name) {
        super("Year '" + name + "' not found.");
    }

    public YearNotFoundException(Long id) {
        super("Year with id: '" + id + "' not found.");
    }
}