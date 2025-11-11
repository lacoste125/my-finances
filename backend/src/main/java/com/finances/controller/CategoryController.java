package com.finances.controller;

import com.finances.dto.CategoryDto;
import com.finances.entity.Category;
import com.finances.exception.exist.AlreadyExistException;
import com.finances.request.CreateCategoryRequest;
import com.finances.service.CategoryService;
import com.finances.wrapper.CategoryDtoWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryDtoWrapper categoryDtoWrapper;

    @GetMapping
    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryService.findAllCategories();

        return categoryDtoWrapper.mapToDtos(categories);
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public CategoryDto createCategory(@RequestBody CreateCategoryRequest request) throws AlreadyExistException {
        Category createdCategory = categoryService.createCategory(request);

        return categoryDtoWrapper.mapToDto(createdCategory);
    }
}