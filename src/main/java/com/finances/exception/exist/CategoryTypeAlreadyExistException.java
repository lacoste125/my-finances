package com.finances.exception.exist;

public class CategoryTypeAlreadyExistException extends AlreadyExistException {
    public CategoryTypeAlreadyExistException(String name) {
        super("Category type with name '" + name + "' already exist.");
    }
}