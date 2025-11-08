package com.finances.exception.exist;

public class YearCategoryAlreadyExistException extends AlreadyExistException {
    public YearCategoryAlreadyExistException(String name, Integer year) {
        super("Category with name '" + name + "' already exist in year" + year + ".");
    }
}