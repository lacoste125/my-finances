package com.finances.dto.base;

import lombok.Builder;

@Builder
public record CategoryDto(
        Long id,
        String name,
        String deadline
) {
}