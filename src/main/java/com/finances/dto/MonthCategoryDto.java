package com.finances.dto;

import com.finances.entity.MonthCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthCategoryDto {
    private Long id;
    private Long monthId;
    private CategoryTypeDto category;
    private boolean valid;
    private List<MonthCategoryValueDto> payments;

    public static MonthCategoryDto fromDao(MonthCategory dao) {
        return new MonthCategoryDto(
                dao.getId(),
                dao.getMonth().getId(),
                CategoryTypeDto.fromDao(dao.getCategory()),
                dao.isValid(),
                dao.getCategories() != null ? dao.getCategories()
                        .stream()
                        .map(MonthCategoryValueDto::fromDao)
                        .collect(Collectors.toList()) : List.of()
        );
    }
}