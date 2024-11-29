package com.finances.wrapper;

import com.finances.dto.base.CategoryDto;
import com.finances.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryDtoWrapper implements DtoWrapper<Category, CategoryDto> {

    @Override
    public CategoryDto mapToDto(Category dao) {
        return CategoryDto.builder()
                .id(dao.getId())
                .name(dao.getName())
                .deadline(dao.getDeadline())
                .build();
    }
}