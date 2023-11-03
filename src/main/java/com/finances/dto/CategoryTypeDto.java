package com.finances.dto;

import com.finances.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryTypeDto {
    private Long id;
    private String name;
    private String deadline;

    public static CategoryTypeDto fromDao(Category dao) {
        return new CategoryTypeDto(
                dao.getId(),
                dao.getName(),
                dao.getDeadline()
        );
    }
}