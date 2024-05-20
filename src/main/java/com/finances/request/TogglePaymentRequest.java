package com.finances.request;

import com.finances.enums.MonthType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TogglePaymentRequest {
    private MonthType monthName;
    private Long yearCategoryId;
    @Nullable
    private String comment;
}