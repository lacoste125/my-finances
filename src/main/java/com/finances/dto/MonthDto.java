package com.finances.dto;

import com.finances.entity.Month;
import com.finances.enums.MonthType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthDto {
    private Long id;
    private MonthType name;
    private Integer order;

    public static MonthDto fromDao(Month dao) {
        return new MonthDto(
                dao.getId(),
                dao.getName(),
                dao.getOrder()
        );
    }
}