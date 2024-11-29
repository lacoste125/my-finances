package com.finances.dto.base;

import lombok.Builder;

import java.util.List;

@Builder
public record YearCategoryDto(
        Long id,
        Long yearId,
        CategoryDto categoryType,
        List<PaymentDto> payments,
        List<DisabledPaymentDto> disabledPayments
) {
}