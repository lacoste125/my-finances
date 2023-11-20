package com.finances.request;

import com.finances.enums.MonthType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DisablePaymentRequest {
    private MonthType monthName;
    private Long yearCategoryId;
}