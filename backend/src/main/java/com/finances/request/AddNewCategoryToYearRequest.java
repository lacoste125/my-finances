package com.finances.request;

public record AddNewCategoryToYearRequest(
        String name,
        String deadline,
        Integer yearNumber
) {
}