package com.finances.exception.notfound;

public class MonthNotFoundException extends NotFoundException {
    public MonthNotFoundException(Long id) {
        super("Month with id '" + id + "' not found.");
    }
}