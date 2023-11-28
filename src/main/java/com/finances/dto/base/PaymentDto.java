package com.finances.dto.base;

import com.finances.entity.Payment;
import com.finances.enums.MonthType;
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
    private MonthType month;
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