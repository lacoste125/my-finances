package com.finances.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddPaymentRequest {
    private Long monthCategoryId;
    private Double amount;
    private Date date;
    //maybee should be description?????
    private String name;
}