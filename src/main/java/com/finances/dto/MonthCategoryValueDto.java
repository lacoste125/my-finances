package com.finances.dto;

import com.finances.entity.MonthCategoryValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthCategoryValueDto {
    private Long id;
    private Long monthCategoryId;
    private Double amount;
    private Date date;
    private String name;
    private boolean valid;

    public static MonthCategoryValueDto fromDao(MonthCategoryValue dao) {
        return new MonthCategoryValueDto(
                dao.getId(),
                dao.getMonthCategory().getId(),
                dao.getAmount(),
                dao.getDate(),
                dao.getName(),
                dao.isValid()
        );
    }
}