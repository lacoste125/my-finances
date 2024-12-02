package com.finances.exception.notfound;

public class YearCategoryNotFoundException extends NotFoundException {
    public YearCategoryNotFoundException(Long yearCategoryId) {
        super("Year category with id '" + yearCategoryId + "' not found.");
    }
}