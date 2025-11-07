package com.finances.request;

import com.finances.enums.MonthType;
import org.springframework.lang.Nullable;

public record TogglePaymentRequest(
        MonthType monthName,
        Long yearCategoryId,
        @Nullable String comment
) {
}