package com.finances.exception.notfound;

public class CategoryTypeNotFoundException extends NotFoundException {
    public CategoryTypeNotFoundException(String name) {
        super("Category type '" + name + "' not found.");
    }

    public CategoryTypeNotFoundException(Long id) {
        super("Category type with id: '" + id + "' not found.");
    }
}