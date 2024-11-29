package com.finances.dto;

import com.finances.enums.MonthType;
import lombok.Builder;

import java.sql.Date;

@Builder
public record PaymentDto(
        Long id,
        Long yearCategoryId,
        Integer year,
        MonthType month,
        Double amount,
        Date date,
        String comment,
        boolean valid
) {
}