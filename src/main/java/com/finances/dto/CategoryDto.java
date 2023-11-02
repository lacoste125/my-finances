package com.finances.dto;

import com.finances.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
    private Long id;
    private String name;
    private String deadline;

    public static CategoryDto fromDao(Category dao) {
        return new CategoryDto(
                dao.getId(),
                dao.getName(),
                dao.getDeadline()
        );
    }
}