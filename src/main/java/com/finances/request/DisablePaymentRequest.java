package com.finances.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DisablePaymentRequest {
    private Long monthId;
    private Long yearCategoryId;
}