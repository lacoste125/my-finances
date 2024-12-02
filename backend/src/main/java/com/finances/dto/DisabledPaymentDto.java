package com.finances.dto;

import lombok.Builder;

@Builder
public record DisabledPaymentDto(
        Long id,
        MonthDto month,
        Long yearCategoryId,
        String comment,
        boolean valid
) {
}