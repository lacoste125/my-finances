package com.finances.dto;

import lombok.Builder;

@Builder
public record CategoryDto(
        Long id,
        String name,
        String deadline
) {
}