package com.finances.dto.base;

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