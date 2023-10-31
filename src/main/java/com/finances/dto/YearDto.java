package com.finances.dto;

import com.finances.entity.Year;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class YearDto {
    private Long id;
    private Integer name;
    private List<MonthDto> months;

    public static YearDto fromDao(Year dao) {
        return new YearDto(
                dao.getId(),
                dao.getYearNumber(),
                dao.getMonths()
                        .stream()
                        .map(MonthDto::fromDao)
                        .collect(Collectors.toList()));
    }
}