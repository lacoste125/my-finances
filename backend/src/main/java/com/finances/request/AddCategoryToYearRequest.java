package com.finances.request;

public record AddCategoryToYearRequest(
        Long categoryId,
        Long yearId
) {
}