package com.finances.exception.notfound;

public class MonthCategoryNotFoundException extends NotFoundException {
    public MonthCategoryNotFoundException(Long monthCategoryId) {
        super("Month category with id '" + monthCategoryId + "' not found.");
    }
}