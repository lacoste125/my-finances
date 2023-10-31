package com.finances.dto;

import com.finances.entity.Month;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthDto {
    private Long id;
    private MonthTypeDto monthType;
    private List<MonthCategoryDto> categories;

    public static MonthDto fromDao(Month dao) {
        return new MonthDto(
                dao.getId(),
                MonthTypeDto.fromDao(dao.getMonthType()),
                dao.getCategories()
                        .stream()
                        .map(MonthCategoryDto::fromDao)
                        .collect(Collectors.toList())
        );
    }
}