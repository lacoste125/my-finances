package com.finances.exception.exist;

public class CategoryAlreadyExistException extends AlreadyExistException {
    public CategoryAlreadyExistException(String name) {
        super("Category with name '" + name + "' already exist.");
    }
}