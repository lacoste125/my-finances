package com.finances.dto;

import com.finances.entity.Year;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class YearDto {
    private Long id;
    private Integer name;

    public static YearDto fromDao(Year dao) {
        return new YearDto(
                dao.getId(),
                dao.getYearNumber()
        );
    }
}