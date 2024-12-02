package com.finances.exception.notfound;

import com.finances.enums.MonthType;

public class MonthNotFoundException extends NotFoundException {
    public MonthNotFoundException(Long id) {
        super("Month with id '" + id + "' not found.");
    }

    public MonthNotFoundException(MonthType name) {
        super("Month with name '" + name + "' not found.");
    }
}