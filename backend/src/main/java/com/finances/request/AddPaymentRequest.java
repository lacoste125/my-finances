package com.finances.request;

import com.finances.enums.MonthType;

import java.sql.Date;

public record AddPaymentRequest(
        Long yearCategoryId,
        MonthType monthName,
        Double amount,
        Date date,
        String comment
) {
}