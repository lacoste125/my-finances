package com.finances.dto;

import com.finances.entity.MonthType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthTypeDto {
    private Long id;
    private String name;
    private Integer order;

    public static MonthTypeDto fromDao(MonthType dao) {
        return new MonthTypeDto(
                dao.getId(),
                dao.getName(),
                dao.getOrder()
        );
    }
}