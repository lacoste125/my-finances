package com.finances.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record YearDto(
        Long id,
        Integer name,
        List<YearCategoryDto> categories
) {
}