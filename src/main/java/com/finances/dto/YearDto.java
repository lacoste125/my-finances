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
    private List<YearCategoryDto> categories;

    public static YearDto fromDao(Year dao) {
        return new YearDto(
                dao.getId(),
                dao.getYearNumber(),
                dao.getCategories() != null ? dao.getCategories()
                        .stream()
                        .map(YearCategoryDto::fromDao)
                        .collect(Collectors.toList()) : List.of()
        );
    }
}