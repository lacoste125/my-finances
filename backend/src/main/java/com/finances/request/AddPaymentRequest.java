package com.finances.request;

import com.finances.enums.MonthType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddPaymentRequest {
    private Long yearCategoryId;
    private MonthType monthName;
    private Double amount;
    private Date date;
    private String comment;
}