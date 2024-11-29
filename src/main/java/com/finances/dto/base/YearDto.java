package com.finances.dto.base;

import lombok.Builder;

import java.util.List;

@Builder
public record YearDto(
        Long id,
        Integer name,
        List<YearCategoryDto> categories
) {
}