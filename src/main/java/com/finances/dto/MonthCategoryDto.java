package com.finances.dto;

import com.finances.entity.MonthCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthCategoryDto {
    private Long id;
    private Long monthId;
    private CategoryTypeDto category;

    public static MonthCategoryDto fromDao(MonthCategory dao) {
        return new MonthCategoryDto(
                dao.getId(),
                dao.getMonth().getId(),
                CategoryTypeDto.fromDao(dao.getCategory())
        );
    }
}