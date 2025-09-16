package com.finances.request;

public record CreateCategoryRequest(
        String name,
        String deadline
) {
}