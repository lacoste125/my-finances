package com.finances.dto;

import com.finances.entity.Payment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {
    private Long id;
    private Long yearCategoryId;
    private Integer year;
    private String month;
    private Double amount;
    private Date date;
    private String comment;
    private boolean valid;

    public static PaymentDto fromDao(Payment dao) {
        return new PaymentDto(
                dao.getId(),
                dao.getYearCategory().getId(),
                dao.getYearCategory().getYear().getYearNumber(),
                dao.getMonth().getName(),
                dao.getAmount(),
                dao.getDate(),
                dao.getComment(),
                dao.isValid()
        );
    }
}