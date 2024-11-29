package com.finances.controller;

import com.finances.advisor.Response;
import com.finances.dto.CategoryDto;
import com.finances.entity.Category;
import com.finances.exception.exist.AlreadyExistException;
import com.finances.exception.notfound.NotFoundException;
import com.finances.request.CreateCategoryRequest;
import com.finances.service.CategoryService;
import com.finances.wrapper.CategoryDtoWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryDtoWrapper categoryDtoWrapper;

    @GetMapping("getAllCategories")
    public @ResponseBody ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<Category> categories = categoryService.findAllCategories();

        return new Response<List<CategoryDto>>().ok(categoryDtoWrapper.mapToDtos(categories));
    }

    @GetMapping("getCategoryById")
    public @ResponseBody ResponseEntity<CategoryDto> getCategoryById(@RequestParam Long categoryId) throws NotFoundException {
        Category category = categoryService.findCategoryDtoById(categoryId);

        return new Response<CategoryDto>().ok(categoryDtoWrapper.mapToDto(category));
    }

    @PostMapping("/createCategory")
    public @ResponseBody ResponseEntity<CategoryDto> createCategory(@RequestBody CreateCategoryRequest request) throws AlreadyExistException {
        Category createdCategory = categoryService.createCategory(request);

        return new Response<CategoryDto>().created(categoryDtoWrapper.mapToDto(createdCategory));
    }
}