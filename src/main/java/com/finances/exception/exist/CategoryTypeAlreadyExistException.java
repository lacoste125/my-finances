package com.finances.exception.exist;

public class CategoryTypeAlreadyExistException extends AlreadyExistException {
    public CategoryTypeAlreadyExistException(String name) {
        super("Category type with name '" + name + "' not found.");
    }

    public CategoryTypeAlreadyExistException(Long id) {
        super("Category type with id: '" + id + "' not found.");
    }
}