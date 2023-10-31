package com.finances.exception.exist;

public class MonthCategoryAlreadyExistException extends AlreadyExistException {
    public MonthCategoryAlreadyExistException(Long categoryId, Long monthId) {
        super("Configuration with categoryId: " + categoryId + " and monthId: "+ monthId + " already exist.");
    }
}